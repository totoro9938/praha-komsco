$(document).ready(() => {
    const callbackMain = {
        isSearchBtn: false,
        init: () => {
            $('#callback-search-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    {collapsible: false, size: '77px', resizable: false, scrollable: false },
                    {collapsible: false}
                ]
            });
            $('#callback-user-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    {collapsible: false, size: '47px', resizable: false, scrollable: false },
                    {collapsible: false, resizable: false},
                    {collapsible: false, resizable: false}
                ]
            });
            $('#callback-btn-search').kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: () => {
                    let callbackYn = buttonGroupUtils.buttonGroupGetSelectedValue("#callback-search-distributionYn");
                    callbackMain.isSearchBtn = true;
                    $('#callback-grid').data('kendoCpGrid').dataSource.page(1);
                    if (callbackYn === "N") {
                        $("#callback-user-list").data("kendoDropDownList").value("");
                        $("#callback-search-deptTree").data("kendoDropDownTree").value("1");
                        $("input:checkbox[id=callback-user-check]").prop("checked", false);
                    }
                    if ($("#callback-grid-check-all").is(":checked")) $("#callback-grid-check-all").prop("checked", false);
                }
            });
            $('#callback-satisfaction-btn').kendoButton({
                themeColor: "primary",
                click: () => {
                    let checkedCallbackDataItems = $("#callback-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
                    let checkedCallbackUserDataItems = $("#callback-user-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
                    if (checkedCallbackDataItems.length == 0) {
                        message.callBackAlert({msg: "분배할 콜백건을 선택하세요."});
                    } else if (checkedCallbackUserDataItems.length == 0) {
                        message.callBackAlert({msg: "분배할 상담사를 선택하세요."});
                    } else {
                        callbackDistribution.distribution("distribution").then((t) => {
                            if (t) {
                                message.notification({msg: "분배 되었습니다.", type: "success"});
                                callbackMain.pageGridRefresh();
                            }
                        });
                    }
                }
            });
            $('#callback-satisfaction-recovery-btn').kendoButton({
                themeColor: "error",
                click: () => {
                    let checkedCallbackDataItems = $("#callback-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
                    if (checkedCallbackDataItems.length == 0) {
                        message.callBackAlert({msg: "회수할 콜백건을 선택하세요."});
                    } else {
                        callbackDistribution.distributionRelease();
                    }
                }
            });
            $('#callback-resatisfaction-btn').kendoButton({
                click: () => {
                    let callbackCnt = $("#callback-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
                    let userCnt = $("#callback-user-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
                    if (callbackCnt.length == 0) {
                        message.callBackAlert({msg: "재분배할 콜백건을 선택하세요."});
                    } else if (userCnt.length == 0) {
                        message.callBackAlert({msg: "재분배할 상담사를 선택하세요."});
                    } else {
                        callbackDistribution.reDistribution();
                    }
                }
            });
            $('#callback-appoint-save-btn').kendoButton({
                themeColor: "primary",
                click: () => {
                    $('#callback-appoint-grid').data("kendoCpGrid").saveChanges();
                }
            });
        },
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
        updateAuthCheck: (item) => {
            if (item.adminYn === "Y") return false
            else if (item.rgtrId === USER_INFO.userId) {
                let setTime = new Date();
                setTime.setHours(setTime.getHours() - 24);
                return setTime > new Date(item.callDt);
            } else return true;
        },
        pageGridRefresh: () => {
            $('#callback-grid').data('kendoCpGrid').dataSource.page(1);
            $("#callback-user-grid").data("kendoCpGrid").dataSource.read();
            if ($("#callback-grid-check-all").is(":checked")) $("#callback-grid-check-all").prop("checked", false);
            if ($("#callback-grid-right-check-all").is(":checked")) $("#callback-grid-right-check-all").prop("checked", false);
        }
    };

    const callbackSearchBox = {
        init: async () => {
            new cpCodeDropDownTree('#callback-search-dateType', 'CallbackSearchDt', {
                value: "CallbackDt",
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            }).init();

            let startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            $(`#callback-search-date-start`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });

            $(`#callback-search-date-end`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            const isReadOnly = userAuthRange("WORK_CALLBACK_MGR") === AUTH_RANG.NOTHING;
            let userDropDown = new cpUserDropDown("#callback-user-list", USER_INFO.deptId, undefined, {
                fillMode: 'solid',
                size: 'small',
                autoWidth: true,
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="callback-user-check" type="checkbox"> 퇴사자포함</div>`
            }, isReadOnly);
            let userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(() => {
                userDropDown.setEnable(isReadOnly);
            });

            const deptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            new cpDeptDropDownTree('#callback-search-deptTree', {
                change: deptAutoCompleteEvent,
                clearButton: false,
                filter: "none",
                fillMode: 'solid',
                size: 'small',
                autoWidth: true
            }, "WORK_CALLBACK_MGR", USER_INFO.deptId, IS.FALSE, IS.TRUE).init();

            const rightDeptChange = (e) => {
                $("#callback-user-grid").data("kendoCpGrid").dataSource.read();
                if ($("#callback-grid-right-check-all").is(":checked")) $("#callback-grid-right-check-all").prop("checked", false);
            }
            new cpDeptDropDownTree('#callback-right-grid-deptTree', {
                change: rightDeptChange,
                clearButton: false,
                filter: "none",
                fillMode: 'solid',
                autoWidth: true,
                size: 'small'
            }, "WORK_CALLBACK_MGR", 1, IS.FALSE, IS.TRUE).init();

            const userCkeckEvent = (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            $('#callback-user-check').on("click", (e) => {
                const isChecked = $("input:checkbox[id=callback-user-check]").is(":checked");
                const param = [
                    {useYn: ["Y"]}
                ];
                if (isChecked) {
                    param[0] = {useYn: ["Y", "N"]}
                    userDropDown.param = param;
                    userCkeckEvent($("#callback-search-deptTree").data("kendoDropDownTree").value());
                } else {
                    userDropDown.param = param;
                    userCkeckEvent($("#callback-search-deptTree").data("kendoDropDownTree").value());
                }
            });

            $("#callback-search-distributionYn").kendoButtonGroup({
                items: [
                    {text: "미분배", attributes: {'data-value': 'N'}},
                    {text: "분배", attributes: {'data-value': 'Y'}}
                ],
                index: 0,
                select: (e) => {
                    console.log(e.sender.selectedIndices[0]);
                    let distrib = e.sender.selectedIndices[0] == 1 ? true : false;
                    $("#callback-search-deptTree").data("kendoDropDownTree").enable(distrib);
                    // $("#callback-search-deptTree").data("kendoDropDownTree").readonly(!distrib);
                    $("#callback-user-list").data("kendoDropDownList").enable(distrib);
                    $("input:checkbox[id=callback-user-check]").prop("disabled", !distrib);
                },
            });
            let callbackTatus = new cpCodeDropDownTree('#callback-search-status', 'CallbackStatus', {
                value: "all",
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true,
                size: 'small'
            });
            await dropDownTreeUtils.makeDropDownTree(callbackTatus,"#callback-search-status",IS.TRUE);

            $("#callback-search-deptTree").data("kendoDropDownTree").enable(false);
            $("#callback-user-list").data("kendoDropDownList").enable(false);
            $("input:checkbox[id=callback-user-check]").prop("disabled", true);
        }
    }

    const callbackGrid = {
        init: () => {
            $("#callback-grid").kendoCpGrid({
                columns: [
                    {field: "callbackId", hidden: true},
                    {
                        field: "chk",
                        headerTemplate: "<input type='checkbox' id='callback-grid-check-all' style='vertical-align: middle;' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: (data) => {
                            return `<input type='checkbox' name="callback-grid-chk" style='vertical-align: middle;' class='k-checkbox-md k-rounded-md callback-grid-chk'>`;
                        },
                        attributes: {style: 'text-align:center'},
                        width: 20,
                    },
                    {field: "callbackDt", title: "접수일시", width: 70, attributes: {style: "text-align:center"}},
                    {field: "callbackTelNo", title: "콜백번호", width: 70, attributes: {style: "text-align:center"}},
                    {field: "inboundTelNo", title: "발신번호", width: 70, attributes: {style: "text-align:center"}},
                    {field: "route", title: "인입경로", width: 70, attributes: {style: "text-align:center"}},
                    {field: "distributionDt", title: "할당일시", width: 70, attributes: {style: "text-align:center"}},
                    {field: "userNm", title: "상담사", width: 50, attributes: {style: "text-align:center"}},
                    {field: "callbackStatusNm", title: "처리결과", width: 50, attributes: {style: "text-align:center"}},
                    {field: "processDt", title: "처리일시", width: 70, attributes: {style: "text-align:center"}},
                ],
                dataSource: callbackGrid.callbackMgrDataSource(),
                height: '100%',
                resizable: false,
                selectable: 'multiple',
                pageable: false,
                scrollable: true,
                autoBind: true,
            }).on("click", ".callback-grid-chk", (e) => {
                let callbackGrid = $("#callback-grid").data("kendoCpGrid");
                let dataRow = $(e.target).closest("tr");
                let dataItem = callbackGrid.dataItem(dataRow);
                if (dataItem.processYn == "Y") {
                    e.preventDefault();
                } else {
                    if ($(e.target).is(":checked")) dataItem["chk"] = true;
                    else dataItem["chk"] = false;
                    if ($("#callback-grid-check-all").is(":checked")) $("#callback-grid-check-all").prop("checked", false);
                }
            }).on("click", "#callback-grid-check-all", (e) => {
                let dataItems = $("#callback-grid").data("kendoCpGrid").dataItems();
                if ($(e.target).is(":checked")) {
                    dataItems.forEach((data, index) => {
                        if (data["processYn"] == "N") {
                            $("input:checkbox[name=callback-grid-chk]").eq(index).prop("checked", true);
                            data["chk"] = true;
                        }
                    })
                } else {
                    $("input:checkbox[name=callback-grid-chk]").prop("checked", false);
                    dataItems.forEach(data => {
                        data["chk"] = false;
                    })
                }
            });
            ;
        },
        callbackMgrDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/callback/select-page",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: () => {
                            if (callbackMain.isSearchBtn) {
                                callbackMain.isSearchBtn = false;
                                message.notification({type: "info"})
                            }
                        }
                    },
                    parameterMap: (options) => {
                        let auth = userAuthRange("WORK_CALLBACK_MGR") !== AUTH_RANG.NOTHING ? true : false;
                        let distribYn = buttonGroupUtils.buttonGroupGetSelectedValue("#callback-search-distributionYn");
                        let deptId = distribYn == "Y" ? $("#callback-search-deptTree").data("kendoDropDownTree").value() : 0;
                        return {
                            distributionYn: distribYn,
                            dateType: $("#callback-search-dateType").data("kendoDropDownTree").value(),
                            startDate: kendo.toString($('#callback-search-date-start').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            endDate: kendo.toString($('#callback-search-date-end').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                            parentId: auth ? deptId : 0,
                            deptId: auth ? 0 : deptId,
                            userId: distribYn == "Y" ? $("#callback-user-list").data("kendoDropDownList").value() : 0,
                            callbackStatus: $("#callback-search-status").data("kendoDropDownTree").value() == "all" ? "" : $("#callback-search-status").data("kendoDropDownTree").value(),
                            searchType: "",
                            searchTxt: "",
                            route: "",
                            todaywork: "",
                            completeYn: "",
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
                        callbackId: {type: 'number'},
                        callbackUuid: {type: 'string'},
                        callbackDt: {type: 'date'},
                        inboundTelNo: {type: 'string'},
                        callbackTelNo: {type: 'string'},
                        custType: {type: 'string'},
                        overlapCnt: {type: 'number'},
                        route: {type: 'string'},
                        callbackStatus: {type: 'string'},
                        callbackStatusNm: {type: 'string'},
                        boundCnt: {type: 'number'},
                        boundDt: {type: 'date'},
                        distributionDt: {type: 'date'},
                        custId: {type: 'number'},
                        custNm: {type: 'string'},
                        processId: {type: 'number'},
                        processNm: {type: 'string'},
                        processYn: {type: 'string'},
                        processDt: {type: 'date'},
                        regDt: {type: 'date'},
                        recallYn: {type: 'string'},
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.regDt) {
                                row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.distributionDt) {
                                row.distributionDt = kendo.toString(new Date(row.distributionDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.callbackDt) {
                                row.callbackDt = kendo.toString(new Date(row.callbackDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.boundDt) {
                                row.boundDt = kendo.toString(new Date(row.boundDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.processDt) {
                                row.processDt = kendo.toString(new Date(row.processDt), "yyyy-MM-dd H:mm");
                            } else {
                                row.processDt = ""
                            }
                            if (row.processNm == null) {
                                row.processNm = ""
                            }
                            row.chk = false;
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE,
                requestEnd: (e) => {
                    const type = e.type;
                    if (type === "read") {
                        let distributionSataus = buttonGroupUtils.buttonGroupGetSelectedValue("#callback-search-distributionYn");
                        if (distributionSataus == "N") {
                            $('#callback-satisfaction-btn').show();
                            $('#callback-satisfaction-recovery-btn').hide();
                            $('#callback-resatisfaction-btn').hide();
                        } else if (distributionSataus == "Y") {
                            $('#callback-satisfaction-btn').hide();
                            $('#callback-satisfaction-recovery-btn').show();
                            $('#callback-resatisfaction-btn').show();
                        }
                    }
                },
            });
        },
    }

    const callbackRightGrid = {
        init: () => {
            $("#callback-user-grid").kendoCpGrid({
                columns: [
                    {field: "userId", hidden: true},
                    {
                        field: "chk",
                        headerTemplate: "<input type='checkbox' id='callback-grid-right-check-all' style='vertical-align: middle;' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: (data) => {
                            return `<input type='checkbox' name="callback-user-grid-chk" style='vertical-align: middle;' class='k-checkbox-md k-rounded-md callback-grid-right-chk'>`;
                        },
                        attributes: {style: 'text-align:center;'},
                        width: 20,
                    },
                    {field: "userNm", title: "상담사", width: 70, attributes: {style: "text-align:center"}},
                    {field: "nondoneCnt", title: "미처리", width: 70, attributes: {style: "text-align:center"}},
                    {field: "doneCnt", title: "처리", width: 70, attributes: {style: "text-align:center"}},
                    {field: "devideCnt", title: "할당소계", width: 70, attributes: {style: "text-align:center"}},
                ],
                dataSource: callbackRightGrid.callbackMgrUserDataSource(),
                change: (e) => {

                },
                height: '100%',
                resizable: true,
                selectable: false,
                pageable: false,
                autoBind: true,
            }).on("click", ".callback-grid-right-chk", (e) => {
                let usergrid = $("#callback-user-grid").data("kendoCpGrid");
                let dataRow = $(e.target).closest("tr");
                let dataItem = usergrid.dataItem(dataRow);
                if ($(e.target).is(":checked")) dataItem["chk"] = true;
                else dataItem["chk"] = false;
                if ($("#callback-grid-right-check-all").is(":checked")) $("#callback-grid-right-check-all").prop("checked", false);
            }).on("click", "#callback-grid-right-check-all", (e) => {
                let dataItems = $("#callback-user-grid").data("kendoCpGrid").dataItems();
                if ($(e.target).is(":checked")) {
                    $("input:checkbox[name=callback-user-grid-chk]").prop("checked", true);
                    dataItems.forEach(data => {
                        data["chk"] = true;
                    })
                } else {
                    $("input:checkbox[name=callback-user-grid-chk]").prop("checked", false);
                    dataItems.forEach(data => {
                        data["chk"] = false;
                    })
                }
            });
        },
        callbackMgrUserDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/callback/select/distrib-user",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    parameterMap: (options) => {
                        let auth = userAuthRange("WORK_CALLBACK_MGR") !== AUTH_RANG.NOTHING ? true : false;
                        return {
                            parentId: auth ? $("#callback-right-grid-deptTree").data("kendoDropDownTree").value() : 0,
                            deptId: auth ? 0 : $("#callback-right-grid-deptTree").data("kendoDropDownTree").value(),
                        }
                    }
                },
                schema: {
                    data: 'data',
                    model: {
                        userId: {type: 'string'},
                        userNm: {type: 'string'},
                        devideCnt: {type: 'number'},
                        nondoneCnt: {type: 'number'},
                        doneCnt: {type: 'number'},
                    },
                    parse: (res) => {
                        res.data.forEach(data => {
                            data.chk = false;
                        })
                        return res;
                    }
                },
                requestEnd: (e) => {
                },
            });
        }
    }

    const callbackAppointGrid = {
        init: () => {
            $("#callback-appoint-grid").kendoCpGrid({
                height: '100%',
                pageable: false,
                dataSource: callbackAppointGrid.callbackAppointdataSource(),
                columns: [
                    {field: "userId", hidden: true},
                    {
                        field: "smsCallYn",
                        headerTemplate: "<input type='checkbox' id='callback-user-grid-check-all' style='vertical-align: middle;' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: '<input type="checkbox" name="callback-user-grid-checkbox" class="k-checkbox-md callback-user-grid-checkbox" data-filed="smscallYn" #= smscallYn=="Y" ? checked="checked" : "" #></input>',
                        width: 40,
                        attributes: {
                            style: "text-align:center"
                        }
                    },
                    {field: "userNm", title: "상담사", attributes: {style: "text-align:center"}}
                ]
            }).on("click", ".callback-user-grid-checkbox", (e) => {
                let filed = $(e.target).data('filed');
                deptGplist = $("#callback-appoint-grid").data("kendoCpGrid");
                dataRow = $(e.target).closest("tr");
                dataItem = deptGplist.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            }).on("click", "#callback-user-grid-check-all", (e) => {
                let dataItems = $("#callback-appoint-grid").data("kendoCpGrid").dataItems();
                if ($(e.target).is(":checked")) {
                    dataItems.forEach((data, index) => {
                        if (data["smscallYn"] == "N") {
                            $("input:checkbox[name=callback-user-grid-checkbox]").eq(index).prop("checked", true);
                            data["smscallYn"] = "Y";
                            data.dirty = true;
                        }
                    })
                } else {
                    dataItems.forEach(data => {
                        if (data["smscallYn"] == "Y") {
                            $("input:checkbox[name=callback-user-grid-checkbox]").prop("checked", false);
                            data["smscallYn"] = "N";
                            data.dirty = true;
                        }
                    })
                }
            });
        },

        callbackAppointdataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `/work/v1/callback-config/callback-user/${$("#callback-right-grid-deptTree").data("kendoDropDownTree").value()}`,
                        type: 'GET',
                        contentType: 'application/json',
                        dataType: 'json',
                    },
                    update: {
                        url: "/work/v1/callback-config/user/set",
                        type: 'PUT',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다."})
                            $("#callback-appoint-grid").data("kendoCpGrid").dataSource.read();
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type == 'read') {
                            return
                        } else if (type == 'update') {
                            let dataArray = new Array();
                            options.models.forEach((model) => {
                                model.appointType = "Callback";
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
        }
    };

    const callbackDistribution = {
        distribution: () => {
            let checkedCallbackDataItems = $("#callback-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
            let checkedCallbackUserDataItems = $("#callback-user-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
            let callbackArray = [];
            let callbackUserArray = [];
            checkedCallbackDataItems.forEach((data, index) => {
                callbackArray.push(String(data.callbackId));
                callbackArray.sort((a, b) => {
                    return a - b;
                })
            });
            checkedCallbackUserDataItems.forEach(data => {
                callbackUserArray.push(String(data.userId));
            });
            let param = {
                callbackId: String(callbackArray.join("`")),
                callbackCnt: callbackArray.length,
                userId: String(callbackUserArray.join("`")),
                cnt: "",
                userCnt: callbackUserArray.length
            }
            cpProgress("callback-user-splitter");
            message.callBackConfirm({
                msg: "분배 하시겠습니까?",
                callback: () => {
                    let distribution = new cpDataSource(METHOD.PUT, "work/v1/callback/distribution", param).getDataSource();
                    distribution.read().then(() => {
                        message.notification({msg: "분배 되었습니다.", type: "success"});
                        cpProgress("callback-user-splitter", false);
                        callbackMain.pageGridRefresh();
                    });
                },
                cancel: () => {
                    cpProgress("callback-user-splitter", false);
                }
            });
        },
        distributionRelease: () => {
            let checkedCallbackDataItems = $("#callback-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
            let callbackArray = [];
            checkedCallbackDataItems.forEach(data => {
                callbackArray.push(String(data.callbackId));
            });
            let param = {
                callbackId: String(callbackArray.join("`")),
                callbackCnt: callbackArray.length,
            }
            cpProgress("callback-user-splitter");
            message.callBackConfirm({
                msg: "회수 하시겠습니까?",
                callback: () => {
                    let recallDistribution = new cpDataSource(METHOD.PUT, "work/v1/callback/distribution-clear", param).getDataSource();
                    recallDistribution.read().then(() => {
                        message.notification({msg: "회수 되었습니다.", type: "success"});
                        cpProgress("callback-user-splitter", false);
                        callbackMain.pageGridRefresh();
                    });
                },
                cancel: () => {
                    cpProgress("callback-user-splitter", false);
                }
            });

        },
        reDistribution: () => {
            let checkedCallbackDataItems = $("#callback-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
            let checkedCallbackUserDataItems = $("#callback-user-grid").data("kendoCpGrid").dataItems().filter(data => data.chk == true);
            let distCallbackArray = [];
            let distCallbackUserArray = [];
            checkedCallbackDataItems.forEach((data, index) => {
                distCallbackArray.push(data.callbackId);
                distCallbackArray.sort((a, b) => {
                    return a - b;
                })
            });
            checkedCallbackUserDataItems.forEach(data => {
                distCallbackUserArray.push(String(data.userId));
            });
            let distParam = {
                callbackId: String(distCallbackArray.join("`")),
                callbackCnt: distCallbackArray.length,
                userId: String(distCallbackUserArray.join("`")),
                cnt: "",
                userCnt: distCallbackUserArray.length
            }

            let reCallbackArray = [];
            checkedCallbackDataItems.forEach(data => {
                reCallbackArray.push(String(data.callbackId));
            });
            let reParam = {
                callbackId: String(reCallbackArray.join("`")),
                callbackCnt: reCallbackArray.length,
            }

            cpProgress("callback-user-splitter");
            message.callBackConfirm({
                msg: "재분배 하시겠습니까?",
                callback: () => {
                    let recallDistribution = new cpDataSource(METHOD.PUT, "work/v1/callback/distribution-clear", reParam).getDataSource();
                    recallDistribution.read().then(() => {
                        let distribution = new cpDataSource(METHOD.PUT, "work/v1/callback/distribution", distParam).getDataSource();
                        distribution.read().then(() => {
                            message.notification({msg: "재분배 되었습니다.", type: "success"});
                            cpProgress("callback-user-splitter", false);
                            callbackMain.pageGridRefresh();
                        });
                    });
                },
                cancel: () => {
                    cpProgress("callback-user-splitter", false);
                }
            });
        }
    }


    cpProgress("callback-layout");
    callbackMain.init();
    callbackSearchBox.init().then(() => {
        callbackGrid.init();
        callbackRightGrid.init();
        callbackAppointGrid.init();
        cpProgress("callback-layout", false);
    });
});