$(document).ready(function () {

    var brands = $("#BrandSysNoSelect option");
    var origincodes = $("#OriginCodeSelect option");
 
    BasicInfo.InitEditor();

    var result1;
    var result2;
    $('#BasicInfoForm').bootstrapValidator({
        message: '输入值无效！',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //  ^[^<>`~!/@\#}$%:;)(_^{&*=|'+]+$  `~!/@\#}$%:;)(_^{&*=|'
            ProductName: {
                validators: {
                    notEmpty: { message: '请输入商品名称！' },
                    regexp: { regexp: /^[^<>（）《》？｛｝：&ＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍ１２３４５６７８９０！＠＃￥％＆－＝＋$＾＊　　#%&'+]+$/, message: '商品名称不能包含HTML标签和全角字符！' }
                }
            },

            BriefName: {
                validators: {
                    notEmpty: { message: '请输入商品简称！' },
                    regexp: { regexp: /^[^<>（）《》？｛｝：&ＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍ１２３４５６７８９０！＠＃￥％＆－＝＋$＾＊　　#%&'+]+$/, message: '商品简称不能包含HTML标签和全角字符！' }
                }
            },
            Keywords: {
                validators: {
                    regexp: { regexp: /^[^<>（）《》？｛｝：&ＱＷＥＲＴＹＵＩＯＰＡＳＤＦＧＨＪＫＬＺＸＣＶＢＮＭｑｗｅｒｔｙｕｉｏｐａｓｄｆｇｈｊｋｌｚｘｃｖｂｎｍ１２３４５６７８９０！＠＃￥％＆－＝＋$＾＊　　#%&'+]+$/, message: '关键字不能包含HTML标签和全角字符！' }
                }
            },
            BrandSysNo: {
                validators: {
                    notEmpty: {
                        message: '请选择品牌！'
                    }
                }
            }
        }
    }).on("success.form.bv", function (e) {
        result1 = true;
    });
    $('#DescriptionForm').bootstrapValidator({
        message: '输入值无效！',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            ProductDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品简述！'
                    }
                }
            }
        }
    }).on("success.form.bv", function (e) {
        result2 = true;
    });

    $("#SaveInfo").click(function () {
        result1 = false;
        result2 = false;
        $('#BasicInfoForm').bootstrapValidator('validate');
        $('#DescriptionForm').bootstrapValidator('validate');
        if (result1 && result2) {
            BasicInfo.Save();
        }
    });

//    $("#BrandSysNoFilter").bind("input propertychange", function () {
//        var newbrands = '';
//        brands.each(function (i, item) {
//            if(item.innerHTML.indexOf($("#BrandSysNoFilter").val())!=-1)
//            {
//                newbrands += item.outerHTML;
//            }
//        });
//        $("#BrandSysNoSelect option").remove();
//        $(newbrands).appendTo("#BrandSysNoSelect");
//    });

//    $("#BrandSysNoFilter").on("focus", function () {        
//        var newbrands = '';
//        brands.each(function (i, item) {
//                newbrands += item.outerHTML;
//                });
//        $("#BrandSysNoSelect option").remove();
//        $(newbrands).appendTo("#BrandSysNoSelect");
//        $("#BrandSysNoSelect")[0].style.display = 'block';
//    });

//    $("#BrandSysNoSelect").on("change mouseup", function () {
//        $("#BrandSysNoFilter").val($("#BrandSysNoSelect option:selected").text())
//        $("#BrandSysNoSelect")[0].style.display = 'none';
//});

//    $("#BrandSysNoFilter").val($("#BrandSysNoSelect option:selected").text())

//    $("#OriginCodeFilter").bind("input propertychange", function () {
//        var neworigincodes = '';
//        origincodes.each(function (i, item) {
//            if (item.innerHTML.indexOf($("#OriginCodeFilter").val()) != -1) {
//                neworigincodes += item.outerHTML;
//            }
//        });
//        $("#OriginCodeSelect option").remove();
//        $(neworigincodes).appendTo("#OriginCodeSelect");
//    });

//    $("#OriginCodeFilter").on("focus", function () {
//        var neworigincodes = '';
//        origincodes.each(function (i, item) {
//                neworigincodes += item.outerHTML;
//                });
//        $("#OriginCodeSelect option").remove();
//        $(neworigincodes).appendTo("#OriginCodeSelect");
//        $("#OriginCodeSelect")[0].style.display = 'block';
//    });

//    $("#OriginCodeSelect").on("change mouseup", function () {
//        $("#OriginCodeFilter").val($("#OriginCodeSelect option:selected").text())
//        $("#OriginCodeSelect")[0].style.display = 'none';
//    });

//    $("#OriginCodeFilter").val($("#OriginCodeSelect option:selected").text())

    $("#StoreSysNo").on("change", function () {
        if ($("#StoreSysNo").val() > 0) {
            $.post("/ProductMaintain/FrontProductCategorySelector", { SelectedStoreSysNo: $("#StoreSysNo").val(), ID: "NewFrontCategorySysNo", DataModel: "" }, function (response) {
                $(".front_category").html(response);
            });
        }
        else {
            $(".front_category").html('<select class="bs-select form-control selectpicker" id="NewFrontCategorySysNo" name="NewFrontCategorySysNo" disabled><option>' + JR("--请选择--") + '</option></select>');
            $("#SwitchProductToAnotherStore").addAttr("disabled", "disabled");
        }
        //setTimeout("$('.front_category>#NewFrontCategorySysNo').selectpicker({});", 500);
    });
    $("#NewFrontCategorySysNo").live("change", function () {
        if ($("#NewFrontCategorySysNo").val() > 0) {
            $("#SwitchProductToAnotherStore").removeAttr("disabled");
        }
        else {
            $("#SwitchProductToAnotherStore").addAttr("disabled", "disabled");
        }
    });
    $("#SwitchProductToAnotherStore").on("click", function () {
        //result1 = false;
        //result2 = false;
        //$('#BasicInfoForm').bootstrapValidator('validate');
        //$('#DescriptionForm').bootstrapValidator('validate');
        //if (result1 && result2) {
        //    BasicInfo.Save(true);
        //}
        BasicInfo.ProductSwitch();
    });


    $('.bs-select').selectpicker({
        iconBase: 'fa',
        tickIcon: 'fa-check'
    });

    $(".select2").select2({
        placeholder: "Select an option",
        allowClear: true
    });
});

var BasicInfo = {
    ProductGroupSysNo: 0,
    ProductDescLongEditor: null,
    ProductPhotoDescEditor: null,
    //初始化html编辑器
    InitEditor: function () {
        UEDITOR_CONFIG.zIndex = 1;
        BasicInfo.ProductDescLongEditor = new UE.ui.Editor();
        BasicInfo.ProductPhotoDescEditor = new UE.ui.Editor();
        BasicInfo.ProductDescLongEditor.render('ProductDescLongEditor');
        BasicInfo.ProductPhotoDescEditor.render('ProductPhotoDescEditor');
    },
    //保存商品信息
    Save: function () {
        var data = $.buildEntity($("#BasicInfoForm"));
        var descData = $.buildEntity($("#DescriptionForm"));
        $.extend(data, descData);

        data.ProductPhotoDesc = BasicInfo.ProductPhotoDescEditor.getContent();
        data.ProductDescLong = BasicInfo.ProductDescLongEditor.getContent();    
        if ($.trim(data.FrontCategorySysNo).length == 0
          || parseInt(data.FrontCategorySysNo) <= 0) {
            $.alert("请选择店铺类别！");
            return;
        }

        if ($.trim(data.BrandSysNo).length == 0
            || parseInt(data.BrandSysNo) <= 0) {
            $.alert(JR("请选择品牌！"));
            return;
        }

        if ($.trim(data.OriginCode).length == 0) {
            $.alert(JR("请选择产地！"));
            return;
        }

        bootbox.dialog({
            message: '<input type="checkbox" id="cbk" style="vertical-align:text-top;margin-top:0px;margin-right:2px;"/><label for="cbk">我已阅读并同意<a href="/Content/商户承诺书.docx">《商户承诺书》</a></label>',
            title: JR("您确定要保存？"),
            buttons: {
                Cancel: {
                    label: JR('取消'),
                    className: "btn-default"
                },
                OK: {
                    label: JR('确认'),
                    className: "btn-primary",
                    callback: function () {
                        var c = $("#cbk").prop("checked");
                        if (!c) {
                            $.alert(JR("您必须先同意《商户承诺书》"));
                            return false;
                        }
                        if (BasicInfo.ProductGroupSysNo > 0) {
                            data.ProductGroupSysNo = BasicInfo.ProductGroupSysNo;
                        }
                        //选择属性值
                        var properties = [];
                        $("select[Property=Normal]").each(function () {
                            properties.push({
                                PropertyGroupSysNo: $(this).attr("GroupSysNo"),
                                PropertyGroupName: $(this).attr("GroupName"),
                                PropertySysNo: $(this).attr("PropertySysNo"),
                                PropertyName: $(this).attr("PropertyName"),
                                ValueDescription: $.trim($(this).find("option:selected").text()),
                                IsSplitGroupProperty: $(this).attr("IsSplitGroup"),
                                PropertyValueSysNo: $(this).val()
                            });
                        });
                        data.SelectNormalProperties = properties;
                        $.ajax({
                            url: "AjaxSaveProductBasicInfo",
                            type: "POST",
                            dataType: "json",
                            data: { data: encodeURI(JSON.stringify(data)) },
                            beforeSend: function (XMLHttpRequest) {
                                $.showLoading();
                            },
                            success: function (data) {
                                if (!data.message) {
                                    $.alert(JR("保存商品信息成功！"), function () {
                                        location.href = 'BasicInfo?ProductGroupSysNo=' + data;
                                    });
                                }
                                else {
                                    $.alert(data.message);
                                }
                            },
                            complete: function (XMLHttpRequest, textStatus) {
                                $.hideLoading();
                            }
                        });
                    }
                }
            }
        });
    },

    ProductSwitch: function()
    {
        var data = $.buildEntity($("#BasicInfoForm"));
        var descData = $.buildEntity($("#DescriptionForm"));
        $.extend(data, descData);

        data.FrontCategorySysNo = $("#NewFrontCategorySysNo").val();
        data.StoreSysNo = $("#StoreSysNo").val();

        if ($.trim(data.FrontCategorySysNo).length == 0
            || parseInt(data.FrontCategorySysNo) <= 0) {
            if (isSwitchProductToAnotherStore) {
                $.alert(JR("请选择迁移目标店铺的店铺类别！"));
            }
            else {
                $.alert(JR("请选择店铺类别！"));
            }
            return;
        }
        $.confirm(JR("您确定要保存？"), function (result) {
            if (!result)
                return;

            if (BasicInfo.ProductGroupSysNo > 0) {
                data.ProductGroupSysNo = BasicInfo.ProductGroupSysNo;
            }
            $.post('/productmaintain/ProductSwitch', { data: encodeURI(JSON.stringify(data)) }, function (response) {
                if (!response.error) {
                    if (response.result != "Failure") {
                        $.alert(JR("商品迁移成功！"), function () {
                            location.href = '/Product/Query';
                        });
                    }
                    else {
                        $.alert(response.message);
                    }
                }

            });
        });
    }
}