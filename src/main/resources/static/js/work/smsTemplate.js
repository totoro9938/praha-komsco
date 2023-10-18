$(document).ready(() => {
    const smsTemplateMain = {
        init: () => {
            $('#sms-template-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    {collapsible: false, size: '46px', resizable: false, scrollable: false},
                    {collapsible: false, scrollable: false}
                ]
            });
            $('#sms-template-detail-splitter').kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, size: '100%', resizable: false},
                    {collapsible: false, size: '0%', resizable: false}
                ]
            });
        },
        calcContentByteLength: () => {
            const contents = $("#sms-template-detail-sms-send-content").val();
            let cutString = smsTemplateMain.smsContentsSet(contents);
            $("#sms-template-detail-sms-send-content").val(cutString);
            $("#sms-template-detail-sms-bytes").html("[" + byteCheck(cutString) + " / 2000] Bytes")
            if (byteCheck(cutString) > 80) {
                $("#sms-template-detail-sms-type").html("LMS")
            } else {
                $("#sms-template-detail-sms-type").html("SMS")
            }
        },
        smsContentsSet: (contents) => {
            let str = contents;
            let sstr = '';
            for (let i = 0; i <= str.length; i++) {
                if (byteCheck(str.substring(0, i)) > 2000) return sstr;
                sstr = str.substring(0, i);
            }
            return str;
        },
    };

    const smsTemplateSearchBox = {
        init: async () => {
            const catChangeEvent = (e) => {
                $('#sms-template-grid').data("kendoCpGrid").dataSource.read();
            };
            new cpCatDropDownTree('#sms-template-search-template-list', {
                change: catChangeEvent,
                value: 0,
                filter: "none",
                placeholder: "선택하세요.",
                fillMode: 'solid',
                autoWidth: true,
                size: 'small'
            }, "CatSmsTemplate").init();

            $('#sms-template-search-useYn').kendoCheckBox({});
            $('#sms-template-search-delYn').kendoCheckBox({});
            $('.sms-template-search-check-box').on("click", (e) => {
                $('#sms-template-grid').data("kendoCpGrid").dataSource.read();
            });

            $("#sms-template-add-btn").kendoButton({
                themeColor: "primary",
                click: (e) => {
                    let catValue = $("#sms-template-search-template-list").data("kendoDropDownTree").value();
                    let catText = $("#sms-template-search-template-list").data("kendoDropDownTree").text();
                    if (catValue > 0) {
                        $("#sms-template-detail-splitter").data("kendoSplitter").size($('#sms-template-divGrid'), '65%');
                        $("#sms-template-detail-splitter").data("kendoSplitter").size($('#sms-template-detail'), '35%');
                        smsTemplateDetail.smsTemplateDetailClear();
                        $("#sms-template-detail-header-text").text("메세지템플릿 등록");
                        $("#sms-template-detail-sms-template-gb").data("kendoTextBox").value(catText);
                    } else {
                        message.notification({msg: "템플릿구분을 선택해주세요.", type: "error"});
                    }
                }
            });
            $('#sms-template-detail-header-btn-close').on('click', () => {
                $("#sms-template-detail-splitter").data("kendoSplitter").size($('#sms-template-divGrid'), '100%');
                $("#sms-template-detail-splitter").data("kendoSplitter").size($('#sms-template-detail'), "0%");
            });
        }
    };

    const smsTemplateGrid = {
        init: () => {
            $("#sms-template-grid").kendoCpGrid({
                columns: [
                    {
                        field: "no",
                        title: "순서",
                        width: 20,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:center"}
                    },
                    {
                        field: "smsTemplateCatNm",
                        title: "템플릿구분",
                        width: 50,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:center"}
                    },
                    {
                        field: "smsTemplateNm",
                        title: "템플릿명",
                        width: 100,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"}
                    },
                    {
                        field: "regDt",
                        title: "등록일시",
                        width: 40,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:center"},
                        sortable: false
                    },
                    {
                        field: "rgtrNm",
                        title: "등록자",
                        width: 30,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:center"},
                        sortable: false
                    },
                    {
                        field: "useYn",
                        title: "사용",
                        template: '<input type="checkbox" class="k-checkbox-md sms-template-grid-checkbox" data-filed="useYn" #= useYn=="Y" || useYn == null ? checked="checked" : "" #></input>',
                        width: 20,
                        attributes: {
                            style: "text-align:center"
                        },
                        headerAttributes: {
                            class: 'k-text-center'
                        },
                        sortable: false
                    },
                    {
                        field: "delYn",
                        title: "삭제",
                        template: '<input type="checkbox" class="k-checkbox-md sms-template-grid-checkbox" data-filed="delYn" #= delYn=="Y" ? checked="checked" : "" #></input>',
                        width: 20,
                        attributes: {
                            style: "text-align:center"
                        },
                        headerAttributes: {
                            class: 'k-text-center'
                        },
                        sortable: false
                    },
                ],
                dataSource: smsTemplateGrid.smsTemplateDataSource(),
                click: () =>{
                    const skeleton = $('#sms-template-detail-form dd');

                    skeletonClass(skeleton);
                    const grid = $('#sms-template-grid').data("kendoCpGrid");
                    let item = grid.dataItem(grid.select());
                    let getTransferItem = new cpDataSource(METHOD.GET, `work/v1/sms-template-item/${item.smsTemplateUuid}`).getDataSource();
                    getTransferItem.read().then(() => {
                        skeletonClass(skeleton, false);
                        let data = getTransferItem.data();
                        $("#sms-template-detail-delete").show();
                        let item = data[0];
                        if (item.regDt) item.regDt = kendo.toString(new Date(item.regDt), "yyyy-MM-dd H:mm");
                        if (item.mdfDt) item.mdfDt = kendo.toString(new Date(item.mdfDt), "yyyy-MM-dd H:mm");
                        $("#sms-template-detail-splitter").data("kendoSplitter").size($('#sms-template-divGrid'), '65%');
                        $("#sms-template-detail-splitter").data("kendoSplitter").size($('#sms-template-detail'), '35%');
                        smsTemplateDetail.smsTemplateDetailClear();
                        smsTemplateDetail.smsTemplateDetailSet(item);
                    });
                },
                height: '100%',
                resizable: false,
                selectable: "single",
                autoBind: false,
            }).on("click", ".sms-template-grid-checkbox", (e) => {
                e.preventDefault();
            });
        },
        smsTemplateDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/sms-template",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    parameterMap: (options) => {
                        return {
                            smsTemplateCatId: $("#sms-template-search-template-list").data("kendoDropDownTree").value(),
                            useYn: $("input:checkbox[id='sms-template-search-useYn']").is(":checked") ? "" : "Y",
                            delYn: $("input:checkbox[id='sms-template-search-delYn']").is(":checked") ? "" : "N",
                            sortType: "",
                        }
                    }
                },
                schema: {
                    data: 'data',
                    parse: (res) => {
                        res.data.forEach((row) => {
                            if (row.mdfDt) {
                                row.mdfDt = kendo.toString(new Date(row.mdfDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.regDt) {
                                row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd H:mm");
                            }
                        })
                        return res;
                    }
                },
                requestEnd: (e) => {
                    const type = e.type;
                    if (type === "read") {
                        message.notification({type: "info"});
                    }
                },
            });
        },
    }

    const smsTemplateDetail = {
        init: () => {
            $("#sms-template-detail-sms-template-gb").kendoTextBox({readonly: true, fillMode: "flat"});
            $("#sms-template-detail-sms-template-name").kendoTextBox({});
            $("#sms-template-detail-sms-send-content").kendoTextArea({
                rows: 13,
                placeholder: "문자내용 입력..."
            }).on("keyup", (e) => {
                smsTemplateMain.calcContentByteLength();
            });
            $("#sms-template-detail-sms-template-idx").kendoNumericTextBox({min: 0, format: "#0"});
            $("#sms-template-detail-regNm").kendoTextBox({readonly: true, fillMode: "flat"});
            $("#sms-template-detail-regDt").kendoTextBox({readonly: true, fillMode: "flat"});
            $("#sms-template-detail-mdfrNm").kendoTextBox({readonly: true, fillMode: "flat"});
            $("#sms-template-detail-mdfDt").kendoTextBox({readonly: true, fillMode: "flat"});
            $("#sms-template-detail-update").kendoButton({
                themeColor: 'primary',
                click: () => {
                    let valid = $("#sms-template-detail-form").kendoValidator({
                        errorTemplate: "",
                    }).data("kendoValidator");
                    if (valid.validate()) {
                        cpProgress("sms-template-detail")
                        message.callBackConfirm({
                            msg: '저장하겠습니까?',
                            callback: smsTemplateDetail.smsTemplateDetailUpdate,
                            cancel: () => {
                                cpProgress("sms-template-detail", false);
                            }
                        })
                    }
                }
            });
        },
        smsTemplateDetailSet: (item) => {
            $("#sms-template-detail-smsTemplateId").val(item.smsTemplateId);
            $("#sms-template-detail-sms-template-gb").data("kendoTextBox").value(item.smsTemplateCatNm);
            $("#sms-template-detail-sms-template-name").data("kendoTextBox").value(item.smsTemplateNm);
            $("#sms-template-detail-sms-send-content").data("kendoTextArea").value(item.smsTemplateContents);
            smsTemplateMain.calcContentByteLength();
            if (item.useYn == "Y") $("input:checkbox[id='sms-template-detail-useYn']").prop("checked", true);
            else $("input:checkbox[id='sms-template-detail-useYn']").prop("checked", false);
            if (item.delYn == "Y") $("input:checkbox[id='sms-template-detail-delYn']").prop("checked", true);
            else $("input:checkbox[id='sms-template-detail-delYn']").prop("checked", false);
            $("#sms-template-detail-sms-template-idx").data("kendoNumericTextBox").value(item.smsTemplateIdx);
            $("#sms-template-detail-regNm").data("kendoTextBox").value(item.rgtrNm);
            $("#sms-template-detail-regDt").data("kendoTextBox").value(item.regDt);
            $("#sms-template-detail-mdfrNm").data("kendoTextBox").value(item.mdfrNm);
            $("#sms-template-detail-mdfDt").data("kendoTextBox").value(item.mdfDt);
        },
        smsTemplateDetailClear: () => {
            $("#sms-template-detail-smsTemplateId").val(0);
            $("#sms-template-detail-sms-template-gb").data("kendoTextBox").value("");
            $("#sms-template-detail-sms-template-name").data("kendoTextBox").value("");
            $("#sms-template-detail-sms-send-content").data("kendoTextArea").value("");
            $("input:checkbox[id='sms-template-detail-useYn']").prop("checked", true);
            $("input:checkbox[id='sms-template-detail-delYn']").prop("checked", false);
            $("#sms-template-detail-sms-template-idx").data("kendoNumericTextBox").value(0);
            $("#sms-template-detail-regNm").data("kendoTextBox").value("");
            $("#sms-template-detail-regDt").data("kendoTextBox").value("");
            $("#sms-template-detail-mdfrNm").data("kendoTextBox").value("");
            $("#sms-template-detail-mdfDt").data("kendoTextBox").value("");
            $("#sms-template-detail-header-text").text("메세지템플릿 수정");
            smsTemplateMain.calcContentByteLength();
            $("#sms-template-detail-delete").hide();
        },
        smsTemplateDetailUpdate: () => {
            let param = $("#sms-template-detail-form").serializeJSON();
            let method;
            param.smsTemplateCatId = $("#sms-template-search-template-list").data("kendoDropDownTree").value();
            param.description = "";
            param.useYn = $("input:checkbox[id='sms-template-detail-useYn']").is(":checked") ? "Y" : "N";
            param.delYn = $("input:checkbox[id='sms-template-detail-delYn']").is(":checked") ? "Y" : "N";
            if (param.smsTemplateId == 0) {
                delete param.smsTemplateId;
                method = METHOD.POST;
            } else {
                method = METHOD.PUT
            }
            let update = new cpDataSource(method, "/work/v1/sms-template", param).getDataSource();
            update.read().then(() => {
                message.notification({msg: "저장되었습니다.", type: "success"});
                cpProgress("sms-template-detail", false)
                $('#sms-template-grid').data("kendoCpGrid").dataSource.read();
            });
        },
    }
    cpProgress("sms-template-layout")
    smsTemplateMain.init();
    smsTemplateSearchBox.init().then(() => {
        smsTemplateGrid.init();
        smsTemplateDetail.init()
        cpProgress("sms-template-layout", false);
    });
});