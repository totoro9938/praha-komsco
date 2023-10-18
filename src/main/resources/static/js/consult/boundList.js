$(document).ready(() => {

    const elemPrev = 'boundList';
    const userAuthNm = 'CONSULT_BOUND_LIST';
    const gridDataSourceUrl = '/consult/v1/boundList/bound-list-select-page';

    const localStorageGridColumnsNm = 'localStorageBoundListGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;


    const gridMain = {

        gridColumns : [
            { field: "boundId", hidden: true },
            { field: "callDt", title: "통화시작", width: 120, attributes: {class: '!k-text-center'} },
            { field: "closeCallDt", title: "통화종료", width: 120, attributes: {class: '!k-text-center'} },
            { field: "boundTelNo", title: "수/발신번호", width: 110, attributes: {class: '!k-text-center'} },
            { field: "boundType", title: "콜유형", width: 40, attributes: {class: '!k-text-center'} },
            { field: "dnis", title: "내선번호", width: 40, attributes: {class: '!k-text-center'} },
            { field: "rgtrNm", title: "상담사", width: 40, attributes: {class: '!k-text-center'} }
        ],
        gridWidth: 0,

        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),

        grid : `#${elemPrev}-grid`,
        searchExpansion : `#${elemPrev}-expansion-panel`,
        gridSplitter : `#${elemPrev}-splitter`,
        detailSplitterWidth: '35%',

        isSearchBtn: true,

        searchDefaultValues: [],

        boundTypeDataSource: [],

        init: () => {

            //  Search panel
            gridCommonUtils.init(gridMain.searchExpansion, gridMain.gridSplitter, gridMain.grid, localStorageGridColumnsNm);
            gridCommonUtils.gridExpansionPanel(gridMain.searchExpansion, gridMain.gridSplitter, gridMain.grid);

            //  Splitter
            $(gridMain.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, size: '100%', resizable: false},
                    {collapsible: false, size: '0%', resizable: false}
                ]
            });


            gridMain.gridWidth = gridCommonUtils.gridWidthSet(gridMain.gridWidth, !!localStorageGridColumns ? localStorageGridColumns : gridMain.gridColumns, gridMain.gridSplitter);

            //  Grid
            $(gridMain.grid).kendoCpGrid({
                columns: !!localStorageGridColumns ? localStorageGridColumns : gridMain.gridColumns,
                autoBind: true,
                pageable: {
                    refresh: true
                },
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                click: (e) => {
                    let selectItem = e.sender.dataItem(e.sender.select());
                    gridDetail.detailShow(selectItem);
                },
                page : (e) => {
                },
                height: '100%',
                width: gridMain.gridWidth,
                dataSource: [],
                dataBound: () => {
                    if($(gridMain.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block'){
                        $(gridMain.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(gridMain.gridSplitter, gridMain.grid);
                    }
                },
                columnResize: () => {
                    const gridOptions = $(gridMain.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(gridMain.grid).data("kendoCpGrid").getOptions();
                        window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                }
            });

        },

        gridSetting: async () => {

            $(`#${elemPrev}-search-date-start`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: gridMain.searchStartDate,
                size: 'small'
            });

            $(`#${elemPrev}-search-date-end`).kendoDatePicker({
                format: 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: gridMain.searchEndDate,
                size: 'small'
            });


            const userIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;
            const deptIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.AGENT || userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;

            let userDropDown = new cpUserDropDown(`#${elemPrev}-search-user-id`, USER_INFO.deptId, undefined, {
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${elemPrev}-search-user-check"> 퇴사자포함</div>`
            }, userIsReadOnly, '' );
            let userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(()=>{
                userDropDown.setEnable(userIsReadOnly);
            });

            const deptAutoCompleteEvent =  (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            new cpDeptDropDownTree(`#${elemPrev}-search-dept-id`, {change:deptAutoCompleteEvent, fillMode: 'solid', autoWidth: true}, userAuthNm, deptIsReadOnly?USER_INFO.deptId:1, IS.FALSE, IS.TRUE).init();

            const userCkeckEvent =  (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }

            $(`#${elemPrev}-search-user-check`).kendoCheckBox({
                change: function(e) {
                    const isChecked = $(`input:checkbox[id=${elemPrev}-search-user-check]`).is(':checked');
                    const param = [
                        {useYn : ['Y']}
                    ];
                    if(isChecked){
                        param[0] = {useYn : ['Y','N']};
                        userDropDown.param = param;
                    }
                    userDropDown.param = param;
                    userCkeckEvent($(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value());
                }
            });

            gridMain.boundTypeDataSource =  new cpDataSource(METHOD.GET, "/common/v1/code/boundType", {}).getDataSource();
            await gridMain.boundTypeDataSource.read().then(() => {
                $(`#${elemPrev}-search-bound-type`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(gridMain.boundTypeDataSource.data(),true),
                    index: 0,
                    size: 'small'
                });
            });

            $(`#${elemPrev}-search-txt`).kendoTextBox({
                size: 'small'
            }).bind("keyup", function (e) {
                if (e.keyCode === 13) {
                    $(`#${elemPrev}-search-button`).trigger('click');
                }
            });

            $(`#${elemPrev}-search-button`).kendoButton({
                themeColor: 'secondary',
                icon: "search",
                size: 'small',
                click: () => {
                    gridMain.gridSaearch();
                }
            });

            gridMain.searchDefaultValues.deptId = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.userId = $(`#${elemPrev}-search-user-id`).data('kendoDropDownList').value();
            gridMain.searchDefaultValues.boundType = 0;
            gridMain.searchDefaultValues.type = 'TelNo';

            $(`#${elemPrev}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: 'none',
                size: 'small',
                click: function(e){
                    $(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value(gridMain.searchStartDate);
                    $(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value(gridMain.searchEndDate);
                    $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.deptId);
                    $(`#${elemPrev}-search-user-id`).data('kendoDropDownList').value(gridMain.searchDefaultValues.userId);
                    $(`#${elemPrev}-search-bound-type`).data('kendoButtonGroup').select(gridMain.searchDefaultValues.boundType);
                    $(`#${elemPrev}-search-txt`).data('kendoTextBox').value('');
                    gridMain.gridSaearch();
                }
            });
        },
        gridDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: gridDataSourceUrl,
                        type: "GET",
                        contentType: "application/json",
                        dataType: "json",
                        complete: () => {
                            if (gridMain.isSearchBtn) {
                                gridMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    parameterMap: (options) => {
                        let auth = userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;
                        const deptValue = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value();
                        const boundTypeValue = buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-bound-type`);
                        return {
                            startDate: kendo.toString(new Date($(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                            endDate: kendo.toString(new Date($(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                            parentId: auth ? 0 : deptValue,
                            deptId: auth ? deptValue : 0,
                            userId: $(`#${elemPrev}-search-user-id`).data('kendoDropDownList').value(),
                            boundType: boundTypeValue === "all" ? "" : boundTypeValue,
                            searchType: 'TelNo',
                            searchTxt: $(`#${elemPrev}-search-txt`).data('kendoTextBox').value(),
                            sortType: '',
                            page: options.page,
                            totalPage: options.pageSize
                        }
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                schema: {
                    data: "data.rows",
                    total: "data.totalCount",
                    model: {
                        boundId: {type: 'number'},
                        boundUuid: {type: 'string'},
                        ctiCallId: {type: 'string'},
                        uui: {type: 'string'},
                        ctiStation: {type: 'string'},
                        recordingId: {type: 'string'},
                        boundTelNo: {type: 'string'},
                        dnis: {type: 'string'},
                        boundType: {type: 'string'},
                        callType: {type: 'string'},
                        boundDt: {type: 'string'},
                        boundYmd: {type: 'string'},
                        callRingDt: {type: 'string'},
                        callDt: {type: 'string'},
                        callYmd: {type: 'string'},
                        callHh: {type: 'number'},
                        callSs: {type: 'number'},
                        closeCallDt: {type: 'string'},
                        closeCallYmd: {type: 'string'},
                        closeCallSs: {type: 'number'},
                        campaignId: {type: 'number'},
                        campaignCustId: {type: 'number'},
                        reservationBoundId: {type: 'number'},
                        reservationCallId: {type: 'number'},
                        callbackId: {type: 'number'},
                        agentIp: {type: 'string'},
                        connId: {type: 'string'},
                        downYn: {type: 'string'},
                        fileNm: {type: 'string'},
                        saveFilePath: {type: 'string'},
                        rgtrId: {type: 'number'},
                        rgtrNm: {type: 'string'},
                        regDt: {type: 'string'},
                        regYmd: {type: 'string'}
                    },
                    parse : (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.callDt) {
                                row.callDt = kendo.toString(new Date(row.callDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.closeCallDt) {
                                row.closeCallDt = kendo.toString(new Date(row.closeCallDt), "yyyy-MM-dd H:mm");
                            } else {
                                row.closeCallDt = ""
                            }
                        })
                        return res;
                    }
                }
            });
        },
        gridSaearch: () => {

            gridMain.isSearchBtn = true;

            let startDate       = kendo.toString(new Date($(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let endDate         = kendo.toString(new Date($(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value()), "yyyy-MM-dd");
            let deptId                  = $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree');
            let userId                  = $(`#${elemPrev}-search-user-id`).data('kendoDropDownList');
            let searchTxt               = $(`#${elemPrev}-search-txt`).data('kendoTextBox');

            let searchData = [
                { label: '인입일자', text: `${startDate} ~ ${endDate}`, value: `${startDate} ~ ${endDate}` },
                { label: '부서', text: deptId.text(), value: deptId.value() },
                { label: '상담사', text: userId.text(), value: userId.value() },
                { label: '콜유형', text: buttonGroupUtils.buttonGroupGetSelectedText(`#${elemPrev}-search-bound-type`), value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${elemPrev}-search-bound-type`) },
                { label: '전화번호', text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(gridMain.searchExpansion, searchData);

            $(gridMain.grid).data('kendoCpGrid').setDataSource(gridMain.gridDataSource());

            gridDetail.detailHide();

        }
    }

    const gridDetail = {

        init : () =>{
            $("#boundList-detail-callDt").kendoTextBox({fillMode: "flat", readonly: true});
            $("#boundList-detail-boundTelNo").kendoTextBox({fillMode: "flat", readonly: true});
            $("#boundList-detail-boundType").kendoTextBox({fillMode: "flat", readonly: true});
            $("#boundList-detail-callTm").kendoTextBox({fillMode: "flat", readonly: true});
            $("#boundList-detail-ctiStation").kendoTextBox({fillMode: "flat", readonly: true});
            $("#boundList-detail-rgtrNm").kendoTextBox({fillMode: "flat", readonly: true});

            $("#boundList-main-detail-setBtn").kendoButton({
                themeColor: 'primary',
                click: () => {
                    ctiBtnAct.isOpenMainConsult();
                    $("#callBoundF").clearForm();
                    setTimeout(() => {
                        gridDetail.callBoundSet()
                    }, 1500)
                }
            });
        },
        boundListDetailSet: (item) => {
            $("#boundList-detail-boundId").val(item.boundId);
            $("#boundList-detail-callDt").data("kendoTextBox").value(item.callDt);
            $("#boundList-detail-boundType").data("kendoTextBox").value(item.boundType);
            $("#boundList-detail-boundTelNo").data("kendoTextBox").value(item.boundTelNo.formatterHpNo());
            $("#boundList-detail-callTm").data("kendoTextBox").value(item.closeCallDt);
            $("#boundList-detail-ctiStation").data("kendoTextBox").value(item.ctiStation);
            $("#boundList-detail-rgtrNm").data("kendoTextBox").value(item.rgtrNm);
            if (item.rgtrId !== USER_INFO.userId) {
                $("#boundList-main-detail-setBtn").hide();
            } else {
                if (item.callId > 0) {
                    $("#boundList-main-detail-setBtn").hide();
                } else {
                    $("#boundList-main-detail-setBtn").show();
                }
            }
        },
        boundListDetailClear: () => {
            $("#boundList-detail-boundId").val("");
            $("#boundList-detail-callDt").data("kendoTextBox").value("");
            $("#boundList-detail-boundType").data("kendoTextBox").value("");
            $("#boundList-detail-boundTelNo").data("kendoTextBox").value("");
            $("#boundList-detail-callTm").data("kendoTextBox").value("");
            $("#boundList-detail-ctiStation").data("kendoTextBox").value("");
            $("#boundList-detail-rgtrNm").data("kendoTextBox").value("");
        },
        callBoundSet: () => {
            const grid = $('#boundList-grid').data("kendoCpGrid");
            let item = grid.dataItem(grid.select());
            let callBoundF = $("#callBoundF");
            callBoundF.find("#boundFctiCallId").val(item.ctiCallId);
            callBoundF.find("#boundFboundId").val(item.boundId);
            callBoundF.find("#boundFconnId").val(item.connId);
            callBoundF.find("#boundFctiStation").val(item.ctiStation);
            callBoundF.find("#boundFrecordingId").val(item.recordingId);
            callBoundF.find("#boundFdnis").val(item.dnis);
            callBoundF.find("#boundFcallStartDt").val(kendo.toString(new Date(item.callDt), 'yyyyMMddHHmmss'));
            if (!!item.closeCallDt) {
                callBoundF.find("#boundFcallEndDt").val(kendo.toString(new Date(item.closeCallDt), 'yyyyMMddHHmmss'));
            } else {
                callBoundF.find("#boundFcallEndDt").val('');
            }
            callBoundF.find("#boundFboundType").val(item.boundType);
            callBoundF.find("#boundFboundTelNo").val(item.boundTelNo);
            consultCustomerInfo.customerFindTelNo(item.boundTelNo).then(() => {
                $("#consult-boundTel-number").val(item.boundTelNo.formatterHpNo());
            });

        },

        detailShow: (data) => {

            const splitter = $(gridMain.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), `calc(100% - ${gridMain.detailSplitterWidth})`);
            splitter.size($(gridSplitterDetailId), gridMain.detailSplitterWidth);

            const gridSplitterCloseId = '#' + splitter.element.find('.k-i-close').parent().attr('id');
            $(gridSplitterCloseId).on('click', () => {
                gridDetail.detailHide();
            });

            const skeleton = $('#boundList-detail-form dd');
            skeletonClass(skeleton);
            const grid = $(gridMain.grid).data('kendoCpGrid');
            let items = grid.dataItem(grid.select());
            let getCallItem = new cpDataSource(METHOD.GET, '/consult/v1/boundList/bound-list-select-item/' + items.boundUuid).getDataSource();
            getCallItem.read().then(() => {
                skeletonClass(skeleton, false);
                let data = getCallItem.data();
                let item = data[0];
                if (item.callDt) {
                    item.callDt = kendo.toString(new Date(item.callDt), "yyyy-MM-dd H:mm");
                }

                if (item.boundDt) {
                    item.boundDt = kendo.toString(new Date(item.boundDt), "yyyy-MM-dd H:mm");
                }

                if (item.closeCallDt) {
                    item.closeCallDt = kendo.toString(new Date(item.closeCallDt), "yyyy-MM-dd H:mm");
                }

                gridDetail.boundListDetailClear();
                gridDetail.boundListDetailSet(item);
            });

        },
        detailHide: () => {

            const splitter = $(gridMain.gridSplitter).data('kendoSplitter');
            const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
            const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

            splitter.size($(gridSplitterMainId), '100%');
            splitter.size($(gridSplitterDetailId), '0%');

        }

    }


    cpProgress(`${elemPrev}-layout`);
    gridMain.init();
    gridMain.gridSetting().then(()=>{
        gridMain.gridSaearch();
        gridDetail.init();
        cpProgress(`${elemPrev}-layout`, false);
    });

});
