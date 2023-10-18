$(document).ready(() => {

    const elemPrev = 'transfer';
    const userAuthNm = 'WORK_TRANSFER_LIST';
    const gridDataSourceUrl = '/work/v1/transfer/page';

    const transferDeptAuth = userAuthRange("WORK_TRANSFER_LIST");

    const localStorageGridColumnsNm = 'localStorageTransferGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;


    const gridMain = {

        gridColumns : [
            {field: "transferId", hidden: true},
            {field: "transferDt", title: "이관일시", width: 70, attributes: {class: '!k-text-center'}},
            {field: "rgtrNm", title: "접수자", width: 70, attributes: {class: '!k-text-center'}},
            {field: "boundTelNo", title: "수/발신번호", width: 70, attributes: {class: '!k-text-center'}},
            {field: "fullDeptNm", title: "담당부서", width: 70, attributes: {class: '!k-text-center'}},
            {field: "chargeNm", title: "담당자", width: 70, attributes: {class: '!k-text-center'}},
            {field: "fullCallCatNm", title: "상담분류", width: 150, attributes: {class: '!k-text-center'}},
            {field: "transferStatusNm", title: "처리결과", width: 50, attributes: {class: '!k-text-center'}},
            {field: "processDt", title: "처리일시", width: 70, attributes: {class: '!k-text-center'}}
        ],
        gridWidth: 0,

        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 30)),
        searchEndDate : new Date(),

        grid : `#${elemPrev}-grid`,
        searchExpansion : `#${elemPrev}-expansion-panel`,
        gridSplitter : `#${elemPrev}-splitter`,
        detailSplitterWidth: '35%',

        isSearchBtn: true,

        searchDefaultValues: [],

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
                toolbar: [
                    {template: kendo.template($(`#transfer-grid-toolbar-template`).html())}
                ],
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
                },
                excelExport: (e) => {
                    let rangedate = kendo.toString(new Date(), 'yyyy-MM-dd');
                    e.workbook.fileName = "이관처리리스트 " +rangedate+ ".xlsx";
                }
            });

            $(`#${elemPrev}-toolbar-button-excel-down`).kendoButton({
                icon: "download",
                themeColor: 'success',
                size: 'small',
                click: ()=>{
                    $(`#${elemPrev}-grid`).data("kendoCpGrid").saveAsExcel();
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

            const deptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            const chargeDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = chargeUserDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    chargeUserDropDownCreate.setDataSource(call.data());
                    chargeUserDropDownCreate.value(0);
                });
            }

            const pageAuth = transferDeptAuth === AUTH_RANG.NOTHING;
            const pageAuthAll = transferDeptAuth === AUTH_RANG.ALL;
            const pageAuthSub = transferDeptAuth !== AUTH_RANG.SUB;
            let setDeptId = !pageAuth && USER_INFO.topDeptId === 1 ? 1 : USER_INFO.deptId;
            let setUserId = pageAuthAll ? 0 : USER_INFO.userId;

            if (pageAuth) setDeptId = USER_INFO.deptId;

            let userDropDown, userDropDownCreate;
            let chargeUserDropDown, chargeUserDropDownCreate;
            let dropDown, chargeDropDown;

            if (USER_INFO.topDeptId === 1) {

                userDropDown = new cpUserDropDown(`#${elemPrev}-search-user-id`, setDeptId, undefined, {
                    value: setUserId,
                    clearButton: false,
                    fillMode: 'solid',
                    autoWidth: true,
                    size: 'small',
                    headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${elemPrev}-search-user-check"> 퇴사자포함</div>`
                }, pageAuth, '');
                userDropDownCreate = userDropDown.create();
                await userDropDown.drawingList().then(() => {
                    userDropDown.setEnable(pageAuth);
                });

                new cpDeptDropDownTree(`#${elemPrev}-search-dept-id`, {
                    change: deptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none",
                    fillMode: 'solid',
                    autoWidth: true
                }, userAuthNm, setDeptId, IS.FALSE, IS.TRUE).init();

                chargeUserDropDown = new cpUserDropDown(`#${elemPrev}-search-charge-id`, 0, undefined, {
                    clearButton: false,
                    fillMode: 'solid',
                    autoWidth: true
                });
                chargeUserDropDownCreate = chargeUserDropDown.create();
                await chargeUserDropDown.drawingList().then(() => {
                    chargeUserDropDownCreate.value(0);
                });

                dropDown = new cpDeptDropDownTree(`#${elemPrev}-search-charge-dept-id`, {
                    change: chargeDeptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none",
                    fillMode: 'solid',
                    autoWidth: true,
                    value: 0
                });
                chargeDropDown = dropDown.create();
                chargeDropDown.setDataSource(await dropDown.getData());

            } else {

                userDropDown = new cpUserDropDown(`#${elemPrev}-search-user-id`, 1, undefined, {
                    clearButton: false,
                    fillMode: 'solid',
                    autoWidth: true,
                    size: 'small',
                    headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${elemPrev}-search-user-check"> 퇴사자포함</div>`
                });
                userDropDownCreate = userDropDown.create();
                await userDropDown.drawingList().then(() => {
                    userDropDownCreate.value(0);
                });

                dropDown = new cpDeptDropDownTree(`#${elemPrev}-search-dept-id`, {
                    change: deptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none",
                    fillMode: 'solid',
                    autoWidth: true
                }, userAuthNm, 1, IS.FALSE, IS.TRUE);
                chargeDropDown = dropDown.create();
                chargeDropDown.setDataSource(await dropDown.getData());

                chargeUserDropDown = new cpUserDropDown(`#${elemPrev}-search-charge-id`, setDeptId, undefined, {
                    value: USER_INFO.userId,
                    clearButton: false,
                    fillMode: 'solid',
                    autoWidth: true
                }, pageAuth);
                chargeUserDropDownCreate = chargeUserDropDown.create();
                await chargeUserDropDown.drawingList().then(() => {
                    chargeUserDropDown.setEnable(pageAuth);
                });

                new cpDeptDropDownTree(`#${elemPrev}-search-charge-dept-id`, {
                    change: chargeDeptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none",
                    fillMode: 'solid',
                    autoWidth: true
                }, userAuthNm, setDeptId, pageAuthSub, IS.FALSE).init();
            }

            const userCkeckEvent = (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(() => {
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

            let transferStatus = new cpCodeDropDownTree(`#${elemPrev}-search-status`, 'TransferStatus', {
                value: "all",
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            });
            await dropDownTreeUtils.makeDropDownTree(transferStatus, `#${elemPrev}-search-status`,IS.TRUE);


            let transferSearch = new cpCodeDropDownTree(`#${elemPrev}-search-type`, 'TransferSearchType', {
                value: "BOUND_TEL_NO",
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            });
            await dropDownTreeUtils.makeDropDownTree(transferSearch, `#${elemPrev}-search-type`,IS.TRUE);


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
            gridMain.searchDefaultValues.status = $(`#${elemPrev}-search-status`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.chargeDeptId = $(`#${elemPrev}-search-charge-dept-id`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.chargeId = $(`#${elemPrev}-search-charge-id`).data('kendoDropDownList').value();
            gridMain.searchDefaultValues.type = $(`#${elemPrev}-search-type`).data('kendoDropDownTree').value();

            $(`#${elemPrev}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                size: 'small',
                themeColor: 'none',
                click: function(e){
                    $(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value(gridMain.searchStartDate);
                    $(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value(gridMain.searchEndDate);
                    $(`#${elemPrev}-search-dept-id`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.deptId);
                    $(`#${elemPrev}-search-user-id`).data('kendoDropDownList').value(gridMain.searchDefaultValues.userId);
                    $(`#${elemPrev}-search-status`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.status);
                    $(`#${elemPrev}-search-charge-dept-id`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.chargeDeptId);
                    $(`#${elemPrev}-search-charge-id`).data('kendoDropDownList').value(gridMain.searchDefaultValues.chargeId);
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
                        const auth = transferDeptAuth !== AUTH_RANG.NOTHING;
                        const transferDept = $(`#${elemPrev}-search-dept-id`).data("kendoDropDownTree").value();
                        const transferChargeDept = $(`#${elemPrev}-search-charge-dept-id`).data("kendoDropDownTree").value();
                        const transferchargeId = $(`#${elemPrev}-search-charge-id`).data("kendoDropDownList").value()
                        const transferStatus = $(`#${elemPrev}-search-status`).data("kendoDropDownTree").value();
                        return {
                            startDate: kendo.toString(new Date($(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                            endDate: kendo.toString(new Date($(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                            parentId: auth ? transferDept : 0,
                            deptId: auth ? 0 : transferDept,
                            chargeParentId: auth ? transferChargeDept : 0,
                            chargeDeptId: auth ? 0 : transferChargeDept,
                            transferStatus: transferStatus === "all" ? "" : transferStatus,
                            rgtrId: $(`#${elemPrev}-search-user-id`).data("kendoDropDownList").value(),
                            chargeId: transferchargeId === '' ? 0 : transferchargeId,
                            searchType: $(`#${elemPrev}-search-type`).data("kendoDropDownTree").value(),
                            searchTxt: $(`#${elemPrev}-search-txt`).data('kendoTextBox').value(),
                            sortType: '',
                            page: options.page,
                            totalpage: options.pageSize
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
                        callId: {type: 'number'},
                        custId: {type: 'number'},
                        custNm: {type: 'string'},
                        unitedCustId: {type: 'number'},
                        transferId: {type: 'number'},
                        transferUuid: {type: 'string'},
                        transferDt: {type: 'date'},
                        transferYmd: {type: 'string'},
                        boundTelNo: {type: 'string'},
                        callCatId: {type: 'number'},
                        callCatNm: {type: 'string'},
                        fullCallCatNm: {type: 'string'},
                        transferStatus: {type: 'string'},
                        transferStatusNm: {type: 'string'},
                        rgtrId: {type: 'number'},
                        rgtrNm: {type: 'string'},
                        deptId: {type: 'number'},
                        deptNm: {type: 'string'},
                        fullDeptNm: {type: 'string'},
                        chargeId: {type: 'number'},
                        chargeNm: {type: 'string'},
                        processDt: {type: 'date'}
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.transferDt) {
                                row.transferDt = kendo.toString(new Date(row.transferDt), "yyyy-MM-dd H:mm");
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
            let status                  = $(`#${elemPrev}-search-status`).data('kendoDropDownTree');
            let chargeDeptId            = $(`#${elemPrev}-search-charge-dept-id`).data('kendoDropDownTree');
            let chargeId                = $(`#${elemPrev}-search-charge-id`).data('kendoDropDownList');
            let searchType              = $(`#${elemPrev}-search-type`).data('kendoDropDownTree');
            let searchTxt               = $(`#${elemPrev}-search-txt`).data('kendoTextBox');

            let searchData = [
                { label: '이관일자', text: `${startDate} ~ ${endDate}`, value: `${startDate} ~ ${endDate}` },
                { label: '접수부서', text: deptId.text(), value: deptId.value() },
                { label: '접수상담사', text: userId.text(), value: userId.value() },
                { label: '처리결과', text: status.text(), value: status.value() },
                { label: '담당부서', text: chargeDeptId.text(), value: chargeDeptId.value() },
                { label: '담당자', text: chargeId.text(), value: chargeId.value() },
                { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(gridMain.searchExpansion, searchData);

            $(gridMain.grid).data('kendoCpGrid').setDataSource(gridMain.gridDataSource());

            gridDetail.detailHide();

        }
    }

    const gridDetail = {
        chargeUserDropDown: new cpUserDropDown("#transfer-detail-charge-user", USER_INFO.deptId, undefined, {
            value: 0,
            clearButton: false
        }, true),
        init: async () => {
            let detailMode = {fillMode: "flat", readonly: true};
            $("#transfer-detail-custNm").kendoTextBox(detailMode);
            $("#transfer-detail-boundTelNo").kendoTextBox(detailMode);
            $("#transfer-detail-callCat").kendoTextBox(detailMode);
            $("#transfer-detail-processNm").kendoTextBox(detailMode);
            $("#transfer-detail-processDt").kendoTextBox(detailMode);
            $("#transfer-detail-question").kendoTextArea($.extend({rows: 3}, detailMode));
            $("#transfer-detail-memo").kendoTextArea($.extend({rows: 3}, detailMode));
            $("#transfer-detail-description").kendoTextArea($.extend({rows: 3}, detailMode));
            let transferStatus = new cpDataSource(METHOD.GET, '/common/v1/code/TransferStatus').getDataSource();
            await transferStatus.read().then(() => {
                let detailTransferStatus = [...transferStatus.data()[0].items, ...transferStatus.data()[1].items];
                detailTransferStatus = detailTransferStatus.filter(e => e.codeKey === "Receipt" || e.codeKey === "Processing" || e.codeKey === "ProcessComplete" || e.codeKey === "ReTransfer");

                $('#transfer-detail-status').kendoDropDownList({
                    fillMode: 'flat',
                    clearButton: false,
                    dataSource: detailTransferStatus,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    change: gridDetail.transferStatusChange
                });
            });
            let updateBtn = $("#transfer-detail-update");
            updateBtn.kendoButton({
                themeColor: 'primary',
                click: () => {
                    let valid = $("#transfer-detail-form").kendoValidator({
                        errorTemplate: "",
                        rules: {
                            rule: (input) => {
                                if (input.is("[name=status]")) {
                                    return input.data("kendoDropDownList").value() !== "";
                                } else if (input.is("[name=description]")) return input.val() !== "";
                                return true;
                            }
                        }
                    }).data("kendoValidator");
                    if (valid.validate()) {
                        cpProgress("transfer-detail");
                        message.callBackConfirm({
                            msg: '수정하시겠습니까?',
                            callback: gridDetail.transferDetailUpdate,
                            cancel: () => {
                                cpProgress("transfer-detail", false);
                            }
                        });
                    }
                }
            });

            let chargeUserDropDownCreate = gridDetail.chargeUserDropDown.create();

            await gridDetail.chargeUserDropDown.drawingList().then(() => {
                gridDetail.chargeUserDropDown.setEnable(false);
            });
            const chargeDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = gridDetail.chargeUserDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    chargeUserDropDownCreate.setDataSource(call.data());
                });
            }
            let dropDown = new cpDeptDropDownTree('#transfer-detail-charge-department', {
                change: chargeDeptAutoCompleteEvent,
                clearButton: false,
                valueTemplate: '<span>#: deptNm # </span>',
                filter: "none"
            }, userAuthNm, 0, false);
            let detailDept = dropDown.create();
            detailDept.setDataSource(await dropDown.getData());

        },
        transferDetailSet: (item) => {
            let status = $("#transfer-detail-status").data("kendoDropDownList");
            let chargeDept = $("#transfer-detail-charge-department").data("kendoDropDownTree");
            let chargeUser = $("#transfer-detail-charge-user").data("kendoDropDownList");
            let description = $("#transfer-detail-description").data("kendoTextArea");
            if (item.processYn === "Y") {
                status.readonly(true);
                status._arrow.addClass('hidden');
            } else if (item.transferEditYn === "N") {
                status.readonly(true);
                status._arrow.addClass('hidden');
            } else {
                status.readonly(false);
                status._arrow.removeClass('hidden');
            }

            if (item.transferStatus === "Receipt") {
                $("#transfer-detail-update").hide();
            }

            if (item.transferStatus !== "ReTransfer") {
                chargeDept.readonly(true);
                chargeDept._arrow.addClass('hidden');
                chargeUser.readonly(true);
                chargeUser._arrow.addClass('hidden');
            } else if (item.transferStatus === "ReTransfer") {
                $("#transfer-detail-update").show();
                chargeDept.readonly(false);
                chargeDept._arrow.removeClass('hidden');
                chargeUser.readonly(false);
                chargeUser._arrow.removeClass('hidden');
            }

            if (item.transferStatus === "Processing") {
                $("#transfer-detail-update").show();
                description.setOptions({fillMode: "solid"});
                description.readonly(false);
            }

            if (item.transferStatus === "ProcessComplete") {
                $("#transfer-detail-update").hide();
            }
            $("#transfer-detail-custId").val(item.custId);
            $("#transfer-detail-callId").val(item.callId);
            $("#transfer-detail-boundId").val(item.boundId);
            $("#transfer-detail-chargeIdOld").val(item.chargeId);
            $("#transfer-detail-custNm").data("kendoTextBox").value(item.custNm);
            $("#transfer-detail-boundTelNo").data("kendoTextBox").value(item.boundTelNo);
            $("#transfer-detail-callCat").data("kendoTextBox").value(item.fullCallCatNm);
            $("#transfer-detail-question").data("kendoTextArea").value(item.question);
            $("#transfer-detail-memo").data("kendoTextArea").value(item.transferMemo);
            status.value(item.transferStatus);
            $("#transfer-detail-processNm").data("kendoTextBox").value(item.processNm);
            $("#transfer-detail-processDt").data("kendoTextBox").value(item.processDt);
            chargeDept.value(item.deptId);
            const call = gridDetail.chargeUserDropDown.getDeptData(item.deptId);
            call.read().then(() => {
                chargeUser.setDataSource(call.data());
                chargeUser.value(item.chargeId);
            });
        },
        transferDetailClear: () => {
            let description = $("#transfer-detail-description").data("kendoTextArea");
            let chargeDept = $("#transfer-detail-charge-department").data("kendoDropDownTree");
            let status = $("#transfer-detail-status").data("kendoDropDownList");
            $("#transfer-detail-custNm").data("kendoTextBox").value("");
            $("#transfer-detail-boundTelNo").data("kendoTextBox").value("");
            $("#transfer-detail-callCat").data("kendoTextBox").value("");
            $("#transfer-detail-processNm").data("kendoTextBox").value("");
            $("#transfer-detail-processDt").data("kendoTextBox").value("");
            $("#transfer-detail-question").data("kendoTextArea").value("");
            $("#transfer-detail-memo").data("kendoTextArea").value("");
            description.value("");
            chargeDept.value("");
            $("#transfer-detail-charge-user").data("kendoDropDownList").value("");
            status.value("");
            $("#transfer-detail-custId").val(0);
            $("#transfer-detail-boundId").val(0);
            $("#transfer-detail-chargeIdOld").val(0);
            $("#transfer-detail-callId").val(0);
            status.readonly(false);
            chargeDept.readonly(false);
            description.setOptions({fillMode: "flat"});
            description.readonly(true);
            let updateBtn = $("#transfer-detail-update").data("kendoButton");
            let valid = $("#transfer-detail-form").data("kendoValidator");
            if (valid !== undefined) valid.reset();
        },
        transferDetailUpdate: () => {
            let param = $("#transfer-detail-form").serializeJSON();
            param.deptId = $("#transfer-detail-charge-department").data("kendoDropDownTree").value();
            param.chargeId = Number($("#transfer-detail-charge-user").val());
            let callUpdate = new cpDataSource(METHOD.PUT, "/work/v1/transfer", param).getDataSource();
            callUpdate.read().then(() => {
                message.notification({msg: "저장되었습니다.", type: "success"});
                gridDetail.transferDetailClear();
                gridDetail.detailHide();
                cpProgress("transfer-detail", false);
                $(gridMain.grid).data('kendoCpGrid').dataSource.read();
            });
        },
        transferStatusChange: (e) => {
            let detailMode = {fillMode: "flat", readonly: true};
            let chargeUser = $("#transfer-detail-charge-user").data("kendoDropDownList");
            let chargeDept = $("#transfer-detail-charge-department").data("kendoDropDownTree");
            let description = $("#transfer-detail-description").data("kendoTextArea");
            let transferGrid = $(gridMain.grid).data("kendoCpGrid");
            let selectItem = transferGrid.dataItem(transferGrid.select());

            chargeDept.value(selectItem.deptId);
            const call = gridDetail.chargeUserDropDown.getDeptData(selectItem.deptId);
            call.read().then(() => {
                chargeUser.setDataSource(call.data());
                chargeUser.value(selectItem.chargeId);
            });
            if (e.sender.value() === "Receipt") {
                $("#transfer-detail-update").hide();
            } else {
                $("#transfer-detail-update").show();
            }

            if (e.sender.value() === "ReTransfer") {
                chargeUser.readonly(false);
                chargeDept.readonly(false);
                description.setOptions({fillMode: "solid"});
                description.readonly(false);
                chargeUser._arrow.removeClass('hidden');
                chargeDept._arrow.removeClass('hidden');
            } else if (e.sender.value() === "Processing" || e.sender.value() === "ProcessComplete") {
                chargeUser.readonly(true);
                chargeDept.readonly(true);
                description.setOptions({fillMode: "solid"});
                description.readonly(false);
                chargeUser._arrow.addClass('hidden');
                chargeDept._arrow.addClass('hidden');
            } else {
                description.value("");
                description.setOptions(detailMode);
                description.readonly(true);
                chargeUser.readonly(true);
                chargeDept.readonly(true);
                description.setOptions(detailMode);
                description.readonly(true);
                chargeUser._arrow.addClass('hidden');
                chargeDept._arrow.addClass('hidden');
            }
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

            const skeleton = $('#transfer-detail-form dd');

            skeletonClass(skeleton);
            $("#transfer-detail-chargeId").val(data.chargeId);
            let getTransferItem = new cpDataSource(METHOD.GET, `/work/v1/transfer/item/${data.transferUuid}`).getDataSource();
            getTransferItem.read().then(() => {
                $("#transfer-detail-update").hide();
                skeletonClass(skeleton, false);
                let item = getTransferItem.data()[0];
                if (item.transferDt) item.transferDt = kendo.toString(new Date(item.transferDt), "yyyy-MM-dd H:mm");
                if (item.processDt) item.processDt = kendo.toString(new Date(item.processDt), "yyyy-MM-dd H:mm");
                if (item.processNm == null) item.processNm = "";
                gridDetail.transferDetailClear();
                gridDetail.transferDetailSet(item);
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




/*







$(document).ready(() => {
    let transferDeptAuth = userAuthRange("WORK_TRANSFER_LIST");
    const transferMain = {
        isSearchBtn: false,
        init: () => {
            $('#transfer-detail-splitter').kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, resizable: false},
                    {collapsible: false, size: 0, resizable: false}
                ]
            });
            $('#transfer-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    {collapsible: false, size: '65px', resizable: false},
                    {collapsible: false}
                ]
            });

            $('#transfer-btn-search').kendoButton({
                icon: 'search',
                click: () => {
                    transferMain.isSearchBtn = true;
                    $('#transfer-grid').data('kendoCpGrid').dataSource.page(1);
                    transferMain.searchBoxClose();
                }
            });

            $('#transfer-search-box-btn-close').kendoButton({
                icon: 'close',
                click: () => {
                    transferMain.searchBoxClose();
                }
            });

            $('#transfer-btn-open-search-box').kendoButton({
                icon: 'search',
                click: () => {
                    transferMain.searchBoxOpen();
                }
            });

            $('#transfer-btn-download-excel').kendoButton({
                icon: "download",
                themeColor: 'success',
                click: () => {
                    $("#transfer-grid").data("kendoCpGrid").saveAsExcel();
                }
            });
            $('#transfer-detail-header-btn-close').on('click', () => {
                const transferSplitter = $('#transfer-splitter').data('kendoSplitter');
                $("#transfer-detail-splitter").data("kendoSplitter").size($('#transfer-detail'), "0%");
                if (transferSplitter.size('#transfer-divSearch') === "170px") {
                    $("#transfer-search-hidden").show();
                    transferSplitter.size('#transfer-divSearch', '120px');
                }
            });
        },
        searchBoxOpen: () => {
            if ($("#transfer-detail-splitter").data("kendoSplitter").size($('#transfer-detail')) === "30%") {
                $("#transfer-search-hidden").hide();
                $('#transfer-splitter').data('kendoSplitter').size('#transfer-divSearch', '170px');
            } else {
                $("#transfer-search-hidden").show();
                $('#transfer-splitter').data('kendoSplitter').size('#transfer-divSearch', '125px');
            }
            $('#transfer-searching-field').show();
            $('#transfer-searched-field-box').hide();
            $('#transfer-searching-btn-box').show();
            $('#transfer-searched-btn-box').hide();
        },
        searchBoxClose: () => {
            $('#transfer-splitter').data('kendoSplitter').size('#transfer-divSearch', '65px');
            $('#transfer-searching-field').hide();
            $('#transfer-searched-field-box').show();
            $('#transfer-searching-btn-box').hide();
            $('#transfer-searched-btn-box').show();
        },
        transferDropDownTree: async (dropTree) => {
            dropTree.create();
            let data = await dropTree.getData();
            data[1].items = data[1].items.filter(e => e.codeKey !== "ReTransfer" && e.codeKey !== "Reject")
            data.unshift({codeKey: 'all', codeNm: '전체'});
            let dataSource = new kendo.data.HierarchicalDataSource({data: data});
            $(dropTree.selector).data("kendoDropDownTree").setDataSource(dataSource);
        }
    };

    const transferSearchBox = {
        init: async () => {
            let startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            $("#transfer-search-rangepicker").kendoDateRangePicker({
                format: "yyyy-MM-dd",
                fillMode: "outline",
                size: "large",
                labels: false,
                range: {
                    start: startDate,
                    end: new Date(),
                }
            });

            const deptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            const chargeDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = chargeUserDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    chargeUserDropDownCreate.setDataSource(call.data());
                    chargeUserDropDownCreate.value(0);
                });
            }

            const pageAuth = transferDeptAuth === AUTH_RANG.NOTHING;
            const pageAuthAll = transferDeptAuth === AUTH_RANG.ALL;
            const pageAuthSub = transferDeptAuth !== AUTH_RANG.SUB;
            let setDeptId = !pageAuth && USER_INFO.topDeptId === 1 ? 1 : USER_INFO.deptId;
            let setUserId = pageAuthAll ? 0 : USER_INFO.userId;

            if (pageAuth) setDeptId = USER_INFO.deptId;

            let userDropDown, userDropDownCreate;
            let chargeUserDropDown, chargeUserDropDownCreate;
            let dropDown, chargeDropDown;

            if (USER_INFO.topDeptId === 1) {

                userDropDown = new cpUserDropDown(
                    "#transfer-user-list",
                    setDeptId,
                    undefined,
                    {
                        value: setUserId,
                        clearButton: false
                    }, pageAuth);
                userDropDownCreate = userDropDown.create();
                await userDropDown.drawingList().then(() => {
                    userDropDown.setEnable(pageAuth);
                });

                new cpDeptDropDownTree('#transfer-department', {
                    change: deptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none"
                }, "WORK_TRANSFER_LIST", setDeptId, IS.FALSE, IS.TRUE).init();

                chargeUserDropDown = new cpUserDropDown(
                    "#transfer-charge-user-list",
                    0,
                    undefined,
                    {
                        clearButton: false
                    });
                chargeUserDropDownCreate = chargeUserDropDown.create();
                await chargeUserDropDown.drawingList().then(() => {
                    chargeUserDropDownCreate.value(0);
                });

                dropDown = new cpDeptDropDownTree('#transfer-charge-department', {
                    change: chargeDeptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none",
                    value: 0
                });
                chargeDropDown = dropDown.create();
                chargeDropDown.setDataSource(await dropDown.getData());

            } else {

                userDropDown = new cpUserDropDown(
                    "#transfer-user-list",
                    1,
                    undefined,
                    {
                        clearButton: false
                    });
                userDropDownCreate = userDropDown.create();
                await userDropDown.drawingList().then(() => {
                    userDropDownCreate.value(0);
                });

                dropDown = new cpDeptDropDownTree('#transfer-department', {
                    change: deptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none"
                }, "WORK_TRANSFER_LIST", 1, IS.FALSE, IS.TRUE);
                chargeDropDown = dropDown.create();
                chargeDropDown.setDataSource(await dropDown.getData());

                chargeUserDropDown = new cpUserDropDown(
                    "#transfer-charge-user-list",
                    setDeptId,
                    undefined,
                    {
                        value: USER_INFO.userId,
                        clearButton: false
                    }, pageAuth);
                chargeUserDropDownCreate = chargeUserDropDown.create();
                await chargeUserDropDown.drawingList().then(() => {
                    chargeUserDropDown.setEnable(pageAuth);
                });

                new cpDeptDropDownTree('#transfer-charge-department', {
                    change: chargeDeptAutoCompleteEvent,
                    clearButton: false,
                    filter: "none"
                }, "WORK_TRANSFER_LIST", setDeptId, pageAuthSub, IS.FALSE).init();
            }

            const userCkeckEvent = (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            $('#transfer-user-check').on("click", () => {
                const isChecked = $("input:checkbox[id=transfer-user-check]").is(":checked");
                const param = [
                    {useYn: ["Y"]}
                ];
                if (isChecked) {
                    param[0] = {useYn: ["Y", "N"]}
                    userDropDown.param = param;
                    userCkeckEvent($("#transfer-department").data("kendoDropDownTree").value());
                } else {
                    userDropDown.param = param;
                    userCkeckEvent($("#transfer-department").data("kendoDropDownTree").value());
                }
            });

            let transferStatus = new cpCodeDropDownTree(
                '#transfer-search-status',
                'TransferStatus',
                {
                    value: "all",
                    clearButton: false
                });

            new cpCodeDropDownTree(
                '#transfer-etc-search-dropdown',
                'TransferSearchType',
                {
                    value: "BOUND_TEL_NO",
                    clearButton: false
                }).init();

            await transferMain.transferDropDownTree(transferStatus);

            $("#transfer-etc-search-textbox").kendoTextBox({
                change: (e) => {
                    let value = e.value;
                    if ($("#transfer-etc-search-dropdown").data("kendoDropDownTree").value() === "TelNo") {
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
            }).on("keyup", (e) => {
                if (e.which === 13) $('#transfer-grid').data('kendoCpGrid').dataSource.page(1);
            });

        }
    };

    const transferGrid = {
        init: () => {
            $("#transfer-grid").kendoCpGrid({
                columns: [
                    {field: "transferId", hidden: true},
                    {field: "transferDt", title: "이관일시", width: 70, attributes: {style: "text-align:center"}},
                    {field: "rgtrNm", title: "접수자", width: 70, attributes: {style: "text-align:center"}},
                    {field: "boundTelNo", title: "수/발신번호", width: 70, attributes: {style: "text-align:center"}},
                    {field: "fullDeptNm", title: "담당부서", width: 70, attributes: {style: "text-align:center"}},
                    {field: "chargeNm", title: "담당자", width: 70, attributes: {style: "text-align:center"}},
                    {field: "fullCallCatNm", title: "상담분류", width: 150, attributes: {style: "text-align:center"}},
                    {field: "transferStatusNm", title: "처리결과", width: 50, attributes: {style: "text-align:center"}},
                    {field: "processDt", title: "처리일시", width: 70, attributes: {style: "text-align:center"}}
                ],
                dataSource: transferGrid.transferDataSource(),
                click : ()=>{
                    const skeleton = $('#transfer-detail-form dd');

                    skeletonClass(skeleton);
                    const grid = $('#transfer-grid').data("kendoCpGrid");
                    let item = grid.dataItem(grid.select());
                    $("#transfer-detail-chargeId").val(item.chargeId);
                    let getTransferItem = new cpDataSource(METHOD.GET, `/work/v1/transfer/item/${item.transferUuid}`).getDataSource();
                    getTransferItem.read().then(() => {
                        $("#transfer-detail-update").hide();
                        skeletonClass(skeleton, false);
                        let data = getTransferItem.data();
                        let item = data[0];
                        if (item.transferDt) item.transferDt = kendo.toString(new Date(item.transferDt), "yyyy-MM-dd H:mm");
                        if (item.processDt) item.processDt = kendo.toString(new Date(item.processDt), "yyyy-MM-dd H:mm");
                        if (item.processNm == null) item.processNm = "";
                        $("#transfer-detail-splitter").data("kendoSplitter").size($('#transfer-detail'), '30%');
                        if ($('#transfer-detail-splitter').data('kendoSplitter').size('#transfer-divSearch') === "120px") {
                            $("#transfer-search-hidden").hide();
                            $('#transfer-splitter').data('kendoSplitter').size('#transfer-divSearch', '170px');
                        }
                        transferDetail.transferDetailClear();
                        transferDetail.transferDetailSet(item);
                    });
                },
                height: 'calc(100% - 10px)',
                resizable: true,
                selectable: "single",
                pageable: {
                    refresh: true
                },
                autoBind: true,
                excel: {allPages: true},
                excelExport: (e) => {
                    let programId = MENU_ARRAY.find(r => r.roleNm === "WORK_TRANSFER_LIST").programId;
                    let dataCnt = $('#transfer-grid').data('kendoCpGrid').dataSource.total();
                    let searchType = transferGrid.gridSearchFiledPrint();
                    let description = "";
                    searchType.forEach((r) => {
                        if (r.text !== '') {
                            description += r.label;
                            description += r.text.replaceAll("null", "");
                        }
                    });
                    let excelParam = {
                        programId: programId,
                        dataCnt: dataCnt,
                        description: description
                    }
                    new cpDataSource(METHOD.POST, "/log/v1/excel/loginsert", excelParam).getDataSource().read();
                    let rangedate = kendo.toString(new Date(), 'yyyy-MM-dd');
                    e.workbook.fileName = "이관처리리스트 " + rangedate + ".xlsx";
                }
            });
        },
        transferDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/transfer/page",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: () => {
                            if (transferMain.isSearchBtn) {
                                transferMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    parameterMap: (options) => {
                        const auth = transferDeptAuth !== AUTH_RANG.NOTHING;
                        const transferSearchRange = $('#transfer-search-rangepicker').data('kendoDateRangePicker').range();
                        const transferDept = $("#transfer-department").data("kendoDropDownTree").value();
                        const transferChargeDept = $("#transfer-charge-department").data("kendoDropDownTree").value();
                        const transferStatus = $("#transfer-search-status").data("kendoDropDownTree").value();
                        return {
                            startDate: kendo.toString(transferSearchRange.start, 'yyyy-MM-dd'),
                            endDate: kendo.toString(transferSearchRange.end, 'yyyy-MM-dd'),
                            parentId: auth ? transferDept : 0,
                            deptId: auth ? 0 : transferDept,
                            chargeParentId: auth ? transferChargeDept : 0,
                            chargeDeptId: auth ? 0 : transferChargeDept,
                            transferStatus: transferStatus === "all" ? "" : transferStatus,
                            rgtrId: $("#transfer-user-list").data("kendoDropDownList").value(),
                            chargeId: $("#transfer-charge-user-list").data("kendoDropDownList").value(),
                            searchType: $("#transfer-etc-search-dropdown").data("kendoDropDownTree").value(),
                            searchTxt: $("#transfer-etc-search-textbox").data("kendoTextBox").value(),
                            sortType: "",
                            page: options.page,
                            totalpage: options.pageSize
                        }
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        boundId: {type: 'number'},
                        callId: {type: 'number'},
                        custId: {type: 'number'},
                        custNm: {type: 'string'},
                        unitedCustId: {type: 'number'},
                        transferId: {type: 'number'},
                        transferUuid: {type: 'string'},
                        transferDt: {type: 'date'},
                        transferYmd: {type: 'string'},
                        boundTelNo: {type: 'string'},
                        callCatId: {type: 'number'},
                        callCatNm: {type: 'string'},
                        fullCallCatNm: {type: 'string'},
                        transferStatus: {type: 'string'},
                        transferStatusNm: {type: 'string'},
                        rgtrId: {type: 'number'},
                        rgtrNm: {type: 'string'},
                        deptId: {type: 'number'},
                        deptNm: {type: 'string'},
                        fullDeptNm: {type: 'string'},
                        chargeId: {type: 'number'},
                        chargeNm: {type: 'string'},
                        processDt: {type: 'date'}
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.transferDt) {
                                row.transferDt = kendo.toString(new Date(row.transferDt), "yyyy-MM-dd H:mm");
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
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: DEFAULT_PAGE_SIZE,
                requestEnd: (e) => {
                    const type = e.type;
                    if (type === "read") {
                        const transferSplitter = $('#transfer-splitter').data('kendoSplitter');
                        transferGrid.gridSearchFiledPrint();
                        if (transferSplitter.size('#transfer-divSearch') === "170px") {
                            $("#transfer-search-hidden").show();
                            transferSplitter.size('#transfer-divSearch', '120px');
                        }
                    }
                }
            });
        },
        gridSearchFiledPrint: () => {
            let timeRange = $("#transfer-search-rangepicker").data('kendoDateRangePicker').range();

            let target = $('#transfer-searched-field-box');
            let searchText = [{
                label: '이관일자 : ',
                icon: 'c-calendar3',
                text: kendo.toString(timeRange.start, 'yyyy-MM-dd') + ' ~ ' + kendo.toString(timeRange.end, 'yyyy-MM-dd')
            }, {
                label: '접수부서 : ',
                text: $("#transfer-department").data("kendoDropDownTree").text()
            }, {
                label: '접수상담사 : ',
                text: $("#transfer-user-list").data("kendoDropDownList").text()
            }, {
                label: '처리결과 : ',
                text: $("#transfer-search-status").data("kendoDropDownTree").text()
            }, {
                label: '이관부서 : ',
                text: $("#transfer-charge-department").data("kendoDropDownTree").text()
            }, {
                label: '이관담당자 : ',
                text: $("#transfer-charge-user-list").data("kendoDropDownList").text()
            }, {
                label: $('#transfer-etc-search-dropdown').data("kendoDropDownTree").text() + " : ",
                text: $("#transfer-etc-search-textbox").data("kendoTextBox").value()
            }];
            searchTextBadge(target, searchText);
            return searchText;
        }
    }

    const transferDetail = {
        chargeUserDropDown: new cpUserDropDown("#transfer-detail-charge-user", USER_INFO.deptId, undefined, {
            value: 0,
            clearButton: false
        }, true),
        init: async () => {
            let detailMode = {fillMode: "flat", readonly: true};
            $("#transfer-detail-custNm").kendoTextBox(detailMode);
            $("#transfer-detail-boundTelNo").kendoTextBox(detailMode);
            $("#transfer-detail-callCat").kendoTextBox(detailMode);
            $("#transfer-detail-processNm").kendoTextBox(detailMode);
            $("#transfer-detail-processDt").kendoTextBox(detailMode);
            $("#transfer-detail-question").kendoTextArea($.extend({rows: 3}, detailMode));
            $("#transfer-detail-memo").kendoTextArea($.extend({rows: 3}, detailMode));
            $("#transfer-detail-description").kendoTextArea($.extend({rows: 3}, detailMode));
            let transferStatus = new cpDataSource(METHOD.GET, '/common/v1/code/TransferStatus').getDataSource();
            await transferStatus.read().then(() => {
                let detailTransferStatus = [...transferStatus.data()[0].items, ...transferStatus.data()[1].items];
                detailTransferStatus = detailTransferStatus.filter(e => e.codeKey === "Receipt" || e.codeKey === "Processing" || e.codeKey === "ProcessComplete" || e.codeKey === "ReTransfer");

                $('#transfer-detail-status').kendoDropDownList({
                    fillMode: 'flat',
                    clearButton: false,
                    dataSource: detailTransferStatus,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    change: transferDetail.transferStatusChange
                });
            });
            let updateBtn = $("#transfer-detail-update");
            updateBtn.kendoButton({
                themeColor: 'primary',
                click: () => {
                    let valid = $("#transfer-detail-form").kendoValidator({
                        errorTemplate: "",
                        rules: {
                            rule: (input) => {
                                if (input.is("[name=status]")) {
                                    return input.data("kendoDropDownList").value() !== "";
                                } else if (input.is("[name=description]")) return input.val() !== "";
                                return true;
                            }
                        }
                    }).data("kendoValidator");
                    if (valid.validate()) {
                        cpProgress("transfer-detail");
                        message.callBackConfirm({
                            msg: '수정하시겠습니까?',
                            callback: transferDetail.transferDetailUpdate,
                            cancel: () => {
                                cpProgress("transfer-detail", false);
                            }
                        });
                    }
                }
            });

            let chargeUserDropDownCreate = transferDetail.chargeUserDropDown.create();

            await transferDetail.chargeUserDropDown.drawingList().then(() => {
                transferDetail.chargeUserDropDown.setEnable(false);
            });
            const chargeDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = transferDetail.chargeUserDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    chargeUserDropDownCreate.setDataSource(call.data());
                });
            }
            let dropDown = new cpDeptDropDownTree('#transfer-detail-charge-department', {
                change: chargeDeptAutoCompleteEvent,
                clearButton: false,
                valueTemplate: '<span>#: deptNm # </span>',
                filter: "none"
            }, "WORK_TRANSFER_LIST", 0, false);
            let detailDept = dropDown.create();
            detailDept.setDataSource(await dropDown.getData());

        },
        transferDetailSet: (item) => {
            let status = $("#transfer-detail-status").data("kendoDropDownList");
            let chargeDept = $("#transfer-detail-charge-department").data("kendoDropDownTree");
            let chargeUser = $("#transfer-detail-charge-user").data("kendoDropDownList");
            let description = $("#transfer-detail-description").data("kendoTextArea");
            if (item.processYn === "Y") {
                status.readonly(true);
                status._arrow.addClass('hidden');
            } else if (item.transferEditYn === "N") {
                status.readonly(true);
                status._arrow.addClass('hidden');
            } else {
                status.readonly(false);
                status._arrow.removeClass('hidden');
            }

            if (item.transferStatus === "Receipt") {
                $("#transfer-detail-update").hide();
            }

            if (item.transferStatus !== "ReTransfer") {
                chargeDept.readonly(true);
                chargeDept._arrow.addClass('hidden');
                chargeUser.readonly(true);
                chargeUser._arrow.addClass('hidden');
            } else if (item.transferStatus === "ReTransfer") {
                $("#transfer-detail-update").show();
                chargeDept.readonly(false);
                chargeDept._arrow.removeClass('hidden');
                chargeUser.readonly(false);
                chargeUser._arrow.removeClass('hidden');
            }

            if (item.transferStatus === "Processing") {
                $("#transfer-detail-update").show();
                description.setOptions({fillMode: "solid"});
                description.readonly(false);
            }

            if (item.transferStatus === "ProcessComplete") {
                $("#transfer-detail-update").hide();
            }
            $("#transfer-detail-custId").val(item.custId);
            $("#transfer-detail-callId").val(item.callId);
            $("#transfer-detail-boundId").val(item.boundId);
            $("#transfer-detail-chargeIdOld").val(item.chargeId);
            $("#transfer-detail-custNm").data("kendoTextBox").value(item.custNm);
            $("#transfer-detail-boundTelNo").data("kendoTextBox").value(item.boundTelNo);
            $("#transfer-detail-callCat").data("kendoTextBox").value(item.fullCallCatNm);
            $("#transfer-detail-question").data("kendoTextArea").value(item.question);
            $("#transfer-detail-memo").data("kendoTextArea").value(item.transferMemo);
            status.value(item.transferStatus);
            $("#transfer-detail-processNm").data("kendoTextBox").value(item.processNm);
            $("#transfer-detail-processDt").data("kendoTextBox").value(item.processDt);
            chargeDept.value(item.deptId);
            const call = transferDetail.chargeUserDropDown.getDeptData(item.deptId);
            call.read().then(() => {
                chargeUser.setDataSource(call.data());
                chargeUser.value(item.chargeId);
            });
        },
        transferDetailClear: () => {
            let description = $("#transfer-detail-description").data("kendoTextArea");
            let chargeDept = $("#transfer-detail-charge-department").data("kendoDropDownTree");
            let status = $("#transfer-detail-status").data("kendoDropDownList");
            $("#transfer-detail-custNm").data("kendoTextBox").value("");
            $("#transfer-detail-boundTelNo").data("kendoTextBox").value("");
            $("#transfer-detail-callCat").data("kendoTextBox").value("");
            $("#transfer-detail-processNm").data("kendoTextBox").value("");
            $("#transfer-detail-processDt").data("kendoTextBox").value("");
            $("#transfer-detail-question").data("kendoTextArea").value("");
            $("#transfer-detail-memo").data("kendoTextArea").value("");
            description.value("");
            chargeDept.value("");
            $("#transfer-detail-charge-user").data("kendoDropDownList").value("");
            status.value("");
            $("#transfer-detail-custId").val(0);
            $("#transfer-detail-boundId").val(0);
            $("#transfer-detail-chargeIdOld").val(0);
            $("#transfer-detail-callId").val(0);
            status.readonly(false);
            chargeDept.readonly(false);
            description.setOptions({fillMode: "flat"});
            description.readonly(true);
            let updateBtn = $("#transfer-detail-update").data("kendoButton");
            let valid = $("#transfer-detail-form").data("kendoValidator");
            if (valid !== undefined) valid.reset();
        },
        transferDetailUpdate: () => {
            let param = $("#transfer-detail-form").serializeJSON();
            param.deptId = $("#transfer-detail-charge-department").data("kendoDropDownTree").value();
            param.chargeId = Number($("#transfer-detail-charge-user").val());
            let callUpdate = new cpDataSource(METHOD.PUT, "/work/v1/transfer", param).getDataSource();
            callUpdate.read().then(() => {
                message.notification({msg: "저장되었습니다.", type: "success"});
                transferDetail.transferDetailClear();
                $("#transfer-detail-splitter").data("kendoSplitter").size($('#transfer-detail'), "0%");
                if ($('#transfer-detail-splitter').data('kendoSplitter').size('#transfer-divSearch') === "170px") {
                    $("#transfer-search-hidden").show();
                    $('#transfer-splitter').data('kendoSplitter').size('#transfer-divSearch', '120px');
                }
                cpProgress("transfer-detail", false);
                $('#transfer-grid').data('kendoCpGrid').dataSource.read();
            });
        },
        transferStatusChange: (e) => {
            let detailMode = {fillMode: "flat", readonly: true};
            let chargeUser = $("#transfer-detail-charge-user").data("kendoDropDownList");
            let chargeDept = $("#transfer-detail-charge-department").data("kendoDropDownTree");
            let description = $("#transfer-detail-description").data("kendoTextArea");
            let transferGrid = $("#transfer-grid").data("kendoCpGrid");
            let selectItem = transferGrid.dataItem(transferGrid.select());

            chargeDept.value(selectItem.deptId);
            const call = transferDetail.chargeUserDropDown.getDeptData(selectItem.deptId);
            call.read().then(() => {
                chargeUser.setDataSource(call.data());
                chargeUser.value(selectItem.chargeId);
            });
            if (e.sender.value() === "Receipt") {
                $("#transfer-detail-update").hide();
            } else {
                $("#transfer-detail-update").show();
            }

            if (e.sender.value() === "ReTransfer") {
                chargeUser.readonly(false);
                chargeDept.readonly(false);
                description.setOptions({fillMode: "solid"});
                description.readonly(false);
                chargeUser._arrow.removeClass('hidden');
                chargeDept._arrow.removeClass('hidden');
            } else if (e.sender.value() === "Processing" || e.sender.value() === "ProcessComplete") {
                chargeUser.readonly(true);
                chargeDept.readonly(true);
                description.setOptions({fillMode: "solid"});
                description.readonly(false);
                chargeUser._arrow.addClass('hidden');
                chargeDept._arrow.addClass('hidden');
            } else {
                description.value("");
                description.setOptions(detailMode);
                description.readonly(true);
                chargeUser.readonly(true);
                chargeDept.readonly(true);
                description.setOptions(detailMode);
                description.readonly(true);
                chargeUser._arrow.addClass('hidden');
                chargeDept._arrow.addClass('hidden');
            }
        },
    }
    cpProgress("transfer-layout");
    transferMain.init();
    transferSearchBox.init().then(() => {
        transferGrid.init();
        transferDetail.init().then(() => {
            cpProgress("transfer-layout", false);
            transferGrid.gridSearchFiledPrint();
        });
    });
});
*/