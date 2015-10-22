$(document).ready(function () {
    $('.date-picker').datepicker({
        dateFormat: 'yyyy-mm-dd',
        rtl: Metronic.isRTL(),
        orientation: "left",
        autoclose: true,
        language: "zh-CN"
    });
    $(".date-range").defaultDateRangePicker();
    $("#SaveInfo").click(function () {
        GroupProduct.CreateGroupProduct();
    });
});

var GroupProduct = {
    ProductGroupSysNo: 0,
    //保存选中的商品
    CreateGroupProduct: function () {
        var p = [];
        $("div[Property=Group]").each(function () {
            var curr = [];
            $(this).find("input").each(function () {
                if ($(this).attr("checked") == "checked") {
                    curr.push({
                        PropertyGroupName: $(this).attr("PropertyGroupName"),
                        PropertySysNo: $(this).attr("PropertySysNo"),
                        PropertyName: $(this).attr("PropertyName"),
                        ValueSysNo: $(this).val(),
                        ValueName: $(this).attr("ValueName")
                    });
                }
            });
            if (curr.length > 0) {
                p.push(curr);
            }
        });
        if (p.length == 0) {
            $.alert("请选择分组属性！");
            return;
        }
        var data = [];
        if (p.length == 1) {
            for (var i = 0; i < p[0].length; i++) {
                data.push({
                    ProductGroupSysNo: GroupProduct.ProductGroupSysNo,
                    PropertyGroupName: p[0][i].PropertyGroupName,
                    PropertySysNo1: p[0][i].PropertySysNo,
                    PropertyName1: p[0][i].PropertyName,
                    ValueSysNo1: p[0][i].ValueSysNo,
                    ValueName1: p[0][i].ValueName,
                    ShipPriceTemplateSysNo: defaultTemplateSysNo
                });
            }
        }
        else {
            for (var i = 0; i < p[0].length; i++) {
                for (var j = 0; j < p[1].length; j++) {
                    data.push({
                        ProductGroupSysNo: GroupProduct.ProductGroupSysNo,
                        PropertyGroupName: p[0][i].PropertyGroupName,
                        PropertySysNo1: p[0][i].PropertySysNo,
                        PropertyName1: p[0][i].PropertyName,
                        ValueSysNo1: p[0][i].ValueSysNo,
                        ValueName1: p[0][i].ValueName,
                        PropertySysNo2: p[1][j].PropertySysNo,
                        PropertyName2: p[1][j].PropertyName,
                        ValueSysNo2: p[1][j].ValueSysNo,
                        ValueName2: p[1][j].ValueName,
                        ShipPriceTemplateSysNo: defaultTemplateSysNo
                    });
                }
            }
        }

        $.ajax({
            url: "AjaxCreateGroupProduct",
            type: "POST",
            dataType: "json",
            data: { data: encodeURI(JSON.stringify(data)) },
            beforeSend: function (XMLHttpRequest) {
                $.showLoading();
            },
            success: function (data) {
                if (!data.message) {
                    $.alert("保存商品成功！", function () {
                        location.href = 'GroupProduct?ProductGroupSysNo=' + GroupProduct.ProductGroupSysNo;
                    });
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                $.hideLoading();
            }
        });
    },
    //上架
    Online: function (productSysNo) {
        var data = GroupProduct.GetData(productSysNo);

        if (!GroupProduct.CheckData(data)) {
            return;
        }

        $.confirm("您确定要上架该商品吗？", function (result) {
            if (!result)
                return;

            $.ajax({
                url: "/ProductMaintain/AjaxProductBatchOnline",
                type: "POST",
                dataType: "json",
                data: { data: encodeURI(JSON.stringify(data)) },
                beforeSend: function(XMLHttpRequest) {
                    $.showLoading();
                },
                success: function(data) {
                    if (!data.message) {
                        $.alert("上架商品成功！", function() {
                            location.reload();
                        });
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    },
    //上架不展示
    OnlineNotShow: function (productSysNo) {
        var data = GroupProduct.GetData(productSysNo);

        if (!GroupProduct.CheckData(data)) {
            return;
        }

        $.confirm("您确定要上架不展示该商品吗？", function (result) {
            if (!result)
                return;

            $.ajax({
                url: "/ProductMaintain/AjaxProductBatchOnlineNotShow",
                type: "POST",
                dataType: "json",
                data: { data: encodeURI(JSON.stringify(data)) },
                beforeSend: function(XMLHttpRequest) {
                    $.showLoading();
                },
                success: function(data) {
                    if (!data.message) {
                        $.alert("上架不展示商品成功！", function() {
                            location.reload();
                        });
                    }
                },
                complete: function(XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    },
    //下架
    Offline: function (productSysNo) {
        var productSysNoList = [];
        productSysNoList.push(productSysNo);

        $.confirm("您确定要下架该商品吗？", function (result) {
            if (!result)
                return;

            $.ajax({
                url: "/ProductMaintain/AjaxProductBatchOffline",
                type: "POST",
                dataType: "json",
                data: { data: encodeURI(JSON.stringify(productSysNoList)) },
                beforeSend: function (XMLHttpRequest) {
                    $.showLoading();
                },
                success: function (data) {
                    if (!data.message) {
                        $.alert("下架商品成功！", function () {
                            location.reload();
                        });
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    },
    //作废
    Abandon: function (productSysNo) {
        var productSysNoList = [];
        productSysNoList.push(productSysNo);

        $.confirm("您确定要作废该商品吗？", function (result) {
            if (!result)
                return;

            $.ajax({
                url: "/ProductMaintain/AjaxProductBatchAbandon",
                type: "POST",
                dataType: "json",
                data: { data: encodeURI(JSON.stringify(productSysNoList)) },
                beforeSend: function (XMLHttpRequest) {
                    $.showLoading();
                },
                success: function (data) {
                    if (!data.message) {
                        $.alert("作废商品成功！", function () {
                            location.reload();
                        });
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    },
    //保存商品
    SaveProduct: function (productSysNo) {
        var data = GroupProduct.GetData(productSysNo);
        
        if (!GroupProduct.CheckData(data)) {
            return;
        }

        $.ajax({
            url: "/ProductMaintain/AjaxSaveSingleProductInfo",
            type: "POST",
            dataType: "json",
            data: { data: encodeURI(JSON.stringify(data)) },
            beforeSend: function (XMLHttpRequest) {
                $.showLoading();
            },
            success: function (data) {
                if (!data.message) {
                    $.alert("保存商品信息成功！", function () {
                        location.reload();
                    });
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                $.hideLoading();
            }
        });
    },
    GetData: function(productSysNo) {
        var data = {
            ProductSysNo: productSysNo,
            PromotionTitle: $("#PromotionTitle" + productSysNo).val(),
            TimePromotionTitle: $("#TimePromotionTitle" + productSysNo).val(),
            PromotionTitleBeginDate: $("#PromotionTitleBeginDate" + productSysNo).val(),
            PromotionTitleEndDate: $("#PromotionTitleEndDate" + productSysNo).val(),
            ProductMode: $("#ProductMode" + productSysNo).val(),
            Weight: $.trim($("#Weight" + productSysNo).val()).length == 0 ? "0" : $("#Weight" + productSysNo).val(),
            Length: $.trim($("#Length" + productSysNo).val()).length == 0 ? "0" : $("#Length" + productSysNo).val(),
            Width: $.trim($("#Width" + productSysNo).val()).length == 0 ? "0" : $("#Width" + productSysNo).val(),
            Height: $.trim($("#Height" + productSysNo).val()).length == 0 ? "0" : $("#Height" + productSysNo).val(),
            UPCCode: $("#UPCCode" + productSysNo).val(),
            ProductOutUrl: $("#ProductOutUrl" + productSysNo).val(),
            AlertQtyWeeklySaleCount: $("#AlertQtyWeeklySaleCount" + productSysNo).val(),
            AlertQtyFixNum: $("#AlertQtyFixNum" + productSysNo).val(),
            ShipPriceTemplateSysNo: $("#ShipPriceTemplate" + productSysNo).val(),
            Status: $("#Status" + productSysNo).val()
        };
        return data;
    },
    CheckData: function(data) {
        var regNumber = /^[0-9]*$/;
        var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
        var strRegUrl = "^(https://|http://)"
            + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
            + "(([0-9]{1,3}.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
            + "|" // 允许IP和DOMAIN（域名）
            + "([0-9a-z_!~*'()-]+.)*" // 域名- www.
            + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." // 二级域名
            + "[a-z]{2,6})" // first level domain- .com or .museum
            + "(:[0-9]{1,4})?" // 端口- :80
            + "((/?)|" // a slash isn't required if there is no file name
            + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var regUrl = new RegExp(strRegUrl);
        if ($.trim(data.ProductMode).length == 0) {
            $.alert("请输入型号！");
            return false;
        }
        if ($.trim(data.UPCCode).length == 0) {
            $.alert("请输入标准条形码, 如没有则填8个0！");
            return false;
        }
        if (!regNumber.test(data.Weight)) {
            $.alert("重量必须输入大于0的整数！");
            return false;
        }
        if (parseInt(data.Weight) <= 0) {
            $.alert("重量必须输入大于0的整数！");
            return false;
        }
        if (parseFloat(data.Length) <= 0 || !reg.test(data.Length)) {
            $.alert("长度必须输入大于0的整数或者2位小数！");
            return false;
        }
        if (parseFloat(data.Width) <= 0 || !reg.test(data.Width)) {
            $.alert("宽度必须输入大于0的整数或者2位小数！");
            return false;
        }
        if (parseFloat(data.Height) <= 0 || !reg.test(data.Height)) {
            $.alert("高度必须输入大于0的整数或者2位小数！");
            return false;
        }
        if ($.trim(data.ProductOutUrl).length > 0 && !regUrl.test(data.ProductOutUrl)) {
            $.alert("请填写正确的网址，以http://开头！");
            return false;
        }

        if (!regNumber.test(data.AlertQtyWeeklySaleCount)) {
            $.alert("库存预警下限-前M周销售数量,必须输入大于0的整数！");
            return false;
        }
        if (!regNumber.test(data.AlertQtyFixNum)) {
            $.alert("库存预警下限-固定值,必须输入大于0的整数！");
            return false;
        }
        //if ($.trim(data.AlertQtyWeeklySaleCount).length > 0 && $.trim(data.AlertQtyFixNum).length > 0) {
        //    $.alert("库存预警下限只能输入一种值！");
        //    return false;
        //}
        if ($.trim(data.ShipPriceTemplateSysNo).length == 0 || parseInt(data.ShipPriceTemplateSysNo) <= 0) {
            $.alert("请选择运费模板！");
            return false;
        }
        return true;
    },
    inputAlterStockQtyCheck: function (input, sysno) {
        if (input == 0) {
            $("#AlertQtyFixNum" + sysno.toString()).val('');
        }
        else if (input == 1) {
            $("#AlertQtyWeeklySaleCount" + sysno.toString()).val('');
        }
    }
}