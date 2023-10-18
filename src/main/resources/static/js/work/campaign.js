$(document).ready(() => {
    let campStepper;
    let campaignTypeData;
    let campaignStatusData;
    let smsLevel3Draw = true; //sms level3 card once draw

    const campaignMain = {
        isSearchBtn: false,
        init: async () => {
            campaignScreenSetting.splitterSetting();
            await campaignSearchBox.init();
            campaignInfo.init();
            custTargetSatisfac.init();
            custTargetSms.init();
            campaignMainGrid.drawGrid();
            custTargetSatisGrid.drawGrid();
            custTargetSmsGrid.drawGrid();
            smsSend.init();
            userDistribution.init();
            userDistributionGrid.drawGrid();

            if (!!$("#campaign-sms-from-tel-no").val() === false) {
                //발신번호 세팅
                let call = new cpDataSource(METHOD.GET, "common/v1/config/CompanySmsTelNo").getDataSource();
                call.read().then(function () {
                    let data = call.data();
                    $("#campaign-sms-from-tel-no").val(data[0].configValue);
                });
            }
        }
    }

    const campaignScreenSetting = {
        splitterSetting: () => {

            $("#campaign-splitter").kendoSplitter({
                orientation: "horizontal",
                panes: [
                    {collapsible: false, size: "100%", resizable: false},
                    {collapsible: false},
                ],
            });


            $("#campaign-splitter-main-grid").kendoSplitter({
                orientation: "vertical",
                panes: [{collapsible: false, size: "46px", resizable: false, scrollable: false}, {collapsible: false}],
            });

            $("#campaign-splitter-detail").kendoSplitter({
                orientation: "horizontal",
                panes: [
                    {collapsible: false, size: "35%"},
                    {collapsible: false, size: "65%", resizable: false},
                ],
            });


        },

        detailOpen: () => {
            smsLevel3Draw = true;
            campaignDetail.level2Hide();
            campaignDetail.level3Hide();
            campaignDetail.stateSectionHide();
            campaignDetail.stepperInit();
            $("#campaign-splitter").data("kendoSplitter").size($("#campaign-splitter-select"), "0%");

            if ($("#campaign-info-campaign-type").data("kendoDropDownList").value() === 'Satisfaction') {
                //저장버튼 누르기 전의 진행상태는 "등록중"
                $("#campaign-info-progress-type").data("kendoRadioGroup").enable(false);
            }
        },

        detailClose: () => {
            $("#campaign-splitter").data("kendoSplitter").size($("#campaign-splitter-select"), "100%");
        }

    }

    const campaignSearchBox = {
        init: async () => {

            let startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            $(`#campaign-search-date-start`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });

            $(`#campaign-search-date-end`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });


            let campaignStatusDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/CampaignStatus", {}).getDataSource();

            await campaignStatusDataSource.read().then(() => {
                campaignStatusData = campaignStatusDataSource.data();
                campaignStatusData = campaignStatusData.sort((a, b) => a.codeIdx - b.codeIdx);
                $("#campaign-progress-drop-down-list").kendoDropDownList({
                    dataSource: campaignStatusData,
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: "solid",
                    autoWidth: true,
                    size: 'small',
                    optionLabel: {codeNm: '전체', codeKey: ""},
                });
            });

            let campaignTypeDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/CampaignType", {}).getDataSource();
            await campaignTypeDataSource.read().then(() => {
                campaignTypeData = campaignTypeDataSource.data();
                $("#campaign-type-drop-down-list").kendoDropDownList({
                    dataSource: campaignTypeData,
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: "solid",
                    autoWidth: true,
                    size: 'small',
                    optionLabel: {codeNm: '전체', codeKey: ""},
                });
            })

            $("#campaign-name-textbox").kendoTextBox({
                size: 'small'
            }).on("keyup", (e) => {
                if (e.keyCode === 13) {
                    $("#campaign-search-button-two").trigger("click");
                }
            });

            $("#campaign-btn-search-box-open").kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: function () {
                    $("#campaign-search-element-two").hide();
                },
            });

            $("#campaign-btn-edit").kendoButton({
                themeColor: "primary",
                click: () => {
                    campaignScreenSetting.detailOpen();
                }
            });

            $("#campaign-search-btn").kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: () => {
                    const grid = $("#campaign-grid").data("kendoCpGrid");
                    if (grid) {
                        campaignMain.isSearchBtn = true;
                        grid.dataSource.read();
                    }
                },
            });

            $("#campaign-search-close-button").kendoButton({
                icon: "close",
                size: 'small',
                click: function () {
                    campaignScreenSetting.searchClose();
                    $("#campaign-search-element-two").show();
                },
            });

        },

    }

    const campaignMainGrid = {

        drawGrid: () => {
            $("#campaign-grid").kendoCpGrid({
                columns: [
                    {
                        field: "campaignTypeNm",
                        title: "캠페인 유형",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "campaignNm",
                        title: "캠페인명",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "startYmd",
                        title: "시작일",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "endYmd",
                        title: "종료일",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "campaignStatusNm",
                        title: "진행상태",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: campaignMainGrid.dataSource(),
                change: (e) => {
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
                    const getCampaignItem = new cpDataSource(METHOD.GET, `/work/v1/campaign/select/${selectRows.campaignUuid}`).getDataSource();
                    getCampaignItem.read().then(() => {
                        const item = getCampaignItem.data()[0];
                        $("#campaign-contents-title").text(item.campaignNm);
                        $("#campaign-campaign-id").val(item.campaignId);
                        $("#campaign-regist-step").val(item.registStep);
                        $("#campaign-info-campaign-name").val(item.campaignNm);
                        $("#campaign-info-campaign-name").data("kendoTextBox").value(item.campaignNm);
                        $("#campaign-info-campaign-type").data("kendoDropDownList").value(item.campaignType);
                        $("#campaign-info-date-range-picker").data("kendoDateRangePicker").range({
                            start: new Date(item.startYmd.substring(0, 4), Number(item.startYmd.substring(4, 6)) - 1, item.startYmd.substring(6, 8)),
                            end: new Date(item.endYmd.substring(0, 4), Number(item.endYmd.substring(4, 6)) - 1, item.endYmd.substring(6, 8))
                        });

                        campaignScreenSetting.detailOpen();

                        const progressType = $("#campaign-info-progress-type").data("kendoRadioGroup");
                        progressType.value(item.campaignStatus);
                        $("#campaign-info-campaign-textarea").data('kendoTextArea').value(item.description);

                        switch (progressType.value()) {
                            case"Processing":
                                $("#campaign-target-btn-div").hide();
                                $("#campaign-satisfaction-consult-btn-div").hide();
                                progressType.enable(true);
                                break;
                            case"Stop":
                                $("#campaign-target-btn-div").show();
                                $("#campaign-satisfaction-consult-btn-div").show();
                                progressType.enable(true);
                                break;
                            case"Complete":
                                $("#campaign-info-campaign-name").data("kendoTextBox").setOptions({
                                    fillMode: "flat"
                                });
                                $("#campaign-info-campaign-name").data("kendoTextBox").enable(false);
                                $("#campaign-info-campaign-textarea").data('kendoTextArea').setOptions({
                                    fillMode: "flat"
                                })
                                $("#campaign-info-campaign-textarea").data('kendoTextArea').enable(false);
                                $("#campaign-target-btn-div").hide();
                                $("#campaign-satisfaction-consult-btn-div").hide();
                                $("#campaign-info-btn-update").show();
                                $("#campaign-sms-send-save").hide();
                                progressType.enable(true);
                                break;
                            default :
                                $("#campaign-target-btn-div").show();
                                $("#campaign-satisfaction-consult-btn-div").show();
                                $("#campaign-sms-send-save").show();
                                break;
                        }

                        if (progressType.value() !== "Ready") {
                            progressType.enableItem(false, 0);
                        }


                        let registStep = $("#campaign-regist-step").val();
                        let registLevel = campaignDetail.registLevelCheck(registStep);
                        if (registLevel === 2) {
                            campaignDetail.level2Show(registStep);
                        } else if (registLevel === 3) {
                            campaignDetail.level2Show(registStep);
                            campaignDetail.level3Show(registStep);
                        }

                    })
                },
                height: "100%",
                selectable: "single",
                resizable: false,
                pageable: {
                    refresh: true
                },
                dataBound: () => {
                    campaignScreenSetting.detailClose();
                },
            });
        },


        dataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/campaign/select/page",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: () => {
                            if (campaignMain.isSearchBtn) {
                                campaignMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },

                    parameterMap: (options) => {
                        return {
                            startDate: kendo.toString(
                                $("#campaign-search-date-start").data("kendoDatePicker").value(),
                                'yyyy-MM-dd'
                            ),
                            endDate: kendo.toString(
                                $("#campaign-search-date-end").data("kendoDatePicker").value(),
                                'yyyy-MM-dd'
                            ),
                            campaignStatus: $("#campaign-progress-drop-down-list").data("kendoDropDownList").value(),
                            campaignType: $("#campaign-type-drop-down-list").data("kendoDropDownList").value(),
                            campaignNm: $("#campaign-name-textbox").data("kendoTextBox").value(),
                            sortType: "",
                            outputYn: "Y",
                            page: options.page,
                            totalPage: options.pageSize,
                        }
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        campaignTypeNm: {type: 'string'},
                        campaignNm: {type: 'string'},
                        startYmd: {type: 'date'},
                        endYmd: {type: 'date'},
                        campaignStatusNm: {type: 'string'},
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            row.startYmd = row.startYmd.substring(0, 4) + '-' + row.startYmd.substring(4, 6) + '-' + row.startYmd.substring(6, 8);
                            row.endYmd = row.endYmd.substring(0, 4) + '-' + row.endYmd.substring(4, 6) + '-' + row.endYmd.substring(6, 8);
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE
            })
        }
    }

    const campaignDetail = {

        stepperInit: () => {
            campStepper = $("#campaign-state-stepper").kendoStepper({
                steps: [{
                    label: $("#campaign-info-header").text(),
                    icon: "dictionary-add"
                }]
            }).data("kendoStepper");
        },

        stateSectionHide: () => {
            $("#campaign-satisfaction-state-total-grid").hide();
            $("#campaign-sms-state-total-grid").hide();
            $("#campaign-state-counselor-counting-grid").hide();
        },

        level2Hide: () => {
            $("#campaign-card-level2").hide();
            $("#campaign-satisfaction-target").hide();
            $("#campaign-sms-target").hide();
        },

        level3Hide: () => {
            $("#campaign-card-level3").hide();
            $("#campaign-user-distribution").hide();
            $("#campaign-sms-send").hide();
            $("#campaign-state-counselor-counting-grid").hide();
        },

        level2Show: (registStep, level = 2) => {
            const progressType = $("#campaign-info-progress-type").data("kendoRadioGroup");
            $("#campaign-campaign-type").val($("#campaign-info-campaign-type").data("kendoDropDownList").value());
            $("#campaign-info-btn-save").hide();
            $("#campaign-target-btn-div").show();


            if (progressType.value() !== "Complete") {
                $("#campaign-info-btn-delete").show(); //삭제버튼
                $("#campaign-info-btn-update").show(); // 수정버튼
            }

            if (campaignDetail.registStepCheck(registStep, level) === "satisfactionLevel2") {
                campaignDetail.satisfactionTargetShow(); //만족도 card
            } else if (campaignDetail.registStepCheck(registStep, level) === "smsLevel2") {
                $("#campaign-info-date-range-picker").data("kendoDateRangePicker").enable(false);
                $("#campaign-info-progress-type").data("kendoRadioGroup").enable(false);
                campaignDetail.smsTargetShow(); //sms card
            }
            targetExtractPopup.windowPopupInit();
            excelUploadPopup.windowPopupSetting();

            $("#campaign-info-campaign-type").data("kendoDropDownList").enable(false);
        },

        level3Show: (registStep, level = 3) => {
            registStep = $("#campaign-regist-step").val();
            const progressType = $("#campaign-info-progress-type").data("kendoRadioGroup");
            if (progressType.value() === "Ready") {
                $("#campaign-info-progress-type").data("kendoRadioGroup").enable(true);
            }
            if (campaignDetail.registStepCheck(registStep, level) === "satisfactionLevel3") {
                campaignDetail.userDistributionShow();
                $("#campaign-state-counselor-counting-grid").show();
            } else if (campaignDetail.registStepCheck(registStep, level) === "smsLevel3") {
                campaignDetail.smsSendShow();
            }
        },

        registStepCheck: (registStep, level) => {
            if (level === 2) {
                if (registStep === "SatisfactionTarget" || registStep === "AgentSetting" || registStep === "SatisfactionComplete") {
                    return "satisfactionLevel2";
                } else if (registStep === "SmsTarget" || registStep === "SmsSending" || registStep === "SmsComplete") {
                    return "smsLevel2";
                }
            } else if (level === 3) {
                if (registStep === "AgentSetting" || registStep === "SatisfactionComplete") {
                    return "satisfactionLevel3";
                } else if (registStep === "SmsSending" || registStep === "SmsComplete") {
                    return "smsLevel3";
                }
            }
        },

        registLevelCheck: (registStep) => {
            if (registStep === "SatisfactionTarget" || registStep === "SmsTarget") {
                return 2;
            } else if (registStep === "AgentSetting" || registStep === "SatisfactionComplete" || registStep === "SmsSending" || registStep === "SmsComplete") {
                return 3;
            }
        },

        satisfactionTargetShow: () => {
            $("#campaign-satisfaction-target-grid").data("kendoCpGrid").setDataSource(custTargetSatisGrid.satisfactionTargetDataSource());
            $("#campaign-satisfaction-target-grid").data("kendoCpGrid").dataSource.read();
            custTargetSatisfac.targetSatisLeftGridInit();
            $("#campaign-card-level2").show();
            $("#campaign-satisfaction-target").show();
            $("#campaign-satisfaction-state-total-grid").show();
            custTargetSatisGrid.satisfacCheckedItems = [];
            $("#campaign-sms-target").hide();
            $("#campaign-sms-state-total-grid").hide();
            if (campStepper.options.steps.length <= 1) {
                campStepper.insertAt(1, {
                    label: $("#campaign-target-header").text(),
                    icon: "user",
                })
                campStepper.insertAt(2, {
                    label: $("#campaign-satisfaction-consult-header").text(),
                    icon: 'sort-asc',
                });
            }
            campStepper.next();
            campStepper.steps()[0].enable(false);
            campStepper.steps()[2].enable(false);
        },

        smsTargetShow: () => {
            $("#campaign-sms-target-grid").data("kendoCpGrid").setDataSource(custTargetSmsGrid.smsTargetDataSource());
            $("#campaign-sms-target-grid").data("kendoCpGrid").dataSource.read();
            custTargetSms.targetSmsLeftGridInit();
            custTargetSmsGrid.smsCheckedItems = [];
            $("#campaign-card-level2").show();
            $("#campaign-satisfaction-target").hide();
            $("#campaign-sms-target").show();
            $("#campaign-satisfaction-state-total-grid").hide();
            $("#campaign-sms-state-total-grid").show();


            if (campStepper.options.steps.length <= 1) {
                campStepper.insertAt(1, {
                    label: $("#campaign-target-header").text(),
                    icon: "user",
                })
                campStepper.insertAt(2, {
                    label: $("#campaign-sms-send-header").text(),
                    iconTemplate: '<i class="bi bi-send"></i>',
                });
            }
            campStepper.next();
            campStepper.steps()[0].enable(false);
            campStepper.steps()[2].enable(false);
        },

        targetCommonFooterInit: () => {
            $("#campaign-satisfaction-btn-extract").kendoButton({
                themeColor: 'primary'
            });
            $("#campaign-satisfaction-btn-extract").off("click").on("click", function () {
                $("#campaign-extract-target-window").data("kendoWindow").refresh().center().open();
            });


            $("#campaign-satisfaction-btn-excel-upload").kendoButton({
                icon: "download",
                themeColor: 'success',
            });
            $("#campaign-satisfaction-btn-excel-upload").off("click").on("click", function () {
                $("#campaign-excel-upload-window").data("kendoWindow").refresh().center().open();
            });


            $("#campaign-satisfaction-btn-delete-select").kendoButton();
            $("#campaign-satisfaction-btn-delete-select").off("click").on("click", function () {
                campaignDetail.targetGridDeleteCheck('select');
            });

            $("#campaign-satisfaction-btn-delete-all").kendoButton();
            $("#campaign-satisfaction-btn-delete-all").off("click").on("click", function () {
                message.callBackConfirm({
                    msg: '검색조건과 상관없이 분배되지 않은 대상자가 전체삭제 됩니다.\n삭제하시겠습니까?', callback: function () {
                        campaignDetail.targetGridDeleteCheck('all');
                    }
                })
            });
        },

        commonGridDataBound: (e, checkedItems) => {
            const view = e.sender.dataSource.view();
            for (let i = 0; i < view.length; i++) {
                if (checkedItems[view[i].id] && checkedItems[view[i].id].checked) {
                    e.sender.tbody.find("tr[data-uid='" + view[i].uid + "']")
                        .addClass("k-state-selected")
                        .find(".k-checkbox-md")
                        .attr("checked", "checked");
                }
            }
        },

        commonGridSelectClick: (thisObject, gridId, checkedItems, checkAllId) => {
            const checked = thisObject.checked;
            const row = $(thisObject).closest("tr");
            const grid = $(gridId).data("kendoCpGrid");
            const dataItem = grid.dataItem(row);
            checkedItems[dataItem.id] = {data: dataItem, checked: checked};
            if (checked) {
                row.addClass("k-state-selected");
                let checkHeader = true;

                $.each(grid.items(), function (index, item) {
                    if (!($(item).hasClass("k-state-selected"))) {
                        checkHeader = false;
                    }
                });
                $(checkAllId)[0].checked = checkHeader;
            } else {
                row.removeClass("k-state-selected");
                $(checkAllId)[0].checked = false;
            }

            return checkedItems;
        },

        commonGridCheckAll: (checked, selectCheckClass) => {
            $(selectCheckClass).each(function (idx, item) {
                if (checked) {
                    if (!($(item).closest('tr').is('.k-state-selected'))) {
                        $(item).click();
                    }
                } else {
                    if ($(item).closest('tr').is('.k-state-selected')) {
                        $(item).click();
                    }
                }
            });
        },

        registStepUpdate: (cancelYn = 'N', callbackFunc) => {
            let param = {
                campaignId: Number($("#campaign-campaign-id").val()),
                cancelYn: cancelYn
            };

            const registStepUpdateDataSource = new cpDataSource(METHOD.PUT, "/work/v1/campaign/regist-step/update", param).getDataSource();
            registStepUpdateDataSource.read().then(() => {
                $("#campaign-regist-step").val(registStepUpdateDataSource.data()[0]);
                if (!!callbackFunc) {
                    callbackFunc($("#campaign-regist-step").val())
                }
            })
        },

        targetRegistStepCheck: (totalCount) => {
            //총대상자가 0이고, 3단계 일때만 실행
            if (totalCount === 0 && $("#campaign-regist-step").val() === "AgentSetting") {
                $("#campaign-info-btn-delete").show();
                campaignDetail.registStepUpdate("Y");
                campStepper.steps()[1].enable(true);
                campStepper.steps()[0].enable(false);
                campStepper.steps()[2].enable(false);
                campStepper.select(1);
                campaignDetail.level3Hide();
                campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.stateGridSetting, "length");
                let progressType = $("#campaign-info-progress-type").data("kendoRadioGroup");
                if (progressType.value() === "Ready") {
                    $("#campaign-info-progress-type").data("kendoRadioGroup").enable(false);
                }
            } else {
                campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.stateGridSetting, "length");
            }
        },

        stateGridSetting: (totalCount, devideTotalCount, completeCustomer) => {
            const stateGrid = $("#campaign-satisfaction-state-total-grid").data("kendoCpGrid");
            if (totalCount !== undefined) stateGrid.dataSource.data()[0].totalTarget = totalCount;
            if (devideTotalCount !== undefined) stateGrid.dataSource.data()[0].disCustomer = devideTotalCount;
            if (completeCustomer !== undefined) stateGrid.dataSource.data()[0].completeCustomer = completeCustomer;
            stateGrid.dataSource.data()[0].unDisCustomer = stateGrid.dataSource.data()[0].totalTarget - stateGrid.dataSource.data()[0].disCustomer;
            stateGrid.refresh();
        },

        targetGridDeleteCheck: (deleteType) => {
            let paramList = [];
            let typeCheck;
            let errorCheck = false;
            let items;
            let registStepCheck = campaignDetail.registStepCheck($("#campaign-regist-step").val(), 2);
            if (registStepCheck === "satisfactionLevel2") {
                items = custTargetSatisGrid.satisfacCheckedItems;
                custTargetSatisGrid.satisfacCheckedItems = [];
                $("#campaign-satisfaction-target-check-all").prop("checked", false);
                $("#campaign-satisfaction-target-grid").data("kendoCpGrid").dataSource.read();
                typeCheck = 'satisfaction';
            } else if (registStepCheck === "smsLevel2") {
                items = custTargetSmsGrid.smsCheckedItems;
                custTargetSmsGrid.smsCheckedItems = [];
                $("#campaign-sms-target-check-all").prop("checked", false);
                $("#campaign-sms-target-grid").data("kendoCpGrid").dataSource.read();
                typeCheck = 'sms';
            }

            for (let i = 0; i < items.length; i++) {
                if (items[i] === undefined) {
                    continue;
                } else if (items[i].checked) {
                    if (!!items[i].data) {
                        if (typeCheck === "satisfaction" && items[i].data.distributionYn === "Y") {
                            const obj = {msg: "상담사가 분배된 대상자는 삭제가 불가합니다.", type: "error"};
                            message.notification(obj);
                            errorCheck = true;
                            break;
                        } else if (deleteType === "select") {
                            const param = {
                                campaignId: Number($("#campaign-campaign-id").val()),
                                campaignCustId: items[i].data.campaignCustId,
                            }
                            paramList.push(param);
                        }
                    }
                }
            }

            if (!errorCheck) {
                //상담사가 분배되지 않은 list일 경우
                if (deleteType === "all") {
                    //전체삭제일 경우에 paramList 변경
                    paramList = [];//초기화
                    const param = {};
                    param.campaignId = Number($("#campaign-campaign-id").val());
                    param.campaignCustId = 0; //전체삭제일 경우 0값
                    paramList.push(param);
                }
                //deleteType에 따라 제거
                campaignDetail.targetDelete(paramList, typeCheck);
            }

        },

        targetDelete: (data, typeCheck) => {
            if (data.length > 0) {
                let targetDelete = new cpDataSource(METHOD.DELETE, "/work/v1/campaign/customer/delete", data).getDataSource();
                targetDelete.read().then(() => {
                    message.notification({msg: "삭제되었습니다.", type: "success"});
                    $('#campaign-satisfaction-target-grid').data('kendoCpGrid').dataSource.read();
                    $('#campaign-sms-target-grid').data('kendoCpGrid').dataSource.read();
                    if (typeCheck === "satisfaction") {
                        campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.targetRegistStepCheck, "length");
                    } else if (typeCheck === "sms") {
                        campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.smsTargetResistStepCheck, "length");
                        campaignDetail.smsStateGridSetting();
                    }

                });
            } else {
                const obj = {msg: "한명 이상의 대상자를 선택해야 합니다.", type: "error"};
                message.notification(obj);
            }
        },

        callBackTotalTarget: (registStep, callbackFunc, type) => {
            let targetExtractData;
            if (campaignDetail.registStepCheck(registStep, 2) === "satisfactionLevel2") {
                targetExtractData = custTargetSatisGrid.satisfactionTargetDataSource();
                // 만족도 대상자추출 dataSource
            } else if (campaignDetail.registStepCheck(registStep, 2) === "smsLevel2") {
                targetExtractData = custTargetSmsGrid.smsTargetDataSource();//sms 대상자추출 dataSource
            }

            targetExtractData.read({page: 1, pageSize: 10000, defaultSearchYn: "Y"}).then(() => {
                if (type === "length") {
                    callbackFunc(targetExtractData.data().length);
                } else if (type === "data") {
                    callbackFunc(targetExtractData.data());
                }
            })
        },

        userDistributionShow: () => {
            $("#campaign-card-level3").show();
            $("#campaign-user-distribution").show();
            $("#campaign-state-counselor-counting-grid").show();
            $("#campaign-info-btn-delete").hide();
            stateCounselorGrid.drawGrid();
            $("#campaign-user-distribution-grid").data("kendoCpGrid").setDataSource(userDistributionGrid.userDistributionDataSource());
            campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.stateGridSetting, "length");
            campStepper.steps()[2].enable(true);
            campStepper.steps()[0].enable(false);
            campStepper.steps()[1].enable(false);
            campStepper.next();
        },

        smsSendShow: () => {

            $("#campaign-card-level3").show();
            $("#campaign-sms-send").show();
            $("#campaign-info-btn-delete").hide(); //삭제버튼 enable
            campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.smsStateGridSetting, "data");
            if (smsLevel3Draw) {
                smsLevel3Draw = false;
            } else {
                $("#campaign-sms-send-content").val("");
                $("#campaign-sms-template-list").data("kendoDropDownList").value("0");
            }

            campStepper.steps()[2].enable(true);
            campStepper.steps()[0].enable(false);
            campStepper.steps()[1].enable(false);
            campStepper.select(2);
        },

        smsTargetResistStepCheck: (totalData) => {

            if (totalData === 0 && $("#campaign-regist-step").val() === "SmsSending") {
                $("#campaign-info-btn-delete").show();
                campaignDetail.registStepUpdate("Y");
                campStepper.steps()[1].enable(true);
                campStepper.steps()[0].enable(false);
                campStepper.steps()[2].enable(false);
                campStepper.select(1);
                campaignDetail.level3Hide();
            }
        },

        smsStateGridSetting: () => {
            const smsResultDataSource = new cpDataSource(METHOD.GET, `/work/v1/campaign/sms/result/${Number($("#campaign-campaign-id").val())}`, {}).getDataSource();
            smsResultDataSource.read().then(() => {
                const resultData = smsResultDataSource.data();
                const stateGrid = $("#campaign-sms-state-total-grid").data("kendoCpGrid");
                resultData[0] !== null ? stateGrid.setDataSource(resultData) : stateGrid.setDataSource([]);
            })
            //준비, 성공, 대기중, 실패는 코드값이 정해지면, 전체데이터에서 해당 코드값 수에 따라 제어하기
        }

    }

    const campaignInfo = {
        init: () => {
            $("#campaign-info-form").kendoValidator({
                messages: {
                    required: (input) => {
                        let title = "";
                        if (input.is("[name=campaign-name]")) title = "캠페인명은 ";
                        return title + "필수 입력입니다.";
                    },
                }
            });

            $("#campaign-info-date-range-picker").kendoDateRangePicker({
                format: "yyyy-MM-dd",
                fillMode: "solid",
                size: "large",
                labels: false,
                range: {
                    start: new Date(),
                    end: new Date(),
                },
            });

            $("#campaign-info-campaign-name").kendoTextBox({});

            $("#campaign-info-campaign-type").kendoDropDownList({
                dataSource: campaignTypeData,
                dataTextField: "codeNm",
                dataValueField: "codeKey",
                fillMode: "flat",
                change: (e) => {
                    const dataRangePicker = $("#campaign-info-date-range-picker").data("kendoDateRangePicker");
                    const radioGroup = $("#campaign-info-progress-type").data("kendoRadioGroup");
                    if (e.sender.value() !== "Happycall") {
                        radioGroup.value("Ready");
                        radioGroup.enable(false);
                        dataRangePicker.enable(true);
                    } else {
                        const now = new Date();
                        dataRangePicker.range({
                            start: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                            end: new Date(now.getFullYear(), now.getMonth(), now.getDate())
                        });
                        dataRangePicker.enable(false);
                        radioGroup.value("Ready");
                        radioGroup.enable(false);
                    }
                },
            });

            $("#campaign-info-progress-type").kendoRadioGroup({
                items: campaignInfo.radioGroupMakeItems(campaignStatusData),
                value: "Ready",
                layout: "horizontal",
            });

            $("#campaign-management-close").on('click', () => {
                campaignInfo.campaignInfoClear();
                smsSend.smsSendClear();
                custTargetSatisfac.satisTargetClear();
                custTargetSms.smsTargetClear();
                $("#campaign-satisfaction-target-check-all").prop("checked", false);
                $("#campaign-sms-target-check-all").prop("checked", false);
                $("#campaign-agent-check-all").prop("checked", false);
                campaignScreenSetting.detailClose();
                $("#campaign-grid").data("kendoCpGrid").dataSource.read();
            });

            $("#campaign-info-campaign-textarea").kendoTextArea({
                rows: 13,
                cols: 10,
                resizable: "none"
            });

            $("#campaign-info-campaign-textarea").on("keyup", function () {
                const contents = $("#campaign-info-campaign-textarea").val();
                const cutString = smsSend.smsContentsSet(contents);
                $("#campaign-info-campaign-textarea").val(cutString);
            });

            $("#campaign-info-btn-save").kendoButton({
                themeColor: "primary",
                click: () => {
                    let valid = $("#campaign-info-form").data("kendoValidator").validate();
                    if (valid) {
                        campaignInfo.campaignInfoInsert();
                    }


                }
            });

            $("#campaign-info-btn-update").kendoButton({
                themeColor: "primary",
                click: () => {
                    campaignInfo.updateCampaign("update");
                }
            });

            $("#campaign-info-btn-delete").kendoButton({
                click: () => {
                    message.callBackConfirm({
                        msg: '캠페인을 삭제하시겠습니까?', callback: function () {
                            campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignInfo.campaignInfoDelete, "length")
                        }
                    })
                }
            });


        },

        radioGroupMakeItems: (data) => {
            let radioItem = [];

            data.forEach((e) => {
                let items = {};
                items.value = e.codeKey;
                items.label = e.codeNm;
                radioItem.push(items);
            })
            return radioItem;
        },

        campaignInfoClear: () => {
            let validator = $("#campaign-info-form").data("kendoValidator");
            validator.reset();
            $("#campaign-contents-title").text("캠페인만들기");
            $("#campaign-info-campaign-name").data("kendoTextBox").value("");
            let startDate = new Date();
            $("#campaign-info-date-range-picker").data("kendoDateRangePicker").range({
                start: startDate,
                end: new Date()
            });
            $("#campaign-info-campaign-type").data("kendoDropDownList").value("");
            $("#campaign-info-campaign-textarea").data("kendoTextArea").value("");
            $("#campaign-info-progress-type").data("kendoRadioGroup").value("Ready");
            $("#campaign-info-progress-type").data("kendoRadioGroup").enable(false);

            $("#campaign-info-campaign-name").data("kendoTextBox").enable(true);
            $("#campaign-info-campaign-type").data("kendoDropDownList").enable(true);
            $("#campaign-info-date-range-picker").data("kendoDateRangePicker").enable(true);
            $("#campaign-info-campaign-textarea").data("kendoTextArea").enable(true);

            $("#campaign-satisfaction-consult-dis-div").show();
            $("#campaign-satisfaction-consult-collection-div").hide();
            $("#campaign-satisfaction-consult-redistribution-div").hide();

            $("#campaign-info-btn-delete").hide();
            $("#campaign-info-btn-update").hide();
            $("#campaign-info-btn-save").show();
        },

        campaignInfoInsert: () => {
            let param = {
                campaignNm: $("#campaign-info-campaign-name").data("kendoTextBox").value(),
                campaignType: $("#campaign-info-campaign-type").data("kendoDropDownList").value(),
                startDate: kendo.toString($("#campaign-info-date-range-picker").data("kendoDateRangePicker").range().start, 'yyyy-MM-dd'),
                endDate: kendo.toString($("#campaign-info-date-range-picker").data("kendoDateRangePicker").range().end, 'yyyy-MM-dd'),
                campaignStatus: $("#campaign-info-progress-type").data("kendoRadioGroup").value(),
                description: $("#campaign-info-campaign-textarea").data('kendoTextArea').value(),
                useYn: "Y",
                questionId: 0
            }
            const campaignInsert = new cpDataSource(METHOD.POST, "/work/v1/campaign/insert", param).getDataSource();
            campaignInsert.read().then(() => {
                const resultData = campaignInsert.data()[0];
                $("#campaign-contents-title").text(resultData.campaignNm);
                $("#campaign-campaign-id").val(resultData.campaignId);
                $("#campaign-regist-step").val(resultData.registStep);
                $("#campaign-info-progress-type").data("kendoRadioGroup").enable(true);//진행상태
                campaignDetail.level2Show($("#campaign-regist-step").val());
                const obj = {msg: "캠페인이 저장되었습니다.", type: "success"};
                message.notification(obj);
            })
        },

        campaignInfoDelete: (length) => {
            if (length === 0) {
                campaignInfo.updateCampaign("delete");
                $("#campaign-management-close").trigger("click");
                $("#campaign-grid").data("kendoCpGrid").dataSource.read();
            } else {
                const obj = {msg: "캠페인 대상자가 존재합니다.", type: "error"};
                message.notification(obj);
            }
        },

        updateCampaign: (mode) => {
            const updateParam = {};
            let obj = {};
            let messageCheck = true;
            if (mode === "delete") {
                updateParam.campaignId = Number($("#campaign-campaign-id").val());
                updateParam.campaignNm = "required";
                updateParam.campaignType = "required";
                updateParam.campaignStatus = "";
                updateParam.description = "";
                updateParam.useYn = "N";
                updateParam.delYn = "Y";
                obj = {msg: "캠페인이 삭제되었습니다.", type: "success"};
            } else if (mode === "update") {
                updateParam.campaignId = Number($("#campaign-campaign-id").val());
                updateParam.campaignNm = $("#campaign-info-campaign-name").data("kendoTextBox").value();
                updateParam.campaignType = $("#campaign-info-campaign-type").data("kendoDropDownList").value();
                updateParam.campaignStatus = $("#campaign-info-progress-type").data("kendoRadioGroup").value();
                updateParam.startDate = kendo.toString(
                    $("#campaign-info-date-range-picker").data("kendoDateRangePicker").range().start,
                    'yyyy-MM-dd'
                );
                updateParam.endDate = kendo.toString(
                    $("#campaign-info-date-range-picker").data("kendoDateRangePicker").range().end,
                    'yyyy-MM-dd'
                );
                updateParam.description = $("#campaign-info-campaign-textarea").data('kendoTextArea').value();
                updateParam.useYn = "Y";
                updateParam.delYn = "N";
                obj = {msg: "캠페인이 수정되었습니다.", type: "success"};
            } else if (mode === "statusUpdate") {
                //sms 발송이후에 사용되는 상태업데이트
                updateParam.campaignId = Number($("#campaign-campaign-id").val());
                updateParam.campaignNm = $("#campaign-info-campaign-name").data("kendoTextBox").value();
                updateParam.campaignType = $("#campaign-info-campaign-type").data("kendoDropDownList").value();
                updateParam.campaignStatus = $("#campaign-info-progress-type").data("kendoRadioGroup").value();
                updateParam.startDate = kendo.toString(
                    $("#campaign-info-date-range-picker").data("kendoDateRangePicker").range().start,
                    'yyyy-MM-dd'
                );
                updateParam.endDate = kendo.toString(
                    $("#campaign-info-date-range-picker").data("kendoDateRangePicker").range().end,
                    'yyyy-MM-dd'
                );
                updateParam.description = $("#campaign-info-campaign-textarea").data('kendoTextArea').value();
                updateParam.useYn = "Y";
                updateParam.delYn = "N";
                messageCheck = false;
            }


            const campaignUpdate = new cpDataSource(METHOD.PUT, "/work/v1/campaign/update", updateParam).getDataSource();
            campaignUpdate.read().then(() => {
                if (messageCheck) {
                    const progressType = $("#campaign-info-progress-type").data("kendoRadioGroup");
                    if (mode !== "delete") {
                        if (progressType.value() !== "Ready") {
                            progressType.enableItem(false, 0);
                        }
                        if (progressType.value() === "Processing") {
                            $("#campaign-target-btn-div").hide();
                            $("#campaign-satisfaction-consult-btn-div").hide();
                        } else if (progressType.value() === "Stop") {
                            $("#campaign-target-btn-div").show();
                            $("#campaign-satisfaction-consult-btn-div").show();
                        } else if (progressType.value() === "Complete") {
                            $("#campaign-target-btn-div").hide();
                            $("#campaign-satisfaction-consult-btn-div").hide();
                        }
                    }

                    message.notification(obj);
                }
            })
        },
    }

    const custTargetSatisfac = {
        init:  () => {
            let satisfactionStatusSource = new cpDataSource(METHOD.GET, "/common/v1/code/CampaignCustStatus", {}).getDataSource();
             satisfactionStatusSource.read().then(() => {
                let statusData = [...satisfactionStatusSource.data()];
                statusData.unshift({codeNm: '전체', codeKey: 'all'});
                $("#campaign-satisfaction-target-progress-type").kendoDropDownTree({
                    dataSource: statusData,
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: 'solid',
                    autoWidth: true,
                    size: 'small',
                    clearButton: false,
                    value: 'all'
                })
            })

            $("#campaign-satisfaction-target-search-type").kendoDropDownList({
                dataSource: [{codeNm: "고객명", codeKey: "CustNm"}, {
                    codeNm: "수/발신번호",
                    codeKey: "BoundTelNo"
                }, {codeNm: "일반전화", codeKey: "TelNo"}, {codeNm: "휴대폰", codeKey: "HpNo"}],
                dataTextField: "codeNm",
                dataValueField: "codeKey",
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
            });

            $("#campaign-satisfaction-target-search-textbox").kendoTextBox({
                size: 'small'
            }).on("keyup", (e) => {
                if (e.keyCode === 13) {
                    $("#campaign-satisfaction-target-search-btn").trigger("click");
                }
            });

            let defaultUserParam = {
                deptId: 0,
                parentId: 0,
                ctiYn: "Y",
                useYn: "Y",
                sortType: "",
            };
            const satisfactionAgentSource = new cpDataSource(METHOD.GET, `/work/v1/campaign/reservation-user-select`, defaultUserParam).getDataSource();
             satisfactionAgentSource.read().then(() => {
                const agentData = satisfactionAgentSource.data();

                $("#campaign-satisfaction-target-agent").kendoDropDownList({
                    dataSource: agentData,
                    dataTextField: "userNm",
                    dataValueField: "userId",
                    fillMode: 'solid',
                    autoWidth: true,
                    size: 'small',
                    optionLabel: {userNm: '전체', userId: 0},
                    optionLabelTemplate: '<span style="">#:userNm #</span>'
                });
            })

            $("#campaign-satisfaction-target-search-btn").kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: () => {
                    const grid = $("#campaign-satisfaction-target-grid").data("kendoCpGrid");
                    grid.dataSource.read();
                }
            });

            campaignDetail.targetCommonFooterInit();


        },


        targetSatisLeftGridInit: () => {
            $("#campaign-satisfaction-state-total-grid").kendoCpGrid({
                columns: [
                    {
                        field: "totalTarget",
                        title: "총대상자",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "disCustomer",
                        title: "분배",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "unDisCustomer",
                        title: "미분배",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "completeCustomer",
                        title: "완료",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: {
                    data: [
                        {totalTarget: 0, disCustomer: 0, unDisCustomer: 0, completeCustomer: 0},
                    ],
                },
                scrollable: false,
            })
        },

        satisTargetClear: () => {
            $("#campaign-satisfaction-target-progress-type").data("kendoDropDownTree").value("all");
            $("#campaign-satisfaction-target-search-type").data("kendoDropDownList").value("CustNm");
            $("#campaign-satisfaction-target-search-textbox").data("kendoTextBox").value("");
            $("#campaign-satisfaction-target-agent").data("kendoDropDownList").value(0);
        }
    }

    const custTargetSatisGrid = {
        satisfacCheckedItems: [],
        drawGrid: () => {
            $("#campaign-satisfaction-target-grid").kendoCpGrid({
                columns: [
                    {
                        field: "select All",
                        headerTemplate: "<input type='checkbox' id='campaign-satisfaction-target-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: function (dataItem) {
                            return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md campaign-satisfaction-target-select-customer'>";
                        },
                        attributes: {style: 'text-align:center'},
                        width: 50,
                    },
                    {
                        field: "custNm",
                        title: "고객명",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "boundTelNo",
                        title: "수/발신번호",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "telNo",
                        title: "일반전화",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "hpNo",
                        title: "휴대폰",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "userNm",
                        title: "상담사",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "distributionDt",
                        title: "분배일자",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "campaignCustStatusNm",
                        title: "진행상태",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: [],
                resizable: false,
                height: "calc(100vh - 520px)",
                pageable: {
                    refresh: true,
                    responsive: false
                },
                dataBound: (e) => {
                    campaignDetail.commonGridDataBound(e, custTargetSatisGrid.satisfacCheckedItems);
                }
            }).on("click", ".campaign-satisfaction-target-select-customer", function () {
                 campaignDetail.commonGridSelectClick(
                    this,
                    "#campaign-satisfaction-target-grid",
                    custTargetSatisGrid.satisfacCheckedItems,
                    "#campaign-satisfaction-target-check-all"
                );
            }).on("change", "#campaign-satisfaction-target-check-all", (e) => {
                const checked = e.target.checked;
                campaignDetail.commonGridCheckAll(checked, '.campaign-satisfaction-target-select-customer');
            })
        },

        satisfactionTargetDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/campaign/cust/select/page",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },

                    parameterMap: (options) => {
                        return {
                            campaignId: Number($("#campaign-campaign-id").val()),
                            campaignCustStatus: $('#campaign-satisfaction-target-progress-type').data('kendoDropDownTree').value() === 'all' || options.defaultSearchYn === "Y" ? '' : $('#campaign-satisfaction-target-progress-type').data('kendoDropDownTree').value(),
                            smsResult: '',
                            userId: options.defaultSearchYn === "Y" ? '' : $("#campaign-satisfaction-target-agent").data("kendoDropDownList").value(),
                            searchType: options.defaultSearchYn === "Y" ? '' : $("#campaign-satisfaction-target-search-type").data("kendoDropDownList").value(),
                            searchTxt: options.defaultSearchYn === "Y" ? '' : $("#campaign-satisfaction-target-search-textbox").data("kendoTextBox").value(),
                            sortType: "",
                            outputYn: "Y",
                            page: options.page,
                            totalPage: options.pageSize,
                        }
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        custNm: {type: 'string'},
                        boundTelNo: {type: 'string'},
                        telNo: {type: 'string'},
                        hpNo: {type: 'string'},
                        userNm: {type: 'string'},
                        distributionDt: {type: 'date'},
                        campaignCustStatusNm: {type: 'string'},
                        id: "campaignCustId",
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (!!row.distributionDt) row.distributionDt = kendo.toString(new Date(row.distributionDt), "yyyy-MM-dd HH:mm")
                        })
                        return res;
                    },
                },
                serverPaging: true,
                pageSize: 10,
            })
        },
    }

    const custTargetSms = {
        init:  () => {
            let smsResultSource = new cpDataSource(METHOD.GET, "/common/v1/code/SmsResult", {}).getDataSource();
             smsResultSource.read().then(() => {
                $("#campaign-sms-target-send-result").kendoDropDownList({
                    dataSource: smsResultSource.data(),
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: "solid",
                    autoWidth: true,
                    size: 'small',
                    optionLabel: {codeNm: '전체', codeKey: ""},
                });
            });

             $("#campaign-sms-target-search-type").kendoDropDownList({
                 dataSource: [{codeNm: "고객명", codeKey: "CustNm"}, {codeNm: "휴대폰", codeKey: "HpNo"}],
                 dataTextField: "codeNm",
                 dataValueField: "codeKey",
                 fillMode: "solid",
                 autoWidth: true,
                 size: 'small'
            });

            $("#campaign-sms-target-search-text").kendoTextBox({
                size: 'small'
            }).on("keyup", (e) => {
                if (e.keyCode === 13) {
                    $("#campaign-sms-target-search-btn").trigger("click");
                }
            });


            $("#campaign-sms-target-search-btn").kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: () => {
                    const grid = $("#campaign-sms-target-grid").data("kendoCpGrid");
                    grid.dataSource.read();
                }
            });


            campaignDetail.targetCommonFooterInit();
        },


        targetSmsLeftGridInit: () => {
            $("#campaign-sms-state-total-grid").kendoCpGrid({
                columns: [
                    {
                        field: "totCnt",
                        title: "총대상자",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "readyCnt",
                        title: "준비",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "sucessCnt",
                        title: "성공",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "sendReayCnt",
                        title: "대기중",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "failCnt",
                        title: "실패",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: {
                    data: [
                        {totCnt: 0, readyCnt: 0, sucessCnt: 0, sendReayCnt: 0, failCnt: 0},
                    ],
                },
                scrollable: false,
            })
        },

        smsTargetClear: () => {
            $("#campaign-sms-target-send-result").data("kendoDropDownList").value("");
            $("#campaign-sms-target-search-type").data("kendoDropDownList").value("CustNm");
            $("#campaign-sms-target-search-text").data("kendoTextBox").value("");
        }

    }

    const custTargetSmsGrid = {
        smsCheckedItems: [],

        drawGrid: () => {
            $("#campaign-sms-target-grid").kendoCpGrid({
                columns: [
                    {
                        field: "select All",
                        headerTemplate: "<input type='checkbox' id='campaign-sms-target-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: function (dataItem) {
                            return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md campaign-sms-target-select-customer'>";
                        },
                        attributes: {style: 'text-align:center'},
                        width: 50,
                    },
                    {
                        field: "custNm",
                        title: "고객명",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "hpNo",
                        title: "휴대폰",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "resultMessage",
                        title: "전송결과",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: [],
                resizable: false,
                height: "calc(100vh - 400px)",
                pageable: {
                    refresh: true,
                    responsive: false
                },
                dataBound: (e) => {
                    campaignDetail.commonGridDataBound(e, custTargetSmsGrid.smsCheckedItems);
                },
            }).on("click", ".campaign-sms-target-select-customer", function () {
                campaignDetail.commonGridSelectClick(
                    this,
                    "#campaign-sms-target-grid",
                    custTargetSmsGrid.smsCheckedItems,
                    "#campaign-sms-target-check-all"
                );
            }).on("change", "#campaign-sms-target-check-all", (e) => {
                const checked = e.target.checked;
                campaignDetail.commonGridCheckAll(checked, '.campaign-sms-target-select-customer');
            })
        },

        smsTargetDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/campaign/cust/select/page",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },

                    parameterMap: (options) => {
                        return {
                            campaignId: Number($("#campaign-campaign-id").val()),
                            smsResult: $('#campaign-sms-target-send-result').data('kendoDropDownList').value() === '' || options.defaultSearchYn === "Y" ? '' : $('#campaign-sms-target-send-result').data('kendoDropDownList').value(),
                            searchType: $("#campaign-sms-target-search-type").data("kendoDropDownList").value(),
                            searchTxt: options.defaultSearchYn === "Y" ? '' : $("#campaign-sms-target-search-text").data("kendoTextBox").value(),
                            sortType: "",
                            outputYn: "Y",
                            page: options.page,
                            totalPage: options.pageSize,
                        }
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        custNm: {type: 'string'},
                        hpNo: {type: 'string'},
                        resultMessage: {type: 'string'},
                        id: "campaignCustId",
                    },
                },
                serverPaging: true,
                pageSize: 10,
            })
        }


    }

    const targetExtractPopup = {
        targetCheckedItems: [],

        windowPopupInit: () => {
            $("#campaign-extract-target-window").kendoWindow({
                width: "90%",
                height: "80%",
                modal: true,
                draggable: false,
                visible: false,
                title: "대상자추출",
                actions: ["Close"],
                content: {
                    template: kendo.template($("#campaign-target-extract-template").html())
                },
                open: targetExtractPopup.windowPopupOpen,
                close: () => {
                    targetExtractPopup.targetCheckedItems = [];
                }
            });
        },

        windowPopupOpen: () => {
            cpProgress("campaign-extract-target-window")
            targetExtractPopup.init().then(() => {
                cpProgress("campaign-extract-target-window", false);
            })
        },
        init: async () => {
            $("#campaign-target-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: false, size: "46px", resizable:false, scrollable: false },
                    { collapsible: false, resizable: false }
                ],
            });

            $("#campaign-target-splitter2").kendoSplitter({
                orientation: "horizontal",
                panes: [
                    {collapsible: false, size: "100%"},
                    {collapsible: false, resizable: false},
                ],
            });

            let startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            $(`#campaign-target-date-start`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });

            $(`#campaign-target-date-end`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            let customerTypeDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/CustType", {}).getDataSource();
            await customerTypeDataSource.read().then(() => {
                $("#campaign-target-customer-type-list").kendoDropDownList({
                    dataSource: customerTypeDataSource.data(),
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: "solid",
                    autoWidth: true,
                    size: 'small',
                    optionLabel: {codeNm: '전체', codeKey: ""},
                });
            })

            let consultTypeDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/CallClass", {}).getDataSource();
            await consultTypeDataSource.read().then(() => {
                $("#campaign-target-consult-type-list").kendoDropDownList({
                    dataSource: consultTypeDataSource.data(),
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: "solid",
                    autoWidth: true,
                    size: 'small',
                    optionLabel: {codeNm: '전체', codeKey: ""},
                });

            })

            const consultResultDataSource = new cpDataSource(METHOD.GET, "/common/v1/code/CallType", {}).getDataSource();
            await consultResultDataSource.read().then(() => {
                $("#campaign-target-consult-result-list").kendoDropDownList({
                    dataSource: consultResultDataSource.data().sort((a, b) => a.codeIdx - b.codeIdx),
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: "solid",
                    autoWidth: true,
                    size: 'small',
                    optionLabel: {codeNm: '전체', codeKey: ""},
                });
            })


            $("#campaign-target-search-btn1").kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: () => {
                    const grid = $("#campaign-target-extract-grid").data("kendoCpGrid");
                    if (grid) {
                        checkedItems = [];
                        $("#campaign-target-extract-check-all").prop("checked", false);
                        grid.pager.page(1);
                        grid.dataSource.read();
                    }
                },
            });

            new cpCatDropDownTree('#campaign-target-consult-call-cat', {
                clearButton: true,
                fillMode: "solid",
                autoWidth: true,
                size: 'small'
            }).init();
            targetExtractPopup.drawGrid();

            $("#campaign-target-detail-close").on("click", () => {
                targetExtractPopup.detailClose();
            })

            $("#campaign-taget-all-save-btn").kendoButton({themeColor: "primary"});
            $("#campaign-taget-all-save-btn").off("click").on("click", function () {
                const targetAllData = targetExtractPopup.targetExtractDataSource();
                targetAllData.read({page: 1, pageSize: 10000}).then(() => {
                    const paramList = [];
                    targetAllData.data().forEach((data) => {
                        paramList.push(targetExtractPopup.targetInsertParamList(data));
                    })
                    targetExtractPopup.targetInsert(paramList);
                })
            });

            $("#campaign-target-select-save-btn").kendoButton();
            $("#campaign-target-select-save-btn").off("click").on("click", function () {
                const paramList = [];
                targetExtractPopup.targetCheckedItems.forEach((item) => {
                    if (item.checked) {
                        paramList.push(targetExtractPopup.targetInsertParamList(item.data));
                    }
                })
                targetExtractPopup.targetInsert(paramList);
            });

            $("#campaign-target-detail-reg-date").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });
            $("#campaign-target-detail-customer-name").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });
            $("#campaign-target-detail-hp-no").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });
            $("#campaign-target-detail-tel-no").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });
            $("#campaign-target-detail-customer-type").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });
            $("#campaign-target-detail-tel-time").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });
            $("#campaign-target-detail-agent").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });
            $("#campaign-target-detail-question").kendoTextArea({
                readonly: true,
                rows: 5,
                resizable: "none",
                fillMode: "flat",
            });
            $("#campaign-target-detail-answer").kendoTextArea({
                readonly: true,
                rows: 5,
                resizable: "none",
                fillMode: "flat",
            });
            $("#campaign-target-detail-memo").kendoTextArea({
                readonly: true,
                rows: 5,
                resizable: "none",
                fillMode: "flat",
            });
            $("#campaign-target-detail-consult-result").kendoTextBox({
                fillMode: "flat",
                readonly: true,
            });

        },

        drawGrid: () => {
            $("#campaign-target-extract-grid").kendoCpGrid({
                columns: [
                    {
                        field: "select All",
                        headerTemplate: "<input type='checkbox' id='campaign-target-extract-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: function (dataItem) {
                            return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md campaign-target-extract-select-customer'>";
                        },
                        attributes: {style: 'text-align:center'},
                        width: 50,
                    },
                    {
                        field: "callDt",
                        title: "접수일자",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "custNm",
                        title: "고객명",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "boundTelNo",
                        title: "수/발신전화",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "hpNo",
                        title: "휴대폰",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "telNo",
                        title: "일반전화",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "custTypeNm",
                        title: "고객구분",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "callClassNm",
                        title: "상담유형",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "fullCallCatNm",
                        title: "상담분류",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: targetExtractPopup.targetExtractDataSource(),
                resizable: false,
                selectable: "single",
                height: "100%",
                pageable: {
                    refresh: true
                },
                page: () => {
                    $("#campaign-target-extract-check-all").prop("checked", false);
                },
                change: (e) => {
                    targetExtractPopup.detailOpen();
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
                    let getCallItem = new cpDataSource(METHOD.GET, '/consult/v1/list/item/' + selectRows.callUuid).getDataSource();
                    getCallItem.read().then(() => {
                        let data = getCallItem.data();
                        let item = data[0];
                        $("#campaign-target-detail-tel-time").data("kendoTextBox").value(item.closeCallTm);
                        $("#campaign-target-detail-agent").data("kendoTextBox").value(item.processNm);
                        $("#campaign-target-detail-question").data('kendoTextArea').value(item.question);
                        $("#campaign-target-detail-answer").data('kendoTextArea').value(item.answer);
                        $("#campaign-target-detail-memo").data('kendoTextArea').value(item.memo);
                        $("#campaign-target-detail-reg-date").data("kendoTextBox").value(selectRows.callDt);
                        $("#campaign-target-detail-customer-name").data("kendoTextBox").value(selectRows.custNm);
                        $("#campaign-target-detail-hp-no").data("kendoTextBox").value(selectRows.hpNo);
                        $("#campaign-target-detail-tel-no").data("kendoTextBox").value(selectRows.telNo);
                        selectRows.custTypeNm !== null ? $("#campaign-target-detail-customer-type").data("kendoTextBox").value(selectRows.custTypeNm) : $("#campaign-target-detail-customer-type").data("kendoTextBox").value("");
                        $("#campaign-target-detail-consult-result").data("kendoTextBox").value(selectRows.callTypeNm);
                    })

                },
                dataBound: (e) => {
                    campaignDetail.commonGridDataBound(e, targetExtractPopup.targetCheckedItems);
                },
            }).on("click", ".campaign-target-extract-select-customer", function () {
                targetExtractPopup.targetCheckedItems = campaignDetail.commonGridSelectClick(
                    this,
                    "#campaign-target-extract-grid",
                    targetExtractPopup.targetCheckedItems,
                    "#campaign-target-extract-check-all"
                );
            }).on("change", "#campaign-target-extract-check-all", (e) => {
                const checked = e.target.checked;
                campaignDetail.commonGridCheckAll(checked, '.campaign-target-extract-select-customer');
            })
        },

        detailOpen: () => {
            const splitter = $("#campaign-target-splitter2").data("kendoSplitter");
            splitter.size($("#campaign-target-extract-grid-box"), "70%");
        },

        detailClose: () => {
            const splitter = $("#campaign-target-splitter2").data("kendoSplitter");
            splitter.size($("#campaign-target-extract-grid-box"), "100%");
        },

        targetExtractDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/campaign/target/select/page",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    parameterMap: (options) => {
                        return {
                            campaignId: Number($("#campaign-campaign-id").val()),
                            campaignType: $("#campaign-campaign-type").val(),
                            startDate: kendo.toString(
                                $("#campaign-target-date-start").data("kendoDatePicker").value(),
                                'yyyy-MM-dd'
                            ),
                            endDate: kendo.toString(
                                $("#campaign-target-date-end").data("kendoDatePicker").value(),
                                'yyyy-MM-dd'
                            ),
                            custType: $("#campaign-target-customer-type-list").data("kendoDropDownList").value(),
                            callClass: $("#campaign-target-consult-type-list").data("kendoDropDownList").value(),
                            callCatId: $("#campaign-target-consult-call-cat").data("kendoDropDownTree").value(),
                            callType: $("#campaign-target-consult-result-list").data("kendoDropDownList").value(),
                            boundType: "",
                            sortType: "",
                            outputYn: "Y",
                            page: options.page,
                            totalPage: options.pageSize,
                        }
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        callDt: {type: 'date'},
                        custNm: {type: 'string'},
                        boundTelNo: {type: 'string'},
                        custTypeNm: {type: 'string'},
                        callClassNm: {type: 'string'},
                        fullCallCatNm: {type: 'string'},
                        hpNo: {type: 'string'},
                        telNo: {type: `string`},
                        id: "callId",
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.callDt) {
                                row.callDt = kendo.toString(new Date(row.callDt), "yyyy-MM-dd HH:mm")
                            }
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE
            })
        },

        targetInsertParamList: (data) => {
            const param = {};
            if (!data) {
                return;
            } //데이터 존재여부 확인
            let rgistStepCheck = $("#campaign-regist-step").val();
            if (campaignDetail.registStepCheck(rgistStepCheck, 2) === "satisfactionLevel2") { //만족도조사 대상자추출인 경우
                param.campaignId = Number($("#campaign-campaign-id").val());
                param.boundId = data.boundId;
                param.callId = data.callId;
            } else if (campaignDetail.registStepCheck(rgistStepCheck, 2) === "smsLevel2") { //sms 대상자추출인 경우
                if (!data.hpNo) {
                    return;
                }//핸드폰번호가 있는 경우에만 대상자추출
                param.campaignId = Number($("#campaign-campaign-id").val());
                param.boundId = data.boundId;
                param.callId = data.callId;
            }

            return param;
        },

        targetInsert: (data) => {
            data = data.filter((element) => element !== undefined)
            if (data.length <= 0) {
                const obj = {msg: "한명 이상의 대상자추출이 이루어져야 합니다.", type: "error"};
                message.notification(obj);
                return;
            }
            let targetExtractData;
            let targetInsert = new cpDataSource(METHOD.POST, "/work/v1/campaign/customer/insert", data).getDataSource();
            targetInsert.read().then(() => {
                cpProgress('campaign-extract-target-window');
                $("#campaign-info-btn-delete").hide();//삭제버튼
                $("#campaign-extract-target-window").data("kendoWindow").close();
                let registStepCheck = campaignDetail.registStepCheck($("#campaign-regist-step").val(), 2);

                if (registStepCheck === "satisfactionLevel2") {
                    targetExtractData = custTargetSatisGrid.satisfactionTargetDataSource();
                    targetExtractData.read().then(() => {
                        const obj = {msg: "대상자추출을 완료했습니다.", type: "success"};
                        message.notification(obj);
                        $("#campaign-satisfaction-target-grid").data("kendoCpGrid").dataSource.read();

                        if ($("#campaign-regist-step").val() === "SatisfactionTarget") {
                            campaignDetail.registStepUpdate("N", campaignDetail.level3Show)
                        }
                        campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.stateGridSetting, "length");
                    })
                } else if (registStepCheck === "smsLevel2") {
                    targetExtractData = custTargetSmsGrid.smsTargetDataSource();
                    targetExtractData.read().then(() => {
                        const obj = {msg: "대상자추출을 완료했습니다.", type: "success"};
                        message.notification(obj);
                        $("#campaign-sms-target-grid").data("kendoCpGrid").dataSource.read();

                        if ($("#campaign-regist-step").val() === "SmsTarget") {
                            campaignDetail.registStepUpdate("N", campaignDetail.level3Show)
                        }

                        campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.smsStateGridSetting, "length"); // 총대상자 set
                    });
                }
            })

        },

    }

    const excelUploadPopup = {
        excelJsonDatas: [],
        windowPopupSetting: () => {
            $("#campaign-excel-upload-window").kendoWindow({
                width: "35%",
                height: "75%",
                visible: false,
                draggable: false,
                modal: true,
                title: "엑셀업로드",
                content: {
                    template: kendo.template($("#campaign-excel-upload-template").html())
                },
                open: () => {
                    excelUploadPopup.init();
                }
            });
        },

        init: () => {
            $("#campaign-excel-upload").kendoUpload({
                multiple: false,
                select: excelUploadPopup.readExcel,
                remove: () => {
                    $("#campaign-excel-upload-grid").data("kendoCpGrid").setDataSource([]);
                    $("#campaign-excel-upload-grid").data("kendoCpGrid").dataSource.read();
                }
            });

            $("#campaign-excel-upload-save-btn").kendoButton({
                themeColor: "primary",
                click: () => {
                    const datas = $("#campaign-excel-upload-grid").data("kendoCpGrid").dataSource.data();

                    for (let i = 0; i < datas.length; i++) {
                        if (!datas[i].hpNo) {
                            if (campaignDetail.registStepCheck($("#campaign-regist-step").val(), 2) === "satisfactionLevel2") {
                                //만족도조사 대상자추출인 경우
                                datas[i].hpNo = '';
                            } else if (campaignDetail.registStepCheck($("#campaign-regist-step").val(), 2) === "smsLevel2") {
                                //sms 대상자추출인 경우
                                datas.splice(i, 1); //해당 data 제거
                                continue;
                            }
                        }
                        if (!datas[i].boundTelNo) {
                            datas[i].boundTelNo = '';
                        }
                        if (!datas[i].telNo) {
                            datas[i].telNo = '';
                        }
                        datas[i].campaignId = Number($("#campaign-campaign-id").val());
                        datas[i].saveCnt = datas.length;
                        datas[i].uploadIdx = 1;
                    }


                    if (datas.length > 0) {
                        cpProgress('campaign-excel-upload-window');
                        $.ajax({
                            type: METHOD.POST,
                            url: "/work/v1/campaign/customer/upload",
                            data: JSON.stringify(datas),
                            contentType: "application/json; charset=utf-8",
                            success: function () {
                                cpProgress('campaign-excel-upload-window', false);
                                $("#campaign-info-btn-delete").hide();//삭제버튼
                                $("#campaign-excel-upload-window").data("kendoWindow").close();
                                if (campaignDetail.registStepCheck($("#campaign-regist-step").val(), 2) === "satisfactionLevel2") {
                                    //만족도조사 대상자추출인 경우
                                    $("#campaign-satisfaction-target-grid").data("kendoCpGrid").dataSource.read();
                                    custTargetSatisGrid.satisfacCheckedItems = [];
                                    campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.stateGridSetting, "length");
                                } else if (campaignDetail.registStepCheck($("#campaign-regist-step").val(), 2) === "smsLevel2") {
                                    //sms 대상자추출인 경우
                                    $("#campaign-sms-target-grid").data("kendoCpGrid").dataSource.read();
                                    custTargetSmsGrid.smsCheckedItems = [];
                                    campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.smsStateGridSetting, "data");
                                }

                                campaignDetail.registStepUpdate('N', campaignDetail.level3Show);
                                const obj = {msg: "대상자추출을 완료했습니다.", type: "success"};
                                message.notification(obj);
                            },
                            error: function () {
                                const obj = {msg: "대상자추출에 실패했습니다.", type: "error"};
                                message.notification(obj);
                            }
                        });
                    } else {
                        const obj = {msg: "대상자가 존재해야 합니다.", type: "error"};
                        message.notification(obj);
                    }
                }
            });

            excelUploadPopup.drawGrid();
        },

        drawGrid: () => {
            $("#campaign-excel-upload-grid").kendoCpGrid({
                columns: [
                    {
                        field: "custNm",
                        title: "고객명",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "boundTelNo",
                        title: "수/발신번호",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "telNo",
                        title: "일반전화",
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "hpNo",
                        title: "휴대폰",
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: {
                    serverPaging: true,
                    pageSize: 13,
                },
                height: "100%",
                resizable: false,
                pageable: {
                    pageSize: 13,
                    refresh: true
                },
            })
        },

        readExcel: (e) => {
            let file = e.files;
            let rawFile = file[0].rawFile;
            let reader = new FileReader();
            reader.onload = function () {
                let data = reader.result;
                let workBook = XLSX.read(data, {type: 'binary'});
                workBook.SheetNames.forEach(function (sheetName) {
                    const datas = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
                    excelUploadPopup.excelJsonDatas = []; //가공 전 초기화
                    /**
                     *  excel grid data 형태에 따른 data 가공 및 번호 유효성 체크
                     *  순서는 고객명, 수/발신번호, 일반전화, 휴대폰 순서를 지켜야함(엑셀에서)
                     *  수/발신번호 및 일반전화는 빈 데이터여도 데이터가 들어갈 수 있음
                     */
                    datas.forEach((data) => {
                        const obj = {};
                        let validCheck = true;
                        let requiredDataCheck = false;
                        for (const key in data) {
                            if (key === "고객명") {
                                obj.custNm = String(data[key]);
                                if (!!obj.custNm) {
                                    requiredDataCheck = true;
                                } else {
                                    validCheck = false;
                                }
                            } else if (key === "수/발신번호") {
                                obj.boundTelNo = String(data[key]);
                                //빈 데이터가 아닐 경우에 번호 유효성 체크
                                if (!!obj.boundTelNo.trim()) {
                                    obj.boundTelNo = obj.boundTelNo.formatterHpNo();
                                    if (obj.boundTelNo.length < 11 || obj.boundTelNo.length > 13) {
                                        validCheck = false;
                                    }
                                }
                            } else if (key === "일반전화") {
                                obj.telNo = String(data[key]);
                                if (!!obj.telNo.trim()) {
                                    obj.telNo = obj.telNo.formatterHpNo();
                                    if (obj.telNo.length < 11 || obj.telNo.length > 13) {
                                        validCheck = false;
                                    }
                                }
                            } else if (key === "휴대폰") {
                                obj.hpNo = String(data[key]);
                                if (!!obj.hpNo) {
                                    if (/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(obj.hpNo) !== true) {
                                        validCheck = false;
                                    }
                                }
                            }
                        }
                        if (validCheck && requiredDataCheck) excelUploadPopup.excelJsonDatas.push(obj);
                    })//forEach end
                    $("#campaign-excel-upload-grid").data("kendoCpGrid").setDataSource(excelUploadPopup.excelJsonDatas);
                })
            };
            reader.readAsBinaryString(rawFile);
        }
    }

    const userDistribution = {
        init: () => {

            $("#campaign-satisfaction-consult-btn-dis").kendoButton({
                click: () => {
                    userDistribution.consultDistribution(userDistributionGrid.userCheckedItems, "distribution");
                }
            });

            $("#campaign-satisfaction-consult-equal-btn-dis").kendoButton({
                themeColor: 'primary',
                click: () => {
                    userDistribution.consultDistribution(userDistributionGrid.userCheckedItems, "equalDistribution");
                }
            });

            $("#campaign-satisfaction-consult-collection").kendoButton({
                click: () => {
                    const customerRecoveryItems = userDistributionGrid.userCheckedItems;
                    let userIdString = '';
                    let cntString = '';
                    let totalCount = 0;
                    let errorCheck = false;
                    for (let i = 0; i < customerRecoveryItems.length; i++) {
                        if (customerRecoveryItems[i] === undefined) {
                            //값이 있는 배열인덱스까지 넘김.
                            continue;
                        } else if (customerRecoveryItems[i].checked) {
                            //체크된 아이템 중
                            if (customerRecoveryItems[i].data.recovery >= customerRecoveryItems[i].data.cases) {
                                //회수 건수가 회수가능 건수보다 적을 경우에만
                                userIdString += '`' + customerRecoveryItems[i].data.userId;
                                if (!!customerRecoveryItems[i].data.cases) cntString += '`' + customerRecoveryItems[i].data.cases;
                                totalCount += 1;
                            } else {
                                const obj = {msg: "회수가능한 건수를 초과했습니다.", type: "error"};
                                message.notification(obj);
                                errorCheck = true;
                                break;
                            }
                        }//if check end
                    }//for end
                    if (!!cntString) {
                        //건수가 있을 경우
                        if (!errorCheck) {
                            //입력된 모든 건수가 회수가능건수를 넘지 않았다면
                            userIdString = userIdString.substring(1, userIdString.length);
                            cntString = cntString.substring(1, cntString.length);

                            const param = {};
                            param.campaignId = Number($("#campaign-campaign-id").val());
                            param.userId = userIdString; // 분배할 상담사
                            param.cnt = cntString; //분배할 건수
                            param.userCnt = totalCount; //분배 인원수
                            const obj = {msg: "회수를 완료했습니다.", type: "success"};
                            userDistribution.distributionDataSourceControl(param, "/work/v1/campaign/customer/distribution/collect", obj, true);
                        }
                    } else if (!errorCheck) {
                        //입력된 건수가 없을 경우
                        const obj = {msg: "회수할 건수를 입력해주세요.", type: "error"};
                        message.notification(obj);
                    }
                    $("#campaign-satisfaction-consult-clear").trigger("click"); //다음 checkedItem을 위한 초기화
                }
            });

            $("#campaign-satisfaction-consult-equal-collection").kendoButton({
                themeColor: 'primary',
                click: () => {
                    const customerRecoveryItems = userDistributionGrid.userCheckedItems;
                    let userIdString = '';
                    let totalCount = 0;
                    for (let i = 0; i < customerRecoveryItems.length; i++) {
                        if (customerRecoveryItems[i] === undefined) {
                            //값이 있는 배열인덱스까지
                            continue;
                        } else if (customerRecoveryItems[i].checked) {
                            //체크된 아이템 중
                            userIdString += '`' + customerRecoveryItems[i].data.userId;
                            totalCount += 1;
                        }//if check end
                    }//for end

                    userIdString = userIdString.substring(1, userIdString.length);

                    const param = {};
                    param.campaignId = Number($("#campaign-campaign-id").val());
                    param.userId = userIdString; // 분배할 상담사
                    param.cnt = ''; //분배할 건수
                    param.userCnt = totalCount; //분배 인원수
                    const obj = {msg: "회수를 완료했습니다.", type: "success"};
                    userDistribution.distributionDataSourceControl(param, "/work/v1/campaign/customer/distribution/collect", obj, true);
                    $("#campaign-satisfaction-consult-clear").trigger("click"); //다음 checkedItem을 위한 초기화
                }

            });


            $("#campaign-satisfaction-consult-redistribution").kendoButton({
                themeColor: 'primary',
                click: () => {
                    const checkedItems = userDistributionGrid.userCheckedItems;
                    let userIdString = '';
                    let cntString = '';
                    let totalCount = 0;
                    let totalCases = 0;
                    let totalRecoverys = 0;
                    let obj;

                    for (let i = 0; i < checkedItems.length; i++) {
                        if (checkedItems[i] === undefined) {
                            //값이 있는 배열인덱스까지 넘김.
                            continue;
                        } else if (checkedItems[i].checked) {
                            userIdString += '`' + checkedItems[i].data.userId;
                            cntString += '`' + checkedItems[i].data.cases;
                            totalCount += 1;
                            totalCases += checkedItems[i].data.cases;
                            totalRecoverys += checkedItems[i].data.recovery;
                        }
                    }//for end

                    if (totalCases <= totalRecoverys && !!cntString) {
                        //분배건수가 회수건수보다 작거나 같을경우에만
                        userIdString = userIdString.substring(1, userIdString.length);
                        cntString = cntString.substring(1, cntString.length);

                        const rocoveryParam = {};
                        rocoveryParam.campaignId = Number($("#campaign-campaign-id").val());
                        rocoveryParam.userId = userIdString; // 분배할 상담사
                        rocoveryParam.cnt = ''; //분배할 건수
                        rocoveryParam.userCnt = totalCount; //분배 인원수

                        const distributionParam = {};
                        distributionParam.campaignId = Number($("#campaign-campaign-id").val());
                        distributionParam.userId = userIdString; // 분배할 상담사
                        distributionParam.cnt = cntString;
                        distributionParam.userCnt = totalCount; //분배 인원수
                        obj = {msg: "재분배를 완료했습니다.", type: "success"};

                        //일괄회수
                        userDistribution.distributionDataSourceControl(rocoveryParam, "/work/v1/campaign/customer/distribution/collect", undefined, true);
                        userDistribution.distributionDataSourceControl(distributionParam, "/work/v1/campaign/customer/distribution/insert", obj, true);

                    } else {
                        if (!!cntString) {
                            obj = {msg: "회수가능한 건수를 초과했습니다.", type: "error"};
                            message.notification(obj);
                        } else {
                            obj = {msg: "분배할 건수가 존재하지 않습니다.", type: "error"};
                            message.notification(obj);
                        }

                    }
                    $("#campaign-satisfaction-consult-clear").trigger("click");
                }
            });


            $("#campaign-satisfaction-consult-clear").kendoButton({
                click: () => {
                    userDistributionGrid.userCheckedItems = [];
                    $("#campaign-user-distribution-grid").data("kendoCpGrid").dataSource.read();
                    $("#campaign-agent-check-all").prop("checked", false);
                }
            });

            $("#campaign-user-distribution-type").kendoRadioGroup({
                items: ["분배", "회수", "재분배"],
                value: "분배",
                layout: "horizontal",
                change: function (e) {
                    $("#campaign-satisfaction-consult-clear").trigger("click"); //다음 checkedItem을 위한 초기화
                    if (e.newValue === "분배") {
                        $("#campaign-satisfaction-consult-dis-div").show();
                        $("#campaign-satisfaction-consult-collection-div").hide();
                        $("#campaign-satisfaction-consult-redistribution-div").hide();
                    } else if (e.newValue === "회수") {
                        $("#campaign-satisfaction-consult-dis-div").hide();
                        $("#campaign-satisfaction-consult-collection-div").show();
                        $("#campaign-satisfaction-consult-redistribution-div").hide();
                    } else if (e.newValue === "재분배") {
                        $("#campaign-satisfaction-consult-dis-div").hide();
                        $("#campaign-satisfaction-consult-collection-div").hide();
                        $("#campaign-satisfaction-consult-redistribution-div").show();
                    }
                }
            });
        },

        consultDistribution: (customerDisItems, disType) => {
            let totalCases = 0;
            let userIdString = '';
            let cntString = '';
            let totalCount = 0;
            customerDisItems.forEach((item) => {
                if (item.checked) {
                    //선택 되어 있는 data
                    totalCases += item.data.cases;
                    userIdString += '`' + item.data.userId;
                    if (!!item.data.cases && disType === "distribution") cntString += '`' + item.data.cases;
                    totalCount += 1;
                }
            })

            userIdString = userIdString.substring(1, userIdString.length);
            cntString = cntString.substring(1, cntString.length);
            const param = {};
            param.campaignId = Number($("#campaign-campaign-id").val());
            param.userId = userIdString; // 분배할 상담사
            param.cnt = (disType === "distribution" ? cntString : ''); //분배할 건수
            param.userCnt = totalCount; //분배 인원수
            let obj = {};

            if (disType === "distribution") {
                //disType 이 "distribution" 일때
                if (!param.cnt) {
                    obj = {msg: "분배할 건수를 입력해주세요.", type: "error"};
                    message.notification(obj);
                    return;
                }
                if (totalCases <= $("#campaign-satisfaction-state-total-grid").data("kendoCpGrid").dataSource.data()[0].unDisCustomer) {
                    obj = {msg: "분배가 완료되었습니다.", type: "success"};
                    userDistribution.distributionDataSourceControl(param, "/work/v1/campaign/customer/distribution/insert", obj, true);
                } else {
                    obj = {
                        msg: "분배 가능 총 건수량은 " + $("#campaign-satisfaction-state-total-grid").data("kendoCpGrid").dataSource.data()[0].unDisCustomer + "건 입니다.",
                        type: "error"
                    };
                    message.notification(obj);
                }
            } else if (disType === "equalDistribution") {
                //disType 이 "equalDistribution"일때
                if ($("#campaign-satisfaction-state-total-grid").data("kendoCpGrid").dataSource.data()[0].unDisCustomer > 0) {
                    obj = {msg: "분배가 완료되었습니다.", type: "success"};
                    userDistribution.distributionDataSourceControl(param, "/work/v1/campaign/customer/distribution/insert", obj, true);
                } else {
                    obj = {msg: "미분배 건수가 없습니다.", type: "error"};
                    message.notification(obj);
                }

            }


            $("#campaign-satisfaction-consult-clear").trigger("click"); //다음 checkedItem을 위한 초기화
        },

        distributionDataSourceControl: (param, url, notificationObj, clearType) => {
            const consultDataSource = new cpDataSource(METHOD.PUT, url, param).getDataSource();
            consultDataSource.read().then(() => {
                if (clearType) {
                    $("#campaign-user-distribution-grid").data("kendoCpGrid").dataSource.read();
                    $("#campaign-state-counselor-counting-grid").data("kendoCpGrid").dataSource.read();
                    $("#campaign-satisfaction-target-grid").data("kendoCpGrid").dataSource.read();
                }
                if (!!notificationObj) message.notification(notificationObj);
            })
        }
    }

    const userDistributionGrid = {
        userCheckedItems: [],
        drawGrid: () => {
            $("#campaign-user-distribution-grid").kendoCpGrid({
                columns: [
                    {
                        field: "selectAll",
                        headerTemplate: "<input type='checkbox' id='campaign-agent-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md'>",
                        template: function (dataItem) {
                            return "<input type='checkbox' id='" + dataItem.id + "' style='vertical-align: middle' class='k-checkbox-md k-rounded-md campaign-agent-check'>";
                        },
                        editable: () => {
                            return false;
                        },
                        attributes: {style: 'text-align:center'},
                        width: 50,
                    },
                    {
                        field: "userNm",
                        title: "상담사",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "devideCnt",
                        title: "분배",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "nondoneCnt",
                        title: "미완료",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "doneCnt",
                        title: "완료",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "recovery",
                        title: "회수가능",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "cases",
                        title: "건수",
                        editor: userDistributionGrid.discountEditor,
                        attributes: {style: 'text-align:center'},

                    },
                ],
                dataSource: [],
                resizable: false,
                editable: true,
                height: "calc(100vh - 400px)",
            }).on("click", ".campaign-agent-check", function () {
                userDistributionGrid.userCheckedItems = campaignDetail.commonGridSelectClick(
                    this,
                    "#campaign-user-distribution-grid",
                    userDistributionGrid.userCheckedItems,
                    "#campaign-agent-check-all"
                );
            }).on("change", "#campaign-agent-check-all", (e) => {
                const checked = e.target.checked;
                campaignDetail.commonGridCheckAll(checked, '.campaign-agent-check');
            })
        },

        userDistributionDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `/work/v1/campaign/select/distribution/${Number($("#campaign-campaign-id").val())}`,
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                },
                schema: {
                    data: 'data',
                    model: {
                        userNm: {type: 'string', editable: false},
                        devideCnt: {type: "number", editable: false},
                        nondoneCnt: {type: "number", editable: false},
                        doneCnt: {type: "number", editable: false},
                        cases: {type: "number", editable: true},
                        id: "userId",
                    },
                    parse: (res) => {
                        let devideTotalCnt = 0;
                        let doneCntTotalCnt = 0;
                        res.data.forEach((data) => {
                            data.cases = 0;
                            data.recovery = data.nondoneCnt;
                            devideTotalCnt += data.devideCnt;
                            doneCntTotalCnt += data.doneCnt;
                        })
                        campaignDetail.stateGridSetting(undefined, devideTotalCnt, doneCntTotalCnt);

                        return res;
                    }
                },
            })
        },

        discountEditor: (container, options) => {
            $('<input data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoNumericTextBox({
                    min: 0,
                    change: () => {
                        const checkedId = "#" + options.model.id;
                        if (!$(checkedId).is(':checked')) {
                            $("#" + options.model.id).trigger("click");
                        }
                    },
                });
        },
    }

    const stateCounselorGrid = {
        drawGrid: () => {
            let datasource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `/work/v1/campaign/select/distribution/${Number($("#campaign-campaign-id").val())}`,
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                },
                schema: {
                    data: 'data',
                    model: {
                        userNm: {type: 'string', editable: false},
                        devideCnt: {type: "number", editable: false},
                        nondoneCnt: {type: "number", editable: false},
                        doneCnt: {type: "number", editable: false},
                        cases: {type: "number", editable: true},
                        id: "userId",
                    },
                    parse: (res) => {
                        let devideTotalCnt = 0;
                        let doneCntTotalCnt = 0;
                        res.data.forEach((data) => {
                            data.cases = 0;
                            data.recovery = data.nondoneCnt;
                            devideTotalCnt += data.devideCnt;
                            doneCntTotalCnt += data.doneCnt;
                        })
                        campaignDetail.stateGridSetting(undefined, devideTotalCnt, doneCntTotalCnt);

                        return res;
                    }
                }
            });
            $("#campaign-state-counselor-counting-grid").kendoCpGrid({
                columns: [
                    {
                        field: "userNm",
                        title: "상담사",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "devideCnt",
                        title: "분배",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "nondoneCnt",
                        title: "미완료",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                    {
                        field: "doneCnt",
                        title: "완료",
                        attributes: {style: 'text-align:center'},
                        editable: () => {
                            return false;
                        },
                    },
                ],
                dataSource: datasource,
                scrollable: false,
            })
        }
    }

    const smsSend = {
        init: () => {
            $("#campaign-sms-send-content").kendoTextArea({
                rows: 15,
                placeholder: "문자내용 입력..."
            });

            $("#campaign-sms-send-content").on("keyup", function () {
                valid.reset();
                smsSend.calcContentByteLength();
            });

            const valid = $("#campaign-sms-send-valid").kendoValidator({
                rules: {
                    rule: (input) => {
                        if (input.is("[name = campaign-sms-send-content]")) {
                            if (input.val() === "") return false;
                        }
                        return true;
                    }
                }
            }).data("kendoValidator");


            $('#campaign-sms-template-list-view').kendoListView({
                autoBind: true,
                height: "100%",
                layout: "flex",
                flex: {
                    direction: "column",
                },
                scrollable: true,
                selectable: "single",
                template: kendo.template("<div>#:smsTemplateNm#</div>"),
                change: () => {
                    let listView = $('#campaign-sms-template-list-view').data("kendoListView");
                    let selected = listView.dataItem(listView.select());
                    $("#campaign-sms-send-content").val(selected.smsTemplateContents);
                    smsSend.calcContentByteLength();
                }
            });

            let treeSelParam = {
                catGroupCd: "CatSmsTemplate",
                parentId: 0,
                useYn: "Y",
                delYn: "N",
                outputYn: "Y",
                sortType: "",
            }
            let catDropDownData = new cpDataSource(METHOD.GET, "work/v1/campaign/cat/treeSelect", treeSelParam).getDataSource();
            catDropDownData.read().then(() => {
                let data = catDropDownData.data().filter(e => e.catId !== "Cat");
                $("#campaign-sms-template-list").kendoDropDownList({
                    dataSource: [{fullCatNm: "템플릿구분 선택...", catId: "0"}, ...data],
                    dataTextField: "fullCatNm",
                    dataValueField: "catId",
                    change: (e) => {
                        let smsTemaplateData = new cpDataSource(METHOD.GET, "consult/v1/consult/sms-template-select/" + e.sender.element.val()).getDataSource();
                        smsTemaplateData.read().then(() => {
                            $('#campaign-sms-template-list-view').data("kendoListView").setDataSource(smsTemaplateData);
                        })
                    }
                }).data("kendoDropDownList");
            });

            $("#campaign-sms-send-save").kendoButton({
                themeColor: "primary",
                click: () => {
                    if (valid.validate()) {
                        message.callBackConfirm({msg: '문자를 발송하시겠습니까?', callback: smsSend.campaignSmsSend})
                    }
                }
            });
        },

        smsSendClear: () => {
            $("#campaign-sms-template-list").data("kendoDropDownList").value("0");
            $("#campaign-sms-send-content").data("kendoTextArea").value("");
            $('#campaign-sms-template-list-view').data("kendoListView").dataSource.data([]);
            $("#campaign-sms-send-valid").data("kendoValidator").reset();
        },

        campaignSmsSend: () => {
            const listView = $('#campaign-sms-template-list-view').data("kendoListView");
            const selected = listView.dataItem(listView.select());


            const smsAllDatas = custTargetSmsGrid.smsTargetDataSource();
            smsAllDatas.read({page: 1, pageSize: 10000, defaultSearchYn: "Y"}).then(() => {
                const smsTargetDatas = smsAllDatas.data();
                const paramList = [];
                smsTargetDatas.forEach((data) => {
                    const param = {};
                    param.custId = data.custId;
                    param.custNm = data.custNm;
                    param.srcId01 = "HAPPYCALL";
                    param.srcId02 = Number($("#campaign-campaign-id").val());
                    param.srcId03 = data.campaignCustId;
                    param.smsTemplateId = selected !== undefined ? selected.smsTemplateId : 0;
                    param.toTelNo = data.hpNo;
                    param.fromTelNo = $("#campaign-sms-from-tel-no").val();
                    param.message = $("#campaign-sms-send-content").val();
                    param.smsKind = "Campaign";
                    paramList.push(param);
                })

                if (paramList.length > 0) {
                    $.ajax({
                        type: METHOD.POST,
                        url: "/work/v1/campaign/sms/insert",
                        data: JSON.stringify(paramList),
                        contentType: "application/json; charset=utf-8",
                        success: function () {
                            $("#campaign-satisfaction-btn-extract").hide();
                            $("#campaign-satisfaction-btn-excel-upload").hide();
                            $("#campaign-satisfaction-btn-delete-select").hide();
                            $("#campaign-satisfaction-btn-delete-all").hide();
                            $("#campaign-sms-send-save").hide();
                            $("#campaign-sms-target-grid").data("kendoCpGrid").dataSource.read();
                            if ($("#campaign-regist-step").val() === "SmsSending") {
                                campaignDetail.registStepUpdate('N');
                            }
                            //진행상태 변경
                            $("#campaign-info-progress-type").data("kendoRadioGroup").value("Complete")
                            campaignInfo.updateCampaign("statusUpdate");
                            if ($("#campaign-info-progress-type").data("kendoRadioGroup").value() === "Complete") {
                                $("#campaign-target-btn-div").hide();
                                $("#campaign-sms-send-save").hide();
                            }
                            campaignDetail.callBackTotalTarget($("#campaign-regist-step").val(), campaignDetail.smsStateGridSetting, "data"); //왼쪽 count 상태 초기화
                            const obj = {msg: "문자전송이 완료되었습니다.", type: "success"};
                            message.notification(obj);
                        },
                        error: function () {
                            const obj = {msg: "문자전송에 실패했습니다.", type: "error"};
                            message.notification(obj);
                        }
                    });
                } else {
                    const obj = {msg: "전송할 대상이 존재하지 않습니다.", type: "error"};
                    message.notification(obj);
                }
            })
        },

        calcContentByteLength: () => {
            const contents = $("#campaign-sms-send-content").val();
            let cutString = smsSend.smsContentsSet(contents);
            $("#campaign-sms-send-content").val(cutString);
            $("#campaign-sms-bytes").html("[" + byteCheck(cutString) + " / 2000] Bytes")
            if (byteCheck(cutString) > 80) {
                $("#campaign-sms-type").html("LMS")
            } else {
                $("#campaign-sms-type").html("SMS")
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
        }

    }

    cpProgress("campaign-layout");
    campaignMain.init().then(() => {
        cpProgress('campaign-layout', false);
    });
});