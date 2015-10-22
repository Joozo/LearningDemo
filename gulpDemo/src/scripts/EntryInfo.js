; (function ($) {
    //limitApplyQty是新增验证的名称  当申报单位为 “千克” 申报数量必须为1  否则报 “申报单位非千克时申报数量必须为1”
    $.fn.bootstrapValidator.i18n.limitApplyQty = $.extend($.fn.bootstrapValidator.i18n.limitApplyQty || {}, {
        'default': 'Please enter right length'
    });
    //validate是验证的方法
    $.fn.bootstrapValidator.validators.limitApplyQty = {
        validate: function (validator, $field, options) {
            var applyUnit = $("#ApplyUnit").val().trim();
            var applyQty = $field.val().trim();
            if (applyUnit != "千克" && applyQty != 1) {
                return false;
            }
            return true;
        }
    };
}(window.jQuery));

$(document).ready(function () {
    $('.date-picker').datepicker({
        rtl: Metronic.isRTL(),
        orientation: "left",
        autoclose: true,
        language: "zh-CN"
    });

    $("#ApplyUnit").change(function () {
        if ($("#ApplyUnit").val() != "千克") {
            $("#ApplyQty").attr("value", "1");            
        }
        if ($("#ApplyUnit").val() == "千克") {
            $('#MaintainEntryForm').data('bootstrapValidator')
            .updateStatus('ApplyQty', 'NOT_VALIDATED', null)
            .validateField('ApplyQty');
        }
    });
    $('#MaintainEntryForm').bootstrapValidator({
        message: '输入值无效！',
        exclude:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            Specifications: {
                validators: {
                    notEmpty: { message: '请输入规格！' }
                }
            },
            ProductNameEN: {
                validators: {
                    notEmpty: { message: '请输入英文名称！' }
                }
            },
            Functions: {
                validators: {
                    notEmpty: { message: '请输入功能！' }
                }
            },
            Component: {
                validators: {
                    notEmpty: { message: '请输入成份！' }
                }
            },
            Purpose: {
                validators: {
                    notEmpty: { message: '请输入用途！' }
                }
            },
            selIsFood: {
                validators: {
                    notEmpty: { message: '请选择商品类别！' }
                }
            },
            ApplyDistrict: {
                validators: {
                    notEmpty: { message: '请选择海关关区！' }
                }
            },
            TaxQty: {
                validators: {
                    notEmpty: { message: '请输入计税单位数量！' },
                    stringLength: {
                        max: 10,
                        message: "计税单位数量最多输入10位！"
                    },
                    regexp: {
                        regexp: /^\d{0,8}\.{0,1}(\d{1,4})?$/,
                        message: '计税单位数量只能输入大于0的整数或者4位小数！'
                    }
                }
            },
            ApplyUnit: {
                validators: {
                    notEmpty: { message: '请输入申报单位！' },
                    stringLength: {
                        min: 1,
                        max: 3,
                        message: '申报单位最多输入3位！'
                    },
                    regexp: {
                        regexp: /^[\u4E00-\u9FA5]+$/,
                        message: '申报单位必须使用中文单位！'
                    }
                }
            },
            ApplyQty: {
                validators: {
                    notEmpty: { message: '请输入申报数量！' },
                    //regexp: { regexp: /^[0-9]*$/, message: '申报数量只能输入正整数！' },
                    limitApplyQty: { message: '申报单位非千克时申报数量必须为1' },
                    callback: {
                        message: '申报数量只能输入输入大于0的整数或者2位小数！',
                        callback: function (value, validator, $field) {
                            var reg = /^\d{0,8}\.{0,1}(\d{1,2})?$/;
                            return parseFloat(value, 10) > 0 && reg.test(value);
                        }
                    }
                }
            },
            TariffRate: {
                validators: {
                    //notEmpty: { message: '请输入申报数量！' },
                    //regexp: { regexp: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/, message: '税率只能输入大于0小于1的2位小数！' }
                    regexp: { regexp: /^0\.{0,1}(\d{1,2})?$/, message: '税率只能输入0，或者大于0小于1的2位小数！' }
                }
            },
            GrossWeight: {
                validators: {
                    notEmpty: { message: '请输入毛重！' },
                    //regexp: { regexp: /^\d{0,8}\.{0,1}(\d{1,3})?$/, message: '毛重只能输入大于等于0的整数或者3位小数！' },
                    callback: {
                        message: '毛重只能输入大于0的整数或者3位小数！',
                        callback: function (value, validator, $field) {
                            var reg = /^\d{0,8}\.{0,1}(\d{1,3})?$/;
                            return parseFloat(value) > 0 && reg.test(value);
                        }
                    }
                }
            },
            SuttleWeight: {
                validators: {
                    notEmpty: { message: '请输入净重！' },
                    //regexp: { regexp: /^\d{0,8}\.{0,1}(\d{1,3})?$/, message: '净重只能输入大于等于0的整数或者3位小数！' },
                    callback: {
                        message: '净重只能输入大于0的整数或者3位小数！',
                        callback: function (value, validator, $field) {
                            var reg = /^\d{0,8}\.{0,1}(\d{1,3})?$/;
                            return parseFloat(value) > 0 && reg.test(value);
                        }
                    }
                }
            }
            //,
            //Note: {
            //    validators: {
            //        notEmpty: { message: '请输入其它备注！' }
            //    }
            //}
        }
    }).on("success.form.bv", function (e) {
        if (EntryInfo.SaveType == 1) {
            EntryInfo.SaveEntryInfo();
        }
        else if (EntryInfo.SaveType == 2) {
            EntryInfo.SaveAndSubmitAudit();
        }
    });
    $("[data-toggle='tooltip']").tooltip();

    $(".EditEntryInfo").click(function () {
        $('#divDetail').removeClass("hidden");
        $('#MaintainEntryForm').data('bootstrapValidator').resetForm(true);
        EntryInfo.EditEntryInfo(parseInt($(this).attr("ProductSysNo")));
    });
    $("#SaveEntryInfo").click(function () {
        EntryInfo.SaveType = 1;
        $('#MaintainEntryForm').bootstrapValidator('validate');

    });
    $("#SubmitEntryInfo").click(function () {
        EntryInfo.SaveType = 2;
        $('#MaintainEntryForm').bootstrapValidator('validate');
    });
    if (EntryInfo.InitProductSysNo > 0) {
        EntryInfo.EditEntryInfo(EntryInfo.InitProductSysNo);
    }

    //选择是否是食品
    $('#selIsFood').change(function (e) {//.attr('readonly', 'readonly')
        if ($(this).val() === '食品') {
            $('#TaxQty').val('').prop('readonly', false);
            $('#TaxUnit').val('千克');
        } else if ($(this).val() === '非食品') {
            $('#TaxQty').val('1').prop('readonly', true);
            $('#TaxUnit').val('件');
        } else {
            $('#TaxUnit').val('').removeAttr('readonly');
        }
        $('#MaintainEntryForm').data('bootstrapValidator')
            .updateStatus('TaxQty', 'NOT_VALIDATED', null)
            .validateField('TaxQty');
    });


    //点击上传
    $("#btnUpload").click(function () {
        if (EntryInfo.InitProductSysNo <= 0) {
            $.alert("请选择商品！");
            return;
        }
        $("#entryFileUploader").uploadify("upload");
    });
    //点击删除
    $("#tbodyEntryAttachment").on("click", "a[data-role='delete']", function () {
        var fileID = $(this).attr("fileID");
        if (parseInt(fileID) > 0) {
            EntryInfo.DelEntryFile($(this), fileID);
        } else {
            $.alert("请选择要删除的文件！");
        }
    });
    //点击下载
    $("#tbodyEntryAttachment").on("click", "a[data-role='downloadAttachment']", function () {
        var url = $(this).attr("fileUrl");
        window.location = "/ProductMaintain/AjaxDownloadProductEntryAttachment?url=" + url;
    });

    //备案资料上传
    $("#entryFileUploader").uploadify({
        "swf": "/Content/third/uploadify/uploadify.swf",
        "buttonText": "选择资料文件",
        "uploader": EntryInfo.FileServer + "/UploadHandler.ashx?appName=entry",
        "auto": false,
        "onSelect": function (file) {
            EntryInfo.SelectFileCount += 1;
            $("#btnUpload").show();
        },
        "onUploadSuccess": function (file, data, response) {
            var data = JSON.parse(data);
            if (data.state != "SUCCESS") {
                $.alert(data.message);
            }
            else {
                EntryInfo.SaveFileInfo(data);
            }
        },
        "onUploadError": function (file, errorCode, errorMsg, errorString) {
            if (errorCode != "-280") {
                //$("#btnUpload").hide();
                $.alert("上传失败请重试。", function () {
                    window.location.reload();
                });
            }
            else {
                EntryInfo.SelectFileCount -= 1;
            }
        }
    });
});

var EntryInfo = {
    FileServer: '',
    SelectFileCount: 0,
    SaveFileInfo: function (data) {

        var FileData = {
            ProductSysNo: EntryInfo.InitProductSysNo,
            Name: data.title,
            ResourceUrl: data.url,
            Original: data.original
        }

        $.ajax({
            url: "AjaxSubmitProductEntryAttachment",
            type: "POST",
            dataType: "json",
            data: { data: encodeURI(JSON.stringify(FileData)) },
            beforeSend: function (XMLHttpRequest) {
                $.showLoading();
            },
            success: function (data) {
                if (!data.message) {

                    $("#btnUpload").hide();
                    var html = "<tr>\
                                        <td style='vertical-align: middle;'>" + FileData.Original + "\
                                        </td>\
                                        <td>"+ data.ResourceUrl + "</td>\
                                        <td>\
                                            <a href='javascript:void(0)' fileID=" + data.SysNo + " data-role='delete' class='btn default btn-xs red'>\
                                                <i class='fa fa-trash-o'></i>删除</a>\
                                            <a href='" + EntryInfo.FileServer + '/' + data.ResourceUrl + "'  target='_blank'  data-role='downloadAttachment' class='btn default btn-xs green'>\
                                                <i class='fa fa-download'></i>附件下载</a>\
                                        </td>\
                                    </tr>";
                    $("#tbodyEntryAttachment").append(html);
                    EntryInfo.ContinueUpload();
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                $.hideLoading();
            }
        });
    },
    DelEntryFile: function (jq, fileID) {
        $.confirm("确定删除该备案附件？", function () {
            $.ajax({
                url: "AjaxDelProductEntryAttachment",
                type: "POST",
                dataType: "json",
                data: { data: fileID },
                beforeSend: function (XMLHttpRequest) {
                    $.showLoading();
                },
                success: function (data) {
                    if (!data.message) {
                        jq.parents("tr").remove();
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    },
    //继续上传
    ContinueUpload: function () {
        EntryInfo.SelectFileCount -= 1;
        if (EntryInfo.SelectFileCount > 0) {
            $("#entryFileUploader").uploadify("upload");
        }
        else {
            $.alert("上传商检备案资料成功！");
        }
    },

    InitProductSysNo: 0,
    //1-保存，2-保存并提交申请
    SaveType: 1,
    //编辑备案信息
    EditEntryInfo: function (sysNo) {
        EntryInfo.SaveType = 1;
        $.ajax({
            url: "AjaxGetProductEntryInfo?sysno=" + sysNo,
            type: "POST",
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                $.showLoading();
            },
            success: function (data) {

                if (!data.message) {
                    if (data.ManufactureDate != null) {
                        data.ManufactureDate = data.ManufactureDate.replace(" 0:00:00", "");
                    }
                    if (data.TaxQty <= 0) data.TaxQty = 1;
                    if (data.TaxUnit === '千克' || data.TaxUnit === 'kg') {
                        data.selIsFood = "食品";
                        $('#TaxQty').prop('readonly', false);
                    } else {
                        data.selIsFood = "非食品";
                        data.TaxUnit = "件";
                        $('#TaxQty').prop('readonly', true);
                    }
                    var optionHtml = "";
                    if (data.BizType == "0") {  //直邮
                        for (var i = 0; i < oCustomsCodeModel1.length; i++) {
                            optionHtml += "<option value=" + oCustomsCodeModel1[i].key + ">" + oCustomsCodeModel1[i].value + "</option>";
                        }
                        $("#bizTypeid").hide();
                        $('#MaintainEntryForm').data('bootstrapValidator').validateField('ApplyUnit');
                        $('#MaintainEntryForm').data('bootstrapValidator').validateField('ApplyQty');
                    }
                    else if (data.BizType == "1") {
                        optionHtml += "<option value=''>" + JR("请选择") + "</option>";
                        for (var i = 0; i < oCustomsCodeModel2.length; i++) {
                            optionHtml += "<option value=" + oCustomsCodeModel2[i].key + ">" + oCustomsCodeModel2[i].value + "</option>";
                        }
                        $("#bizTypeid").show();



                    }
                    var oApplyDistrict = $("[data-model='ApplyDistrict']");
                    oApplyDistrict.html(optionHtml);
                    $.bindEntity($("#MaintainEntryForm"), data);
                    if (oApplyDistrict.get(0).selectedIndex < 0) {
                        oApplyDistrict.get(0).selectedIndex = 0;
                    }
                    $("#EntryStatusPanel").html(data.EntryStatusText);
                    if (data.EntryStatus == -1 || data.EntryStatus == 0) {
                        $("#SaveEntryInfo").show();
                        $("#SubmitEntryInfo").show();
                    }
                    else {
                        $("#SaveEntryInfo").hide();
                        $("#SubmitEntryInfo").hide();
                    }
                    $("#EntryStatusPanel").removeClass("label-info");
                    $("#EntryStatusPanel").removeClass("label-warning");
                    $("#EntryStatusPanel").removeClass("label-danger");
                    $("#EntryStatusPanel").removeClass("label-success");
                    switch (data.EntryStatus) {
                        case -2:
                            $("#EntryStatusPanel").addClass("label-danger");
                            break;
                        case -1:
                        case 0:
                            $("#EntryStatusPanel").addClass("label-warning");
                            break;
                        case 4:
                            $("#EntryStatusPanel").addClass("label-success");
                            break;
                        default:
                            $("#EntryStatusPanel").addClass("label-info");
                            break;
                    }
                    Metronic.updateUniform();

                    //获取备案附件信息
                    $.ajax({
                        url: "/Common/AjaxGetEntryAttachmentArea?bizSysNo=" + sysNo + "&source=3",
                        type: "GET",
                        dataType: "html",
                        beforeSend: function (XMLHttpRequest) {
                            $.showLoading();
                        },
                        success: function (data) {
                            $("#entryAttachmentArea").find(".portlet-body").remove();
                            $("#entryAttachmentArea").append(data);
                            EntryAttachment.BizSysNo = sysNo;
                            EntryAttachment.Init();
                        }
                    });

                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                $.hideLoading();
            }
        });
    },
    //保存备案信息
    SaveEntryInfo: function () {
        var data = $.buildEntity($("#MaintainEntryForm"));
        if (data.ProductSysNo <= 0) {
            $.alert("请选择商品！");
            return false;
        }
        //if (data.ManufactureDate.length == 0) {
        //    $.alert("请选择出厂日期！");
        //    return false;
        //}
        if (parseFloat(data["GrossWeight"]) < parseFloat(data["SuttleWeight"])) {
            $.alert("毛重必须大于或者等于净重,请修改!");
            return false;
        }

        if (!data.ApplyDistrict||data.ApplyDistrict==0) {
            $.alert("数据填写不完整：请选择海关关区");
            return false;
        }
        if (data.ApplyQty==null) {
            $.alert("数据填写不完整：请填写申报数量");
            return false;
        }
        $.confirm("您确定要保存备案信息吗？", function (result) {
            if (!result)
                return;
            $.ajax({
                url: "AjaxSaveEntryInfo",
                type: "POST",
                dataType: "json",
                data: { data: encodeURI(JSON.stringify(data)) },
                beforeSend: function (XMLHttpRequest) {
                    $.showLoading();
                },
                success: function (data) {
                    if (!data.message) {
                        $.alert("保存备案信息成功！", function () {
                            $('#divDetail').addClass("hidden");
                            $('#MaintainEntryForm')[0].reset();
                            $("input[data-model=ProductSysNo]").val(0);
                            $('#MaintainEntryForm').data('bootstrapValidator').resetForm(true);
                            $("#SaveEntryInfo").hide();
                            $("#SubmitEntryInfo").hide();
                        });
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    },
    //保存并提交申请
    SaveAndSubmitAudit: function () {
        var data = $.buildEntity($("#MaintainEntryForm"));
        if (data.ProductSysNo <= 0) {
            $.alert("请选择商品！");
            return false;
        }
        //if (data.ManufactureDate.length == 0) {
        //    $.alert("请选择出厂日期！");
        //    return false;
        //}
        if (parseFloat(data["GrossWeight"]) < parseFloat(data["SuttleWeight"])) {
            $.alert("毛重必须大于或者等于净重,请修改!");
            return false;
        }

        if (!data.ApplyDistrict||data.ApplyDistrict==0) {
            $.alert("数据填写不完整：请选择海关关区");
            return false;
        }

        $.confirm("您确定要保存并提交备案申请吗？", function (result) {
            if (!result)
                return;
            $.ajax({
                url: "AjaxSubmitProductEntryAudit",
                type: "POST",
                dataType: "json",
                data: { data: encodeURI(JSON.stringify(data)) },
                beforeSend: function (XMLHttpRequest) {
                    $.showLoading();
                },
                success: function (data) {
                    if (!data.message) {
                        $.alert("保存并提交备案申请成功！", function () {
                            $('#divDetail').addClass("hidden");
                            $('#MaintainEntryForm')[0].reset();
                            $("input[data-model=ProductSysNo]").val(0);
                            $('#MaintainEntryForm').data('bootstrapValidator').resetForm(true);
                            $("#SaveEntryInfo").hide();
                            $("#SubmitEntryInfo").hide();
                            window.location.reload();
                        });
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {
                    $.hideLoading();
                }
            });
        });
    }
}