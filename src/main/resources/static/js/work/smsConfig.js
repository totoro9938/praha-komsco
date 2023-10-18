$(document).ready(() => {
    const smsConfigTileLayoutArray = [
        {
            colSpan: 1,
            rowSpan: 1,
            header: { text: "문자상담환경설정" },
            bodyTemplate: kendo.template($(`#sms-config-tile-layout-config`).html())
        },
        {
            colSpan: 1,
            rowSpan: 2,
            header: { text: "스팸전화번호" },
            bodyTemplate: kendo.template($(`#sms-config-tile-layout-spam`).html())
        },
        {
            colSpan: 1,
            rowSpan: 1,
            header: { text: "문자상담사설정" },
            bodyTemplate: kendo.template($(`#sms-config-tile-layout-user`).html())
        }

    ];
    let smsConfigTileLayout = $("#sms-config-tile-layout").kendoTileLayout({
        containers: smsConfigTileLayoutArray,
        columns: 2,
        columnsWidth: "50%",
        rowsHeight: '50%',
        height: "100%",
        reorderable: false,
        resizable: false,
        gap: {
            columns: 5,
            rows: 5
        },
        resize: function (e) {
            // for widgets that do not auto resize
            kendo.resize(e.container, true);
        },
        reorder: function (e) {
        }

    }).data("kendoTileLayout");
    $("#sms-config-tile-layout .k-tilelayout-item-body.k-card-body").eq(0).after(
        `<div class="k-tilelayout-item-body k-card-footer">
                    <div style="display: flex; justify-content: end;">
                      <button id="sms-config-btn-reset" style="margin-right: 5px;" data-role="button" class="k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-base" type="button" role="button" aria-disabled="false" tabindex="0"><span class="k-button-text">초기화</span></button>
                      <button sec:authorize="hasRole('ROLE_WORK_SMS_CONFIG_MGR_UPDATE')" id="sms-config-btn-save" style="margin-right: 5px;" data-role="button" class="k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-primary" type="button" role="button" aria-disabled="false" tabindex="0"><span class="k-button-text">저장</span></button>
                </div>
            </div>`
    )

    $("#sms-config-tile-layout .k-tilelayout-item-body.k-card-body").eq(2).after(
        `<div class="k-tilelayout-item-body k-card-footer">
                    <div style="display: flex; justify-content: end;">
                      <button sec:authorize="hasRole('ROLE_WORK_SMS_CONFIG_MGR_UPDATE')" id="sms-config-user-btn-save" style="margin-right: 5px;" data-role="button" class="k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-primary" type="button" role="button" aria-disabled="false" tabindex="0"><span class="k-button-text">저장</span></button>
                </div>
            </div>`
    )


    const smsConfigMain = {
        isSearchBtn: false,
        calcContentByteLength: (selector, byteInput) => {
            const contents = $(`#${selector}`).val();
            let cutString = smsConfigMain.smsContentsSet(contents);
            $(`#${selector}`).val(cutString);
            $(`#${byteInput}`).html("[" + byteCheck(cutString) + "] Bytes")
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
    }

    const smsConfig = {
        smsConfigData: new Map(),
        init: () => {
            $("#sms-config-number").kendoTextBox({size: 'small'});
            $("#sms-config-alram-yn").kendoSwitch({size: "small"});
            $("#sms-config-same-sms-config").kendoTextBox({size: 'small'});
            $("#sms-config-weekday-consult-start-time").kendoTimePicker({
                size: 'small',
                format: "HH:mm",
                parseFormats: ["HH:mm"]
            });
            $("#sms-config-saturday-consult-start-time").kendoTimePicker({
                size: 'small',
                format: "HH:mm",
                parseFormats: ["HH:mm"]
            });
            $("#sms-config-sunday-consult-start-time").kendoTimePicker({
                size: 'small',
                format: "HH:mm",
                parseFormats: ["HH:mm"]
            });
            $("#sms-config-weekday-consult-end-time").kendoTimePicker({
                size: 'small',
                format: "HH:mm",
                parseFormats: ["HH:mm"]
            });
            $("#sms-config-saturday-consult-end-time").kendoTimePicker({
                size: 'small',
                format: "HH:mm",
                parseFormats: ["HH:mm"]
            });
            $("#sms-config-sunday-consult-end-time").kendoTimePicker({
                size: 'small',
                format: "HH:mm",
                parseFormats: ["HH:mm"]
            });

            $("#sms-config-end-time-message").kendoTextArea({
                size: 'small',
                rows: 4,
                placeholder: "문자내용 입력..."
            }).on("keyup", (e) => {
                smsConfigMain.calcContentByteLength("sms-config-end-time-message", "sms-config-1");
            });
            $("#sms-config-holiday-time-message").kendoTextArea({
                size: 'small',
                rows: 4,
                placeholder: "문자내용 입력..."
            }).on("keyup", (e) => {
                smsConfigMain.calcContentByteLength("sms-config-holiday-time-message", "sms-config-2");
            });
            $("#sms-config-weekday-time-message").kendoTextArea({
                size: 'small',
                rows: 4,
                placeholder: "문자내용 입력..."
            }).on("keyup", (e) => {
                smsConfigMain.calcContentByteLength("sms-config-weekday-time-message", "sms-config-3");
            });

            $("#sms-config-btn-reset").kendoButton({
                click: (e) => {
                    smsConfig.smsConfigLoad();
                }
            });
            $("#sms-config-btn-save").kendoButton({
                themeColor: "primary",
                click: (e) => {
                    let valid = $("#sms-config-valid").kendoValidator({
                        errorTemplate: "",
                    }).data("kendoValidator");
                    if (valid.validate()) {
                        cpProgress("sms-config-valid");
                        message.callBackConfirm(
                            {
                                title: document.title, msg: '저장하겠습니까?', callback: () => {
                                    smsConfig.smsConfigUpdate().then(r => {
                                        message.notification({msg: "저장되었습니다."});
                                        smsConfig.smsConfigLoad();
                                        cpProgress('sms-config-valid', false);
                                    });
                                }, cancel: () => {
                                    cpProgress('sms-config-valid', false);
                                }
                            })
                    }
                }
            });
            $("#sms-config-user-btn-save").kendoButton({
                themeColor: "primary",
                click: (e) => {
                    $('#sms-config-user-grid').data("kendoCpGrid").saveChanges();
                }
            });

            smsConfig.smsConfigLoad();
        },
        smsConfigUpdate: async () => {
            let param = new Array();
            let keys = smsConfig.smsConfigData.keys();
            for (const key of keys) {
                let config = smsConfig.smsConfigData.get(key);
                let configParam = {};
                configParam.configId = config.configId;
                configParam.configIdx = config.configIdx;
                configParam.configNm = config.configNm;
                configParam.configKey = config.configKey;
                configParam.sysYn = config.sysYn;
                configParam.useYn = config.useYn;
                configParam.delYn = config.delYn;
                if (key == "sms-config-alram-yn") {
                    configParam.configValue = $(`#sms-config-alram-yn`).data("kendoSwitch").value() ? "Y" : "N";
                    configParam.description = config.description;
                } else if (key == "sms-config-end-time-message" || key == "sms-config-holiday-time-message" || key == "sms-config-weekday-time-message") {
                    configParam.configValue = config.configValue;
                    configParam.description = $(`#${key}`).data("kendoTextArea").value();
                } else {
                    configParam.configValue = $(`#${key}`).val();
                    configParam.description = config.description;
                }
                param.push(configParam);
            }
            ;

            await $.ajax({
                url: "/work/v1/sms-config/config-update",
                type: METHOD.PUT,
                dataType: "json",
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(param)
            });

        },
        smsConfigLoad: () => {
            let companySmsTelNo = new cpDataSource(METHOD.GET, "common/v1/config/CompanySmsTelNo").getDataSource();
            companySmsTelNo.read().then(() => {
                let data = companySmsTelNo.data();
                smsConfig.smsConfigData.set("sms-config-number", data[0]);
                $("#sms-config-number").data("kendoTextBox").value(data[0].configValue);
            });
            let defaultMessageYn = new cpDataSource(METHOD.GET, "common/v1/config/DefaultMessageYn").getDataSource();
            defaultMessageYn.read().then(() => {
                let data = defaultMessageYn.data();
                let checked = data[0].configValue == "Y" ? true : false;
                smsConfig.smsConfigData.set("sms-config-alram-yn", data[0]);
                $("#sms-config-alram-yn").data("kendoSwitch").value(checked);
            });
            let receiptSmsTime = new cpDataSource(METHOD.GET, "common/v1/config/ReceiptSmsTime").getDataSource();
            receiptSmsTime.read().then(() => {
                let data = receiptSmsTime.data();
                smsConfig.smsConfigData.set("sms-config-same-sms-config", data[0]);
                $("#sms-config-same-sms-config").data("kendoTextBox").value(data[0].configValue);
            });
            let callStartTime = new cpDataSource(METHOD.GET, "common/v1/config/CallStartTime").getDataSource();
            callStartTime.read().then(() => {
                let data = callStartTime.data();
                smsConfig.smsConfigData.set("sms-config-weekday-consult-start-time", data[0]);
                $("#sms-config-weekday-consult-start-time").data("kendoTimePicker").value(data[0].configValue);
            });
            let SunDayStartTime = new cpDataSource(METHOD.GET, "common/v1/config/SunDayStartTime").getDataSource();
            SunDayStartTime.read().then(() => {
                let data = SunDayStartTime.data();
                smsConfig.smsConfigData.set("sms-config-sunday-consult-start-time", data[0]);
                $("#sms-config-sunday-consult-start-time").data("kendoTimePicker").value(data[0].configValue);
            });
            let SatDayStartTime = new cpDataSource(METHOD.GET, "common/v1/config/SatDayStartTime").getDataSource();
            SatDayStartTime.read().then(() => {
                let data = SatDayStartTime.data();
                smsConfig.smsConfigData.set("sms-config-saturday-consult-start-time", data[0]);
                $("#sms-config-saturday-consult-start-time").data("kendoTimePicker").value(data[0].configValue);
            });
            let callEndTime = new cpDataSource(METHOD.GET, "common/v1/config/CallEndTime").getDataSource();
            callEndTime.read().then(() => {
                let data = callEndTime.data();
                smsConfig.smsConfigData.set("sms-config-weekday-consult-end-time", data[0]);
                $("#sms-config-weekday-consult-end-time").data("kendoTimePicker").value(data[0].configValue);
            });
            let SunDayEndTime = new cpDataSource(METHOD.GET, "common/v1/config/SunDayEndTime").getDataSource();
            SunDayEndTime.read().then(() => {
                let data = SunDayEndTime.data();
                smsConfig.smsConfigData.set("sms-config-sunday-consult-end-time", data[0]);
                $("#sms-config-sunday-consult-end-time").data("kendoTimePicker").value(data[0].configValue);
            });
            let SatDayEndTime = new cpDataSource(METHOD.GET, "common/v1/config/SatDayEndTime").getDataSource();
            SatDayEndTime.read().then(() => {
                let data = SatDayEndTime.data();
                smsConfig.smsConfigData.set("sms-config-saturday-consult-end-time", data[0]);
                $("#sms-config-saturday-consult-end-time").data("kendoTimePicker").value(data[0].configValue);
            });

            const endTimeMessage = new cpDataSource(METHOD.GET, `common/v1/config/CallEndSmsTemplate`).getDataSource();
            endTimeMessage.read().then(() => {
                let data = endTimeMessage.data();
                smsConfig.smsConfigData.set("sms-config-end-time-message", data[0]);
                $("#sms-config-end-time-message").data("kendoTextArea").value(data[0].description);
                smsConfigMain.calcContentByteLength("sms-config-end-time-message", "sms-config-1");
            })
            const holidayMessage = new cpDataSource(METHOD.GET, `common/v1/config/HolyDaySmsTemplate`).getDataSource();
            holidayMessage.read().then(() => {
                let data = holidayMessage.data();
                smsConfig.smsConfigData.set("sms-config-holiday-time-message", data[0]);
                $("#sms-config-holiday-time-message").data("kendoTextArea").value(data[0].description);
                smsConfigMain.calcContentByteLength("sms-config-holiday-time-message", "sms-config-2");
            })
            const weekdayMessage = new cpDataSource(METHOD.GET, `common/v1/config/WeekDaySmsTemplate`).getDataSource();
            weekdayMessage.read().then(() => {
                let data = weekdayMessage.data();
                smsConfig.smsConfigData.set("sms-config-weekday-time-message", data[0]);
                $("#sms-config-weekday-time-message").data("kendoTextArea").value(data[0].description);
                smsConfigMain.calcContentByteLength("sms-config-weekday-time-message", "sms-config-3");
            })
        }
    }

    const smsSpamList = {
        init: () => {
            $("#sms-config-spam-list-divSplitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    {collapsible: false, resizable: false, scrollable: false, size: "100%"},
                    {collapsible: false, resizable: false, scrollable: false}
                ]
            });

            $("#sms-config-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: '',
                size: 'small'
            });
            $("#sms-config-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $("#sms-config-search-telNo").kendoTextBox({
                size: 'small',
                change: (e) => {
                    let value = e.value;
                    e.sender.element.val(value.formatterHpNo());
                }
            });

            $("#sms-config-spam-list-dtailClose").bind("click", (e) => {
                let splitter = $("#sms-config-spam-list-divSplitter").data("kendoSplitter");
                splitter.size($('#sms-config-spam-splitter'), "100%");
            })
            $("#sms-config-spam-list-grid").kendoCpGrid({
                autoBind: true,
                dataSource: smsSpamList.smsSpamListDataSource(),
                columns: [
                    {field: "firstSpamDt", title: "등록일시", attributes: {class: '!k-text-center'}},
                    {field: "spamTelNo", title: "전화번호", attributes: {class: '!k-text-center'}},
                    {field: "rgtrNm", title: "등록자", attributes: {class: '!k-text-center'}},
                    {field: "useYn", title: "등록상태", attributes: {class: '!k-text-center'}}
                ],
                change: (e) => {
                    const grid = e.sender;
                    let item = grid.dataItem(grid.select());
                    let splitter = $("#sms-config-spam-list-divSplitter").data("kendoSplitter");
                    splitter.size($('#sms-config-spam-splitter'), "55%");
                    const getItem = new cpDataSource(METHOD.GET, `/work/v1/sms-config/spam-item/${item.spamUuid}`).getDataSource();
                    getItem.read().then(() => {
                        let data = getItem.data()[0];
                        if (data.firstSpamDt) {
                            data.firstSpamDt = kendo.toString(new Date(data.firstSpamDt), "yyyy-MM-dd H:mm");
                        }
                        if (data.lastSpamDt) {
                            data.lastSpamDt = kendo.toString(new Date(data.lastSpamDt), "yyyy-MM-dd H:mm");
                        }
                        if (data.mdfDt) {
                            data.mdfDt = kendo.toString(new Date(data.mdfDt), "yyyy-MM-dd H:mm");
                        }
                        if (data.regDt) {
                            data.regDt = kendo.toString(new Date(data.regDt), "yyyy-MM-dd H:mm");
                        }
                        smsSpamListDtail.setDetail(data);
                    })
                },
                height: '100%',
                resizable: true,
                selectable: 'single',
                pageable: true

            });

            $('#sms-config-spam-btn-search').kendoButton({
                icon: 'search',
                themeColor: 'secondary',
                size: 'small',
                click: () => {
                    smsConfigMain.isSearchBtn = true;
                    $('#sms-config-spam-list-grid').data('kendoCpGrid').dataSource.page(1);
                }
            });
            $('#sms-config-spam-release').kendoButton({
                click: () => {
                    cpProgress("sms-config-spam-list-detail");
                    message.callBackConfirm({
                        msg: '스팸해제 처리하겠습니까?', callback: smsSpamList.smsSpamRelease, cancel: () => {
                            cpProgress("sms-config-spam-list-detail", false);
                        }
                    });
                }
            });
        },
        smsSpamListDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/sms-config/spam-list",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: () => {
                            if (smsConfigMain.isSearchBtn) {
                                smsConfigMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    parameterMap: (options) => {
                        return {
                            startDate: kendo.toString($('#sms-config-search-date-start').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            endDate: kendo.toString($('#sms-config-search-date-end').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            telNo: $("#sms-config-search-telNo").val(),
                            sortType: '',
                            page: options.page,
                            totalpage: options.pageSize
                        }
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        no: {type: 'number'},
                        spamUuid: {type: 'string'},
                        spamTelNo: {type: 'string'},
                        firstSpamDt: {type: 'date'},
                        lastSpamDt: {type: 'date'},
                        spamCnt: {type: 'number'},
                        smsRvId: {type: 'number'},
                        useYn: {type: 'string'},
                        delYn: {type: 'string'},
                        description: {type: 'string'},
                        rgtrId: {type: 'number'},
                        rgtrNm: {type: 'string'},
                        regYmd: {type: 'string'},
                        mdfrId: {type: 'number'},
                        mdfDt: {type: 'date'},
                        mdfYmd: {type: 'string'}
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.firstSpamDt) {
                                row.firstSpamDt = kendo.toString(new Date(row.firstSpamDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.lastSpamDt) {
                                row.lastSpamDt = kendo.toString(new Date(row.lastSpamDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.mdfDt) {
                                row.mdfDt = kendo.toString(new Date(row.mdfDt), "yyyy-MM-dd H:mm");
                            }
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE
            });
        },
        smsSpamRelease: () => {
            let uuid = $("#sms-config-spam-uuid").val();
            const spamRelease = new cpDataSource(METHOD.PUT, `/work/v1/sms-config/spam-release/${uuid}`).getDataSource();
            spamRelease.read().then(() => {
                message.notification({msg: "해제되었습니다."});
                cpProgress("sms-config-spam-list-detail", false);
                $('#sms-config-spam-list-grid').data('kendoCpGrid').dataSource.read();
                smsSpamListDtail.clearDetail();
                let splitter = $("#sms-config-spam-list-divSplitter").data("kendoSplitter");
                splitter.size($('#sms-config-spam-splitter'), "100%");
            });
        }
    }

    const smsSpamListDtail = {
        init: () => {
            $("#sms-config-spam-detail-useYnNm").kendoTextBox({fillMode: "flat", readonly: true});
            $("#sms-config-spam-detail-spamTelNo").kendoTextBox({fillMode: "flat", readonly: true});
            $("#sms-config-spam-detail-reg-dtail").kendoTextBox({fillMode: "flat", readonly: true});
            $("#sms-config-spam-detail-reg-sms-content").kendoTextArea({rows: 5, fillMode: "flat", readonly: true});
        },
        setDetail: (item) => {
            $("#sms-config-spam-uuid").val(item.spamUuid);
            $("#sms-config-spam-detail-useYnNm").data("kendoTextBox").value(item.useYnNm);
            $("#sms-config-spam-detail-spamTelNo").data("kendoTextBox").value(item.spamTelNo);
            $("#sms-config-spam-detail-reg-dtail").data("kendoTextBox").value(item.userNm + " / " + item.regDt);
            $("#sms-config-spam-detail-reg-sms-content").data("kendoTextArea").value(item.message);
            if (item.useYn == "N") $('#sms-config-spam-release').hide();
            else $('#sms-config-spam-release').show();
        },
        clearDetail: () => {
            $("#sms-config-spam-uuid").val("");
            $("#sms-config-spam-detail-useYnNm").data("kendoTextBox").value("");
            $("#sms-config-spam-detail-spamTelNo").data("kendoTextBox").value("");
            $("#sms-config-spam-detail-reg-dtail").data("kendoTextBox").value("");
            $("#sms-config-spam-detail-reg-sms-content").data("kendoTextArea").value("");
        }
    }

    const smsConfigUserGrid = {
        init: async () => {
            new cpDeptDropDownTree('#sms-config-search-deptTree', {
                fillMode: 'solid',
                size: 'small',
                autoWidth: true,
                change: () => {
                    $('#sms-config-user-divGrid').data("kendoCpGrid").dataSource().read()
                }, clearButton: false, filter: "none"
            }, "WORK_CALLBACK_MGR", 1, IS.FALSE, IS.TRUE).init();

            $('#sms-config-user-grid').kendoCpGrid({
                dataSource: smsConfigUserGrid.dataSource(),
                pageable: false,
                autoBind: true,
                editable: false,
                selectable: 'multiple',
                height: '100%',
                scrollable: true,
                columns: [
                    {field: 'userId', hidden: true},
                    {
                        field: "smscallYn",
                        headerTemplate: "<input type='checkbox' id='sms-user-grid-check-all' style='vertical-align: middle;' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: '<input type="checkbox" name="sms-user-grid-checkbox" class="k-checkbox-md sms-user-grid-checkbox" data-filed="smscallYn" #= smscallYn=="Y" ? checked="checked" : "" #></input>',
                        width: 40,
                        attributes: {class: '!k-text-center'}
                    },
                    {field: 'fullDeptNm', title: '부서', attributes: {class: 'k-text-left'}},
                    {field: 'userNm', title: '이름', attributes: {class: '!k-text-center'}}
                ],
                dataBound: (e) => {
                    $("#sms-config-user-divGrid .k-checkbox-md").prop("style", "vertical-align: middle");
                }
            }).on("click", ".sms-user-grid-checkbox", (e) => {
                let filed = $(e.target).data('filed');
                deptGplist = $("#sms-config-user-grid").data("kendoCpGrid");
                dataRow = $(e.target).closest("tr");
                dataItem = deptGplist.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            }).on("click", "#sms-user-grid-check-all", (e) => {
                let dataItems = $("#sms-config-user-grid").data("kendoCpGrid").dataItems();
                if ($(e.target).is(":checked")) {
                    dataItems.forEach((data, index) => {
                        if (data["smscallYn"] == "N") {
                            $("input:checkbox[name=sms-user-grid-checkbox]").eq(index).prop("checked", true);
                            data["smscallYn"] = "Y";
                            data.dirty = true;
                        }
                    })
                } else {
                    dataItems.forEach(data => {
                        if (data["smscallYn"] == "Y") {
                            $("input:checkbox[name=sms-user-grid-checkbox]").prop("checked", false);
                            data["smscallYn"] = "N";
                            data.dirty = true;
                        }
                    })
                }
            });

            $('#sms-config-user-btn-search').kendoButton({
                icon: 'search',
                themeColor: 'secondary',
                size: 'small',
                click: () => {
                    smsConfigMain.isSearchBtn = true;
                    $('#sms-config-user-grid').data('kendoCpGrid').dataSource.read();
                }
            });
        },
        dataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `/work/v1/sms-config/sms-user/${$("#sms-config-search-deptTree").data("kendoDropDownTree").value()}`,
                        type: 'GET',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: (e) => {
                            if (smsConfigMain.isSearchBtn) {
                                smsConfigMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    update: {
                        url: "/work/v1/sms-config/user/set",
                        type: 'PUT',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다."})
                            $("#sms-config-user-grid").data("kendoCpGrid").dataSource.read();
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type == 'read') {
                            return
                        } else if (type == 'update') {
                            let dataArray = new Array();
                            options.models.forEach((model) => {
                                model.appointType = "SmsCall";
                                if (model.smscallYn == "Y") {
                                    model.jobGb = "I"
                                } else {
                                    model.jobGb = "D"
                                }
                                dataArray.push(model);
                            });
                            return JSON.stringify(dataArray);
                        }
                    }
                },
                schema: {
                    data: 'data',
                    model: {
                        id: 'userId',
                        fields: {
                            userId: {type: 'number'},
                            deptNm: {type: 'string'},
                            userNm: {type: 'string'},
                            fullDeptNm: {type: 'string'},
                            smscallYn: {type: 'string'}
                        }
                    },
                    parse: (res) => {
                        return res;
                    }
                },
                batch: true
            });
        },

    }
    cpProgress("sms-config-tile-layout");
    smsConfig.init();
    smsSpamList.init()
    smsConfigUserGrid.init().then(() => {
        smsSpamListDtail.init();
        cpProgress("sms-config-tile-layout", false);
    });
});