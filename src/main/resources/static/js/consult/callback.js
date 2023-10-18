$(document).ready(() => {
    const callbackElem = `callbackList`;

    const callbackAuthNm = `CONSULT_CALLBACK_LIST`;
    const callbackAuth = userAuthRange(callbackAuthNm);

    let callbackListSearchParam = {};

    const localStorageCallbackColumnsNm = 'localStorageCallbackListGridColumns';
    const localStorageCallbackColumns = !!window.localStorage.getItem(localStorageCallbackColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageCallbackColumnsNm)) : null;

    const callbackListMain = {
        gridColumns : [
            {field: `callbackId`, hidden: true},
            {field: `callbackDt`, title: `접수일시`, width: 70, attributes: {class: '!k-text-center'}},
            {field: `callbackTelNo`, title: `콜백번호`, width: 70, attributes: {class: '!k-text-center'}},
            {field: `inboundTelNo`, title: `발신번호`, width: 70, attributes: {class: '!k-text-center'}},
            {field: `route`, title: `인입경로`, width: 70, attributes: {class: '!k-text-center'}},
            {field: `distributionDt`, title: `할당일시`, width: 70, attributes: {class: '!k-text-center'}},
            {field: `userNm`, title: `상담사`, width: 50, attributes: {class: '!k-text-center'}},
            {field: `callbackStatusNm`, title: `처리결과`, width: 50, attributes: {class: '!k-text-center'}},
            {field: `processDt`, title: `처리일시`, width: 70, attributes: {class: '!k-text-center'}},
        ],
        gridWidth: 0,
        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),

        grid : `#${callbackElem}-grid`,
        searchExpansion : `#${callbackElem}-expansion-panel`,
        gridSplitter : `#${callbackElem}-splitter`,
        detailSplitterWidth: '35%',

        isSearchBtn: true,
        searchDefaultValues: [],
        init: () => {

            gridCommonUtils.init(callbackListMain.searchExpansion, callbackListMain.gridSplitter, callbackListMain.grid, localStorageCallbackColumnsNm);
            gridCommonUtils.gridExpansionPanel(callbackListMain.searchExpansion, callbackListMain.gridSplitter, callbackListMain.grid);

            $(callbackListMain.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, size: '100%', resizable: false},
                    {collapsible: false, size: '0%', resizable: false}
                ]
            });

            callbackListMain.gridWidth = gridCommonUtils.gridWidthSet(callbackListMain.gridWidth, !!localStorageCallbackColumns ? localStorageCallbackColumns : callbackListMain.gridColumns, callbackListMain.gridSplitter);

            $(callbackListMain.grid).kendoCpGrid({
                toolbar: [
                    { template: kendo.template($(`#${callbackElem}-toolbar-template`).html()) }
                ],
                columns: !!localStorageCallbackColumns ? localStorageCallbackColumns : callbackListMain.gridColumns,
                height: '100%',
                width: callbackListMain.gridWidth,
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                pageable: {
                    refresh: true
                },
                autoBind: true,
                excel: {allPages: true},
                click: () => {
                    callbackListDetail.gridSelectRow();
                },
                dataBound: ()=>{
                    if($(callbackListMain.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block'){
                        $(callbackListMain.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(callbackListMain.gridSplitter, callbackListMain.grid);
                    }
                },
                columnResize: () => {
                    const gridOptions = $(callbackListMain.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageCallbackColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(callbackListMain.grid).data("kendoCpGrid").getOptions();
                        window.localStorage.setItem(localStorageCallbackColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                },
                excelExport: (e) => {
                    let programId = MENU_ARRAY.find(r => r.roleNm === callbackAuthNm).programId;
                    let dataCnt = $(callbackListMain.grid).data('kendoCpGrid').dataSource.total();
                    let description = $(callbackListMain.searchExpansion).data('kendoExpansionPanel').header.find('.k-expander-title').html();
                    description = description.replace(/(<([^>]+)>)/gi, '');
                    let excelParam = {
                        programId: programId,
                        dataCnt: dataCnt,
                        description: description
                    }
                    new cpDataSource(METHOD.POST, "/log/v1/excel/loginsert", excelParam).getDataSource().read();
                    let rangedate = kendo.toString(new Date(), 'yyyy-MM-dd');
                    e.workbook.fileName = "콜백상담 " + rangedate + ".xlsx";
                }
            });

            $(`#${callbackElem}-btn-download-excel`).kendoButton({
                icon: `download`,
                size: "small",
                themeColor: `success`,
                click: () => {
                    $(callbackListMain.grid).data(`kendoCpGrid`).saveAsExcel();
                }
            });
        },
        gridSetting: async () => {

            $(`#${callbackElem}-search-date-start`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: callbackListMain.searchStartDate,
                size: 'small'
            });

            $(`#${callbackElem}-search-date-end`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: callbackListMain.searchEndDate,
                size: 'small'
            });

            const pageAuth = callbackAuth === AUTH_RANG.NOTHING;
            const deptAuth = callbackAuth === AUTH_RANG.AGENT || callbackAuth === AUTH_RANG.NOTHING;

            let userDropDown = new cpUserDropDown(`#${callbackElem}-user-list`, USER_INFO.deptId, undefined, {
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${callbackElem}-user-check"/> 퇴사자포함</div>`
            },pageAuth,'');
            let userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(() => {
                userDropDown.setEnable(pageAuth);
            });

            const deptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            new cpDeptDropDownTree(`#${callbackElem}-department`, {
                change: deptAutoCompleteEvent,
                fillMode: 'solid',
                autoWidth: true
            }, callbackAuthNm, deptAuth?USER_INFO.deptId:1,IS.FALSE, IS.TRUE).init();

            const userCkeckEvent = (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            $(`#${callbackElem}-user-check`).kendoCheckBox({
                change: ()=>{
                    const isChecked = $(`input:checkbox[id=${callbackElem}-user-check]`).is(":checked");
                    const param = [{useYn : ["Y"]}];
                    if (isChecked){
                        param[0] = {useYn : ["Y","N"]};
                        userDropDown.param = param;
                    }
                    userDropDown.param = param;
                    userCkeckEvent($(`#${callbackElem}-department`).data("kendoDropDownTree").value());
                }
            });

            let callbackStatus = new cpCodeDropDownTree(`#${callbackElem}-search-status`, `CallbackStatus`, {
                value: `all`,
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            });
             await dropDownTreeUtils.makeDropDownTree(callbackStatus, `#${callbackElem}-search-status`, IS.TRUE);

            let searchType = new cpCodeDropDownTree(`#${callbackElem}-etc-search-dropdown`, `CallbackSearchType`, {
                value: `TelNo`,
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            });
            await dropDownTreeUtils.makeDropDownTree(searchType, `#${callbackElem}-etc-search-dropdown`);

            $(`#${callbackElem}-etc-search-textbox`).kendoTextBox({
                size: "small",
                change: (e) => {
                    let value = e.value;
                    if ($(`#${callbackElem}-etc-search-dropdown`).data(`kendoDropDownTree`).value() === `TelNo`) {
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
            }).on(`keyup`, (e) => {
                if (e.which === 13) $(`#${callbackElem}-btn-search`).trigger('click');
            });

            $(`#${callbackElem}-btn-search`).kendoButton({
                themeColor: 'secondary',
                size: "small",
                icon: "search",
                click: () => {
                    callbackListMain.isSearchBtn = true;
                    callbackListMain.gridSearch();
                }
            });

            callbackListMain.searchDefaultValues.deptId = $(`#${callbackElem}-department`).data('kendoDropDownTree').value();
            callbackListMain.searchDefaultValues.userId = $(`#${callbackElem}-user-list`).data('kendoDropDownList').value();
            callbackListMain.searchDefaultValues.status = $(`#${callbackElem}-search-status`).data('kendoDropDownTree').value();
            callbackListMain.searchDefaultValues.type = 'TelNo';

            $(`#${callbackElem}-btn-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                size: "small",
                themeColor: 'none',
                click: function(){
                    $(`#${callbackElem}-search-date-start`).data('kendoDatePicker').value(callbackListMain.searchStartDate);
                    $(`#${callbackElem}-search-date-end`).data('kendoDatePicker').value(callbackListMain.searchEndDate);
                    $(`#${callbackElem}-department`).data('kendoDropDownTree').value(callbackListMain.searchDefaultValues.deptId);
                    $(`#${callbackElem}-user-list`).data('kendoDropDownList').value(callbackListMain.searchDefaultValues.userId);
                    $(`#${callbackElem}-search-status`).data('kendoDropDownTree').value(callbackListMain.searchDefaultValues.status);
                    $(`#${callbackElem}-etc-search-dropdown`).data('kendoDropDownTree').value(callbackListMain.searchDefaultValues.type);
                    $(`#${callbackElem}-etc-search-textbox`).data('kendoTextBox').value('');
                    callbackListMain.isSearchBtn = true;
                    callbackListMain.gridSearch();
                }
            });

        },
        callbackListDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `/consult/v1/callback/list/select-page`,
                        type: `GET`,
                        dataType: `json`,
                        contentType: `application/json; charset=utf-8`,
                        complete: () => {
                            if (callbackListMain.isSearchBtn) {
                                callbackListMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    parameterMap: (options) => {
                        if (callbackListMain.isSearchBtn){
                            let auth = callbackAuth !== AUTH_RANG.NOTHING;
                            const department = $(`#${callbackElem}-department`).data(`kendoDropDownTree`).value();
                            const searchStatus = $(`#${callbackElem}-search-status`).data(`kendoDropDownTree`).value();
                            const param = {
                                distributionYn: `Y`,
                                dateType: `CallbackDt`,
                                startDate: kendo.toString(new Date($(`#${callbackElem}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                endDate: kendo.toString(new Date($(`#${callbackElem}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                parentId: auth ? department : 0,
                                deptId: auth ? 0 : department,
                                userId: $(`#${callbackElem}-user-list`).data(`kendoDropDownList`).value(),
                                callbackStatus: searchStatus === `all` ? `` : searchStatus,
                                searchType: $(`#${callbackElem}-etc-search-dropdown`).data(`kendoDropDownTree`).value(),
                                searchTxt: $(`#${callbackElem}-etc-search-textbox`).data(`kendoTextBox`).value(),
                                route: ``,
                                todaywork: ``,
                                completeYn: ``,
                                sortType: ``,
                                page: options.page,
                                totalPage: options.pageSize
                            }
                            callbackListSearchParam = {...param};
                            return param;
                        }else{
                            callbackListSearchParam.page = options.page;
                            callbackListSearchParam.totalPage = options.pageSize;
                            return callbackListSearchParam;
                        }
                    }
                },
                schema: {
                    data: `data.rows`,
                    total: `data.totalCount`,
                    model: {
                        callbackId: {type: `number`},
                        callbackUuid: {type: `string`},
                        callbackDt: {type: `date`},
                        inboundTelNo: {type: `string`},
                        callbackTelNo: {type: `string`},
                        custType: {type: `string`},
                        overlapCnt: {type: `number`},
                        route: {type: `string`},
                        callbackStatus: {type: `string`},
                        callbackStatusNm: {type: `string`},
                        boundCnt: {type: `number`},
                        boundDt: {type: `date`},
                        distributionDt: {type: `date`},
                        custId: {type: `number`},
                        custNm: {type: `string`},
                        processId: {type: `number`},
                        processNm: {type: `string`},
                        processYn: {type: `string`},
                        processDt: {type: `date`},
                        regDt: {type: `date`},
                        recallYn: {type: `string`},
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.regDt) {
                                row.regDt = kendo.toString(new Date(row.regDt), `yyyy-MM-dd H:mm`);
                            }
                            if (row.distributionDt) {
                                row.distributionDt = kendo.toString(new Date(row.distributionDt), `yyyy-MM-dd H:mm`);
                            }
                            if (row.callbackDt) {
                                row.callbackDt = kendo.toString(new Date(row.callbackDt), `yyyy-MM-dd H:mm`);
                            }
                            if (row.boundDt) {
                                row.boundDt = kendo.toString(new Date(row.boundDt), `yyyy-MM-dd H:mm`);
                            }
                            if (row.processDt) {
                                row.processDt = kendo.toString(new Date(row.processDt), `yyyy-MM-dd H:mm`);
                            } else {
                                row.processDt = ``
                            }
                            if (row.processNm == null) {
                                row.processNm = ``
                            }
                            row.chk = false;
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE
            });
        },
        gridSearch: () => {
            callbackListMain.isSearchBtn = true;

            let startDt = kendo.toString(new Date($(`#${callbackElem}-search-date-start`).data("kendoDatePicker").value()),"yyyy-MM-dd");
            let endDt = kendo.toString(new Date($(`#${callbackElem}-search-date-end`).data("kendoDatePicker").value()),"yyyy-MM-dd");
            let dept = $(`#${callbackElem}-department`).data("kendoDropDownTree");
            let user = $(`#${callbackElem}-user-list`).data("kendoDropDownList");
            let status = $(`#${callbackElem}-search-status`).data("kendoDropDownTree");
            let searchType = $(`#${callbackElem}-etc-search-dropdown`).data("kendoDropDownTree");
            let searchTxt = $(`#${callbackElem}-etc-search-textbox`).data("kendoTextBox");

            let callbackSearchData = [
                { label: '접수기간', text: `${startDt} ~ ${endDt}`, value: `${startDt} ~ ${endDt}` },
                { label: '부서', text: dept.text(), value: dept.value() },
                { label: '상담사', text: user.text(), value: user.value()?user.value():'전체'},
                { label: '처리결과', text: status.text(), value: status.value() },
                { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(callbackListMain.searchExpansion, callbackSearchData);

            $(callbackListMain.grid).data("kendoCpGrid").setDataSource(callbackListMain.callbackListDataSource());

            callbackListDetail.detailHide();
        }
    };

    const callbackListDetail = {
        gridSelectRow: () => {

            const splitter = $(callbackListMain.gridSplitter).data("kendoSplitter");
            const gridSplitterMainId = `#${splitter.element.find('.c-splitter-grid').attr('id')}`;
            const gridSplitterDetailId = `#${splitter.element.find('.c-splitter-detail').attr('id')}`;

            splitter.size($(gridSplitterMainId), `calc(100% - ${callbackListMain.detailSplitterWidth})`);
            splitter.size($(gridSplitterDetailId), callbackListMain.detailSplitterWidth);

            const gridDetailSplitterCloseId = `#${splitter.element.find('.k-i-close').parent().attr('id')}`;
            $(gridDetailSplitterCloseId).on('click', ()=>{
                callbackListDetail.detailHide();
            })

            const skeleton = $(`#${callbackElem}-detail-form dd`);
            skeletonClass(skeleton);
            const grid = $(callbackListMain.grid).data(`kendoCpGrid`);
            let item = grid.dataItem(grid.select());
            let getCallbackItem = new cpDataSource(METHOD.GET, `/consult/v1/callback/${item.callbackUuid}`).getDataSource();
            getCallbackItem.read().then(() => {
                skeletonClass(skeleton, false);
                let data = getCallbackItem.data();
                let item = data[0];
                if (item.callbackDt) item.callbackDt = kendo.toString(new Date(item.callbackDt), `yyyy-MM-dd H:mm`);
                if (item.distributionDt) item.distributionDt = kendo.toString(new Date(item.distributionDt), `yyyy-MM-dd H:mm`);
                if (item.regDt) item.regDt = kendo.toString(new Date(item.regDt), `yyyy-MM-dd H:mm`);

                callbackListDetail.callbackListDetailClear();
                callbackListDetail.callbackListDetailSet(item);
            });
        },
        init: async () => {
            $(`#${callbackElem}-detail-callbackDt`).kendoTextBox({fillMode: `flat`, readonly: true});
            $(`#${callbackElem}-detail-callbackTelNo`).kendoTextBox({fillMode: `flat`, readonly: true});
            $(`#${callbackElem}-detail-routeNm`).kendoTextBox({fillMode: `flat`, readonly: true});
            $(`#${callbackElem}-detail-boundTelNo`).kendoTextBox({fillMode: `flat`, readonly: true});
            $(`#${callbackElem}-detail-processNm`).kendoTextBox({fillMode: `flat`, readonly: true});
            $(`#${callbackElem}-detail-processDt`).kendoTextBox({fillMode: `flat`, readonly: true});
            $(`#${callbackElem}-detail-description`).kendoTextArea({rows: 5});
            let callbackStatus = new cpDataSource(METHOD.GET, `/common/v1/code/CallbackStatus`).getDataSource();
            await callbackStatus.read().then(() => {
                callbackStatus.data().forEach(e => e.items)
                let detailCallbackStatus = [...callbackStatus.data()[0].items, ...callbackStatus.data()[1].items];
                detailCallbackStatus = detailCallbackStatus.filter(e => e.codeValue_05 === `02`);

                $(`#${callbackElem}-detail-status`).kendoDropDownList({
                    fillMode: `flat`,
                    clearButton: false,
                    dataSource: detailCallbackStatus,
                    dataTextField: `codeNm`,
                    dataValueField: `codeKey`,
                    change: (e) => {
                        if (e.sender.value() === `Distribution`) {
                            $(`#${callbackElem}-detail-update`).hide();
                        } else {
                            $(`#${callbackElem}-detail-update`).show();
                        }
                    }
                });
            });
            $(`#${callbackElem}-detail-update`).kendoButton({
                themeColor: `primary`,
                click: () => {
                    let valid = $(`#${callbackElem}-detail-form`).kendoValidator({
                        errorTemplate: ``,
                        rule: (input) => {
                            if (input.is(`[name=callbackStatus]`)) {
                                return input.data(`kendoDropDownList`).value() !== ``;
                            } else if (input.is(`[name=description]`)) return input.val() !== ``;
                            return true;
                        },
                    }).data(`kendoValidator`);
                    if (valid.validate()) {
                        cpProgress(`${callbackElem}-detail-section`);
                        message.callBackConfirm(
                            {
                                msg: `저장하시겠습니까?`, callback: callbackListDetail.callbackListDetailUpdate,
                                cancel: () => {
                                    cpProgress(`${callbackElem}-detail-section`, false);
                                }
                            });
                    }
                }
            });
            $(`#${callbackElem}-detail-overlap-history`).kendoCpGrid({
                editable: false,
                height: 110,
                columns: [
                    {
                        field: `callbackDt`,
                        title: `중복접수일시`,
                        headerAttributes: {class: `k-text-left`},
                        attributes: {class: `k-text-left`}
                    },
                ]
            });
            $(`#${callbackElem}-detail-bound-history`).kendoCpGrid({
                editable: false,
                height: 110,
                columns: [
                    {
                        field: `boundDt`,
                        title: `전화일시`,
                        headerAttributes: {class: `k-text-center`},
                        attributes: {class: `k-text-center`}
                    },
                    {
                        field: `boundTelNo`,
                        title: `전화번호`,
                        headerAttributes: {class: `k-text-center`},
                        attributes: {class: `k-text-center`}
                    },
                    {
                        field: `rgtrNm`,
                        title: `상담원`,
                        headerAttributes: {class: `k-text-center`},
                        attributes: {class: `k-text-center`}
                    },
                ]
            });
            $(`#${callbackElem}-detail-callbackTelNo-btn`).bind(`click`, (e) => {
                callbackListDetail.callbackMakeCall(e);
            });
            $(`#${callbackElem}-detail-boundTelNo-btn`).bind(`click`, (e) => {
                callbackListDetail.callbackMakeCall(e);
            });
        },
        callbackListDetailSet: (item) => {
            let auth;
            let searchStatus = $(`#${callbackElem}-detail-status`).data(`kendoDropDownList`);
            let description = $(`#${callbackElem}-detail-description`).data(`kendoTextArea`);
            if (item.processYn === `Y`) auth = true;
            else auth = item.userId !== USER_INFO.userId;
            callbackListDetail.callbackListDetailsetReadonly(auth, item.callbackStatus);
            $(`#${callbackElem}-detail-callbackId`).val(item.callbackId);
            $(`#${callbackElem}-detail-custId`).val(item.custId);
            $(`#${callbackElem}-detail-callbackDt`).data(`kendoTextBox`).value(item.callbackDt);
            $(`#${callbackElem}-detail-callbackTelNo`).data(`kendoTextBox`).value(item.callbackTelNo);
            $(`#${callbackElem}-detail-boundTelNo`).data(`kendoTextBox`).value(item.inboundTelNo);
            $(`#${callbackElem}-detail-routeNm`).data(`kendoTextBox`).value(item.routeNm);
            $(`#${callbackElem}-detail-processNm`).data(`kendoTextBox`).value(item.processNm);
            $(`#${callbackElem}-detail-processDt`).data(`kendoTextBox`).value(item.processDt ? kendo.toString(new Date(item.processDt), `yyyy-MM-dd HH:mm`) : ``);
            if (item.inboundTelNo === ``) $(`#${callbackElem}-detail-boundTelNo-btn`).hide();
            else $(`#${callbackElem}-detail-boundTelNo-btn`).show();
            if (item.callbackTelNo === ``) $(`#${callbackElem}-detail-callbackTelNo-btn`).hide();
            else $(`#${callbackElem}-detail-callbackTelNo-btn`).show();
            searchStatus.text(item.callbackStatusNm);
            description.value(item.description);
            let boundHistoryData = new cpDataSource(METHOD.GET, `/consult/v1/callback/overlap-select/${item.callbackId}`).getDataSource();
            boundHistoryData.read().then(() => {
                let item = boundHistoryData.data();
                item.forEach(data => {
                    if (data.callbackDt) data.callbackDt = kendo.toString(new Date(data.callbackDt), `yyyy-MM-dd H:mm`);
                })
                $(`#${callbackElem}-detail-overlap-history`).data(`kendoCpGrid`).dataSource.data(item);
            });
            let visitorHistoryData = new cpDataSource(METHOD.GET, `/consult/v1/callback/visitor-select/${item.callbackId}`).getDataSource();
            visitorHistoryData.read().then(() => {
                let item = visitorHistoryData.data();
                item.forEach(data => {
                    if (data.boundDt) data.boundDt = kendo.toString(new Date(data.boundDt), `yyyy-MM-dd H:mm`);
                })
                $(`#${callbackElem}-detail-bound-history`).data(`kendoCpGrid`).dataSource.data(item);
            });
            if (callbackAuth === AUTH_RANG.ALL || callbackAuth === AUTH_RANG.SUB) {
                let callbackStatus = searchStatus.value();
                let detailProcessYn = item.processYn;
                if (callbackStatus === `Distribution`) {
                    $(`#${callbackElem}-detail-update`).hide();
                } else {
                    $(`#${callbackElem}-detail-update`).show();
                }
                if (detailProcessYn === `Y`) {
                    description.setOptions({fillMode: `flat`});
                    $(`#${callbackElem}-detail-update`).hide();
                    searchStatus._arrow.addClass(`hidden`);
                } else {
                    searchStatus._arrow.removeClass(`hidden`);
                    searchStatus.readonly(false);
                    description.readonly(false);
                    description.setOptions({fillMode: `solid`});
                    searchStatus._arrow.removeClass(`hidden`);
                }
            }
        },
        callbackListDetailClear: () => {
            $(`#${callbackElem}-detail-callbackId`).val(0);
            $(`#${callbackElem}-detail-custId`).val(0);
            $(`#${callbackElem}-detail-callbackDt`).data(`kendoTextBox`).value(``);
            $(`#${callbackElem}-detail-callbackTelNo`).data(`kendoTextBox`).value(``);
            $(`#${callbackElem}-detail-boundTelNo`).data(`kendoTextBox`).value(``);
            $(`#${callbackElem}-detail-routeNm`).data(`kendoTextBox`).value(``);
            $(`#${callbackElem}-detail-processNm`).data(`kendoTextBox`).value(``);
            $(`#${callbackElem}-detail-processDt`).data(`kendoTextBox`).value(``);
            $(`#${callbackElem}-detail-boundTelNo-btn`).hide();
            $(`#${callbackElem}-detail-callbackTelNo-btn`).hide();
            $(`#${callbackElem}-detail-status`).data(`kendoDropDownList`).value(``);
            $(`#${callbackElem}-detail-description`).data(`kendoTextArea`).value(``);
            $(`#${callbackElem}-detail-bound-history`).data(`kendoCpGrid`).dataSource.data([]);
            $(`#${callbackElem}-detail-overlap-history`).data(`kendoCpGrid`).dataSource.data([]);
            if ($(`#${callbackElem}-detail-form`).data(`kendoValidator`) !== undefined) $(`#${callbackElem}-detail-form`).data(`kendoValidator`).reset();
        },
        callbackListDetailsetReadonly: (auth, callbackStatus) => {
            $(`#${callbackElem}-detail-status`).data(`kendoDropDownList`).enable(!auth);
            $(`#${callbackElem}-detail-description`).data(`kendoTextArea`).readonly(auth);
            if (auth) {
                $(`#${callbackElem}-detail-description`).data(`kendoTextArea`).setOptions({fillMode: `flat`});
                $(`#${callbackElem}-detail-update`).hide();
                $(`#${callbackElem}-detail-status`).data(`kendoDropDownList`)._arrow.addClass(`hidden`);
            } else {
                $(`#${callbackElem}-detail-description`).data(`kendoTextArea`).setOptions({fillMode: `solid`});
                $(`#${callbackElem}-detail-status`).data(`kendoDropDownList`)._arrow.removeClass(`hidden`);
                if (callbackStatus === `Distribution`) {
                    $(`#${callbackElem}-detail-update`).hide();
                } else {
                    $(`#${callbackElem}-detail-update`).show();
                }
            }
        },
        callbackListDetailUpdate: () => {
            let param = $(`#${callbackElem}-detail-form`).serializeJSON();
            let callUpdate = new cpDataSource(METHOD.PUT, `/consult/v1/callback`, param).getDataSource();
            callUpdate.read().then(() => {
                message.notification({msg: `저장되었습니다.`, type: `success`});
                cpProgress(`${callbackElem}-detail-section`, false);
                $(callbackListMain.grid).data(`kendoCpGrid`).dataSource.read();
            });
        },
        callbackMakeCall: (e) => {
            if (ctiBtnAct.isMakeCall()) {
                let visitorParam = {
                    callbackId: $(`#${callbackElem}-detail-form`).serializeJSON().callbackId,
                    boundTelNo: $(e.currentTarget).siblings().children().val()
                }
                let visitorIns = new cpDataSource(METHOD.POST, `/consult/v1/callback/visitor-insert`, visitorParam).getDataSource();
                visitorIns.read().then(() => {
                    let item = $(callbackListMain.grid).data(`kendoCpGrid`).dataItem($(callbackListMain.grid).data(`kendoCpGrid`).select());
                    ctiBtnAct.callbackSendTel($(e.currentTarget).siblings().children().val(), item.callbackId);

                    let visitorHistoryData = new cpDataSource(METHOD.GET, `/consult/v1/callback/visitor-select/${item.callbackId}`).getDataSource();
                    visitorHistoryData.read().then(() => {
                        let item = visitorHistoryData.data();
                        item.forEach(data => {
                            if (data.boundDt) data.boundDt = kendo.toString(new Date(data.boundDt), `yyyy-MM-dd H:mm`);
                        })
                        $(`#${callbackElem}-detail-bound-history`).data(`kendoCpGrid`).dataSource.data(item);
                    });
                });
            }
        },
        detailHide: () => {

            const splitter = $(callbackListMain.gridSplitter).data("kendoSplitter");
            const gridSplitterMainId = `#${splitter.element.find('.c-splitter-grid').attr('id')}`;
            const gridSplitterDetailId = `#${splitter.element.find('.c-splitter-detail').attr('id')}`;

            splitter.size($(gridSplitterMainId), '100%');
            splitter.size($(gridSplitterDetailId), '0%');

        }
    }
    cpProgress(`${callbackElem}-layout`);
    callbackListMain.init();
    callbackListMain.gridSetting().then(() => {
        callbackListMain.gridSearch();
        callbackListDetail.init();
        cpProgress(`${callbackElem}-layout`, false);
    });
});
