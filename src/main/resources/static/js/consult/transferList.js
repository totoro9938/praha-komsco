$(document).ready(() => {
    const transferPopupMain = {
        init: () => {
            let deptData = new cpDataSource(METHOD.GET, "/common/v1/dept-all", {"deptId": 0}).getDataSource();
            deptData.read().then(() => {
                let allObject = {
                    deptCd: "root",
                    deptNm: "전체",
                    fullDeptNm: "전체",
                    items: [...deptData.data()],
                    parentId: 0,
                    deptId: 0,
                    deptLvl: 0
                }
                let data = new kendo.data.HierarchicalDataSource({
                    data: [allObject]
                });
                $("#transfer-treeView").kendoTreeView({
                    dataSource: data,
                    dataTextField: "deptNm",
                    width: "100%",
                    height: "100%",
                    change: (e) => {
                        let select = e.sender.dataItem(e.sender.select());
                        if (select === undefined) return;
                        transferPopupMain.pageRefresh()
                        $("#transfer-grid").data("kendoCpGrid").dataSource.page(1);
                    }
                }).data("kendoTreeView").expandTo(0);
            });
            new cpCodeDropDownTree("#transfer-dropdown-list", "ChargeSearchType", {
                value: "ChargeNm",
                clearButton: false,
                fillMode:"solid",
                size:"small"
            }).init();
            $("#transfer-search-text").kendoTextBox({size:"small"}).bind("keyup", (e) => {
                if (e.keyCode === 13) $("#transfer-grid").data("kendoCpGrid").dataSource.page(1);
            });
            $("#transfer-user-telNo").kendoTextBox();
            let userUseYn = new cpDataSource(METHOD.GET, "/common/v1/code/userUseYn", {}).getDataSource();
            userUseYn.read().then(() => {
                let userUseYnData = userUseYn.data();
                userUseYnData = userUseYnData.filter((data) => data.codeKey === "Y" || data.codeKey === "N" || data.codeKey === "H");
                userUseYnData.unshift({codeKey: 'all', codeNm: '전체'});
                $("#transfer-user-useYn-list").kendoDropDownList({
                    dataSource: userUseYnData,
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    value: "Y",
                    size:"small"
                });
            })
            $("#transfer-search-button").kendoButton({
                size:"small",
                themeColor:"secondary",
                icon: "search",
                click: () => {
                    transferPopupMain.pageRefresh();
                    $("#transfer-grid").data("kendoCpGrid").dataSource.page(1);
                }
            });
            $("#transfer-consult-copy").kendoButton({
                size:"small",
                icon: "c-journal-plus",
                click: () => {
                    transferGrid.consultSetting();
                }
            });
            $("#transfer-single-step-transfer").kendoButton({
                themeColor: "base",
                click: () => {
                    let transferCallDn = $("#transfer-user-telNo").data("kendoTextBox").value();
                    if (transferCallDn !== "") {
                        $("#transfer-single-step-transfer").data("kendoButton").enable(false);
                        opener.String.ctiTransferFunc.singleStepTransfer(transferCallDn);
                        transferGrid.consultSetting();
                    }
                }
            });
            $("#transfer-try-consult").kendoButton({
                themeColor: "base",
                click: () => {
                    let transferCallDn = $("#transfer-user-telNo").data("kendoTextBox").value();
                    if (transferCallDn !== "") {
                        $("#transfer-try-consult").data("kendoButton").enable(false);
                        opener.String.ctiTransferFunc.transferConferenceFlag(transferCallDn, "transfer");
                        transferPopupMain.userCtiChk();
                        transferGrid.consultSetting();
                    }
                }
            });
            $("#transfer-conference").kendoButton({
                themeColor: "base",
                click: () => {
                    let conferenceCallDn = $("#transfer-user-telNo").data("kendoTextBox").value();
                    if (conferenceCallDn !== "") {
                        $("#transfer-conference").data("kendoButton").enable(false);
                        opener.String.ctiTransferFunc.transferConferenceFlag(conferenceCallDn, "conference");
                        transferPopupMain.userCtiChk();
                        transferGrid.consultSetting();
                    }
                }
            });
            $("#transfer-retrieve").kendoButton({
                themeColor: "base",
                click: () => {
                    opener.String.ctiTransferFunc.agentTransferReject();
                    transferPopupMain.userCtiChk();
                }
            });
            $("#transfer-complete").kendoButton({
                themeColor: "base",
                click: () => {
                    opener.String.ctiTransferFunc.agentTransferAgree();
                    transferPopupMain.userCtiChk();
                }
            });
            $("#transfer-conference-retrieve").kendoButton({
                themeColor: "base",
                click: () => {
                    opener.String.ctiTransferFunc.agentConferenceReject();
                    transferPopupMain.userCtiChk();
                }
            });
            $("#transfer-conference-complete").kendoButton({
                themeColor: "base",
                click: () => {
                    opener.String.ctiTransferFunc.agentConferenceAgree();
                    transferPopupMain.userCtiChk();
                }
            });
            $("#transfer-detail-splitter").kendoSplitter({
                orientation: "horizontal",
                panes: [
                    {collapsible: false, resizable: false, size: "100%", scrollable: false},
                    {collapsible: false, resizable: false, size: 0, scrollable: false},
                ],
            });
            $("#transfer-detail-close").on("click", () => {
                transferGrid.detailClose();
            })

            $("#transfer-refresh").on("click", () => {
                transferPopupMain.userCtiChk();
            });

            $("#transfer-divDetail").hide();

            $("#transfer-grid").kendoTooltip({
                filter: "td:nth-child(1)",
                position: "bottom",
                width: 250,
                animation: {
                    open: {
                        effects: "fade:in",
                        duration: 200
                    },
                    close: {
                        effects: "fade:out",
                        duration: 200
                    }
                },
                offSet: 5,
                show: function (e) {
                },
                hide: function () {
                },
                content: function (e) {
                    let dataItem = $("#transfer-grid").data("kendoCpGrid").dataItem(e.target.closest("tr"));
                    return dataItem.fullDeptNm;
                }
            });
        },
        userCtiChk: () => {
            let isCallIng = opener.String.softPhoneObject.isCalling;
            let transferFlag = opener.String.softPhoneObject.transferFlag;
            let conferenceFlag = opener.String.softPhoneObject.conferenceFlag;
            if (transferFlag) {
                $("#transfer-single-step-transfer").data("kendoButton").enable(!transferFlag);
                $("#transfer-try-consult").data("kendoButton").enable(!transferFlag);
                $("#transfer-conference").data("kendoButton").enable(!transferFlag);
                $("#transfer-retrieve").data("kendoButton").enable(transferFlag);
                $("#transfer-complete").data("kendoButton").enable(transferFlag);
                $("#transfer-conference-retrieve").data("kendoButton").enable(!transferFlag);
                $("#transfer-conference-complete").data("kendoButton").enable(!transferFlag);
            } else if (conferenceFlag) {
                $("#transfer-single-step-transfer").data("kendoButton").enable(!conferenceFlag);
                $("#transfer-try-consult").data("kendoButton").enable(!conferenceFlag);
                $("#transfer-conference").data("kendoButton").enable(!conferenceFlag);
                $("#transfer-retrieve").data("kendoButton").enable(!conferenceFlag);
                $("#transfer-complete").data("kendoButton").enable(!conferenceFlag);
                $("#transfer-conference-retrieve").data("kendoButton").enable(conferenceFlag);
                $("#transfer-conference-complete").data("kendoButton").enable(conferenceFlag);
            } else if (isCallIng) {
                $("#transfer-user-telNo").data("kendoTextBox").readonly(!isCallIng);
                $("#transfer-single-step-transfer").data("kendoButton").enable(isCallIng);
                $("#transfer-try-consult").data("kendoButton").enable(isCallIng);
                $("#transfer-conference").data("kendoButton").enable(isCallIng);
                $("#transfer-retrieve").data("kendoButton").enable(!isCallIng);
                $("#transfer-complete").data("kendoButton").enable(!isCallIng);
                $("#transfer-conference-retrieve").data("kendoButton").enable(!isCallIng);
                $("#transfer-conference-complete").data("kendoButton").enable(!isCallIng);
            } else {
                $("#transfer-user-telNo").data("kendoTextBox").readonly(true);
                $("#transfer-single-step-transfer").data("kendoButton").enable(false);
                $("#transfer-try-consult").data("kendoButton").enable(false);
                $("#transfer-conference").data("kendoButton").enable(false);
                $("#transfer-retrieve").data("kendoButton").enable(false);
                $("#transfer-complete").data("kendoButton").enable(false);
                $("#transfer-conference-retrieve").data("kendoButton").enable(false);
                $("#transfer-conference-complete").data("kendoButton").enable(false);
            }
        },
        pageRefresh: () => {
            $("#transfer-user-telNo").data("kendoTextBox").value("");
            transferGrid.detailClose();
        }
    }

    const transferGrid = {
        gridInit: () => {
            $("#transfer-grid").kendoCpGrid({
                dataSource: transferGrid.transferGridDataSource(),
                height: " calc(100% - 44px)",
                scrollable: true,
                selectable: 'single',
                pageable: true,
                autoBind: false,
                columns: [
                    {
                        field: "fullDeptNm",
                        title: "부서",
                        width: "30%",
                        attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
                    },
                    {field: "userNm", title: "담당자", width: "12%", attributes: {style: "text-align:center"}},
                    {field: "telNo", title: "전화번호", width: "15%", attributes: {style: "text-align:center;"}},
                    {field: "duty", title: "직책", width: "13%", attributes: {style: "text-align:center"}},
                    {
                        field: "description",
                        title: "담당업무",
                        width: "40%",
                        attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
                    }
                ],
                change: (e) => {
                    transferGrid.detailOpen();
                    let obj = e.sender.dataItem(e.sender.select());
                    let description = obj.description;
                    $("#transfer-detail-descript").html(description.replaceAll("\r\n", "<br>"));
                    e.sender.hideColumn("description");
                },
                columnShow: function (e) {
                    transferGrid.setGridWidth(e);
                },
                columnHide: function (e) {
                    transferGrid.setGridWidth(e);
                },
            });
        },
        transferGridDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "consult/v1/consult/user-find",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    parameterMap: (options) => {
                        let treeView = $("#transfer-treeView").data("kendoTreeView");
                        let select = treeView.dataItem(treeView.select());
                        let userUseYn = $("#transfer-user-useYn-list").data("kendoDropDownList").value();
                        return {
                            deptId: select !== undefined ? select.deptId : 0,
                            description: 0,
                            userNm: 0,
                            searchType: $("#transfer-dropdown-list").data("kendoDropDownTree").value(),
                            searchTxt: $("#transfer-search-text").val(),
                            userUseYn: userUseYn === "all" ? "" : userUseYn,
                            sortType: "",
                            page: options.page,
                            totalPage: options.pageSize,
                        };
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        userId: {type: 'int'},
                        userUuid: {type: 'string'},
                        userCd: {type: 'string'},
                        userIdx: {type: 'int'},
                        duty: {type: 'string'},
                        deptId: {type: 'int'},
                        deptNm: {type: 'string'},
                        fullDeptNm: {type: 'string'},
                        enterYmd: {type: 'string'},
                        retireYmd: {type: 'string'},
                        telNo: {type: 'string'},
                        hpNo: {type: 'string'},
                        useYn: {type: 'string'},
                        useYnNm: {type: 'string'},
                        ctiYn: {type: 'string'},
                        ctiId: {type: 'string'},
                        ctiStation: {type: 'string'},
                        userNm: {type: 'string'},
                        email: {type: 'string'},
                        delYn: {type: 'string'},
                        groupUid: {type: 'int'},
                        groupNm: {type: 'string'},
                        description: {type: 'string'},
                        positionNm: {type: 'string'},
                        lastLoginDt: {type: 'date'}
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            row.telNo = String(row.telNo).formatterHpNo();
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: 20
            });
        },
        detailOpen: () => {
            const splitter = $("#transfer-detail-splitter").data("kendoSplitter");
            $("#transfer-divDetail").show()
            splitter.size($("#transfer-grid-spliiter"), "70%");
        },
        detailClose: () => {
            $("#transfer-grid").data("kendoCpGrid").showColumn("description");
            const splitter = $("#transfer-detail-splitter").data("kendoSplitter");
            splitter.size($("#transfer-grid-spliiter"), "100%");
            $("#transfer-divDetail").hide()
        },
        setGridWidth: (e) => {
            let initialGridWidth = $("#transfer-grid").data("kendoCpGrid").wrapper.width();
            let cols = e.sender.columns;
            let currentColWidth = cols.reduce((prev, cur) => {
                if (!cur.hidden) {
                    return prev += cur.width;
                } else {
                    return prev;
                }
            }, 0);

            if (currentColWidth > initialGridWidth) {
                e.sender.wrapper.width(initialGridWidth);
            } else {
                e.sender.wrapper.width(currentColWidth + kendo.support.scrollbar());
            }
        },
        consultSetting : ()=>{
            let grid =  $("#transfer-grid").data("kendoCpGrid");
            let obj = grid.dataItem(grid.select());
            if(!!obj) {
                let telNo = obj.telNo;
                let ctiStation = obj.ctiStation;
                $("#transfer-user-telNo").data("kendoTextBox").value(ctiStation ? ctiStation : telNo);
                if (opener.$("#consult-call-type-tooltip").length > 0) {
                    opener.$("#consult-call-transfer-deptId").val(obj.deptId);
                    opener.$("#consult-call-transfer-chargeId").val(obj.userId);
                    opener.String.consultCallRegister.setCallTypeToolTip('callTransfer', obj.userNm, obj.deptNm, ctiStation ? ctiStation : telNo);
                }
            }
        }
    }
    window.addEventListener("resize", function () {
        $("#transfer-grid").data("kendoCpGrid").resize()
    });
    transferPopupMain.init();
    transferPopupMain.userCtiChk();
    transferGrid.gridInit();
});
