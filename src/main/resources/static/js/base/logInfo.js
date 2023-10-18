$(document).ready(() => {
    const date = new Date();
    const logSelectLoginUrl = "/base/v1/log/select/login";
    const logSelectUserUrl = "/base/v1/log/select/user";
    const logSelectGroupUrl = "/base/v1/log/select/group";
    const logSelectExcelUrl = "/base/v1/log/select/excel";
    const logSelectPrivateUrl = "/base/v1/log/select/private";
    let preGrid;

    const logInfo = {
        isSearchBtn: false,
        init: async () => {
            logInfoGrid.drawLoginGrid();
            preGrid = "log-info-login-grid";
        },

        selectLogInfo: () => {
            let selectedIndex = $("#log-info-log-type").data('kendoButtonGroup').selectedIndices[0];
            const radioGroupValue =  $("#log-info-log-type").data('kendoButtonGroup').element.find(`button[role=button]`).eq(selectedIndex).attr('data-value').trim();
            logInfo.isSearchBtn = true;
            if (preGrid !== undefined) {
                $("#" + preGrid)
                    .data("kendoCpGrid")
                    .destroy();
                $("#" + preGrid).empty();
                $("#" + preGrid).remove();
                $(".log-info-grid-box").append($("<div> </div>").attr("id", preGrid));
            }
            let grid;
            switch (radioGroupValue) {
                case "로그인":
                    grid = "log-info-login-grid";
                    logInfoGrid.drawLoginGrid();
                    break;
                case "계정":
                    grid = "log-info-user-grid";
                    logInfoGrid.drawUserGrid();
                    break;
                case "권한":
                    grid = "log-info-group-grid";
                    logInfoGrid.drawGroupGrid();
                    break;
                case "엑셀저장":
                    grid = "log-info-excel-grid";
                    logInfoGrid.drawExcelGrid();
                    break;

                case "개인정보처리":
                    grid = "log-info-private-grid";
                    logInfoGrid.drawPrivateGrid();
                    break;
            }
            preGrid = grid;
        },

        getLogDataSource: (url) => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url,
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: () => {
                            if (logInfo.isSearchBtn) {
                                logInfo.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },

                    parameterMap: (options) => {
                        return {
                            startDate : kendo.toString($("#log-info-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                            endDate : kendo.toString($("#log-info-search-date-end").data("kendoDatePicker").value(),'yyyy-MM-dd'),
                            outputYn: "Y",
                            sortType: "",
                            page: options.page,
                            totalPage: options.pageSize,
                        }
                    },
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        userCd: {type: 'string'},
                        ip: {type: 'string'},
                        loginDt: {type: 'date'},
                        regDt: {type: 'date'},
                        rgtrNm: {type: 'string'},
                        targetCd: {type: 'string'},
                        logGb: {type: 'string'},
                        description: {type: 'string'},
                        rgtrId: {type: 'string'},
                        dataCnt: {type: 'string'},
                        programId: {type: 'string'},
                        dataGb: {type: 'string'}
                    },
                    parse: (res) => {
                        res.data.rows = dateFormatting(res.data.rows);
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE,
                error: function (e) {
                    const error = e.xhr.responseJSON || {message: '오류가 발생하였습니다.'};
                    const obj = {msg: error.message, type: 'error'};
                    message.notification(obj);
                },
                requestEnd: (e) => {
                    const type = e.type;
                }
            })
        },
    }

    const logInfoGrid = {
        drawLoginGrid: () => {
            $("#log-info-login-grid").kendoCpGrid({
                dataSource: logInfo.getLogDataSource(logSelectLoginUrl),
                height: '100%',
                resizable: false,
                pageable: {
                    refresh: true
                },
                columns: [
                    {
                        field: 'userCd',
                        title: '사용자',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'ip',
                        title: 'IP',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'loginDt',
                        title: '로그인시간',
                        attributes: {style: 'text-align:center'},
                        format: '{0: yyyy-MM-dd}',
                    },
                ],
            });
        },
        drawUserGrid: () => {
            $("#log-info-user-grid").kendoCpGrid({
                dataSource: logInfo.getLogDataSource(logSelectUserUrl),
                height: '100%',
                pageable: {
                    refresh: true
                },
                columns: [
                    {
                        field: 'regDt',
                        title: '계정변경일시',
                        attributes: {style: 'text-align:center'},
                        format: '{0: yyyy-MM-dd HH:mm}',
                    },
                    {
                        field: 'rgtrNm',
                        title: '수행자',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'targetCd',
                        title: '대상자',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'logGb',
                        title: '구분',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'description',
                        title: '변경내역',
                        attributes: {style: 'text-align:center'},
                    },
                ],
            });
        },

        drawGroupGrid: () => {
            $("#log-info-group-grid").kendoCpGrid({
                dataSource: logInfo.getLogDataSource(logSelectGroupUrl),
                height: '100%',
                pageable: {
                    refresh: true
                },
                columns: [
                    {
                        field: 'regDt',
                        title: '권한변경일시',
                        attributes: {style: 'text-align:center'},
                        format: '{0: yyyy-MM-dd HH:mm}',
                    },
                    {
                        field: 'userNm',
                        title: '수행자',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'targetNm',
                        title: '대상자',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'logGb',
                        title: '구분',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'description',
                        title: '변경내역',
                        attributes: {style: 'text-align:center'},
                    },
                ],
            });
        },

        drawExcelGrid: () => {
            $("#log-info-excel-grid").kendoCpGrid({
                dataSource: logInfo.getLogDataSource(logSelectExcelUrl),
                height: '100%',
                pageable: {
                    refresh: true
                },
                columns: [
                    {
                        field: 'regDt',
                        title: '엑셀저장일시',
                        attributes: {style: 'text-align:center'},
                        format: '{0: yyyy-MM-dd HH:mm}',
                    },
                    {
                        field: 'rgtrNm',
                        title: '사용자',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'dataCnt',
                        title: '저장건수',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'programNm',
                        title: '저장화면',
                        attributes: {style: 'text-align:center'},
                    },
                ],
            });
        },

        drawPrivateGrid: () => {
            $("#log-info-private-grid").kendoCpGrid({
                dataSource: logInfo.getLogDataSource(logSelectPrivateUrl),
                height: '100%',
                pageable: {
                    refresh: true
                },
                columns: [
                    {
                        field: 'regDt',
                        title: '처리일시',
                        attributes: {style: 'text-align:center'},
                        format: '{0: yyyy-MM-dd HH:mm}',
                    },
                    {
                        field: 'userNm',
                        title: '사용자',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'dataGb',
                        title: '대상',
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: 'description',
                        title: '처리내용',
                        attributes: {style: 'text-align:center'},
                    },
                ],
            });
        }
    }


    let startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    $("#log-info-search-date-start").kendoDatePicker({
        format: "yyyy-MM-dd",
        parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
        value: startDate,
        size: 'small'
    });
    $("#log-info-search-date-end").kendoDatePicker({
        format: "yyyy-MM-dd",
        parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
        value: new Date(),
        size: 'small'
    });

    $("#log-info-log-type").kendoButtonGroup({
        items: [
            {text: "로그인", attributes: {'data-value': '로그인'}},
            {text: "계정", attributes: {'data-value': '계정'}},
            {text: "권한", attributes: {'data-value': '권한'}},
            {text: "엑셀저장", attributes: {'data-value': '엑셀저장'}},
            {text: "개인정보처리",attributes: {'data-value': '개인정보처리'}}
        ],
        index: 0,
        size: 'small',
        select: logInfo.selectLogInfo
    });


    $("#log-info-btn-search").kendoButton({
        themeColor: 'secondary',
        icon: "search",
        size: 'small',
        click: logInfo.selectLogInfo
    })

    $("#log-info-splitter").kendoSplitter({
        orientation: "vertical",
        panes: [
            {collapsible: false, size: "46px", resizable: false, scrollable: false },
            {collapsible: false}
        ]
    });

    dateFormatting = (rows) => {
        rows.forEach((row) => {
            if (row.loginDt) {
                row.loginDt = kendo.toString(new Date(row.loginDt), "yyyy-MM-dd HH:mm")
            } else if (row.regDt) {
                row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd HH:mm")
            }
        })
        return rows;
    }

    cpProgress('log-info-layout');
    logInfo.init().then(() => {
        cpProgress('log-info-layout', false);
    });
});