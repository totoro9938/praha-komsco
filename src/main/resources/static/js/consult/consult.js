const consultMain = {
    radioGroupMakeItems: (data, isAll = false) => {
        let radioItem = [];
        if (isAll) radioItem.push({value: "all", label: "전체"});

        data.forEach((e) => {
            let items = {};
            items.value = e.codeKey;
            items.label = e.codeNm;
            radioItem.push(items);
        })
        return radioItem;
    },
    callTypeObjectReset: () => {
        $("#consult-reservation-form").clearForm();
        $("#consult-transfer-form").clearForm();
        $("#consult-call-type-tooltip").html("");
        $("#consult-call-type-tooltip").unbind("click");
        consultCallRegister.resetCallRegText();
    },
    customerInfoReset: () => {
        $("#consult-customer-custId").val("");
        $("#consult-customer-custUuid").val("");
        $("#consult-customer-custType").val("");
        $("#consult-customer-name").val("");
        $("#consult-boundTel-number").val("");
        $("#consult-phone-number").val("");
        $("#consult-personal-number").val("");
        $("#consult-description").val("");
        $("#consult-customer-last-callDt").html("");
        $("#consult-sms-receiveYn").data("kendoSwitch").value(true);
        $("#consult-happyCall-receiveYn").data("kendoSwitch").value(true);
        $('#consult-customer-class-badge').data("kendoBadge").hide();
        $("#consult-customer-unitedCustCnt").data("kendoBadge").setOptions({
            themeColor: "error",
            text: "0"
        });
        $("#consult-customer-black-registryBtn").hide();
        $("#consult-reservation-tab-cnt").data("kendoBadge").setOptions({text: 0});
        $("#consult-united-grid-popover").unbind("click");
        $("#consult-callback-popover").unbind("click");
        $("#consult-customer-callbackCnt").hide();
        if ($("#consult-customer-info-valid").data("kendoValidator") !== undefined) $("#consult-customer-info-valid").data("kendoValidator").destroy();
    },
    ctiInfoReset: () => {
        $("#callBoundF").clearForm();
        if (softPhoneObject.agentState) {
            $("#cti-phone-number").data("kendoCpTextBox").value("");
        }
    },
    consultCallRegisterReset: () => {
        $("#consult-call-form").clearForm();
        $("#consult-parent-call-form").clearForm();
        $("#consult-call-transfer-form").clearForm();
        !!$("#consult-callClass-value").val() ? $("#consult-callClass").data("kendoDropDownTree").value($("#consult-callClass-value").val()) : $("#consult-callClass").data("kendoDropDownTree").value("");
        $("#consult-callClass").data("kendoDropDownTree").trigger("change");
        let callCatDropTree = $("#consult-callCat").data("kendoDropDownTree");
        let filterInput = callCatDropTree.filterInput;
        filterInput[0].value = "";
        callCatDropTree.search("");
        callCatDropTree.value("");
        callCatDropTree.treeview.collapse(".k-item");
        $("#consult-callType").data("kendoRadioGroup").value("Default");
        if ($("#consult-call-insert-valid").data("kendoValidator") !== undefined) $("#consult-call-insert-valid").data("kendoValidator").destroy();
    },
    reservationGetTime: () => {
        let curTime = new Date();
        let minTime = 10 - (curTime.getMinutes() % 10);
        let reservationTime = curTime.setMinutes(curTime.getMinutes() + minTime);
        return new Date(reservationTime);
    },
    makeCodeDropDownTree: async (dropTree, selector) => {
        dropTree.create();
        let datas = await dropTree.getData();
        let dataSource = new kendo.data.HierarchicalDataSource({data: datas});
        $(selector).data("kendoDropDownTree").setDataSource(dataSource);
        let defaultValue = datas.find((data) => data.codeValue_01);

        if (defaultValue) {
            $("#consult-callClass-value").val(defaultValue.codeKey);
            $(selector).data("kendoDropDownTree").value(defaultValue.codeKey);
            $(selector).data("kendoDropDownTree").trigger("change");
        }
    },
    consultTabSideInit: () => {
        $("#consult-receipt-switch-btn").data('kendoSplitButton').enable(false, "#consult-switch-timeline");
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        $("#consult-receipt-search-date-picker-start").data('kendoDatePicker').value(startDate);
        $("#consult-receipt-search-date-picker-end").data('kendoDatePicker').value(new Date());
        $("#consult-reservationTab-search-rangepicker-start").data('kendoDatePicker').value(startDate);
        $("#consult-reservationTab-search-rangepicker-end").data('kendoDatePicker').value(new Date());
        $("#consult-sms-search-rangepicker-start").data('kendoDatePicker').value(startDate);
        $("#consult-sms-search-rangepicker-end").data('kendoDatePicker').value(new Date());
        $("#consult-reservationTab-search-text").data("kendoTextBox").value("");
        $("#consult-sms-search-text").data("kendoTextBox").value("");
        $("#consult-receipt-grid").data("kendoCpGrid").dataSource.data([]);
        $('#consult-receipt-list').data("kendoListView").dataSource.data([]);
        $("#consult-receipt-timeline").data("kendoTimeline").dataSource.data([]);
        $('#consult-reservation-list').data("kendoListView").dataSource.data([]);
        $('#consult-sms-list').data("kendoListView").dataSource.data([]);
        $("#consult-sms-searched-field").children().first().text("");
        $("#consult-reservationTab-searched-field").children().first().text("");
    },
}

const consultCustomerInfo = {
    init: () => {
        const telNumberFormat = (e) => {
            let value = e.value.replaceAll("-","");
            const maxLength = 11;
            if (value.length > maxLength) {
                value = value.substring(0, maxLength);
            }
            e.sender.element.val(value.formatterHpNo());
            if ($("#consult-customer-info-valid").data("kendoValidator") !== undefined) {
                $("#consult-customer-info-valid").data("kendoValidator").validate();
            }
        };
        $("#consult-customer-name").kendoTextBox({});
        $("#consult-boundTel-number").kendoTextBox({change: telNumberFormat, fillMode: "flat"});
        $("#consult-phone-number").kendoTextBox({change: telNumberFormat});
        $("#consult-personal-number").kendoTextBox({change: telNumberFormat});
        $("#consult-question").kendoTextArea({rows: 10});
        $("#consult-answer").kendoTextArea({rows: 10});
        $("#consult-description").kendoTextArea({rows: 3, maxLength: 5});


        $('#consult-customer-class-badge').kendoBadge().data("kendoBadge").hide();
        $("#consult-customer-unitedCustCnt").kendoBadge({text: 0, themeColor: "error"});
        $("#consult-customer-callbackCnt").kendoBadge({text: "콜백", themeColor: "tertiary"});
        $("#consult-customer-callbackCnt").hide();
        $("#consult-sms-receiveYn").kendoSwitch({checked: true, size: "small"});
        $("#consult-happyCall-receiveYn").kendoSwitch({checked: true, size: "small"});

        $("#consult-customer-search-openBtn").kendoButton({
            click: (e) => {
                let $div = $(`<div id="consult-customer-multi-search-window"></div>`);
                $div.kendoWindow({
                    width: 800,
                    height: 400,
                    position: {
                        top: "25%",
                        left: "22%"
                    },
                    actions: ["Close"],
                    title: "고객조회",
                    visible: false,
                    appendTo: $("#program-250").parent(),
                    modal: true,
                    draggable: false,
                    resizable: false,
                    autoFocus: false,
                    content: {
                        template: kendo.template($("#consult-search-window-template").html())
                    },
                    open: () => {
                        consultCustomerInfo.customerSearchWindowOpen();
                    },
                    close: (e) => {
                        e.sender.destroy();
                    }
                }).data("kendoWindow").refresh().open();
            }
        });

        $("#consult-customer-black-registryBtn").kendoButton({
            click: () => {
                let custId = $("#consult-customer-custId").val();
                if (custId !== "" && custId !== null) {
                    let $div = $(`<div id="consult-black-customer-window"></div>`);
                    $div.kendoWindow({
                        width: 350,
                        height: 340,
                        position: {
                            top: "33%",
                            left: "38%"
                        },
                        actions: ["Close"],
                        title: "유의고객등록",
                        visible: false,
                        appendTo: $("#program-250").parent(),
                        modal: true,
                        draggable: false,
                        resizable: false,
                        autoFocus: false,
                        content: {
                            template: kendo.template($("#consult-black-customer-insert-template").html())
                        },
                        open: () => {
                            consultCustomerInfo.customerBlackWindowOpen();
                        },
                        close: (e) => {
                            e.sender.destroy();
                        }
                    }).data("kendoWindow").refresh().open();
                }
            }
        });
        $("#consult-customer-black-registryBtn").hide();

        $("#consult-customer-saveBtn").kendoButton({
            themeColor: "primary",
            click: () => {
                let custId = $("#consult-customer-custId").val();
                let valid = consultCustomerInfo.customerSaveValid();
                if (valid.validate()) {
                    cpProgress('consult-customer-table');
                    message.callBackConfirm(
                        {
                            msg: '저장하겠습니까?', callback: () => {
                                consultCustomerInfo.customerSave(custId).then(r =>
                                    message.notification({msg: "저장되었습니다.", type: "success"})
                                )
                            }, cancel: () => {
                                cpProgress('consult-customer-table', false);
                            }
                        });
                } else setTimeout(() => {
                    $("#consult-hp-tooltip").trigger("mouseout");
                    valid.reset();
                }, 2000);
            }
        });

        $("#consult-hp-tooltip").kendoPopover({
            showOn: "mouseenter",
            position: "right",
            animation: false,
            height: "auto",
            body: function () {
                return `<span style="color: red;font-size: 10px;">수/발신번호, 휴대폰, 일반전화 중 1개 이상은 필수입니다.</span>`
            }
        });
    },
    customerSearch: () => {
        if (!$("#consult-customer-search-valid").data("kendoValidator").validate()) {
            return;
        }
        cpProgress("consult-customer-multi-search-window");
        let searchType = $("#consult-customer-search-type").val();
        let searchTxt = $("#consult-customer-search-text").val();
        let searchParam = {
            searchType: searchType,
            searchTxt: searchType === "TelNo" ? searchTxt.replaceAll("-", "") : searchTxt,
            unitedId: 0
        }
        let customerSearchData = new cpDataSource(METHOD.GET, "consult/v1/customer/customer-search", searchParam).getDataSource();
        customerSearchData.read().then(() => {
            consultCustomerInfo.customerSearchGridOpen(customerSearchData.data());
            cpProgress("consult-customer-multi-search-window", false);
        });
    },
    customerSearchGridOpen: (data) => {
        data.forEach((e) => {
            if (e.lastCallDt !== null) e.lastCallDt = e.lastCallDt.slice(0, e.lastCallDt.length - 5)
        });
        $("#consult-customer-multi-search-grid").data("kendoCpGrid").setDataSource(data);
    },
    customerDetailSet: (data, window, isCalling = false) => {
        if (window) $("#consult-customer-multi-search-window").data("kendoWindow").refresh().close();
        $("#consult-customer-custId").val(data.custId);
        $("#consult-customer-custUuid").val(data.custUuid);
        $("#consult-customer-custType").val(data.custType);
        $("#consult-customer-name").val(data.custNm);
        if (!isCalling) $("#consult-boundTel-number").val(data.boundTelNo);
        $("#consult-phone-number").val(data.hpNo);
        $("#consult-personal-number").val(data.telNo);
        $("#consult-customer-last-callDt").html(data.lastCallDt ? data.lastCallDt.substring(0, 10) : "");
        $("#consult-customer-unitedCustCnt").data("kendoBadge").setOptions({
            themeColor: "error",
            text: String(data.unitedCustCnt)
        });
        $("#consult-description").data("kendoTextArea").value(data.description);
        let telNo = data.boundTelNo === "" ? data.hpNo === "" ? data.telNo : data.hpNo : data.boundTelNo;
        consultCustomerInfo.callTabCnt(data.custId, telNo);

        let custTypeNm = data.custTypeNm == null ? "일반" : data.custTypeNm;
        let themeColor;
        switch (data.custType) {
            case "Default" :
                themeColor = "info";
                break;
            case "Yellow" :
                themeColor = "success";
                break;
            case "Red" :
                themeColor = "warning";
                break;
            case "Black" :
                themeColor = "error";
                break;
        }
        $('#consult-customer-class-badge').data("kendoBadge").setOptions({
            themeColor: themeColor,
            text: custTypeNm
        });
        $("#consult-sms-receiveYn").data("kendoSwitch").value(data.smsYn == "Y" ? true : false);
        $("#consult-happyCall-receiveYn").data("kendoSwitch").value(data.telYn == "Y" ? true : false);
        $("#consult-reservationTab-search-codeTree").data("kendoDropDownTree").value("NotComplete");

        consultCustomerInfo.customerSearchList(data);
        $("#consult-customer-black-registryBtn").show();
        let valid = $("#consult-customer-info-valid").data("kendoValidator");
        if ($("#consult-customer-info-valid").data("kendoValidator") !== undefined) valid.reset();
        if ($("#consult-united-grid-popover").data('kendoPopover') !== undefined) {
            $("#consult-united-grid-popover").data('kendoPopover').destroy();
        }
        if (data.unitedCustCnt > 0) {
            $("#consult-united-grid-popover").bind("click", () => {
                consultCustomerInfo.makeCustomerUnited();
            })
        } else {
            $("#consult-united-grid-popover").unbind("click");
        }
    },
    makeCustomerUnited: () => {
        let $div = $('<span id = "consult-united-grid-popover-inner"></span>');
        $("#consult-united-grid-popover").append($div);
        $div.kendoPopover({
            showOn: "click",
            position: "right",
            animation: false,
            width: "530px",
            height: "230px",
            body: kendo.template($("#consult-united-grid-template").html()),
            show: () => {
                $("#consult-united-grid").kendoCpGrid({
                    columns: [
                        {field: "custNm", title: "고객명", width: 30, attributes: {style: "text-align:center"}},
                        {field: "boundTelNo", title: "발신전화", width: 55, attributes: {style: "text-align:center"}},
                        {field: "hpNo", title: "휴대폰", width: 55, attributes: {style: "text-align:center"}},
                        {field: "telNo", title: "일반전화", width: 55, attributes: {style: "text-align:center"}},
                    ],
                    width: "500px",
                    height: "200px",
                });
                let searchParam = {
                    unitedId: $("#consult-customer-custId").val()
                }
                let customerSearchData = new cpDataSource(METHOD.GET, "consult/v1/customer/customer-search", searchParam).getDataSource();
                customerSearchData.read().then(() => {
                    $("#consult-united-grid").data("kendoCpGrid").setDataSource(customerSearchData.data());
                });
            },
            hide: (e) => {
                $("#consult-united-grid-inner").remove();
                e.sender.destroy()
            }
        }).data("kendoPopover").show();
    },
    customerBlackInsert: () => {
        new cpDataSource(METHOD.POST, "consult/v1/customer/customer-black-insert", consultCustomerInfo.customerBlackInertParam()).getDataSource()
            .read().then(() => {
            message.notification({msg: "등록 되었습니다.", type: "success"})
            $("#consult-black-customer-window").data("kendoWindow").refresh().close();
        });
    },
    customerBlackInertParam: () => {
        let custType = $("#consult-custType-radio").data("kendoRadioGroup").value();
        let requestReason = $("#consult-black-description").val();
        let custId = $("#consult-customer-custId").val();
        let boundTelNo = $("#consult-boundTel-number").val();
        param = {
            custId: custId,
            boundTelNo: boundTelNo,
            boundId: 0,
            callId: 0,
            custType: custType,
            requestReason: requestReason
        }
        return param;
    },
    customerSearchWindowOpen: () => {
        $("#consult-customer-multi-search-grid").kendoCpGrid({
            columns: [
                {field: "custId", hidden: true},
                {field: "custUuid", hidden: true},
                {field: "custType", hidden: true},
                {field: "custNm", title: "고객명", width: 40, attributes: {style: "text-align:center"}},
                {field: "boundTelNo", title: "발신전화", width: 55, attributes: {style: "text-align:center"}},
                {field: "hpNo", title: "휴대폰", width: 55, attributes: {style: "text-align:center"}},
                {field: "telNo", title: "일반전화", width: 55, attributes: {style: "text-align:center"}},
                {field: "custTypeNm", title: "고객구분", width: 45, attributes: {style: "text-align:center"}},
                {field: "lastCallDt", title: "최근상담일시", width: 60, attributes: {style: "text-align:center"}}
            ],
            change: (e) => {
                let selectedData = $("#consult-customer-multi-search-grid").data("kendoCpGrid");
                consultMain.customerInfoReset();
                consultCustomerInfo.customerDetailSet(selectedData.dataItem(selectedData.select()), true, softPhoneObject.isCalling);
            },
            height: '80%',
            resizable: true,
            selectable: 'single',
        });

        $("#consult-customer-search-type").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            fillMode:"solid",
            dataSource: [
                {text: "전화번호", value: "TelNo"},
                {text: "고객명", value: "CustNm"}
            ],
            change: (e) => {
                $("#consult-customer-search-text").val("");
            }
        });

        $("#consult-customer-search-valid").kendoValidator({
            errorTemplate: "<span style='color:red; margin-left:15px'> 검색어는 필수입니다.</span>",
            rules: {
                custom: (input) => {
                    if ($("#consult-customer-search-type").val() == "TelNo") {
                        if (input.is("[name=consult-customer-search-text]")) {
                            input.val(input.val().formatterHpNo());
                            return input.val() !== "";
                        }
                    }
                    return true;
                }
            }
        }).data("kendoValidator");

        $("#consult-customer-search-text").kendoTextBox({}).on("keydown", (event) => {
            if (event.which == 13) consultCustomerInfo.customerSearch();
        });
        $("#consult-customer-searchBtn").kendoButton({
            size:"small",
            themeColor:"secondary",
            icon: "search",
            click: (e) => {
                consultCustomerInfo.customerSearch();
            }
        });
    },
    customerBlackWindowOpen: () => {
        let errorTemplate = '<div class="k-widget k-tooltip k-tooltip-error" style="margin:2% 2% 2% 15%;">' +
            '#=message#<div class="k-callout c-k-callout-n"></div></div>';
        let valid = $("#consult-black-customer-insert-valid").kendoValidator({
            errorTemplate: errorTemplate,
            rules: {
                rule: (input) => {
                    if (input.is("[name=consult-custType-radio]")) {
                        return $("#consult-black-customer-insert-valid").find("[name= consult-custType-radio]").is(":checked");
                    }
                    return true;
                }
            },
            messages: {
                rule: "고객구분은 필수입니다."
            }
        }).data("kendoValidator");
        $("#consult-black-customer-insertBtn").kendoButton({
            themeColor: "primary",
            click: (e) => {
                if (valid.validate()) consultCustomerInfo.customerBlackInsert();
            }
        });

        let custTypeDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/CustType", {}).getDataSource();
        custTypeDataSource.read().then(() => {
            let data = custTypeDataSource.data().filter(e => e.codeKey !== "Default");
            $("#consult-custType-radio").kendoRadioGroup({
                items: consultMain.radioGroupMakeItems(data),
                layout: "horizontal",
                value: "Default",
                change: () => {
                    valid.reset()
                }
            });
        });

        $("#consult-black-description").kendoTextArea({
            rows: 5, change: () => {
                valid.reset()
            }
        });
    },
    customerSave: async (id) => {
        let param;
        let method;
        if (id == "") {
            param = consultCustomerInfo.customerParam();
            method = "POST";
        } else {
            param = consultCustomerInfo.customerParam(id);
            method = "PUT";
        }
        await $.ajax({
            url: "consult/v1/customer",
            type: method,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(param),
            success: (res) => {
                if (method == "POST") {
                    $("#consult-customer-custId").val(res.data);
                    $("#consult-customer-name").val(param.custNm);
                    $("#consult-customer-black-registryBtn").show();
                }
                cpProgress('consult-customer-table', false);
            }
        });
    },
    customerParam: (id) => {
        let custNm = $("#consult-customer-name").val();
        let boundTelNo = $("#consult-boundTel-number").val();
        let hpNo = $("#consult-phone-number").val();
        let telNo = $("#consult-personal-number").val();
        let smsYn = $("#consult-sms-receiveYn").data("kendoSwitch").value();
        let telYn = $("#consult-happyCall-receiveYn").data("kendoSwitch").value();
        let descript = $("#consult-description").val();
        let param = {
            custNm: custNm == "" ? "미등록" : custNm,
            telNo: telNo,
            hpNo: hpNo,
            boundTelNo: boundTelNo,
            smsYn: smsYn ? "Y" : "N",
            telYn: telYn ? "Y" : "N",
            description: descript
        };
        if (id !== "") $.extend(param, {custId: id});
        return param;
    },
    customerSaveValid: () => {
        let valid = $("#consult-customer-info-valid").kendoValidator({
            errorTemplate: (e) => {
                if (e.field == "telNo" || e.field == "hpNo") {
                    if (e.message !== "") {
                        let message = '<div class="k-widget k-tooltip k-tooltip-error" style="margin:1% 2% 2% 10%;">' +
                            e.message + '<div class="k-callout c-k-callout-n"></div></div>';
                        return message;
                    }
                }
            },
            rules: {
                required: (input) => {
                    let boundTelNo = $("#consult-boundTel-number").val();
                    let hpNo = $("#consult-phone-number").val();
                    let telNo = $("#consult-personal-number").val();
                    if (input.is("[name=hpNo]")||input.is("[name=telNo]")||input.is("[name=boundTelNo]")) {
                        if (boundTelNo == "" && telNo == "" && hpNo == "") {
                            $("#consult-hp-tooltip").trigger("mouseenter");
                            return false;
                        } else return true;
                    } else return true;
                },
                phoneNumber: (input) => {
                    let boundTelNo = $("#consult-boundTel-number").val();
                    let hpNo = $("#consult-phone-number").val();
                    let telNo = $("#consult-personal-number").val();
                    if (input.is("[name=hpNo]")) {
                        if (boundTelNo == "" && telNo == "") {
                            let text = input.val();
                            let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
                            return regPhone.test(text)
                        } else return true;
                    } else if (input.is("[name=telNo]")) {
                        if (boundTelNo == "" && hpNo == "") {
                            let text = input.val().replaceAll("-", "");
                            return 2 < text.length
                        } else return true;
                    }
                }
            },
            messages: {
                required: (input) => {
                    return "";
                },
                phoneNumber: (input) => {
                    if (input.is("[name=telNo]")) {
                        return "일반전화 번호 확인이 필요합니다."
                    } else if (input.is("[name=hpNo]")) {
                        return "휴대폰 번호 확인이 필요합니다."
                    }
                }
            }
        }).data("kendoValidator");
        return valid;
    },
    customerSearchList: (data) => {
        consultMain.consultTabSideInit();
        $("#consult-receipt-search-date-picker-start").data('kendoDatePicker').value("");
        $("#consult-receipt-search-date-picker-end").data('kendoDatePicker').value(new Date());
        $("#consult-reservationTab-search-rangepicker-start").data('kendoDatePicker').value("");
        $("#consult-reservationTab-search-rangepicker-end").data('kendoDatePicker').value(new Date());
        $("#consult-sms-search-rangepicker-start").data('kendoDatePicker').value("");
        $("#consult-sms-search-rangepicker-end").data('kendoDatePicker').value(new Date());
        $("#consult-receipt-search-text").data("kendoTextBox").value("");
        consultTabSide.receiptListSelect(data.custId);
        $('#consult-reservation-list').data("kendoListView").dataSource.page(1);
        $('#consult-sms-list').data("kendoListView").dataSource.page(1);
        $("#consult-receipt-switch-btn").data('kendoSplitButton').enable(true, "#consult-switch-timeline");
    },

    customerFindTelNo: async (value) => {
        let searchParam = {
            searchType: "TelNo",
            searchTxt: value.replaceAll("-", ""),
            unitedId: 0
        }
        consultMain.callTypeObjectReset();
        consultMain.consultCallRegisterReset();
        consultMain.consultTabSideInit();
        consultMain.customerInfoReset();
        let customerSearchData = new cpDataSource(METHOD.GET, "consult/v1/customer/customer-search", searchParam).getDataSource();
        await customerSearchData.read().then(() => {
            let data = customerSearchData.data();
            if (data.length > 1) {
                let $div = $(`<div id="consult-customer-multi-search-window"></div>`);
                $div.kendoWindow({
                    width: 800,
                    height: 400,
                    position: {
                        top: "25%",
                        left: "22%"
                    },
                    actions: ["Close"],
                    title: "고객조회",
                    visible: false,
                    appendTo: $("#program-250").parent(),
                    modal: true,
                    draggable: false,
                    resizable: false,
                    autoFocus: false,
                    content: {
                        template: kendo.template($("#consult-search-window-template").html())
                    },
                    open: () => {
                        consultCustomerInfo.customerSearchWindowOpen();
                    },
                    close: (e) => {
                        e.sender.destroy();
                    }
                }).data("kendoWindow").refresh().open();
                consultCustomerInfo.customerSearchGridOpen(data);
            } else if (data.length == 1) {
                consultCustomerInfo.customerDetailSet(data[0], false, softPhoneObject.isCalling);
            } else {
                let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
                if (regPhone.test(value)) {
                    $("#consult-phone-number").data("kendoTextBox").value(value.formatterHpNo());
                } else {
                    $("#consult-personal-number").data("kendoTextBox").value(value.formatterHpNo());
                }
            }
        });
    },
    customerFindCustId: (value) => {
        let searchParam = {
            searchType: "custId",
            searchTxt: value,
            unitedId: 0
        }
        consultMain.callTypeObjectReset();
        consultMain.consultCallRegisterReset();
        consultMain.consultTabSideInit();
        consultMain.customerInfoReset();
        let customerSearchData = new cpDataSource(METHOD.GET, "consult/v1/customer/customer-search", searchParam).getDataSource();
        customerSearchData.read().then(() => {
            let data = customerSearchData.data();
            if (data.length == 1) {
                consultCustomerInfo.customerDetailSet(data[0], false, softPhoneObject.isCalling);
            }
        });
    },
    callTabCnt: (custId, telNo) => {
        let param = {custId: custId, telNo: telNo.replaceAll('-', '')};
        let calltabDs = new cpDataSource(METHOD.GET, "consult/v1/customer/call-tab-cnt", param).getDataSource();
        calltabDs.read().then(() => {
            let data = calltabDs.data()[0];

            $("#consult-reservation-tab-cnt").data("kendoBadge").setOptions({
                themeColor: "warning",
                text: String(data.reservationCnt)
            });

            if ($("#consult-callback-popover").data('kendoPopover') !== undefined) {
                $("#consult-callback-popover").data('kendoPopover').destroy();
            }
            if (data.callbackCnt > 0) {
                $("#consult-customer-callbackCnt").show();
                $("#consult-callback-popover").bind("click", (e) => {
                    consultCustomerInfo.makeCallbackPopover(data);
                });
            } else {
                $("#consult-customer-callbackCnt").hide();
                $("#consult-callback-popover").unbind("click");
            }
        });
    },
    makeCallbackPopover: (data) => {
        let $div = $('<span id = "consult-callback-popover-inner"></span>');
        $("#consult-callback-popover").append($div);
        $div.kendoPopover({
            showOn: "click",
            position: "right",
            animation: false,
            width: "300px",
            height: "400px",
            body: kendo.template($("#consult-callback-template").html()),
            show: (e) => {
                $("#consult-callback-detail-boundTelNo").kendoTextBox({fillMode: "flat", readonly: true});
                $("#consult-callback-detail-callbackTelNo").kendoTextBox({fillMode: "flat", readonly: true});
                $("#consult-callback-detail-overlap-cnt").kendoTextBox({fillMode: "flat", readonly: true});
                $("#consult-callback-detail-description").kendoTextArea({rows: 3});
                let callbackStatus = new cpDataSource(METHOD.GET, '/common/v1/code/CallbackStatus').getDataSource();
                callbackStatus.read().then(() => {
                    callbackStatus.data().forEach(e => e.items);
                    let detailCallbackStatus = [...callbackStatus.data()[0].items, ...callbackStatus.data()[1].items];
                    detailCallbackStatus = detailCallbackStatus.filter(e => e.codeValue_05 == "02");

                    $('#consult-callback-detail-status').kendoDropDownList({
                        fillMode: 'flat',
                        clearButton: false,
                        dataSource: detailCallbackStatus,
                        dataTextField: 'codeNm',
                        value: "Processing",
                        dataValueField: 'codeKey',
                        change: (e) => {
                            if (e.sender.value() == "Distribution") {
                                $("#consult-callback-detail-update").hide();
                            } else {
                                $("#consult-callback-detail-update").show();
                            }
                        }
                    });
                });
                let getCallbackItem = new cpDataSource(METHOD.GET, `/consult/v1/call-tab/callback/${data.callbackUuid}`).getDataSource();
                getCallbackItem.read().then(() => {
                    let data = getCallbackItem.data();
                    let item = data[0];
                    $("#consult-callback-detail-boundTelNo").data("kendoTextBox").value(item.inboundTelNo);
                    $("#consult-callback-detail-callbackTelNo").data("kendoTextBox").value(item.callbackTelNo);
                    $("#consult-callback-detail-description").data("kendoTextArea").value(item.description);
                    $("#consult-callback-detail-callbackId").val(item.callbackId);
                    $("#consult-callback-detail-custId").val(item.custId);
                    let boundHistoryData = new cpDataSource(METHOD.GET, `/consult/v1/call-tab/overlap-select/${item.callbackId}`).getDataSource();
                    boundHistoryData.read().then(() => {
                        let boundItem = boundHistoryData.data();
                        $("#consult-callback-detail-overlap-cnt").data("kendoTextBox").value(String(boundItem.length));
                    });
                });

                $("#consult-callback-detail-update").kendoButton({
                    themeColor: 'primary',
                    click: () => {
                        let valid = $("#consult-callback-detail-form").kendoValidator({
                            errorTemplate: "",
                            rule: (input) => {
                                if (input.is("[name=status]")) {
                                    return input.data("kendoDropDownList").value() !== "";
                                } else if (input.is("[name=description]")) return input.val() !== "";
                                return true;
                            },
                        }).data("kendoValidator");
                        if (valid.validate()) {
                            consultCustomerInfo.callbackListDetailUpdate();
                        }
                    }
                });
            },
            hide: (e) => {
                $("#consult-callback-popover-inner").remove();
                e.sender.destroy();
            }
        }).data("kendoPopover").show();
    },
    callbackListDetailUpdate: () => {
        let param = $("#consult-callback-detail-form").serializeJSON();
        let callUpdate = new cpDataSource(METHOD.PUT, "/consult/v1/call-tab/callback", param).getDataSource();
        callUpdate.read().then(() => {
            message.notification({msg: "저장되었습니다.", type: "success"});
        });
    },
}

const consultCallRegister = {
    init: () => {
        // new cpCodeDropDownTree('#consult-callClass','CallClass',{ clearButton: true,}).init();
        const callClass = new cpCodeDropDownTree('#consult-callClass', 'CallClass', {clearButton: true});
        consultMain.makeCodeDropDownTree(callClass, '#consult-callClass');
        const catSelect = (e) => {
            if (e.sender.dataItem(e.node).hasChildren) {
                if (e.sender.dataItem(e.node).expanded) {
                    e.preventDefault();
                    e.sender.treeview.collapse(e.node);
                } else {
                    e.preventDefault();
                    e.sender.treeview.expand(e.node);
                }
            }
        };
        new cpCatDropDownTree('#consult-callCat', {clearButton: true, select: catSelect}).init();
        $("#consult-callCat").data("kendoDropDownTree").value("");
        $("#consult-reservation-call-window").kendoWindow({
            width: 400,
            height: 430,
            position: {
                top: "30%",
                left: "40%"
            },
            actions: ["Close"],
            title: "예약상담 등록",
            visible: false,
            modal: true,
            appendTo: $(".k-widget.k-window.k-display-inline-flex"),
            draggable: false,
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-reservation-call-window-template").html())
            },
            open: () => {
                consultCallRegister.reservationWindowOpen();
            },
            close: () => {
                if ($("#cunsult-reservation-tel-no").val() === '') $("#consult-callType").data("kendoRadioGroup").value("Default");
            }
        });

        $("#consult-transfer-call-window").kendoWindow({
            width: 400,
            height: 380,
            position: {
                top: "30%",
                left: "40%"
            },
            actions: ["Close"],
            title: "상담이관 등록",
            visible: false,
            modal: true,
            draggable: false,
            appendTo: $(".k-widget.k-window.k-display-inline-flex"),
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-transfer-call-window-template").html())
            },
            open: () => {
                consultCallRegister.transferWindowOpen();
            },
            close: () => {
                if ($("#cunsult-transfer-user-id").val() === '') $("#consult-callType").data("kendoRadioGroup").value("Default");
            }
        });

        $("#consult-sms-send-window").kendoWindow({
            width: 750,
            height: 450,
            position: {
                top: "26%",
                left: "30%"
            },
            actions: ["Close"],
            title: "문자발송",
            visible: false,
            modal: true,
            appendTo: $(".k-widget.k-window.k-display-inline-flex"),
            draggable: false,
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-sms-send-window-template").html())
            },
            open: () => {
                consultCallRegister.smsSendWindowOpen();
            }
        });

        $("#consult-manual-request-window").kendoWindow({
            width: 400,
            height: 380,
            position: {
                top: "33%",
                left: "42%"
            },
            actions: ["Close"],
            title: "매뉴얼요청",
            visible: false,
            modal: true,
            appendTo: $(".k-widget.k-window.k-display-inline-flex"),
            draggable: false,
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-manual-request-window-template").html())
            },
            open: () => {
                consultCallRegister.manualRequestWindowOpen();
            }
        });

        let callTypeDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/CallType", {}).getDataSource();
        callTypeDataSource.read().then(() => {
            $("#consult-callType").kendoRadioGroup({
                items: consultMain.radioGroupMakeItems(callTypeDataSource.data()),
                layout: "horizontal",
                value: "Default",
                change: (e) => {
                    if (e.newValue == "Reservation") consultCallRegister.reservationWindowInitOpen();
                    else if (e.newValue == "EmpTransfer") consultCallRegister.transferWindowInitOpen();
                    else if (e.newValue == "CallTransfer") {
                        let opt = {
                            height: 600,
                            width: 1240,
                            top: 200,
                            left: 200,
                        };
                        new popupWindow('/transferList?consult=Y', "transfer", opt).open()
                    }
                    consultMain.callTypeObjectReset();
                }
            });
        });

        $("#consult-send-smsBtn").kendoButton({
            click: () => {
                consultCallRegister.smsSendWindowInitOpen();
            }
        });
        $("#consult-manual-requestBtn").kendoButton({
            click: () => {
                consultCallRegister.manualRequestWindoInitOpen();
            }
        });
        $("#consult-call-saveBtn").kendoButton({
            themeColor: "primary",
            click: async () => {
                let custInsertValid = consultCustomerInfo.customerSaveValid();
                let callInsertValid = consultCallRegister.consultCallInsertValid();
                let custchk = custInsertValid.validate();
                let callchk = callInsertValid.validate();
                let custId = $("#consult-customer-custId").val();
                if (custchk && callchk) {
                    cpProgress('consult-call-insert-valid');
                    cpProgress('consult-customer-table');
                    message.callBackConfirm(
                        {
                            title: document.title, msg: '저장하겠습니까?', callback: () => {
                                consultCallRegister.consultCallInsert();
                            }, cancel: () => {
                                cpProgress('consult-call-insert-valid', false);
                                cpProgress('consult-customer-table', false);
                            }
                        })
                } else {
                    setTimeout(() => {
                        custInsertValid.reset();
                        $("#consult-hp-tooltip").trigger("mouseout");
                        callInsertValid.reset();
                    }, 2000)
                }
            }
        });
        $("#consult-resetBtn").kendoButton({
            click: () => {
                consultMain.consultCallRegisterReset();
                consultMain.callTypeObjectReset();
            }
        });
        let memoBtn = $("#consult-memo-btn");
        memoBtn.kendoButton({
            icon:"c-journal-text",
            click : ()=>{
                if(memoBtn.data("kendoPopover") === undefined) {
                    memoBtn.kendoPopover({
                        showOn: 'click',
                        body: `<div style="width: 100%;height: 100%">
                               <textarea id="consult-memo-text" name="memo" class="consult-customer-textarea"></textarea>
                               <button id="consult-memo-insert-btn" style="float: right;margin-top: 5px;">메모등록</button>
                           </div>`,
                        height: 180,
                        width: 300,
                        position: POSITION.TOP,
                        show: (e) => {
                            let hideMemo = $("#consult-memo");
                            $("#consult-memo-text").kendoTextArea({rows: 6});
                            let memoContents = $("#consult-memo-text").data("kendoTextArea")
                            if (hideMemo.val() !== "")
                                memoContents.value(hideMemo.val());

                            $("#consult-memo-insert-btn").kendoButton({
                                click: () => {
                                    if (memoContents.value() !== "") {
                                        $("#consult-memo").val(memoContents.value());
                                    }
                                    e.sender.hide();
                                }
                            });
                        },
                        hide: (e) => {
                            e.sender.destroy();
                        }
                    }).data("kendoPopover").show();
                }
            }
        });
    },
    reservationWindowInitOpen: () => {
        let $div = $(`<div id="consult-reservation-call-window"></div>`);
        $div.kendoWindow({
            width: 400,
            height: 430,
            position: {
                top: "30%",
                left: "40%"
            },
            actions: ["Close"],
            title: "예약상담 등록",
            visible: false,
            modal: true,
            appendTo: $("#program-250").parent(),
            draggable: false,
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-reservation-call-window-template").html())
            },
            open: () => {
                consultCallRegister.reservationWindowOpen();
            },
            close: (e) => {
                if ($("#cunsult-reservation-tel-no").val() === '') $("#consult-callType").data("kendoRadioGroup").value("Default");
                e.sender.destroy();
            }
        }).data("kendoWindow").refresh().open();
    },
    reservationWindowOpen: () => {
        $("#consult-reservation-call-number").kendoTextBox({
            change: (e) => {
                let value = e.value.replaceAll("-","");
                const maxLength = 11;
                if (value.length > maxLength) {
                    value = value.substring(0, maxLength);
                }
                e.sender.element.val(value.formatterHpNo());
            }
        });
        let boundTelNo = $("#consult-boundTel-number").val();
        let phoneNo = $("#consult-phone-number").val();
        let hpNo = $("#consult-personal-number").val();
        let telNo = $("#consult-reservation-call-number").data("kendoTextBox");
        let valid = $("#consult-reservation-call-valid").kendoValidator({
            errorTemplate: (e) => {
                let template = "";
                if (e.message !== "") {
                    template = '<div class="k-widget k-tooltip k-tooltip-error" style="margin:1% 2% 2% 22%;">' +
                        e.message + '<div class="k-callout c-k-callout-n"></div></div>';
                    return template
                } else {
                    template;
                }
            },
            rules: {
                required: (input) => {
                    if (input.is("[name = consult-reservation-call-user]")) {
                        if (input.data("kendoDropDownList").value() === "0") return false;
                    } else if (input.is("[name = consult-reservation-call-number]")) {
                        if (input.val() === "") return false;
                    } else if (input.is("[name = consult-reservation-number-select]")) {
                        if (input.val() !== "inputNo" && telNo.value() === "") return false;
                    } else if (input.is("[name = consult-reservation-call-date]")) {
                        if (new Date(input.val()) < new Date()) return false;
                    }
                    return true;
                }
            },
            messages: {
                required: (input) => {
                    if (input.is("[name = consult-reservation-call-date]")) {
                        if (new Date(input.val()) < new Date()) return "예약시간을 확인해 주세요.";
                    } else return "";
                }
            }

        }).data("kendoValidator");

        $("#consult-reservation-number-select").kendoDropDownList({
            fillMode: "flat",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                {text: "직접입력", value: "inputNo"},
                {text: "발신번호", value: "telNo"},
                {text: "휴대폰번호", value: "phoneNo"},
                {text: "일반전화", value: "hpNo"}
            ],
            change: (e) => {
                valid.reset();
                if (e.sender.value() === "telNo") {
                    telNo.value(boundTelNo);
                    telNo.readonly(true);
                } else if (e.sender.value() === "phoneNo") {
                    telNo.value(phoneNo);
                    telNo.readonly(true);
                } else if (e.sender.value() === "hpNo") {
                    telNo.value(hpNo);
                    telNo.readonly(true);
                } else {
                    telNo.value("");
                    telNo.readonly(false);
                }
            },
            dataBound: (e) => {
                if (boundTelNo !== "") {
                    e.sender.value("telNo");
                    e.sender.trigger("change");
                } else if (phoneNo !== "") {
                    e.sender.value("phoneNo");
                    e.sender.trigger("change");
                } else if (hpNo !== "") {
                    e.sender.value("hpNo");
                    e.sender.trigger("change");
                } else {
                    e.sender.value("inputNo");
                    e.sender.trigger("change");
                }
            }
        }).data("kendoDropDownList");

        $("#consult-reservation-call-item-save").kendoButton({
            themeColor: "primary",
            click: () => {
                if (valid.validate()) consultCallRegister.reservationSave();
            }
        });

        $("#consult-reservation-call-date").kendoDateTimePicker({
            value: consultMain.reservationGetTime(),
            format: "yyyy-MM-dd HH:mm",
            dateInput: false,
            interval: 10,
        });

        $("#consult-reservation-call-memo").kendoTextArea({rows: 2});
        let defaultUserParam = {
            deptId: 0,
            parentId: 0,
            ctiYn: "Y",
            useYn: "Y",
            sortType: ""
        };
        let datasource = new cpDataSource(METHOD.GET, "consult/v1/consult/reservation-user-select", defaultUserParam).getDataSource();
        datasource.read().then(() => {
            let data = datasource.data()
            $("#consult-reservation-call-user").kendoDropDownList({
                dataSource: data,
                fillMode: "flat",
                filter: "contains",
                messages: {
                    noData: "검색된 내용이 없습니다."
                },
                dataTextField: "userNm",
                dataValueField: "userId",
                value: USER_INFO.userId,
                optionLabel: {userNm: '선택', userId: 0},
                height: 250,
                change: () => {
                    valid.reset();
                }
            });
            let reservationObj = $("#consult-reservation-form").serializeJSON();
            if (reservationObj.reservationUserId !== "") {
                $("#consult-reservation-call-user").data("kendoDropDownList").value(reservationObj.reservationUserId);
                $("#consult-reservation-call-number").data("kendoTextBox").value(reservationObj.reservationTelNo);
                $("#consult-reservation-call-date").data("kendoDateTimePicker").value(new Date(reservationObj.reservationDt));
                $("#consult-reservation-call-memo").data("kendoTextArea").value(reservationObj.reservationMemo)
            }
        });
    },
    reservationSave: () => {
        $("#cunsult-reservation-user-id").val($("#consult-reservation-call-user").data("kendoDropDownList").value());
        $("#cunsult-reservation-tel-no").val($("#consult-reservation-call-number").val());
        $("#cunsult-reservation-dt").val(kendo.toString($("#consult-reservation-call-date").data("kendoDateTimePicker").value(), "yyyy-MM-dd HH:mm"));
        $("#cunsult-reservation-memo").val($("#consult-reservation-call-memo").val());
        consultCallRegister.setCallTypeToolTip("reservation", $("#consult-reservation-call-user").data("kendoDropDownList").text(), "", "", $("#consult-reservation-call-memo").val());
        $("#consult-reservation-call-window").data("kendoWindow").refresh().close();
    },

    transferWindowInitOpen: () => {
        let $div = $(`<div id="consult-transfer-call-window"></div>`);
        $div.kendoWindow({
            width: 400,
            height: 380,
            position: {
                top: "30%",
                left: "40%"
            },
            actions: ["Close"],
            title: "상담이관 등록",
            visible: false,
            modal: true,
            draggable: false,
            appendTo: $("#program-250").parent(),
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-transfer-call-window-template").html())
            },
            open: () => {
                consultCallRegister.transferWindowOpen();
            },
            close: (e) => {
                if ($("#cunsult-transfer-user-id").val() === '') $("#consult-callType").data("kendoRadioGroup").value("Default");
                e.sender.destroy();
            }
        }).data("kendoWindow").refresh().open();
    },
    transferWindowOpen: () => {
        let valid = $("#consult-transfer-call-valid").kendoValidator({
            errorTemplate: "",
            rules: {
                rule: (input) => {
                    if (input.is("[name = consult-transfer-call-user]")) {
                        return $("#consult-transfer-call-user").data("kendoDropDownList").value() !== '0';
                    } else return true;
                }
            }
        }).data("kendoValidator");
        let transferObj = $("#consult-transfer-form").serializeJSON();
        let deptId = USER_INFO.deptId;
        if (transferObj.transferDeptId !== "") deptId = transferObj.transferDeptId;
        let userParam = {
            deptId: deptId,
            parentId: 0,
            ctiYn: "",
            useYn: "Y",
            sortType: ""
        };
        let defaultUserList = new cpDataSource(METHOD.GET, "consult/v1/consult/reservation-user-select", userParam).getDataSource();
        defaultUserList.read().then(() => {
            let data = defaultUserList.data().filter(d=>d.userId !== USER_INFO.userId);
            $("#consult-transfer-call-user").kendoDropDownList({
                dataSource: data,
                fillMode: "flat",
                filter: "contains",
                messages: {
                    noData: "검색된 내용이 없습니다."
                },
                dataTextField: "userNm",
                dataValueField: "userId",
                optionLabel: {userNm: '선택', userId: 0},
                height: 250,
                change: () => {
                    valid.reset();
                }
            });
            if (transferObj.transferChargeId !== "") {
                $("#consult-transfer-call-user").data("kendoDropDownList").value(transferObj.transferChargeId);
                $("#consult-transfer-call-memo").data("kendoTextArea").value(transferObj.transferMemo);
            }
        });
        const deptAutoCompleteEvent = (e) => {
            let row = dropTreeRow(e);
            userParam.deptId = row.deptId
            let datasource = new cpDataSource(METHOD.GET, "consult/v1/consult/reservation-user-select", userParam).getDataSource();
            datasource.read().then(() => {
                let data = datasource.data();
                $("#consult-transfer-call-user").data("kendoDropDownList").setDataSource(data.filter(d=>d.userId !== USER_INFO.userId));

            });
        }

        new cpDeptDropDownTree('#consult-transfer-call-dept', {change: deptAutoCompleteEvent}, 'CONSULT_MAIN', deptId, IS.FALSE, IS.FALSE).init();

        $("#consult-transfer-call-memo").kendoTextArea({rows: 3});
        $("#consult-transfer-call-item-save").kendoButton({
            themeColor: "primary",
            click: () => {
                if (valid.validate()) consultCallRegister.transferSave();
            }
        });

    },
    transferSave: () => {
        $("#cunsult-transfer-dept-id").val($("#consult-transfer-call-dept").data("kendoDropDownTree").value());
        $("#cunsult-transfer-user-id").val($("#consult-transfer-call-user").data("kendoDropDownList").value());
        $("#cunsult-transfer-memo").val($("#consult-transfer-call-memo").val());
        let userText = $("#consult-transfer-call-user").data("kendoDropDownList").text();
        let deptText = $("#consult-transfer-call-dept").data("kendoDropDownTree").text();
        consultCallRegister.setCallTypeToolTip("transfer", userText, deptText, "", $("#consult-transfer-call-memo").val());
        $("#consult-transfer-call-window").data("kendoWindow").refresh().close();
    },

    setCallTypeToolTip: (type, userName, deptText, telNo, memo) => {
        let toolTipText;
        let openType;
        let answerText;
        if (type === "reservation") {
            let reservationObj = $("#consult-reservation-form").serializeJSON();
            toolTipText = `<span class='k-icon k-i-clock'></span> [${reservationObj.reservationDt}, 상담사 : ${userName}]  `;
            memo = reservationObj.reservationMemo;
            answerText = `«⏰[${reservationObj.reservationDt}] ${userName}님에게 예약상담 등록»`;
            openType = () => {
                consultCallRegister.reservationWindowInitOpen();
                $("#consult-call-type-tooltip").unbind("click")
            }
        } else if (type === "transfer") {
            toolTipText = `<span class='k-icon k-i-paste'></span> [${deptText}>${userName}]`
            answerText = `«📋[${deptText}] ${userName}님에게 상담이관 등록»`;
            openType = () => {
                consultCallRegister.transferWindowInitOpen();
                $("#consult-call-type-tooltip").unbind("click")
            }
        } else if (type === "callTransfer") {
            toolTipText = `<i class="bi bi-telephone"></i> [${deptText}>${userName} ${telNo == null ? "" : ", " + telNo}]`
            answerText = `«📞[${deptText}] ${userName}님에게 호전환 등록»`;
            openType = () => {
                let opt = {
                    height: 600,
                    width: 1240,
                    top: 200,
                    left: 200,
                };
                new popupWindow('/transferList?consult=Y', "transfer", opt).open();
                $("#consult-call-type-tooltip").unbind("click");
            };
            memo = $("#consult-memo").val();
        }
        consultCallRegister.setCallRegText(answerText, memo,type);
        $("#consult-call-type-tooltip").html(toolTipText);
        $("#consult-call-type-tooltip").bind("click", (e) => {
            openType();
        });
    },
    setCallRegText(answerText, memo,type) {
        let container = $("#consult-answer");
        let answerValue =container.val();
        let startIndex = answerValue.indexOf("«");
        let endIndex = answerValue.lastIndexOf("»") + 2;
        let reText;
        if(type !== "callTransfer") {
            if (startIndex !== -1) {
                answerValue = answerValue.replace(answerValue.slice(startIndex, endIndex), "");
            }
            reText = answerText + "\n" + answerValue;
        }else{
            if(!$("#consult-call-type-tooltip").children().hasClass("bi bi-telephone")) {
                consultCallRegister.resetCallRegText();
                answerValue = container.val();
                startIndex = answerValue.indexOf("«");
                endIndex = answerValue.lastIndexOf("»") + 2;
            }
            if(startIndex !== -1) {
                let transferText = answerValue.slice(0, endIndex);
                let inputText = answerValue.slice(endIndex);
                reText = transferText + answerText + "\n"+ inputText;
            }else{
                reText = answerText + "\n" + answerValue;
            }
        }
        container.val(reText);
        $("#consult-memo").val(memo);
    },
    resetCallRegText() {
        let container = $("#consult-answer");
        let answerValue = container.val();
        let startIndex =answerValue.indexOf("«");
        let endIndex = answerValue.lastIndexOf("»") + 2;
        if (startIndex !== -1) {
            answerValue = answerValue.replace(answerValue.slice(startIndex, endIndex), "");
        }
        container.val(answerValue);
    },
    smsSendWindowInitOpen: () => {
        let $div = $(`<div id="consult-sms-send-window"></div>`);
        $div.kendoWindow({
            width: 750,
            height: 450,
            position: {
                top: "26%",
                left: "30%"
            },
            actions: ["Close"],
            title: "문자발송",
            visible: false,
            modal: true,
            appendTo: $("#program-250").parent(),
            draggable: false,
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-sms-send-window-template").html())
            },
            open: () => {
                consultCallRegister.smsSendWindowOpen();
            },
            close: (e) => {
                e.sender.destroy();
            }
        }).data("kendoWindow").refresh().open();
    },
    smsSendWindowOpen: () => {
        $("#consult-sms-receiver-number").kendoTextBox({
            change: (e) => {
                let value = e.value.replaceAll("-","");
                const maxLength = 11;
                if (value.length > maxLength) {
                    value = value.substring(0, maxLength);
                }
                e.sender.element.val(value.formatterHpNo());
            }
        });
        $('#consult-sms-template-list-view').kendoListView({
            autoBind: true,
            height: 150,
            layout: "flex",
            flex: {
                direction: "column",
            },
            scrollable: true,
            selectable: "single",
            template: kendo.template("<div>#:smsTemplateNm#</div>"),
            change: () => {
                $("#consult-sms-send-valid").data("kendoValidator").reset();
                let listView = $('#consult-sms-template-list-view').data("kendoListView");
                let selected = listView.dataItem(listView.select());
                $("#consult-sms-send-content").val(selected.smsTemplateContents);
                consultCallRegister.calcContentByteLength();
            }
        });
        let call = new cpDataSource(METHOD.GET, "common/v1/config/CompanySmsTelNo").getDataSource();
        call.read().then(function () {
            let data = call.data();
            $("#consult-sms-sender-number").kendoTextBox({value: data[0].configValue});
        });

        let boundTelNo = $("#consult-boundTel-number").val();
        let phoneNo = $("#consult-phone-number").val();
        let hpNo = $("#consult-personal-number").val();
        let telNo = $("#consult-sms-receiver-number").data("kendoTextBox");
        $("#consult-sms-receiver-select").kendoDropDownList({
            dataTextField: "text",
            dataValueField: "value",
            autoWidth: false,
            fillMode: "flat",
            dataSource: [
                {text: "직접입력  ", value: "inputNo"},
                {text: "발신번호  ", value: "telNo"},
                {text: "휴대폰번호", value: "phoneNo"},
                {text: "일반전화  ", value: "hpNo"}
            ],
            change: (e) => {
                if (e.sender.value() === "telNo") {
                    telNo.value(boundTelNo);
                    telNo.readonly(true);
                } else if (e.sender.value() === "phoneNo") {
                    telNo.value(phoneNo);
                    telNo.readonly(true);
                } else if (e.sender.value() === "hpNo") {
                    telNo.value(hpNo);
                    telNo.readonly(true);
                } else {
                    telNo.value("");
                    telNo.readonly(false);
                }
            },
            dataBound: (e) => {
                if (boundTelNo !== "") {
                    e.sender.value("telNo");
                    e.sender.trigger("change");
                } else if (phoneNo !== "") {
                    e.sender.value("phoneNo");
                    e.sender.trigger("change");
                } else if (hpNo !== "") {
                    e.sender.value("hpNo");
                    e.sender.trigger("change");
                } else {
                    e.sender.value("inputNo");
                    e.sender.trigger("change");
                }
            }
        }).data("kendoDropDownList");

        let treeSelParam = {
            catGroupCd: "CatSmsTemplate",
            parentId: 0,
            useYn: "Y",
            delYn: "N",
            outputYn: "Y",
            sortType: "CAT_IDX ASC"
        }
        let catDropDownData = new cpDataSource(METHOD.GET, "/consult/v1/consult/cat/treeSelect", treeSelParam).getDataSource();
        catDropDownData.read().then(() => {
            let data = catDropDownData.data().filter(e => e.catId !== "Cat");
            $("#consult-sms-template-list").kendoDropDownList({
                dataSource: [{fullCatNm: "템플릿을 선택하세요.", catId: "0"}, ...data],
                dataTextField: "fullCatNm",
                dataValueField: "catId",
                fillMode: "flat",
                change: (e) => {
                    let smsTemaplateData = new cpDataSource(METHOD.GET, "consult/v1/consult/sms-template-select/" + e.sender.element.val()).getDataSource();
                    smsTemaplateData.read().then(() => {
                        $('#consult-sms-template-list-view').data("kendoListView").setDataSource(smsTemaplateData);
                    })
                }
            }).data("kendoDropDownList");
        });

        let valid = $("#consult-sms-send-valid").kendoValidator({
            errorTemplate: "",
            rules: {
                rule: (input) => {
                    if (input.is("[name = consult-sms-receiver-select]")) {
                        if (input.data("kendoDropDownList").value() !== "inputNo") {
                            if ($("#consult-sms-receiver-number").data("kendoTextBox").value() == "") return false;
                        }
                    } else if (input.is("[name = consult-sms-receiver-number]")) {
                        if (input.val() === "") return false;
                    } else if (input.is("[name = consult-sms-send-content]")) {
                        if (input.val() == "") return false;
                    }
                    return true;
                }
            },
        }).data("kendoValidator");
        $("#consult-sms-send-content").kendoTextArea({
            rows: 15,
            placeholder: "문자내용 입력..."
        }).on("keyup", (e) => {
            valid.reset();
            consultCallRegister.calcContentByteLength();
        });

        $("#consult-sms-send-cancel").kendoButton({
            click: (e) => {
                const smsListView = $("#consult-sms-template-list-view").data("kendoListView");
                const listViewLength = smsListView.dataSource._data.length;
                for (let i = 0; i < listViewLength; i++) {
                    //listview clear
                    smsListView.remove(smsListView.content.children().first());
                }
                $("#consult-sms-template-list").data("kendoDropDownList").value(0);//template dropdowntree clear
                $("#consult-sms-send-content").data("kendoTextArea").value(''); //sms text clear
                valid.reset();
            }
        });
        $("#consult-sms-send-save").kendoButton({
            themeColor: "primary",
            click: (e) => {
                if (valid.validate()) message.callBackConfirm({
                    msg: "발송 하시겠습니까?",
                    callback: consultCallRegister.smsSendInsert
                });
            }
        });

    },
    calcContentByteLength: () => {
        const contents = $("#consult-sms-send-content").val();
        let cutString = consultCallRegister.smsContentsSet(contents);
        $("#consult-sms-send-content").val(cutString);
        $("#consult-sms-bytes").html("[" + byteCheck(cutString) + " / 2000] Bytes")
        if (byteCheck(cutString) > 80) {
            $("#consult-sms-type").html("LMS")
        } else {
            $("#consult-sms-type").html("SMS")
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
    smsSendInsert: () => {
        let listView = $('#consult-sms-template-list-view').data("kendoListView");
        let selected = listView.dataItem(listView.select());
        let param = {
            custId: $("#consult-customer-custId").val() == "" ? 0 : $("#consult-customer-custId").val(),
            custNm: $("#consult-customer-name").val(),
            smsTemplateId: selected !== undefined ? selected.smsTemplateId : 0,
            toTelNo: $("#consult-sms-receiver-number").val(),
            fromTelNo: $("#consult-sms-sender-number").val(),
            message: $("#consult-sms-send-content").val(),
            smsKind: $("#consult-sms-type").text() == "SMS" ? "Sms" : "Lms",
            srcId01: "",
            srcId02: "",
            srcId03: ""
        }
        new cpDataSource(METHOD.POST, "consult/v1/consult/smsInsert", param).getDataSource().read().then(() => {
            message.notification({msg: "발송 되었습니다.", type: "success"});
            $("#consult-sms-send-window").data("kendoWindow").refresh().close();
        });
    },

    manualRequestWindoInitOpen: () => {
        let $div = $(`<div id="consult-manual-request-window"></div>`);
        $div.kendoWindow({
            width: 400,
            height: 380,
            position: {
                top: "33%",
                left: "35%"
            },
            actions: ["Close"],
            title: "매뉴얼요청",
            visible: false,
            modal: true,
            appendTo: $("#program-250").parent(),
            draggable: false,
            resizable: false,
            autoFocus: false,
            content: {
                template: kendo.template($("#consult-manual-request-window-template").html())
            },
            open: () => {
                consultCallRegister.manualRequestWindowOpen();
            },
            close: (e) => {
                e.sender.destroy();
            }
        }).data("kendoWindow").refresh().open();

    },
    manualRequestWindowOpen: async () => {
        let userDropDown = new cpUserDropDown("#consult-manual-request-user", USER_INFO.deptId, [{useYn: "Y"}], {
            optionLabel: {
                userNm: "선택하세요",
                userId: 0,
                change: () => {
                    valid.reset()
                }
            }
        },IS.FALSE,"N",IS.TRUE);
        let userDropDownCreate = userDropDown.create();
        let userData = await userDropDown.getData();
        userDropDownCreate.setDataSource(userData.filter(user=>user.userId !== USER_INFO.userId));
        let valid = $("#consult-manual-request-window-valid").kendoValidator({
            errorTemplate: "",
            rules: {
                rule: (input) => {
                    if (input.is("[name = consult-transfer-call-user]")) {
                        return $("#consult-manual-request-user").data("kendoDropDownList").value() !== '0';
                    } else return true;
                }
            }
        }).data("kendoValidator");
        const deptAutoCompleteEvent = (e) => {
            valid.reset();
            let row = dropTreeRow(e);
            let call = userDropDown.getDeptData(row.deptId);
            call.read().then(() => {
                userDropDownCreate.setDataSource(call.data().filter(user=>user.userId !== USER_INFO.userId));
            });
        }
        new cpDeptDropDownTree('#consult-manual-request-dept', {change: deptAutoCompleteEvent}, 'CONSULT_MAIN', USER_INFO.deptId, IS.FALSE).init();
        $("#consult-manual-request-content").kendoTextArea({rows: 3, placeholder: "요청내용 입력..."});
        $("#consult-manual-request-btn").kendoButton({
            themeColor: "primary",
            click: () => {
                valid = $("#consult-manual-request-window-valid").kendoValidator({
                    errorTemplate: '',
                    rules: {
                        rule: (input) => {
                            if (input.is("[name = consult-manual-request-user]")) {
                                return $("#consult-manual-request-user").data("kendoDropDownList").value() !== '0';
                            } else return true;
                        }
                    }
                }).data("kendoValidator");
                if (valid.validate()) consultCallRegister.manualRequestSave();
            }
        });
    },
    manualRequestSave: () => {
        let param = {
            deptId: $("#consult-manual-request-dept").data("kendoDropDownTree").value(),
            chargeId: $("#consult-manual-request-user").data("kendoDropDownList").value(),
            requestReasonType: "Insert",
            requestReason: $("#consult-manual-request-content").data("kendoTextArea").value(),
            requestManualStatus: "",
            approvalYn: "N",
            manualId: 0
        }
        let manualRequest = new cpDataSource(METHOD.POST, "/knowledge/v1/manual-request/insert", param).getDataSource();
        manualRequest.read().then(() => {
            message.notification({msg: "요청이 등록되었습니다."});
            $("#consult-manual-request-window").data("kendoWindow").close();
        });
    },
    consultCallInsert: () => {
        let callBoundObj = $("#callBoundF").serializeJSON();
        let callObj = $("#consult-call-form").serializeJSON();
        let parentCallObj = $("#consult-parent-call-form").serializeJSON();
        let callTransferObj = $("#consult-call-transfer-form").serializeJSON();
        let reservationObj = $("#consult-reservation-form").serializeJSON();
        let transferObj = $("#consult-transfer-form").serializeJSON();
        let custId = $("#consult-customer-custId").val();
        callObj.callClass = $("#consult-callClass").data("kendoDropDownTree").value();
        callObj.callCatId = $("#consult-callCat").data("kendoDropDownTree").value();
        callObj.custId = custId;
        callObj.custNm = $("#consult-customer-name").val();
        let custCommand = consultCustomerInfo.customerParam(custId);
        let callInsertObj = {...callObj , ...callBoundObj,...parentCallObj,...reservationObj,...transferObj,...callTransferObj,custCommand};
        let callInsert = new cpDataSource(METHOD.POST, "consult/v1/callInsert",callInsertObj,()=>{
            cpProgress('consult-call-insert-valid',false);
            cpProgress('consult-customer-table',false);
        }).getDataSource();
        callInsert.read().then(() => {
            try {
                consultMain.callTypeObjectReset()
                consultMain.consultCallRegisterReset();
                consultMain.consultTabSideInit();
                consultMain.customerInfoReset();
                consultMain.ctiInfoReset();
                consultTabSide.receiptDtailClose();
                message.notification({msg: "저장되었습니다.", type: "success"});
                cpProgress('consult-call-insert-valid', false);
                cpProgress('consult-customer-table', false);
            } catch (e) {
                message.notification({msg: e.message, type: "error"});
                cpProgress('consult-call-insert-valid', false);
                cpProgress('consult-customer-table', false);
            }
        });

    },
    consultCallInsertValid: () => {
        let valid = $("#consult-call-insert-valid").kendoValidator({
            errorTemplate: (e) => {
                if (e.field == "callCatId") {
                    if (e.message !== "") {
                        let message = '<div class="k-widget k-tooltip k-tooltip-error" style="margin:1% 2% 2% 10%;">' +
                            e.message + '<div class="k-callout c-k-callout-n"></div></div>';
                        return message;
                    }
                }
            },
            rules: {
                required: (input) => {
                    if (input.is("[name=callClass]")) return input.data("kendoDropDownTree").value() !== "";
                    else if (input.is("[name=callCatId]")) return input.data("kendoDropDownTree").value() !== "";
                    else if (input.is("[name=question]")) return input.val() !== "";
                    else if (input.is("[name=answer]")) return input.val() !== "";
                    return true;
                },
                callCat: (input) => {
                    if (input.is("[name=callCatId]")) {
                        if (input.data("kendoDropDownTree").value() !== "") {
                            let dropTree = input.data("kendoDropDownTree");
                            let selectItem = dropTree.treeview.select();
                            return !dropTree.dataItem(selectItem).hasChildren;
                        } else return false
                    }
                    return true;
                }
            },
            messages: {
                required: (input) => {
                    return "";
                },
                callCat: (input) => {
                    if (input.is("[name=callCatId]")) {
                        if (input.data("kendoDropDownTree").value() !== "") {
                            return "상담분류를 마지막 단계까지 선택해 주세요."
                        }
                    }
                }
            }
        }).data("kendoValidator");
        return valid;
    }

}

const consultTabSide = {
    init: () => {
        $("#consult-tabstrip").kendoTabStrip({
            height: "100%",
            animation: {
                open:
                    {effects: "fadeIn"}
            },
            select: (e) => {
                if ($(e.item).index() == 1) {
                    setTimeout(() => {
                        $('#consult-reservation-list').data("kendoListView").refresh();
                        $('#consult-reservation-list').data("kendoListView").dataSource.page(1);
                    }, 300)
                } else if ($(e.item).index() == 2) {
                    setTimeout(() => {
                        $('#consult-sms-list').data("kendoListView").refresh();
                        $('#consult-sms-list').data("kendoListView").dataSource.page(1);
                    }, 300)
                }
            }
        }).data("kendoTabStrip").activateTab($("#consult-receipt-tab"));
        consultTabSide.receipt().then(r => {
            $("#consult-receipt-grid").show();
            $("#consult-receipt-list").hide();
            $("#consult-receipt-timeline").hide();
            $("#consult-search-option-closeBtn").hide();
        });
        consultTabSide.smsTabInit();
        consultTabSide.reservationInit().then(r => {
        });
        const observer = new ResizeObserver((entries, observer) => {
            // 관찰 중인 배열 형식의 객체 리스트
            entries.forEach((entry) => {
                let splitter =$(".consult-tab-splitter");
                if(entry.target.id === "consult-grid-search-container") {
                    let _height = entry.contentRect.height;
                    $(splitter[0]).height(`calc(100% - ${_height}px)`);
                    $(splitter[0]).data("kendoSplitter").resize()
                }else{
                    let _height = entry.contentRect.height;
                    $(splitter[1]).height(`calc(100% - ${_height}px)`);
                    $("#consult-reservation-list").data("kendoListView").refresh()
                }

            });
        });
        const observerClass = $(".consult-observer");
        for(let i =0 ; i <observerClass.length ; i++){
            observer.observe(observerClass[i]);
        }
    },

    smsTabInit: () => {
        $('#consult-sms-list').kendoListView({
            autoBind: false,
            height: "calc(100% - 38px)",
            scrollable: true,
            dataSource: consultTabSide.smsTabDataSource(),
            layout: "grid",
            pageable: true,
            grid: {
                cols: 2,
                rows: 3
            },
            selectable: "single",
            template: kendo.template($("#consult-smsTab-listview-template").html()),
            dataBound: () => {
                $(".consult-smsTab-listView-regDt").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-smsTab-listView-custNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-smsTab-listView-toTelNo").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-smsTab-listView-smsKindNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-smsTab-listView-resultNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-smsTab-listView-rgtrNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-smsTab-listView-message").kendoTextArea({fillMode: "flat", readonly: true, rows: 4});
            }
        });
        $("#consult-smstab-divSplitter").kendoSplitter({
            orientation: "vertical",
            panes: [
                {collapsible: false, size: "65px", scrollable: false},
                {collapsible: false, resizable: false, scrollable: false},
            ]
        });
        $("#consult-sms-list-view-splitter").kendoSplitter({
            orientation: "vertical",
            panes: [{collapsible: false, size: "100%", resizable: false}, {collapsible: false}]
        });
        $("#consult-sms-search-option-openBtn").kendoButton({
            icon: "search",
            click: (e) => {
                consultTabSide.smsTabSearchButtonOpen();
            }
        });
        $("#consult-sms-search-btn").kendoButton({
            size:"small",
            themeColor:"secondary",
            icon: "search",
            click: (e) => {
                $('#consult-sms-list').data("kendoListView").dataSource.page(1);
            }
        });
        $("#consult-sms-search-option-closeBtn").kendoButton({
            icon: "close",
            click: (e) => {
                consultTabSide.smsTabSearchButtonClose();
            }
        });
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        $(`#consult-sms-search-rangepicker-start`).kendoDatePicker({
            format: 'yyyy-MM-dd',
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: startDate,
            size: 'small'
        });
        $(`#consult-sms-search-rangepicker-end`).kendoDatePicker({
            format: 'yyyy-MM-dd',
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: new Date(),
            size: 'small'
        });
        $("#consult-sms-search-text").kendoTextBox({
            size: 'small',
            change: (e) => {
                let value = e.value;
                e.sender.element.val(value.formatterHpNo());
            }
        });
    },
    smsTabDataSource: () => {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/consult/v1/sms-list/select/page",
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8'
                },
                parameterMap: (options) => {
                    return {
                        parentId: 0,
                        deptId: 0,
                        userId: 0,
                        custId: $("#consult-customer-custId").val() == "" ? 0 : $("#consult-customer-custId").val(),
                        startDt: kendo.toString(
                            $(`#consult-sms-search-rangepicker-start`).data("kendoDatePicker").value(),
                            'yyyy-MM-dd'
                        ),
                        endDt: kendo.toString(
                            $(`#consult-sms-search-rangepicker-end`).data("kendoDatePicker").value(),
                            'yyyy-MM-dd'
                        ),
                        searchType: "ToHpNo",
                        searchTxt: $("#consult-sms-search-text").data("kendoTextBox").value(),
                        outputYn: "Y",
                        sortType: "",
                        page: options.page,
                        totalPage: options.pageSize
                    }
                }
            },
            schema: {
                data: 'data.rows',
                total: 'data.totalCount',
                model: {
                    regDt: {type: 'date'},
                    toTelNo: {type: 'string'},
                    custNm: {type: 'string'},
                    smsKindNm: {type: 'string'},
                    message: {type: 'string'},
                    resultNm: {type: 'string'},
                    rgtrNm: {type: 'string'}
                },
                parse: (res) => {
                    res.data.rows.forEach((row) => {
                        if (row.regDt) {
                            row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd H:mm");
                        }
                    })
                    const listviewSplitter = $("#consult-sms-list-view-splitter").data("kendoSplitter");
                    if (res.data.rows.length > 0) {
                        listviewSplitter.size($("#consult-sms-list-view-splitter-top"), "0%");
                    } else {
                        listviewSplitter.size($("#consult-sms-list-view-splitter-top"), "100%");
                    }
                    return res;
                }
            },
            serverPaging: true,
            pageSize: 10
        })
    },
    smsTabSearchResultPrint: () => {
        let timeRange = $("#consult-sms-search-rangepicker").data('kendoDatePicker').range();

        let target = $('#consult-sms-searched-field');
        let searchText = [{
            label: '발송일자 : ',
            icon: 'c-calendar3',
            text: kendo.toString(timeRange.start, 'yyyy-MM-dd') + ' ~ ' + kendo.toString(timeRange.end, 'yyyy-MM-dd')
        }, {
            label: '전화번호 : ',
            text: $("#consult-sms-search-text").val()
        }];
        searchTextBadge(target, searchText);
    },
    smsTabSearchButtonOpen: () => {
        $("#consult-sms-searching-field").show();
        $("#consult-sms-searching-btn-box").show();
        $("#consult-sms-searched-field").hide();
        $("#consult-sms-searched-btn-box").hide();
        $('#consult-sms-list').data("kendoListView").refresh();
    },
    smsTabSearchButtonClose: () => {
        $("#consult-sms-searching-field").hide();
        $("#consult-sms-searching-btn-box").hide();
        $("#consult-sms-searched-field").show();
        $("#consult-sms-searched-btn-box").show();
        $('#consult-sms-list').data("kendoListView").refresh();
    },

    reservationInit: async () => {

        $("#consult-reservation-tab-cnt").kendoBadge({text: 0, themeColor: "warning"});

        $('#consult-reservation-list').kendoListView({
            autoBind: false,
            height: "calc(100% - 38px)",
            scrollable: true,
            dataSource: consultTabSide.reservationTabDataSource(),
            layout: "grid",
            pageable: true,
            grid: {
                cols: 2,
                rows: 4
            },
            selectable: "single",
            template: kendo.template($("#consult-reservation-listview").html()),
            editTemplate: kendo.template($("#consult-reservation-edit-listview").html()),
            altTemplate: kendo.template($("#consult-reservation-listview").html()),
            edit: async (e) => {
                $("#consult-reservation-boundId").val(e.model.boundId);
                $("#consult-reservation-callId").val(e.model.callId);
                $("#consult-reservation-chargeId").val(e.model.callId);
                $(".consult-reservation-edit-btn").attr("disabled", "disabled")
                $("#consult-reservation-edit-template-close").bind("click", (e) => {
                    $('#consult-reservation-list').data("kendoListView").refresh();
                    $(".consult-reservation-edit-btn").removeAttr("disabled");
                });
                $("#consult-reservationTab-edit-textarea").kendoTextArea({rows: 7});

                let arr;
                let reservationStatus = new cpCodeDropDownTree('#consult-reservationTab-edit-codeTree', 'ReservationStatus', {});
                reservationStatus.create();
                arr = await reservationStatus.getData();
                arr = [...arr[0].items, ...arr[1].items];
                arr = arr.filter(e => e.codeValue_05 == "02");
                let dataSource = new kendo.data.HierarchicalDataSource({data: arr});
                $("#consult-reservationTab-edit-codeTree").data("kendoDropDownTree").setDataSource(dataSource);
                let valid = $("#consult-reservation-update-valid").kendoValidator({
                    errorTemplate: "<span style='color:red; margin-left:15px'>#:message#</span>",
                    rules: {
                        custom: (input) => {
                            if (input.is("[name=reservationStatus]")) {
                                return input.data("kendoDropDownTree").value() !== "Receipt";
                            } else if (input.is("[name=description]")) {
                                return input.val() !== "";

                            } else return true;
                        }
                    },
                    messages: {
                        custom: (input) => {
                            if (input.is("[name = reservationStatus]")) {
                                if (input.data("kendoDropDownTree").value() == "Receipt") return "미처리는 저장할 수 없습니다.";
                            } else return "";
                        }
                    }
                }).data("kendoValidator");
                $("#consult-reservationTab-edit-update").kendoButton({
                    themeColor: "primary",
                    click: () => {
                        if (valid.validate())
                            message.callBackConfirm({
                                msg: '저장하겠습니까?', callback: () => {
                                    consultTabSide.reservationResultUpdate()
                                }
                            });
                    }
                });
            },
            dataBound: (e) => {
                e.sender.dataItems().map(data => {
                    if (data.processYn == 'N' && USER_INFO.ctiYn == 'Y' && data.reservationTelNo !== "") {
                        $(`#consult-reservation-listView-callBtn-${data.callId}`).show();
                        $(`#consult-reservation-listView-callBtn-${data.callId}`).bind("click", () => {
                            consultTabSide.reservationMakeCall(data.boundId, data.callId, data.reservationTelNo);
                        });
                    } else {
                        $(`#consult-reservation-listView-callBtn-${data.callId}`).hide();
                    }
                    if (data.boundCnt > 0) {
                        $(`#consult-boundCnt-${data.callId}`).show();
                        $(`#consult-boundCnt-${data.callId}`).bind("click", () => {
                            consultTabSide.reservationCountSelcet(data);
                        });
                    } else {
                        $(`#consult-boundCnt-${data.callId}`).hide();
                    }
                });
                $(".consult-reservation-listView-reservationDt").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-reservation-listView-callRgtrNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-reservation-listView-boundTelNo").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-reservation-listView-reservationTelNo").kendoTextBox({
                    fillMode: "flat",
                    readonly: true
                });
                $(".consult-reservation-listView-boundCnt").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-reservation-listView-reservationStatusNm").kendoTextBox({
                    fillMode: "flat",
                    readonly: true
                });
                $(".consult-reservation-listView-processNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-reservation-listView-processDt").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-reservation-listView-question").kendoTextArea({
                    fillMode: "flat",
                    readonly: true,
                    rows: 3
                });
                $(".consult-reservation-listView-description").kendoTextArea({
                    fillMode: "flat",
                    readonly: true,
                    rows: 3
                });
            }
        });


        $("#consult-reservation-list-view-splitter").kendoSplitter({
            orientation: "vertical",
            panes: [{collapsible: false, size: "100%", resizable: false}, {collapsible: false}]
        });

        $("#consult-reservationTab-search-option-openBtn").kendoButton({
            icon: "search",
            click: (e) => {
                consultTabSide.reservationSearchButtonOpen();
            }
        });
        $("#consult-reservationTab-search-btn").kendoButton({
            size:"small",
            themeColor:"secondary",
            icon: "search",
            click: (e) => {
                $('#consult-reservation-list').data("kendoListView").dataSource.page(1);
            }
        });
        $("#consult-reservationTab-search-option-closeBtn").kendoButton({
            icon: "close",
            click: (e) => {
                consultTabSide.reservationSearchButtonClose();
            }
        });

        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        $("#consult-reservationTab-search-rangepicker").kendoDateRangePicker({
            format: "yyyy-MM-dd",
            size: "large",
            labels: false,
            range: {
                start: startDate,
                end: new Date()
            }
        });
        $(`#consult-reservationTab-search-rangepicker-start`).kendoDatePicker({
            format: 'yyyy-MM-dd',
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: startDate,
            size: 'small'
        });
        $(`#consult-reservationTab-search-rangepicker-end`).kendoDatePicker({
            format: 'yyyy-MM-dd',
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: new Date(),
            size: 'small'
        });
        $("#consult-reservationTab-search-text").kendoTextBox({
            size:"small",
            change: (e) => {
                let value = e.value;
                e.sender.element.val(value.formatterHpNo());
            }
        });
        let code = new cpCodeDropDownTree('#consult-reservationTab-search-codeTree', 'ReservationStatus', {value: "all"});
        await dropDownTreeUtils.makeDropDownTree(code, '#consult-reservationTab-search-codeTree',IS.TRUE);
    },
    reservationTabDataSource: () => {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/consult/v1/reservation-page/select",
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8'
                },
                parameterMap: (options) => {
                    return {
                        startDate: kendo.toString( $(`#consult-reservationTab-search-rangepicker-start`).data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                        endDate: kendo.toString($(`#consult-reservationTab-search-rangepicker-end`).data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                        chargeParentId: 0,
                        chargeDeptId: 0,
                        chargeId: 0,
                        custId: $("#consult-customer-custId").val() == "" ? 0 : $("#consult-customer-custId").val(),
                        reservationStatus: $('#consult-reservationTab-search-codeTree').data('kendoDropDownTree').value() == 'all' ? '' : $('#consult-reservationTab-search-codeTree').data('kendoDropDownTree').value(),
                        completeYn: '',
                        searchType: "TelNo",
                        searchTxt: $('#consult-reservationTab-search-text').val(),
                        sortType: '',
                        outputYn: 'Y',
                        page: options.page,
                        totalPage: options.pageSize
                    }
                }
            },
            schema: {
                data: 'data.rows',
                total: 'data.totalCount',
                model: {
                    companyCd: {type: 'string'},
                    boundId: {type: 'number'},
                    callId: {type: 'number'},
                    custId: {type: 'number'},
                    chargeId: {type: 'number'},
                    reservationTelNo: {type: 'string'},
                    reservationDt: {type: 'string'},
                    boundTelNo: {type: 'string'},
                    boundDt: {type: 'string'},
                    boundYn: {type: 'string'},
                    boundCnt: {type: 'number'},
                    memo: {type: 'string'},
                    description: {type: 'string'},
                    reservationStatus: {type: 'string'},
                    rgtrId: {type: 'number'},
                    regDt: {type: 'string'},
                    processId: {type: 'number'},
                    processDt: {type: 'string'},
                    processYn: {type: 'string'},
                    processBoundId: {type: 'number'},
                    processCallId: {type: 'number'},
                    custNm: {type: 'string'},
                    chargeNm: {type: 'string'},
                    reservationStatusNm: {type: 'string'},
                    rgtrNm: {type: 'string'},
                    question: {type: 'string'},
                    answer: {type: 'string'},
                    callRgtrNm: {type: 'string'},
                    processNm: {type: 'string'},
                    callClassNm: {type: 'string'},
                    callRgtrId: {type: 'number'},
                    callRegDt: {type: 'string'}
                },
                parse: (res) => {
                    res.data.rows.forEach((row) => {
                        if (row.regDt) {
                            row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd H:mm");
                        }
                        if (row.callRegDt) {
                            row.callRegDt = kendo.toString(new Date(row.callRegDt), "yyyy-MM-dd H:mm");
                        }
                        if (row.reservationDt) {
                            row.reservationDt = kendo.toString(new Date(row.reservationDt), "yyyy-MM-dd H:mm");
                        }
                        if (row.processDt) {
                            row.processDt = kendo.toString(new Date(row.processDt), "yyyy-MM-dd H:mm");
                        } else {
                            row.processDt = ""
                        }
                        if (row.processNm == null) {
                            row.processNm = ""
                        }
                    })
                    const listviewSplitter = $("#consult-reservation-list-view-splitter").data("kendoSplitter");
                    if (res.data.rows.length > 0) {
                        listviewSplitter.size($("#consult-reservation-list-view-splitter-top"), "0%");
                    } else {
                        listviewSplitter.size($("#consult-reservation-list-view-splitter-top"), "100%");
                    }
                    return res;
                }
            },
            serverPaging: true,
            pageSize: 10
        });
    },
    reservationMakeCall: (boundId, callId, reservationTelNo) => {
        let insertVisitorReserve = new cpDataSource(METHOD.POST, '/consult/v1/main/visitor-reserve/insert', {
            boundId: boundId,
            callId: callId,
            boundTelNo: reservationTelNo
        }).getDataSource();
        insertVisitorReserve.read().then(() => {
            ctiBtnAct.revSendTel(reservationTelNo, boundId, callId);
        });
    },
    reservationCountSelcet: (data) => {
        $(`#consult-boundCnt-${data.callId}`).kendoPopover({
            showOn: "click",
            position: "bottom",
            body: `<div id="consult-boundCtn-grid-${data.callId}"></div>`,
            width: "320px",
            height: "145px",
            show: (e) => {
                consultTabSide.reservationBoundCntSearchGrid(data);
            },
            hide: (e) => {
                e.sender.destroy();
            }
        }).data('kendoPopover').show();
    },
    reservationResultUpdate: () => {
        let param = {
            boundId: $("#consult-reservation-boundId").val(),
            callId: $("#consult-reservation-callId").val(),
            chargeId: Number($("#consult-reservation-chargeId").val()),
            reservationStatus: $("#consult-reservationTab-edit-codeTree").data("kendoDropDownTree").value(),
            description: $("#consult-reservationTab-edit-textarea").val()
        }
        let reservationUpdate = new cpDataSource(METHOD.PUT, "consult/v1/reservation/update", param).getDataSource();
        reservationUpdate.read().then(() => {
            let custId = $("#consult-customer-custId").val();
            let boundTelNo = $("#consult-boundTel-number").val();
            if (custId !== "" && boundTelNo !== "") {
                consultCustomerInfo.callTabCnt(custId, boundTelNo);
            }
            $('#consult-reservation-list').data("kendoListView").dataSource.page(1);
        })
    },
    reservationSearchButtonOpen: () => {
        $("#consult-reservationTab-searching-field").show();
        $("#consult-reservation-searching-btn-box").show();
        $("#consult-reservationTab-searched-field").hide();
        $("#consult-reservation-searched-btn-box").hide();
        $('#consult-reservation-list').data("kendoListView").refresh();
    },
    reservationSearchButtonClose: () => {
        $("#consult-reservationTab-searching-field").hide();
        $("#consult-reservation-searching-btn-box").hide();
        $("#consult-reservationTab-searched-field").show();
        $("#consult-reservation-searched-btn-box").show();
        $('#consult-reservation-list').data("kendoListView").refresh();
    },
    reservationBoundCntSearchGrid: (data) => {
        let searchParam = {
            callId: data.callId,
            boundId: data.boundId
        }
        let customerSearchData = new cpDataSource(METHOD.GET, "/consult/v1/visitor-reserve/select", searchParam).getDataSource();
        customerSearchData.read().then(() => {
            let rowData = customerSearchData.data();
            rowData.forEach(item => {
                item.boundDt = kendo.toString(new Date(item.boundDt), "yyyy-MM-dd H:mm");
                item.boundTelNo = item.boundTelNo.formatterHpNo();
            })
            $(`#consult-boundCtn-grid-${data.callId}`).kendoCpGrid({
                dataSource: rowData,
                columns: [
                    {field: "boundDt", title: "시도일시", width: 55, attributes: {style: "text-align:center"}},
                    {field: "rgtrNm", title: "상담사", width: 45, attributes: {style: "text-align:center"}},
                ],
                width: "290px",
                height: "115px"
            });
        });
    },

    receipt: async () => {
        $("#consult-divSplitter").kendoSplitter({
            orientation: "vertical",
            panes: [
                {collapsible: false, resizable: false, scrollable: false, size:"100%"},
                {collapsible: false, resizable: false, scrollable: false}
            ],
        });

        $("#consult-list-view-splitter").kendoSplitter({
            orientation: "vertical",
            panes: [{collapsible: false, size: "100%", resizable: false}, {collapsible: false}]
        });
        $("#consult-detail-callDt").kendoTextBox({fillMode: "flat", readonly: true});
        $("#consult-detail-callType").kendoTextBox({fillMode: "flat", readonly: true});
        $("#consult-detail-callClass").kendoTextBox({fillMode: "flat", readonly: true});
        $("#consult-detail-boundTypeNm").kendoTextBox({fillMode: "flat", readonly: true});
        $("#consult-detail-boundTelNo").kendoTextBox({fillMode: "flat", readonly: true});
        $("#consult-detail-callTm").kendoTextBox({fillMode: "flat", readonly: true});
        $("#consult-detail-callCat").kendoTextBox({fillMode: "flat", readonly: true});
        $("#consult-detail-answer").kendoTextArea({rows: 5, readonly: true, fillMode: "flat"});
        $("#consult-detail-question").kendoTextArea({rows: 5, readonly: true, fillMode: "flat"});
        $('#consult-receipt-list').kendoListView({
            pageable: true,
            autoBind: false,
            height: "calc(100% - 38px)",
            dataSource: consultTabSide.receiptDataSource(),
            scrollable: true,
            layout: "grid",
            grid: {
                cols: 2,
                rows: 3
            },
            selectable: "single",
            template: kendo.template($("#consult-receipt-listview").html()),
            change: (e) => {
                let list = e.sender;
                let data = list.dataItem(list.select());
                let index = list.select().index();
                let splitter = $("#consult-divSplitter").data("kendoSplitter");
                $("#consult-receipt-detail").show();
                splitter.size($('#consult-receipt-container'), '50%');
                splitter.size($('#consult-receipt-detail'), '50%');
                $("#consult-receipt-list").data("kendoListView").refresh();
                $(".consult-callDetail").eq(index).addClass("k-state-selected");
                $("#consult-detail-callDt").data("kendoTextBox").value(data.callDt);
                $("#consult-detail-callType").data("kendoTextBox").value(data.callTypeNm);
                $("#consult-detail-callClass").data("kendoTextBox").value(data.callClassNm);
                $("#consult-detail-boundTypeNm").data("kendoTextBox").value(data.boundTypeNm);
                $("#consult-detail-boundTelNo").data("kendoTextBox").value(data.boundTelNo);
                $("#consult-detail-callTm").data("kendoTextBox").value(data.callTm);
                $("#consult-detail-callCat").data("kendoTextBox").value(data.fullCallCatNm);
                $("#consult-detail-answer").data("kendoTextArea").value(data.answer);
                $("#consult-detail-question").data("kendoTextArea").value(data.question);
            },
            dataBound: (e) => {
                $(".consult-callDetail-listView-callDt").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-callDetail-listView-rgtrNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-callDetail-listView-boundTelNo").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-callDetail-listView-callTypeNm").kendoTextBox({fillMode: "flat", readonly: true});
                $(".consult-callDetail-listView-fullCallCatNm").kendoTextBox({fillMode: "flat", readonly: true});
            }
        });

        $("#consult-receipt-grid").kendoCpGrid({
            autoBind: false,
            dataSource: consultTabSide.receiptDataSource(),
            columns: [
                {field: "callId", hidden: true},
                {field: "boundId", hidden: true},
                {field: "callUuid", hidden: true},
                {field: "topCallUuid", hidden: true},
                {field: "parentCallUuid", hidden: true},
                {field: "boundType", hidden: true},
                {field: "callClass", hidden: true},
                {field: "callCatId", hidden: true},
                {field: "custId", hidden: true},
                {field: "custNm", hidden: true},
                {field: "boundTelNo", hidden: true},
                {field: "closeCallTm", hidden: true},
                {field: "deptId", hidden: true},
                {field: "deptNm", hidden: true},
                {field: "fullDeptNm", hidden: true},
                {field: "chargeId", hidden: true},
                {field: "chargeNm", hidden: true},
                {field: "processId", hidden: true},
                {field: "processNm", hidden: true},
                {field: "processDt", hidden: true},
                {field: "answer", hidden: true},
                {field: "keywords", hidden: true},
                {field: "callStatus", hidden: true},
                {field: "callStatusNm", hidden: true},
                {field: "callType", hidden: true},
                {field: "rgtrId", hidden: true},
                {field: "recordingId", hidden: true},
                {field: "callDt", title: "상담일시", width: 70, attributes: {style: "text-align:center"}},
                {field: "callClassNm", title: "상담유형", width: 50, attributes: {style: "text-align:center"}},
                {
                    field: "fullCallCatNm",
                    title: "상담분류",
                    width: 70,
                    attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
                },
                {
                    field: "question",
                    title: "문의내용",
                    width: 100,
                    attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
                },
                {field: "callTypeNm", title: "상담결과", width: 50, attributes: {style: "text-align:center"}},
                {field: "rgtrNm", title: "상담사", width: 40, attributes: {style: "text-align:center"}},
                {field: "callTm", title: "통화시간", width: 50, attributes: {style: "text-align:center"}}
            ],
            click: (e) => {
                let data = e.sender.dataItem(e.sender.select());
                let splitter = $("#consult-divSplitter").data("kendoSplitter");
                $("#consult-receipt-detail").show();
                splitter.size($('#consult-receipt-container'), '50%');
                splitter.size($('#consult-receipt-detail'), '50%');
                $("#consult-detail-callDt").data("kendoTextBox").value(data.callDt);
                $("#consult-detail-callType").data("kendoTextBox").value(data.callTypeNm);
                $("#consult-detail-callClass").data("kendoTextBox").value(data.callClassNm);
                $("#consult-detail-boundTypeNm").data("kendoTextBox").value(data.boundTypeNm);
                $("#consult-detail-boundTelNo").data("kendoTextBox").value(data.boundTelNo);
                $("#consult-detail-callTm").data("kendoTextBox").value(data.callTm);
                $("#consult-detail-callCat").data("kendoTextBox").value(data.fullCallCatNm);
                $("#consult-detail-answer").data("kendoTextArea").value(data.answer);
                $("#consult-detail-question").data("kendoTextArea").value(data.question);
            },
            height: '100%',
            resizable: true,
            selectable: 'single',
            pageable: true

        });
        $("#consult-receipt-grid").data("kendoCpGrid").dataSource.data([]);
        $("#consult-receipt-timeline").kendoTimeline({
            dataSource: consultTabSide.receiptTimeLineDataSource(),
            alternatingMode: true,
            autoBind: false,
            collapsibleEvents: true,
            dateFormat: "MM/dd HH:mm",
            dataTitleField: "fullCallCatNm",
            dataSubtitleField: "callClassNm",
            dataDescriptionField: "question",
            dataDateField: "callDt",
            actionClick: function (e) {
                let data = e.dataItem;

                let splitter = $("#consult-divSplitter").data("kendoSplitter");
                $("#consult-receipt-detail").show();
                splitter.size($('#consult-receipt-container'), '50%');
                splitter.size($('#consult-receipt-detail'), '50%');
                $("#consult-detail-callDt").data("kendoTextBox").value(kendo.toString(data.callDt, "yyyy-MM-dd H:mm"));
                $("#consult-detail-callType").data("kendoTextBox").value(data.callTypeNm);
                $("#consult-detail-callClass").data("kendoTextBox").value(data.callClassNm);
                $("#consult-detail-boundTypeNm").data("kendoTextBox").value(data.boundTypeNm);
                $("#consult-detail-boundTelNo").data("kendoTextBox").value(data.boundTelNo);
                $("#consult-detail-callTm").data("kendoTextBox").value(data.callTm);
                $("#consult-detail-callCat").data("kendoTextBox").value(data.fullCallCatNm);
                $("#consult-detail-answer").data("kendoTextArea").value(data.answer);
                $("#consult-detail-question").data("kendoTextArea").value(data.question);
            }
        });
        let startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        $(`#consult-receipt-search-date-picker-start`).kendoDatePicker({
            format: 'yyyy-MM-dd',
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: startDate,
            size: 'small'
        });
        $(`#consult-receipt-search-date-picker-end`).kendoDatePicker({
            format: 'yyyy-MM-dd',
            parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
            value: new Date(),
            size: 'small'
        });
        $("#consult-receipt-search-text").kendoTextBox({
            size: 'small',
            change: (e) => {
                let value = e.value;
                e.sender.element.val(value.formatterHpNo());
            }
        }).bind("keyup", function (e) {
            if (e.keyCode === 13) {
                $(`#consult-receipt-search-btn`).trigger('click');
            }
        });
        let boundTypeDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/boundType", {}).getDataSource();
        boundTypeDataSource.read().then(() => {
            $(`#consult-receipt-search-boundType`).kendoButtonGroup({
                items: buttonGroupUtils.buttonGroupMakeItems(boundTypeDataSource.data(),true),
                index: 0,
                size: 'small'
            });
        });

        $("#consult-receipt-dtailClose").bind("click", (e) => {
            consultTabSide.receiptDtailClose();
        })

        const btnIconChange = (changeIcon)=>{
            let viewButton = $("#consult-receipt-switch-btn").data('kendoSplitButton').element.children();
            let classList = viewButton.attr("class").split(" ");
            let iconClass = classList.find(r=>r.includes("k-i-c"));
            viewButton.removeClass(iconClass);
            viewButton.addClass("k-i-"+changeIcon)
        }
        $("#consult-receipt-switch-btn").kendoSplitButton({
            icon: "c-card-list",
            fillMode:"solid",
            items:[
                { id: "consult-switch-grid",text:"리스트 보기", icon: "c-card-list",
                    click: (e)=> {
                                        btnIconChange("c-card-list");
                                        consultTabSide.receiptDtailClose();
                                        $("#consult-receipt-grid").show();
                                        $("#consult-receipt-list").hide();
                                        $("#consult-receipt-timeline").hide();
                                    }},
                { id: "consult-switch-listview",text:"카드 보기", icon: "c-grid-fill",
                    click: (e)=> {
                                        btnIconChange("c-grid-fill");
                                        consultTabSide.receiptDtailClose();
                                        $("#consult-receipt-grid").hide();
                                        $("#consult-receipt-list").show();
                                        $("#consult-receipt-timeline").hide();
                                        $('#consult-receipt-list').data("kendoListView").refresh();
                                    }},
                { id: "consult-switch-timeline",text:"타임라인 보기", icon: "c-bezier2",
                    click: (e)=> {
                                        btnIconChange("c-bezier2");
                                        consultTabSide.receiptDtailClose();
                                        $("#consult-receipt-grid").hide();
                                        $("#consult-receipt-list").hide();
                                        $("#consult-receipt-timeline").show();
                                    }},
            ],
            click: (e)=>{
                e.sender.open()
            }
        });
        $("#consult-receipt-search-btn").kendoButton({
            size:"small",
            themeColor:"secondary",
            icon: "search",
            click: (e) => {
                consultTabSide.receiptListSelect($("#consult-customer-custId").val());
                message.notification({type: "info"});
                consultTabSide.receiptButtonClose();
            }
        });
        $(".consult-card-detail-textarea").kendoTextArea({rows: 3});
        $("#consult-receipt-switch-btn").data('kendoSplitButton').enable(false, "#consult-switch-timeline");
        $("#consult-receipt-detail").hide();
    },
    receiptDataSource: () => {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/consult/v1/consultList/consultList-select-page",
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8'
                },
                parameterMap: (options) => {
                    let boundType = buttonGroupUtils.buttonGroupGetSelectedValue("#consult-receipt-search-boundType");
                    let startDt = kendo.toString(new Date($(`#consult-receipt-search-date-picker-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd');
                    let endDt = kendo.toString(new Date($(`#consult-receipt-search-date-picker-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd');
                    let custId = $("#consult-customer-custId").val();
                    return {
                        startDate: startDt,
                        endDate: endDt,
                        custId:  custId === "" ? 0 : custId,
                        callClass: "",
                        callCatId:0,
                        callStatus: "",
                        callType: "",
                        parentId: 0,
                        deptId: 0,
                        userId: 0,
                        boundType: boundType === "all" ? "" : boundType,
                        searchType: "BoundTelNo",
                        searchTxt: $('#consult-receipt-search-text').data("kendoTextBox").value(),
                        completeYn: '',
                        sortType: '',
                        page: options.page,
                        totalPage: options.pageSize
                    }
                }
            },
            schema: {
                data: 'data.rows',
                total: 'data.totalCount',
                model: {
                    boundId: {type: 'number'},
                    callId: {type: 'number'},
                    callUuid: {type: 'string'},
                    topCallUuid: {type: 'string'},
                    parentCallUuid: {type: 'string'},
                    boundType: {type: 'string'},
                    boundTypeNm: {type: 'string'},
                    callClass: {type: 'string'},
                    callClassNm: {type: 'string'},
                    callCatId: {type: 'number'},
                    fullCallCatNm: {type: 'string'},
                    custId: {type: 'number'},
                    custNm: {type: 'string'},
                    boundTelNo: {type: 'string'},
                    callDt: {type: 'string'},
                    callTm: {type: 'string'},
                    closeCallTm: {type: 'string'},
                    deptId: {type: 'number'},
                    deptNm: {type: 'string'},
                    fullDeptNm: {type: 'string'},
                    chargeId: {type: 'number'},
                    chargeNm: {type: 'string'},
                    processId: {type: 'number'},
                    processNm: {type: 'string'},
                    processDt: {type: 'string'},
                    question: {type: 'string'},
                    answer: {type: 'string'},
                    keywords: {type: 'string'},
                    callStatus: {type: 'string'},
                    callStatusNm: {type: 'string'},
                    callType: {type: 'string'},
                    callTypeNm: {type: 'string'},
                    rgtrId: {type: 'number'},
                    rgtrNm: {type: 'string'},
                    recordingId: {type: 'string'}
                },
                parse: (res) => {
                    res.data.rows.forEach((row) => {
                        if (row.callDt) {
                            row.callDt = kendo.toString(new Date(row.callDt), "yyyy-MM-dd H:mm");
                        }
                        if (row.processDt) {
                            row.processDt = kendo.toString(new Date(row.processDt), "yyyy-MM-dd H:mm");
                        } else {
                            row.processDt = "";
                        }
                        if (row.processNm == null) {
                            row.processNm = "";
                        }
                    })
                    const listviewSplitter = $("#consult-list-view-splitter").data("kendoSplitter");
                    if (res.data.rows.length > 0) {
                        listviewSplitter.size($("#consult-list-view-splitter-top"), "0%");
                    } else {
                        listviewSplitter.size($("#consult-list-view-splitter-top"), "100%");
                    }
                    return res;
                }
            },
            serverPaging: true,
            pageSize: DEFAULT_PAGE_SIZE,
            requestEnd: (e) => {
                const type = e.type;
                if (type === "read") {
                    // consultTabSide.receiptSearchResultPrint();
                    // consultTabSide.receiptButtonClose();
                }
            }
        });
    },
    receiptDtailClose: () => {
        $("#consult-receipt-detail").hide();
        let splitter = $("#consult-divSplitter").data("kendoSplitter");
        splitter.size($('#consult-receipt-container'), '100%');
        $("#consult-receipt-list").data("kendoListView").refresh();
    },
    receiptTimeLineDataSource: () => {
        return new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/consult/v1/consultList/consultList-select-page",
                    type: "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8'
                },
                parameterMap: (options) => {
                    let boundType = buttonGroupUtils.buttonGroupGetSelectedValue("#consult-receipt-search-boundType");
                    let startDt = kendo.toString(new Date($(`#consult-receipt-search-date-picker-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd');
                    let endDt = kendo.toString(new Date($(`#consult-receipt-search-date-picker-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd');
                    let custId = $("#consult-customer-custId").val();
                    return {
                        startDate: startDt,
                        endDate: endDt,
                        custId:  custId,
                        callClass: "",
                        callCatId:0,
                        callStatus: "",
                        callType: "",
                        parentId: 0,
                        deptId: 0,
                        userId: 0,
                        boundType: boundType === "all" ? "" : boundType,
                        searchType: "BoundTelNo",
                        searchTxt: $('#consult-receipt-search-text').data("kendoTextBox").value(),
                        completeYn: '',
                        sortType: '',
                        page: 1,
                        totalPage: 1000
                    }
                }
            },
            schema: {
                data: 'data.rows',
                id: "callId",
                fields: {
                    callDt: {
                        type: "date"
                    }
                },

                parse: (res) => {
                    if (res.data.rows.length > 0) {
                        res.data.rows.forEach((row) => {
                            if (row.callDt) {
                                row.callDt = new Date(row.callDt);
                            }
                            row.actions = [
                                {
                                    text: "상세보기"
                                }
                            ]
                        })
                    } else {
                        res.data.rows.push({
                            callDt: ""
                        })
                    }
                    return res;
                }
            },
            requestEnd: (e) => {
                const type = e.type;
            },
        });
    },
    receiptButtonClose: () => {
        let splitter = $("#consult-divSplitter").data("kendoSplitter");
        splitter.size($('#consult-receipt-container'), '100%');
        splitter.size($('#consult-receipt-detail'), 0);
        $("#consult-grid-switch-btnBox").show();
        $('#consult-receipt-list').data("kendoListView").refresh();
        $('#consult-receipt-searching-field').hide();
        $('#consult-searching-btn-box').hide();
        $('#consult-searched-btn-box').show();
    },
    receiptListSelect: (custId) => {
        $("#consult-receipt-grid").data("kendoCpGrid").dataSource.page(1);
        $('#consult-receipt-list').data("kendoListView").dataSource.page(1);
        if (custId !== "") {
            $("#consult-receipt-timeline").data("kendoTimeline").dataSource.read();
        }
    },
}

const consultMainOpen = () => {
    consultCustomerInfo.init();
    consultCallRegister.init();
    consultTabSide.init();
    cpProgress('consult-tilelayout', false);
};


if (!String.consultCallRegister) String.consultCallRegister = consultCallRegister;
if (!String.consultMain) String.consultMain = consultMain;
