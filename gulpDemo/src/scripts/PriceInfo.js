$(document).ready(function () {
    //$('.bs-select').selectpicker({
    //    iconBase: 'fa',
    //    tickIcon: 'fa-check'
    //});
    $('form[name=MaintainPriceForm]').bootstrapValidator({
        message: '输入值无效！',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            BasicPrice: {
                validators: {
                    notEmpty: { message: '请输入市场价！' },
                    regexp: { regexp: /^\d{0,8}\.{0,1}(\d{1,2})?$/, message: '市场价只能输入大于等于0的整数或者2位小数！' }

                }
            },
            CurrentPrice: {
                validators: {
                    notEmpty: { message: '请输入销售价！' },
                    callback: {
                        message: '销售价只能输入大于0的整数或者2位小数！',
                        callback: function (value, validator, $field) {
                            var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
                            var regresult = parseFloat(value) > 0 && reg.test(value);
                            var callback_validom = $($field).next().next().next();
                            if(!regresult)
                            {
                                $(callback_validom).html('销售价只能输入大于0的整数或者2位小数！');
                            }
                            else
                            {
                                //var productsysno = parseInt($($field).parents("form").attr("id").replace("fm#", ""));
                                //$.ajax({
                                //    type: 'GET',
                                //    url: "/ProductMaintain/ProductCurrentPriceChangeValidator?productSysNo=" + productsysno,
                                //    success: function (response) {
                                //        if(response!="Success")
                                //        {
                                //            $(callback_validom).html(response);
                                //            regresult = false;
                                //        }
                                //        else
                                //        {
                                //            regresult = true;
                                //        }
                                //    },
                                //    async: false
                                //});
                            }
                            return regresult;
                        }
                    }
                }
            },
            VirtualPrice: {
                validators: {
                    notEmpty: { message: '请输入采购价！' },
                    regexp: { regexp: /^\d{0,8}\.{0,1}(\d{1,2})?$/, message: '采购价只能输入大于等于0的整数或者2位小数！' }
                }
            },
            UnitCost: {
                validators: {
                    notEmpty: { message: '请输入成本价！' },
                    regexp: { regexp: /^\d{0,8}\.{0,1}(\d{1,2})?$/, message: '成本价格只能输入大于等于0的整数或者2位小数！' }
                }
            },
            UnitCostWithoutTax: {
                validators: {
                    notEmpty: { message: '请输入去税成本价！' },
                    regexp: { regexp: /^\d{0,8}\.{0,1}(\d{1,2})?$/, message: '去税成本价只能输入大于等于0的整数或者2位小数！' }
                }
            },
            CashRebate: {
                validators: {
                    notEmpty: { message: '请输入立减！' },
                    regexp: { regexp: /^\d{0,8}\.{0,1}(\d{1,2})?$/, message: '立减只能输入大于等于0的整数或者2位小数！' }
                }
            },
            Point: {
                validators: {
                    notEmpty: { message: '请输入增送积分！' },
                    regexp: { regexp: /^[0-9]*$/, message: '赠送积分只能输入正整数！' }
                }
            },
            MaxPerOrder: {
                validators: {
                    notEmpty: { message: '请输入每单限购数！' },
                    regexp: { regexp: /^[0-9]*[1-9][0-9]*$/, message: '每单限购数只能输入正整数！' }
                }
            },
            MinCountPerOrder: {
                validators: {
                    notEmpty: { message: '请输入最小订购数！' },
                    regexp: { regexp: /^[0-9]*[1-9][0-9]*$/, message: '最小订购数只能输入正整数！' }
                }
            },
            IncrementQty: {
                validators: {
                    notEmpty: { message: '请输入增量数！' },
                    regexp: { regexp: /^\+?[1-9][0-9]*$/, message: '增量数为大于0的正整数！' }
                }
            }
        }
    }).on("success.form.bv", function (e) {
        PriceInfo.SavePriceInfo($(this));
    });
    $(".EditPriceInfo").click(function () {
        $('#MaintainPriceForm').data('bootstrapValidator').resetForm(true);
        $("#ProductTitle").val($(this).attr("ProductTitle"));
        PriceInfo.EditPriceInfo(parseInt($(this).attr("ProductSysNo")));
    });

    //绑定保存事件
    $('button[name=btnSavePriceInfo]').on('click', function () {
        var $form = $(this).parents('.form-horizontal');
        $form.bootstrapValidator('validate');
    });


    $("[data-model=CurrentPrice]").change(function () {
        var sysNo = $(this).attr('sysNo');
        var cashRebate = $('#CashRebate_' + sysNo + '').val().trim();
        var currentPrice = $(this).val().trim();
        if (!isNaN(currentPrice) && currentPrice != '') {
            if (!isNaN(cashRebate) && cashRebate != '') {
                $('#KJTCurrentPrice_' + sysNo + '').val(parseFloat(currentPrice) + parseFloat(cashRebate));
            } else {
                $('#KJTCurrentPrice_' + sysNo + '').val(currentPrice);
            }
        }
    });

    $("[data-model=CashRebate]").change(function () {
        var sysNo = $(this).attr('sysNo');
        var currentPrice = $('#CurrentPrice_' + sysNo + '').val().trim();
        var cashRebate = $(this).val().trim();
        if (!isNaN(cashRebate) && cashRebate != '') {
            if (!isNaN(currentPrice) && currentPrice != '') {
                $('#KJTCurrentPrice_' + sysNo + '').val(parseFloat(currentPrice) + parseFloat(cashRebate));
            } else {
                $('#KJTCurrentPrice_' + sysNo + '').val(currentPrice);
            }
        }
    });
});

var PriceInfo = {
    //编辑价格信息
    EditPriceInfo: function (sysNo) {
        $.ajax({
            url: "AjaxGetProductPriceInfo?sysno=" + sysNo,
            type: "POST",
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                $.showLoading();
            },
            success: function (data) {
                if (!data.message) {
                    data.KJTCurrentPrice = parseFloat(!isNaN(data.CurrentPrice) ? data.CurrentPrice : 0) + parseFloat(!isNaN(data.CashRebate) ? data.CashRebate : 0);
                    $.bindEntity($("#MaintainPriceForm"), data);
                    $("#SavePriceInfo").show();
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                $.hideLoading();
            }
        });
    },
    //保存价格信息
    SavePriceInfo: function ($form) {
        var data = [];
        data.push($.buildEntity($form));
        if (data[0].ProductSysNo <= 0) {
            $.alert("请选择商品！");
            return false;
        }
        if (parseFloat(data[0].CurrentPrice) <= 0) {
            $.alert("最终销售价必须大于0！");
            return false;
        }
        if (parseInt(data[0].MinCountPerOrder) > parseInt(data[0].MaxPerOrder)) {
            $.alert("每单限购数必须大于等于最小订购数！");
            return false;
        }

        if (data[0].MinCountPerOrder % data[0].IncrementQty != 0 || data[0].MinCountPerOrder / data[0].IncrementQty < 1) {
            $.alert("最小订购数 = 增量数 * N（N为大于等于1的正整数）,请修改!");
            return false;
        }

        if ((data[0].MaxPerOrder - data[0].MinCountPerOrder) % data[0].IncrementQty != 0 || (data[0].MaxPerOrder - data[0].MinCountPerOrder) / data[0].IncrementQty < 0) {
            $.alert("最大订购数 = 最小订购数+增量数 * N （N为大于等于0的正整数）,请修改!");
            return false;
        }

        //if ($.trim(data[0].PointType).length == 0) {
        //    $.alert("请选择付款类型！");
        //    return false;
        //}
        if (parseFloat(data[0].CurrentPrice) >= parseFloat(data[0].BasicPrice)) {
            $.alert("最终销售价必须小于市场价, 请修改!");
            return false;
        }

        $.confirm("您确定要保存价格信息吗？", function (result) {
            if (!result)
                return;

            data[0].IsSendPriceNotifyMail = false;
            $.ajax({
                url: "AjaxSavePriceInfo",
                type: "POST",
                dataType: "json",
                data: { data: encodeURI(JSON.stringify(data)) },
                beforeSend: function (XMLHttpRequest) {
                    $.showLoading();
                },
                success: function (data) {
                    if (!data.message) {
                        $.alert("保存价格信息成功！");
                        //$.confirm(, function () {
                        //    //$('#MaintainPriceForm')[0].reset();
                        //    //$("input[data-model=ProductSysNo]").val(0);
                        //    //$('#MaintainPriceForm').data('bootstrapValidator').reload(true);
                        //    //$("#SavePriceInfo").hide();
                        //});
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    }
}