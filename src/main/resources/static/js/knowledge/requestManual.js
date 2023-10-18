$(document).ready(() => {
    
    const requestManualElem = `request-manual`;
    const requestManualAuth = `WORK_REQUEST_MANUAL_LIST`;
    const requestManualDeptAuth = userAuthRange(requestManualAuth);
    
    let requestManualSearchParam = {};
    
    const localStorageRequestColumnsNm = `localStorageRequestManualGridColumns`;
    const localStorageRequestColumns = !!window.localStorage.getItem(localStorageRequestColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageRequestColumnsNm)) : null;
    
    const requestManual = {
        gridColumns: [
            {field: `requestReasonTypeNm`, title: `요청구분`,attributes: {class: `!k-text-center`}, width: 75},
            {field: `requestReason`, title: `요청내용`,attributes:  {style: `text-overflow: ellipsis; overflow: hidden; white-space: nowrap;`}},
            {field: `deptNm`, title: `부서`, attributes:  {style: `text-overflow: ellipsis; overflow: hidden; white-space: nowrap;`}, width: 200},
            {field: `chargeNm`, title: `담당자`, attributes: {class: `!k-text-center`}, width: 120},
            {field: `requestManualStatusNm`, title: `처리결과`, attributes: {class: `!k-text-center`}, width: 75,template:`#= requestManualStatusNm #`},
            {field: `rgtrNm`, title: `요청자`, attributes: {class: `!k-text-center`}, width: 120},
            {field: `regDt`, title: `요청일시`, attributes: {class: `!k-text-center`}, width: 140}
        ],
        gridWidth: 0,
    
        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),
    
        grid : `#${requestManualElem}-grid`,
        searchExpansion : `#${requestManualElem}-expansion-panel`,
        gridSplitter : `#${requestManualElem}-splitter`,
        detailSplitterWidth: `35%`,
    
        isSearchBtn: true,
    
        searchDefaultValues: [],
    
        manualTypeDataSource: [],
        statusDataSource: [],
    
        init: async () => {
    
            gridCommonUtils.init(requestManual.searchExpansion, requestManual.gridSplitter, requestManual.grid, localStorageRequestColumnsNm);
            gridCommonUtils.gridExpansionPanel(requestManual.searchExpansion, requestManual.gridSplitter, requestManual.grid);
    
            $(requestManual.gridSplitter).kendoSplitter({
                orientation: `horizontal`,
                panes: [
                    {collapsible: false, size: `100%`, resizable: false},
                    {collapsible: false, size: `0%`, resizable: false}
                ]
            });
    
            requestManual.gridWidth = gridCommonUtils.gridWidthSet(requestManual.gridWidth, !!localStorageRequestColumns ? localStorageRequestColumns : requestManual.gridColumns, requestManual.gridSplitter);
    
            $(requestManual.grid).kendoCpGrid({
                columns: !!localStorageRequestColumns ? localStorageRequestColumns : requestManual.gridColumns,
                autoBind: true,
                pageable: {
                    refresh: true
                },
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                click: () => {
    
                    const splitter = $(requestManual.gridSplitter).data(`kendoSplitter`);
                    const gridSplitterMainId = `#${splitter.element.find(`.c-splitter-grid`).attr(`id`)}`;
                    const gridSplitterDetailId = `#${splitter.element.find(`.c-splitter-detail`).attr(`id`)}`;
    
                    splitter.size($(gridSplitterMainId), `calc(100% - ${requestManual.detailSplitterWidth})`);
                    splitter.size($(gridSplitterDetailId), requestManual.detailSplitterWidth);
    
                    const gridDetailSplitterCloseId = `#${splitter.element.find(`.k-i-close`).parent().attr(`id`)}`;
                    $(gridDetailSplitterCloseId).on(`click`, ()=>{
                        requestManualDetail.detailHide();
                    })
    
                    const grid = $(requestManual.grid).data(`kendoCpGrid`);
                    let item = grid.dataItem(grid.select());
                    let getRequestManualItem = new cpDataSource(METHOD.GET, `/knowledge/v1/manual-request-item/select`, {
                        requestManualId: item.requestManualId,
                        outputYn: `Y`
                    }).getDataSource();
    
                    getRequestManualItem.read().then(() => {
                        let data = getRequestManualItem.data()[0];
                        data.requestReason = data.requestReason == null ? `` : data.requestReason;
                        data.title = data.title == null ? `` : data.title;
                        data.fullCatNm = data.fullCatNm == null ? `` : data.fullCatNm;
                        data.deptNm = data.deptNm == null ? `` : data.deptNm;
                        data.chargeNm = data.chargeNm == null ? `` : data.chargeNm;
                        data.mdfDt = data.mdfDt == null ? `` : kendo.toString(new Date(data.mdfDt), `yyyy-MM-dd HH:mm`);
                        data.regDt = data.regDt == null ? `` : kendo.toString(new Date(data.regDt), `yyyy-MM-dd HH:mm`);
                        data.processNm = data.processNm == null ? `` : data.processNm;
                        data.processDt = data.processDt == null ? `` : kendo.toString(new Date(data.processDt), `yyyy-MM-dd HH:mm`);
                        data.rejectReason = data.rejectReason == null ? `` : data.rejectReason;
                        data.requestManualId = data.requestManualId == null ? `` : data.requestManualId
                        requestManualDetail.detailClear();
                        requestManualDetail.showDetail(data);
                        requestManualDetail.dataBindingToDetail(data);
                    });
    
                },
                height: `100%`,
                width: requestManual.gridWidth,
                dataBound: ()=>{
                    if($(requestManual.searchExpansion).closest(`.k-expander-content-wrapper`).css(`display`) === `block`){
                        $(requestManual.searchExpansion).data(`kendoExpansionPanel`).toggle();
                        gridCommonUtils.gridResize(requestManual.gridSplitter, requestManual.grid);
                    }
                },
                columnResize: () => {
                    const gridOptions = $(requestManual.grid).data(`kendoCpGrid`).getOptions();
                    window.localStorage.setItem(localStorageRequestColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(requestManual.grid).data(`kendoCpGrid`).getOptions();
                        window.localStorage.setItem(localStorageRequestColumns, JSON.stringify(gridOptions.columns));
                    }, 5);
                }
            });
        }
    }
    const requestManualGridSetting = {
        init:async () => {
    
            $(`#${requestManualElem}-search-date-start`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: [`yyyy-MM-dd`,`yyyyMMdd`],
                value: requestManual.searchStartDate,
                size: `small`
            });
    
            $(`#${requestManualElem}-search-date-end`).kendoDatePicker({
                format: `yyyy-MM-dd`,
                parseFormats: [`yyyy-MM-dd`,`yyyyMMdd`],
                value: requestManual.searchEndDate,
                size: `small`
            });
    
            const requestManualDeptAutoCompleteEvent =  (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            const requestManualChargelDeptAutoCompleteEvent =  (e) => {
                let row = dropTreeRow(e);
                const call = chargeUserDropDown.getDeptData(row.deptId);
                call.read().then(()=>{
                    chargeUserDropDownCreate.setDataSource(call.data());
                    chargeUserDropDownCreate.value(0);
                });
            }
    
            const pageAuth = requestManualDeptAuth === AUTH_RANG.NOTHING;
            const pageAuthAll = requestManualDeptAuth === AUTH_RANG.ALL;
            const pageAuthSub = requestManualDeptAuth !== AUTH_RANG.SUB;
            let setDeptId = !pageAuth && USER_INFO.topDeptId===1?1:USER_INFO.deptId;
            if(pageAuth)setDeptId = USER_INFO.deptId;
            let setUserId = pageAuthAll?0:USER_INFO.userId;
    
            let userDropDown, userDropDownCreate;
            let chargeUserDropDown, chargeUserDropDownCreate;
            let dropDown, chargeDropDown;
    
            if (USER_INFO.topDeptId ===1){
                userDropDown = new cpUserDropDown(`#${requestManualElem}-agent`,setDeptId, undefined,{
                    value : setUserId,
                    fillMode: `solid`,
                    autoWidth: true,
                    size: `small`
                }, pageAuth, ``);
                userDropDownCreate = userDropDown.create();
                await userDropDown.drawingList().then(()=>{
                    userDropDown.setEnable(pageAuth);
                });
    
                new cpDeptDropDownTree(`#${requestManualElem}-department`, {
                    change:requestManualDeptAutoCompleteEvent,
                    fillMode : `solid`,
                    autoWidth : true,
                    filter:`none`
                },requestManualAuth,setDeptId,IS.FALSE,IS.TRUE).init();
    
                chargeUserDropDown = new cpUserDropDown(`#${requestManualElem}-chargeId`,0, undefined,{
                    fillMode: `solid`,
                    autoWidth: true,
                    size: `small`
                });
                chargeUserDropDownCreate = chargeUserDropDown.create();
                await chargeUserDropDown.drawingList().then(()=>{
                    chargeUserDropDownCreate.value(0);
                });
    
                dropDown = new cpDeptDropDownTree(`#${requestManualElem}-charge-department`, {
                    change: requestManualChargelDeptAutoCompleteEvent,
                    fillMode : `solid`,
                    autoWidth : true,
                    filter: `none`,
                    value : 0
                });
                chargeDropDown = dropDown.create();
                chargeDropDown.setDataSource(await dropDown.getData());
            }else{
                userDropDown = new cpUserDropDown(`#${requestManualElem}-agent`,1, undefined,{
                    fillMode: `solid`,
                    autoWidth: true,
                    size: `small`
                });
                userDropDownCreate = userDropDown.create();
                await userDropDown.drawingList().then(()=>{
                    userDropDownCreate.value(0);
                });
    
                dropDown = new cpDeptDropDownTree(`#${requestManualElem}-department`, {
                    change:requestManualDeptAutoCompleteEvent,
                    fillMode : `solid`,
                    autoWidth : true,
                    filter: `none`
                },requestManualAuth,1,IS.FALSE,IS.TRUE);
                chargeDropDown = dropDown.create();
                chargeDropDown.setDataSource(await dropDown.getData());
    
                chargeUserDropDown = new cpUserDropDown(`#${requestManualElem}-chargeId`,setDeptId, undefined,{
                    value : USER_INFO.userId,
                    fillMode: `solid`,
                    autoWidth: true,
                    size: `small`
                }, pageAuth, ``);
                chargeUserDropDownCreate = chargeUserDropDown.create();
                await chargeUserDropDown.drawingList().then(()=>{
                    chargeUserDropDown.setEnable(pageAuth);
                });
    
                new cpDeptDropDownTree(`#${requestManualElem}-charge-department`, {
                    change: requestManualChargelDeptAutoCompleteEvent,
                    fillMode : `solid`,
                    autoWidth : true,
                    filter:`none`
                },requestManualAuth,setDeptId,pageAuthSub,IS.FALSE).init();
            }
    
            requestManual.statusDataSource = new cpDataSource(METHOD.GET, `/common/v1/code/RequestManualStatus`,{}).getDataSource();
            await requestManual.statusDataSource.read().then(()=>{
                $(`#${requestManualElem}-status`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(requestManual.statusDataSource.data(),true),
                    index: 0,
                    size: `small`
                });
            });
    
            requestManual.manualTypeDataSource = new cpDataSource(METHOD.GET, `/common/v1/code/RequestManualType`,{}).getDataSource();
            await requestManual.manualTypeDataSource.read().then(()=>{
                $(`#${requestManualElem}-type`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(requestManual.manualTypeDataSource.data(),true),
                    index: 0,
                    size: `small`
                });
            });
    
            $(`#${requestManualElem}-content`).kendoTextBox({
                size: `small`,
            }).bind(`keyup`, function(e) {
                if(e.keyCode === 13){
                    $(`#${requestManualElem}-search-button`).trigger(`click`);
                }
            });
    
            $(`#${requestManualElem}-search-button`).kendoButton({
                themeColor: `secondary`,
                size: "small",
                icon: `search`,
                click: () => {
                    requestManual.isSearchBtn = true;
                    requestManualGridSetting.gridSearch();
                }
            });
    
            requestManual.searchDefaultValues.deptId = $(`#${requestManualElem}-department`).data(`kendoDropDownTree`).value();
            requestManual.searchDefaultValues.agentId = $(`#${requestManualElem}-agent`).data(`kendoDropDownList`).value();
            requestManual.searchDefaultValues.chargeDeptId = $(`#${requestManualElem}-charge-department`).data(`kendoDropDownTree`).value();
            requestManual.searchDefaultValues.chargeId = $(`#${requestManualElem}-chargeId`).data(`kendoDropDownList`).value();
            requestManual.searchDefaultValues.status = 0;
            requestManual.searchDefaultValues.requestType =0;
    
            $(`#${requestManualElem}-search-reset`).kendoButton({
                icon: `arrow-rotate-ccw`,
                size: "small",
                themeColor: `none`,
                click: ()=>{
                    $(`#${requestManualElem}-search-date-start`).data(`kendoDatePicker`).value(requestManual.searchStartDate);
                    $(`#${requestManualElem}-search-date-end`).data(`kendoDatePicker`).value(requestManual.searchEndDate);
                    $(`#${requestManualElem}-department`).data(`kendoDropDownTree`).value(requestManual.searchDefaultValues.deptId);
                    $(`#${requestManualElem}-agent`).data(`kendoDropDownList`).value(requestManual.searchDefaultValues.agentId);
                    $(`#${requestManualElem}-charge-department`).data(`kendoDropDownTree`).value(requestManual.searchDefaultValues.chargeDeptId);
                    $(`#${requestManualElem}-chargeId`).data(`kendoDropDownList`).value(requestManual.searchDefaultValues.chargeId);
                    $(`#${requestManualElem}-status`).data(`kendoButtonGroup`).select(requestManual.searchDefaultValues.status);
                    $(`#${requestManualElem}-type`).data(`kendoButtonGroup`).select(requestManual.searchDefaultValues.requestType);
                    $(`#${requestManualElem}-content`).data(`kendoTextBox`).value('');
                    requestManual.isSearchBtn = true;
                    requestManualGridSetting.gridSearch();
                }
            });
        },
        gridDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `/knowledge/v1/manual-request/select`,
                        type: `GET`,
                        contentType: `application/json`,
                        dataType: `json`,
                        complete : () => {
                            if(requestManual.isSearchBtn){
                                requestManual.isSearchBtn = false;
                                message.notification({type:`info`});
                            }
                        }
                    },
                    parameterMap: (options) => {
                        if (requestManual.isSearchBtn) {
                            const chargeId = $(`#${requestManualElem}-chargeId`).data(`kendoDropDownList`).value();
                            let param = {
                                startDate: kendo.toString($(`#${requestManualElem}-search-date-start`).data(`kendoDatePicker`).value(), `yyyy-MM-dd`),
                                endDate: kendo.toString($(`#${requestManualElem}-search-date-end`).data(`kendoDatePicker`).value(), `yyyy-MM-dd`),
                                parentId: $(`#${requestManualElem}-department`).data(`kendoDropDownTree`).value(),
                                deptId: 0,
                                chargeId: chargeId,
                                requestUserId: chargeId === 0 ? $(`#${requestManualElem}-agent`).data(`kendoDropDownList`).value() : 0,
                                requestManualStatus: buttonGroupUtils.buttonGroupGetSelectedValue(`#${requestManualElem}-status`) === `all` ? `` : buttonGroupUtils.buttonGroupGetSelectedValue(`#${requestManualElem}-status`),
                                requestReasonType: buttonGroupUtils.buttonGroupGetSelectedValue(`#${requestManualElem}-type`) === `all` ? `` : buttonGroupUtils.buttonGroupGetSelectedValue(`#${requestManualElem}-type`),
                                requestReason: $(`#${requestManualElem}-content`).data("kendoTextBox").value(),
                                sortType: ``,
                                outputYn: `Y`,
                                page: options.page,
                                totalPage: options.pageSize
                            };
                            
                            requestManualSearchParam = {...param};
                            return param;
                        } else {
                            requestManualSearchParam.page = options.page;
                            requestManualSearchParam.totalPage = options.pageSize;
                            return requestManualSearchParam;
                        }
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                schema: {
                    data: `data.rows`,
                    total: `data.totalCount`,
                    model: {
                        id: `requestManualId`,
                        fields: {
                            companyCd: {type: `string`},
                            requestManualId: {type: `number`},
                            requestReasonType: {type: `string`},
                            requestReasonTypeNm: {type: `string`},
                            requestReason: {type: `string`},
                            deptId: {type: `number`},
                            deptNm: {type: `string`},
                            fullDeptNm: {type: `string`},
                            chargeId: {type: `number`},
                            chargeNm: {type: `string`},
                            requestManualStatus: {type: `string`},
                            requestManualStatusNm: {type: `string`},
                            approvalYn: {type: `string`},
                            manualId: {type: `number`},
                            processId: {type: `number`},
                            processNm: {type: `string`},
                            processYn: {type: `string`},
                            processDt: {type: `string`},
                            processYmd: {type: `string`},
                            rgtrId: {type: `number`},
                            rgtrNm: {type: `string`},
                            regDt: {type: `string`},
                            mdfDt: {type: `string`}
                        }
                    },
                    parse: (res) =>{
                        res.data.rows.forEach((row) => {
                            row.regDt = kendo.toString(new Date(row.regDt), `yyyy-MM-dd HH:mm`);

                            if (row.requestManualStatus === `Approval`) {
                                row.requestManualStatusNm = `<span class="k-badge k-badge-solid-success k-badge-md k-rounded-md k-badge-inline">승인</span>`;
                            } else if (row.requestManualStatus === `Request`) {
                                row.requestManualStatusNm = `<span class="k-badge k-badge-solid-warning k-badge-md k-rounded-md k-badge-inline">요청</span>`;
                            } else if (row.requestManualStatus === `Reject`) {
                                row.requestManualStatusNm = `<span class="k-badge k-badge-solid-error k-badge-md k-rounded-md k-badge-inline">반려</span>`;
                            } else {
                                row.requestManualStatusNm = ``
                            }

                        })
                        return res;
                    }
                }
            });
        },
        gridSearch : ()=>{
            
            let startDate = kendo.toString(new Date($(`#${requestManualElem}-search-date-start`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let endDate = kendo.toString(new Date($(`#${requestManualElem}-search-date-end`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let deptId = $(`#${requestManualElem}-department`).data(`kendoDropDownTree`);
            let agentId = $(`#${requestManualElem}-agent`).data(`kendoDropDownList`);
            let chargeDeptId = $(`#${requestManualElem}-charge-department`).data(`kendoDropDownTree`);
            let chargeId = $(`#${requestManualElem}-chargeId`).data(`kendoDropDownList`);
            let requestContent = $(`#${requestManualElem}-content`).data(`kendoTextBox`);
    
            let searchData = [
                { label: `요청일자`, text: `${startDate} ~ ${endDate}`, value: `${startDate} ~ ${endDate}` },
                { label: `요청부서`, text: deptId.text(), value: deptId.value() },
                { label: `요청자`, text: agentId.text(), value: agentId.value() },
                { label: `담당부서`, text: chargeDeptId.text(), value: chargeDeptId.value() },
                { label: `담당자`, text: chargeId.text(), value: chargeId.value() },
                { label: `처리결과`, text: buttonGroupUtils.buttonGroupGetSelectedText(`#${requestManualElem}-status`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${requestManualElem}-status`) },
                { label: `요청구분`, text: buttonGroupUtils.buttonGroupGetSelectedText(`#${requestManualElem}-type`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${requestManualElem}-type`) },
                { label: `요청내용`, text: requestContent.value(), value: requestContent.value()}
            ];
    
            gridCommonUtils.gridSearchPrint(requestManual.searchExpansion, searchData);
    
            $(requestManual.grid).data(`kendoCpGrid`).setDataSource(requestManualGridSetting.gridDataSource());
    
            requestManualDetail.detailHide();
        }
    };
    
    const requestManualDetail = {
        init: () => {
    
            $(`#${requestManualElem}-detail-requestReason`).kendoTextArea({
                readonly: true,
                fillMode: `flat`,
                rows: 6
            });
    
            $(`#${requestManualElem}-detail-title`).kendoTextBox({
                readonly: true,
                fillMode: `flat`
            });
    
            $(`#${requestManualElem}-detail-fullCatNm`).kendoTextBox({
                readonly: true,
                fillMode: `flat`
            });
    
            $(`#${requestManualElem}-detail-department`).kendoTextBox({
                readonly: true,
                fillMode: `flat`
            });
    
            $(`#${requestManualElem}-detail-chargeNm`).kendoTextBox({
                readonly: true,
                fillMode: `flat`
            });
    
            $(`#${requestManualElem}-detail-mdfDt`).kendoTextBox({
                readonly: true,
                fillMode: `flat`
            });
    
            $(`#${requestManualElem}-detail-processNm`).kendoTextBox({
                readonly: true,
                fillMode: `flat`
            });
    
            $(`#${requestManualElem}-detail-processDt`).kendoTextBox({
                readonly: true,
                fillMode: `flat`
            });
    
            $(`#${requestManualElem}-detail-rejectReason`).kendoTextArea({
                readonly: true,
                fillMode: `flat`,
                rows: 4
            });
    
            $(`#${requestManualElem}-btn-approval`).kendoButton({
                themeColor: `primary`,
                click: () => {
    
                    let editorOption ={
                        name: `manual-editor`,
                        height: 820,
                        width: 1100,
                        top: 100,
                        left: 100,
                    }

                    const requestReasonType = $(`#${requestManualElem}-requestReasonType`).val();
                    if (requestReasonType === `Insert`) {
                        new popupWindow(`/manual-editor?parentPage=request-manual`, `manual-editor`, editorOption).open();
                    } else if (requestReasonType === `Update`){
                        new popupWindow(`/manual-editor?parentPage=request-manual&manualUuid=${$(`#${requestManualElem}-manualUuid`).val()}`, `manual-editor`, editorOption).open();
                    }
                }
            });
    
            $(`#${requestManualElem}-btn-open-reject-window`).kendoButton({
                themeColor: `error`,
                click: () => {
                    requestManualRejectWindow.init();
                }
            });
    
            $(`#${requestManualElem}-btn-open-manual`).kendoButton({
                click: () => {
                    let manualUuid = $(`#${requestManualElem}-manualUuid`).val();
                    let detailOption = {
                        name : `manual-detail`,
                        height : 820,
                        width : 1400,
                        top : 100,
                        left : 100,
                    };
    
                    new popupWindow(`/manual-detail?manualUuid=${manualUuid}&level=1&parentType=request-manual`, `manual-detail`, detailOption).open();
                }
            });
    
            $(`#${requestManualElem}-deleted-badge`).kendoButton({
                themeColor: `error` ,
                enable: false
            });
        },
        detailHide: () => {
            const splitter = $(requestManual.gridSplitter).data(`kendoSplitter`);
            const gridSplitterMainId = `#` + splitter.element.find(`.c-splitter-grid`).attr(`id`);
            const gridSplitterDetailId = `#` + splitter.element.find(`.c-splitter-detail`).attr(`id`);
    
            splitter.size($(gridSplitterMainId), `100%`);
            splitter.size($(gridSplitterDetailId), `0%`);
        },
        detailClear : ()=>{
            $(`#${requestManualElem}-manualId`).val(``);
            $(`#${requestManualElem}-requestManualId`).val(``);
            $(`#${requestManualElem}-manualUuid`).val(``);
            $(`#${requestManualElem}-requestReasonType`).val(``);
            $(`#${requestManualElem}-requestManualStatus`).val(``);
            $(`#${requestManualElem}-detail-requestReason`).data(`kendoTextArea`).value(``);
            $(`#${requestManualElem}-detail-title`).data(`kendoTextBox`).value(``);
            $(`#${requestManualElem}-detail-fullCatNm`).data(`kendoTextBox`).value(``);
            $(`#${requestManualElem}-detail-department`).data(`kendoTextBox`).value(``);
            $(`#${requestManualElem}-detail-chargeNm`).data(`kendoTextBox`).value(``);
            $(`#${requestManualElem}-detail-mdfDt`).data(`kendoTextBox`).value(``);
            $(`#${requestManualElem}-detail-processNm`).data(`kendoTextBox`).value(``);
            $(`#${requestManualElem}-detail-processDt`).data(`kendoTextBox`).value(``);
            $(`#${requestManualElem}-detail-rejectReason`).data(`kendoTextArea`).value(``);
        },
        dataBindingToDetail: (item) => {
            $(`#${requestManualElem}-manualId`).val(item.manualId);
            $(`#${requestManualElem}-requestManualId`).val(item.requestManualId);
            $(`#${requestManualElem}-manualUuid`).val(item.manualUuid);
            $(`#${requestManualElem}-requestReasonType`).val(item.requestReasonType);
            $(`#${requestManualElem}-requestManualStatus`).val(item.requestManualStatus);
            $(`#${requestManualElem}-detail-requestReason`).data(`kendoTextArea`).value(item.requestReason);
            $(`#${requestManualElem}-detail-title`).data(`kendoTextBox`).value(item.title);
            $(`#${requestManualElem}-detail-fullCatNm`).data(`kendoTextBox`).value(item.fullCatNm);
            $(`#${requestManualElem}-detail-department`).data(`kendoTextBox`).value(item.deptNm);
            $(`#${requestManualElem}-detail-chargeNm`).data(`kendoTextBox`).value(item.chargeNm);
            $(`#${requestManualElem}-detail-mdfDt`).data(`kendoTextBox`).value(item.mdfDt);
            $(`#${requestManualElem}-detail-processNm`).data(`kendoTextBox`).value(item.processNm);
            $(`#${requestManualElem}-detail-processDt`).data(`kendoTextBox`).value(item.processDt);
            $(`#${requestManualElem}-detail-rejectReason`).data(`kendoTextArea`).value(item.rejectReason);
        },
        showDetail: (item) => {
            let isShowManualInfo = item.requestReasonType === `Update` || item.requestManualStatus === `Approval`;
            let isShowProcessInfo = item.requestManualStatus === `Approval` || item.requestManualStatus === `Reject`;
            let isShowRejectReason = item.requestManualStatus === `Reject`;
            let isShowBtnApprovalOrReject = item.requestManualStatus === `Request`;
    
            $(`#${requestManualElem}-section`).show()
            if(item.manualDelYn === `Y`) {
                $(`#${requestManualElem}-deleted-badge`).show();
                $(`#${requestManualElem}-btn-open-manual`).hide();
                $(`#${requestManualElem}-btn-approval`).hide();
                $(`.${requestManualElem}-detail-rejectReason`).hide();
                $(`#${requestManualElem}-btn-open-reject-window`).hide();
    
                if (isShowManualInfo) {
                    $(`.${requestManualElem}-detail-manual-info`).show();
                } else {
                    $(`.${requestManualElem}-detail-manual-info`).hide();
                }
    
            } else {
                $(`#${requestManualElem}-deleted-badge`).hide();
    
                if (isShowManualInfo) {
                    $(`.${requestManualElem}-detail-manual-info`).show();
                    $(`#${requestManualElem}-btn-open-manual`).show();
                } else {
                    $(`.${requestManualElem}-detail-manual-info`).hide();
                    $(`#${requestManualElem}-btn-open-manual`).hide();
                }
    
                if (isShowProcessInfo) {
                    $(`.${requestManualElem}-detail-process-info`).show();
                } else {
                    $(`.${requestManualElem}-detail-process-info`).hide();
                }
    
                if (isShowRejectReason) {
                    $(`.${requestManualElem}-detail-rejectReason`).show();
                } else {
                    $(`.${requestManualElem}-detail-rejectReason`).hide();
                }
    
                if (isShowBtnApprovalOrReject) {
                    $(`#${requestManualElem}-btn-approval`).show();
                    $(`#${requestManualElem}-btn-open-reject-window`).show();
                } else {
                    $(`#${requestManualElem}-btn-approval`).hide();
                    $(`#${requestManualElem}-btn-open-reject-window`).hide();
                }
            }
        }
    };
    
    const requestManualRejectWindow = {
        init: () => {
            let $div = $(`<div id="request-manual-reject-window"></div>`);
            $div.kendoWindow({
                width: 400,
                height: 300,
                position : {
                    top : `30%`,
                    left:`35%`
                },
                modal: true,
                appendTo: $(`#program-313`).parent(),
                actions: [`Close`],
                draggable: false,
                resizable: false,
                title: `매뉴얼요청 반려`,
                content: {
                    template: kendo.template($(`#${requestManualElem}-window-template`).html())
                },
                open: () => {
                    requestManualRejectWindow.open();
                },
                close: (e) => {
                    e.sender.destroy();
                }
            }).data(`kendoWindow`).refresh().open();
        },
        open: () => {
            let rejectReasonValidator = $(`#${requestManualElem}-reject-reason-validator`).kendoValidator({
                messages: {
                    required: (input) => {
                        let rejectReason = $(`#${requestManualElem}-reject-reason`).data(`kendoTextArea`).value();
                        if(input.is(`[name=rejectReason]`)){
                            if (rejectReason === ``) {
                                return;
                            }
                        }
                        return ``;
                    }
                }
            }).data(`kendoValidator`);
    
            $(`#${requestManualElem}-reject-reason`).kendoTextArea({
                placeholder: `반려사유 입력...`,
                rows: 8
            });
    
            $(`#${requestManualElem}-btn-reject`).kendoButton({
                icon: `check`,
                themeColor: `success`,
                click: () => {
                    if (!rejectReasonValidator.validate()) {
                        return;
                    }
                    let rejectManualDataSource = new cpDataSource(METHOD.PUT, `/knowledge/v1/manual-request/reject`, {
                        requestManualId: $(`#${requestManualElem}-requestManualId`).val(),
                        rejectReason: $(`#${requestManualElem}-reject-reason`).data(`kendoTextArea`).value()
                    }).getDataSource();
    
                    rejectManualDataSource.read().then(() => {
                        $(`#${requestManualElem}-reject-window`).data(`kendoWindow`).close();
                        $(`#${requestManualElem}-grid`).data(`kendoCpGrid`).dataSource.read();
                        message.notification({msg: `반려되었습니다.`, type: `success`});
                    });
                }
            });
        }
    };
    cpProgress(`${requestManualElem}-layout`);
    requestManual.init();
    requestManualGridSetting.init().then(()=>{
        requestManualGridSetting.gridSearch();
        requestManualDetail.init();
        cpProgress(`${requestManualElem}-layout`,false);
    });

});