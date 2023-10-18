$(document).ready(function() {
    const reservationElem = `reservation`;
    const userAuthNm = 'CONSULT_RESERVE_LIST';
    const selectUrl = '/consult/v1/reservation-page/select';
    const updateUrl = '/consult/v1/reservation/update';
    const localStorageGridColumnsNm = 'localStorageReservationGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;

    const gridMain = {

        gridColumns : [
            {
                field: 'reservationDt',
                title: '예약일시',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 140
            },
            {
                field: 'reservationTelNo',
                title: '예약전화',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 120
            },
            {
                field: 'boundTelNo',
                title: '수/발신전화',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 120
            },
            {
                field: 'custNm',
                title: '고객명',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 100
            },
            {
                field: 'question', title: '문의내용', headerAttributes: {class: 'k-text-center'},
                attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'}
            },
            {
                field: 'reservationStatusNm',
                title: '처리결과',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 110
            },
            {
                field: 'processNm',
                title: '처리자',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 120
            },
            {
                field: 'processDt',
                title: '처리일시',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 140
            },
            {
                field: 'chargeNm',
                title: '담당자',
                headerAttributes: {class: 'k-text-center'},
                attributes: {class: '!k-text-center'},
                width: 120
            }
        ],
        gridWidth : 0,
        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),

        grid : `#${reservationElem}-grid`,
        searchExpansion : `#${reservationElem}-expansion-panel`,
        gridSplitter : `#${reservationElem}-splitter`,
        detailSplitterWidth : '35%',
        searchDefaultValues : [],

        isSearchBtn : false,
        init : () => {

            gridCommonUtils.init(gridMain.searchExpansion, gridMain.gridSplitter, gridMain.grid, localStorageGridColumnsNm);
            gridCommonUtils.gridExpansionPanel(gridMain.searchExpansion, gridMain.gridSplitter, gridMain.grid);

            $(gridMain.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible : false, size : '100%', resizable : false},
                    {collapsible : false, size : '0%', resizable : false}
                ]
            });

            gridMain.gridWidth = gridCommonUtils.gridWidthSet(gridMain.gridWidth, !!localStorageGridColumns ? localStorageGridColumns : gridMain.gridColumns, gridMain.gridSplitter);

            $(gridMain.grid).kendoCpGrid({
                toolbar : [
                    { template: kendo.template($(`#${reservationElem}-grid-toolbar-template`).html()) }
                ],
                columns : !!localStorageGridColumns ? localStorageGridColumns : gridMain.gridColumns,
                height : '100%',
                width: gridMain.gridWidth,
                resizable : true,
                reorderable : true,
                scrollable : true,
                selectable : true,
                pageable : {
                    refresh : true
                },
                autoBind : true,
                excel : {allPages: true},
                click: () => {
                    reservationDetail.gridSelectRow();
                },
                dataBound : () => {
                    if($(gridMain.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block') {
                        $(gridMain.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(gridMain.gridSplitter, gridMain.grid);
                    }
                },
                columnResize : () => {
                    const gridOptions = $(gridMain.grid).data("kendoCpGrid").getOptions();
                    window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                },
                columnReorder : () => {
                    setTimeout(function() {
                        const gridOptions = $(gridMain.grid).data("kendoCpGrid").getOptions();
                        window.localStorage.setItem(localStorageGridColumnsNm, JSON.stringify(gridOptions.columns));
                    }, 5);
                },
                excelExport: (e) => {
                    let programId = MENU_ARRAY.find(r => r.roleNm === "CONSULT_RESERVE_LIST").programId;
                    let dataCnt = $('#reservation-grid').data('kendoCpGrid').dataSource.total();
                    let description = $(gridMain.searchExpansion).data('kendoExpansionPanel').header.find('.k-expander-title').html();
                    description = description.replace(/(<([^>]+)>)/gi, '');
                    let excelParam = {
                        programId: programId,
                        dataCnt: dataCnt,
                        description: description
                    }
                    new cpDataSource(METHOD.POST, "/log/v1/excel/loginsert", excelParam).getDataSource().read();
                    let today = kendo.toString(new Date(), 'yyyy-MM-dd')
                    e.workbook.fileName = "예약상담" + today + ".xlsx";
                }
            });

            $(`#${reservationElem}-toolbar-button-excel-down`).kendoButton({
                icon : 'download',
                themeColor : 'success',
                size: 'small',
                click : function() {
                    $(`#${reservationElem}-grid`).data("kendoCpGrid").saveAsExcel();
                }
            });
        },

        gridSetting : async () => {

            $(`#${reservationElem}-search-date-start`).kendoDatePicker({
                format : 'yyyy-MM-dd',
                parseFormats: ['yyyy-MM-dd', 'yyyyMMdd'],
                value : gridMain.searchStartDate,
                size : 'small'
            });

            $(`#${reservationElem}-search-date-end`).kendoDatePicker({
                format : 'yyyy-MM-dd',
                parseFormats : ['yyyy-MM-dd', 'yyyyMMdd'],
                value : gridMain.searchEndDate,
                size : 'small'
            });

            const userIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;
            const deptIsReadOnly = userAuthRange(userAuthNm) === AUTH_RANG.AGENT || userAuthRange(userAuthNm) === AUTH_RANG.NOTHING;

            let userDropDown = new cpUserDropDown(`#${reservationElem}-user-id`, USER_INFO.deptId, undefined, {
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
                headerTemplate: `<div style="padding: 5px 0 0 5px;"><input id="${reservationElem}-user-check"/> 퇴사자포함</div>`
            },userIsReadOnly, '');

            let userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(() => {
                userDropDown.setEnable(userIsReadOnly);
            });

            const reservationDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            new cpDeptDropDownTree(`#${reservationElem}-department`, {
                change: reservationDeptAutoCompleteEvent,
                fillMode: 'solid',
                autoWidth: true
            }, userAuthNm, deptIsReadOnly?USER_INFO.deptId:1,IS.FALSE, IS.TRUE).init();

            const userCheckEvent = (deptId) => {
                const call = userDropDown.getDeptData(deptId);
                call.read().then(() => {
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            $(`#reservation-user-check`).kendoCheckBox({
                change: () => {
                    const isChecked = $(`input:checkbox[id=${reservationElem}-user-check]`).is(":checked");
                    const param = [{useYn : ["Y"]}];
                    if (isChecked) {
                        param[0] = {useYn: ["Y","N"]};
                        userDropDown.param = param;
                    }
                    userDropDown.param = param;
                    userCheckEvent($(`#${reservationElem}-department`).data("kendoDropDownTree").value());
                }
            });

            let reservationStatus = new cpCodeDropDownTree(`#${reservationElem}-processing-result`, `ReservationStatus`, {
                value: `all`,
                clearButton: false,
                fillMode: 'solid',
            });
            await gridMain.resultDropDownTree(reservationStatus, `#${reservationElem}-processing-result`);

            let searchType = new cpCodeDropDownTree(`#${reservationElem}-search-type`,`ReservSearchType`, {
                value: `Question`,
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            });
            await gridMain.searchTypeDropDownTree(searchType, `#${reservationElem}-search-type`);

            $(`#${reservationElem}-search-button`).kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                size: 'small',
                click: () => {
                    gridMain.reservationGridSearch();
                }
            });

            $(`#${reservationElem}-search-text`).kendoTextBox({
                size:'small',
                change: function (e) {
                    let searchType = $(`#${reservationElem}-search-type`).data('kendoDropDownTree').value();
                    let value = e.value;
                    if (searchType === 'TelNo' || searchType === 'BoundTelNo') {
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
            }).bind('keyup', function (e) {
                if (e.keyCode === 13) {
                    $(`#${reservationElem}-search-button`).trigger('click');
                }
            });

            gridMain.searchDefaultValues.deptId = $(`#${reservationElem}-department`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.userId = $(`#${reservationElem}-user-id`).data('kendoDropDownList').value();
            gridMain.searchDefaultValues.searchType = $(`#${reservationElem}-search-type`).data('kendoDropDownTree').value();
            gridMain.searchDefaultValues.type = 'Question';

            $(`#${reservationElem}-search-btn-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: 'none',
                size: 'small',
                click: function() {
                    $(`#${reservationElem}-search-date-start`).data('kendoDatePicker').value(gridMain.searchStartDate);
                    $(`#${reservationElem}-search-date-end`).data('kendoDatePicker').value(gridMain.searchEndDate);
                    $(`#${reservationElem}-department`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.deptId);
                    $(`#${reservationElem}-user-id`).data('kendoDropDownList').value(gridMain.searchDefaultValues.userId);
                    $(`#${reservationElem}-processing-result`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.searchType);
                    $(`#${reservationElem}-search-type`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.type);
                    $(`#${reservationElem}-search-text`).data('kendoTextBox').value('');
                    gridMain.reservationGridSearch();
                }
            })
        },
        resultDropDownTree : async (dropTree, selector) => {
            dropTree.create();
            let data = await dropTree.getData();
            data.unshift({codeKey: 'all', codeNm: '전체'});
            let dataSource = new kendo.data.HierarchicalDataSource({data:data});
            $(selector).data("kendoDropDownTree").setDataSource(dataSource);
        },
        searchTypeDropDownTree : async (dropTree, selector) => {
          dropTree.create();
          let data = await dropTree.getData();
          let dataSource = new kendo.data.HierarchicalDataSource({data:data});
          $(selector).data("kendoDropDownTree").setDataSource(dataSource);
        },
        reservationDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: selectUrl,
                        type: 'GET',
                        contentType: 'application/json',
                        dataType: 'json',
                        complete: () => {
                            if (gridMain.isSearchBtn) {
                                gridMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    update: {
                        url: updateUrl,
                        type: 'PUT',
                        contentType: 'application/json',
                        dataType: 'json'
                    },
                    parameterMap: (data, type) => {
                        if (type === 'read') {
                            const processingResult = $(`#${reservationElem}-processing-result`).data('kendoDropDownTree').value();
                            let param = {
                                startDate: kendo.toString(new Date($(`#${reservationElem}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                endDate: kendo.toString(new Date($(`#${reservationElem}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                                chargeId: 0,
                                chargeDeptId: 0,
                                parentId: 0,
                                deptId: 0,
                                rgtrId: 0,
                                reservationStatus: processingResult === 'all' ? '' : processingResult,
                                completeYn: '',
                                searchType: $(`#${reservationElem}-search-type`).data('kendoDropDownTree').value(),
                                searchTxt: $(`#${reservationElem}-search-text`).data('kendoTextBox').value(),
                                sortType: '',
                                outputYn: 'Y',
                                page: data.page,
                                totalPage: data.pageSize
                            };

                            if (userAuthNm === AUTH_RANG.NOTHING) {
                                param.chargeDeptId = USER_INFO.deptId;
                                param.chargeId = USER_INFO.userId;
                            } else if (userAuthNm === AUTH_RANG.AGENT) {
                                param.chargeDeptId = USER_INFO.deptId;
                                param.chargeId = $(`#${reservationElem}-user-id`).data('kendoDropDownList').value()
                            } else {
                                param.parentId = $(`#${reservationElem}-department`).data('kendoDropDownTree').value()
                                param.chargeId = $(`#${reservationElem}-user-id`).data('kendoDropDownList').value()
                            }

                            return param;
                        }
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    parse: (res) => {
                        res.data.rows.forEach(item => {
                            item.reservationDt = item.reservationDt == null ? '' : kendo.toString(new Date(item.reservationDt), 'yyyy-MM-dd HH:mm');
                            item.processDt = item.processDt == null ? '' : kendo.toString(new Date(item.processDt), 'yyyy-MM-dd HH:mm');
                        });
                        return res;
                    },
                    model: {
                        id: 'boundId',
                        fields: {
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
                        }
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                });
            },
            reservationGridSearch: () => {
                gridMain.isSearchBtn = true;

                let startDt = kendo.toString(new Date($(`#${reservationElem}-search-date-start`).data("kendoDatePicker").value()),"yyyy-MM-dd");
                let endDt = kendo.toString(new Date($(`#${reservationElem}-search-date-end`).data("kendoDatePicker").value()),"yyyy-MM-dd");
                let dept = $(`#${reservationElem}-department`).data("kendoDropDownTree");
                let user = $(`#${reservationElem}-user-id`).data("kendoDropDownList");
                let result = $(`#${reservationElem}-processing-result`).data("kendoDropDownTree");
                let searchType = $(`#${reservationElem}-search-type`).data("kendoDropDownTree");
                let searchTxt = $(`#${reservationElem}-search-text`).data("kendoTextBox");

                let searchData = [
                    { label: '예약일자', text: `${startDt} ~ ${endDt}`, value: `${startDt} ~ ${endDt}` },
                    { label: '부서', text: dept.text(), value: dept.value() },
                    { label: '상담사', text: user.text(), value: user.value()?user.value: '전체' },
                    { label: '처리결과', text: result.text(), value: result.value() },
                    { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }
                ];

                gridCommonUtils.gridSearchPrint(gridMain.searchExpansion, searchData);

                $(gridMain.grid).data("kendoCpGrid").setDataSource(gridMain.reservationDataSource());

                reservationDetail.detailHide();
            }
    };

    const reservationDetail = {
        gridSelectRow: () => {

            const splitter = $(gridMain.gridSplitter).data("kendoSplitter");
            const gridSplitterMainId = `#${splitter.element.find('.c-splitter-grid').attr('id')}`;
            const gridSplitterDetailId = `#${splitter.element.find('.c-splitter-detail').attr('id')}`;

            splitter.size($(gridSplitterMainId), `calc(100% - ${gridMain.detailSplitterWidth})`);
            splitter.size($(gridSplitterDetailId), gridMain.detailSplitterWidth);

            const gridDetailSplitterCloseId = `#${splitter.element.find('.k-i-close').parent().attr('id')}`;
            $(gridDetailSplitterCloseId).on('click', () => {
                reservationDetail.detailHide();
            })

            let valid = $(`#${reservationElem}-detail-update-box`).data("kendoValidator");
            if (valid !== undefined) valid.reset();
            const skeleton = $(`#${reservationElem}-detail-section dd`);
            const skeleton2 = $(`#${reservationElem}-detail-update-box dd`);
            skeletonClass(skeleton);
            skeletonClass(skeleton2);
            const grid = $(`#${reservationElem}-grid`).data('kendoCpGrid');
            let item = grid.dataItem(grid.select());
            $(`#${reservationElem}-detail-chargeId`).val(item.chargeId);
            let getReservationItem = new cpDataSource(METHOD.GET, '/consult/v1/reservation-item', {
                boundId: item.boundId,
                callId: item.callId
            }).getDataSource();

            getReservationItem.read().then(() => {
                skeletonClass(skeleton, false);
                skeletonClass(skeleton2, false);
                let item = getReservationItem.data()[0];
                item.reservationDt = item.callDt == null ? '' : kendo.toString(new Date(item.reservationDt), 'yyyy-MM-dd HH:mm');
                item.callDt = item.callDt == null ? '' : kendo.toString(new Date(item.callDt), 'yyyy-MM-dd HH:mm');
                item.boundTelNo = item.boundTelNo == null ? '' : formatterHpNo(item.boundTelNo);
                item.reservationTelNo = item.reservationTelNo == null ? '' : formatterHpNo(item.reservationTelNo);
                item.processNm = item.processNm == null ? '\u00a0' : item.processNm;
                item.processDt = item.processDt == null ? '\u00a0' : kendo.toString(new Date(item.processDt), 'yyyy-MM-dd HH:mm');
                reservationDetail.dataBindingToDetail(item);
                let boundHistoryData = new cpDataSource(METHOD.GET, '/consult/v1/visitor-reserve/select', {
                    boundId: item.boundId,
                    callId: item.callId
                }).getDataSource();
                boundHistoryData.read().then(() => {
                    let data = reservationDetail.parseDetailGridData(boundHistoryData.data());
                    $(`#${reservationElem}-detail-bound-history`).data('kendoCpGrid').dataSource.data(data);
                });

                reservationDetail.showTelIcon(item);
                const reservationStatus = $(`#${reservationElem}-detail-reservationStatus`).data('kendoDropDownTree');
                const reservationAnswer = $(`#${reservationElem}-detail-answer`).data('kendoTextArea');
                if (item.processYn === 'N') {
                    reservationStatus.readonly(false);
                    reservationStatus._arrow.removeClass('hidden');
                    reservationAnswer.setOptions({
                        fillMode: 'solid'
                    });
                    reservationAnswer.readonly(false);
                    if (item.reservationStatus === "Receipt") {
                        $(`#${reservationElem}-detail-btn-update`).hide();
                    } else {
                        $(`#${reservationElem}-detail-btn-update`).show();
                    }
                } else {
                    reservationStatus.readonly(true);
                    reservationStatus._arrow.addClass('hidden');
                    reservationAnswer.setOptions({
                        fillMode: 'flat'
                    });
                    reservationAnswer.readonly(true);
                    $(`#${reservationElem}-detail-btn-update`).hide();
                }
            });
        },
        reservationDetailValidator: () => {
            return $(`#${reservationElem}-detail-update-box`).kendoValidator({
                errorTemplate: '',
                rules: {
                    rule: (input) => {
                        if (input.is('[name=reservation-detail-reservationStatus]')) {
                            if ($(`#${reservationElem}-detail-reservationStatus`).data('kendoDropDownTree').value() === 'Receipt') {
                                return false;
                            }
                        }
                        return true;
                    }
                },
                messages: {
                    rule: "미처리는 저장 할 수 없습니다."
                }
            }).data('kendoValidator');
        },
        init: async () => {
            let reservationStatus = new cpDataSource(METHOD.GET, '/common/v1/code/ReservationStatus').getDataSource();
            await reservationStatus.read().then(() => {
                let statusData = [...reservationStatus.data()];
                statusData.unshift({codeNm: '전체', codeKey: 'all'});
                $(`#${reservationElem}-processing-result`).kendoDropDownTree({
                    dataSource: statusData,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    fillMode: 'solid',
                    clearButton: false,
                    value: 'all'
                });

                reservationStatus.data().forEach(e => e.items)
                let detailReservationStatus = [...reservationStatus.data()[0].items, ...reservationStatus.data()[1].items];
                detailReservationStatus = detailReservationStatus.filter(e => e.codeValue_05 === "02");

                $(`#${reservationElem}-detail-reservationStatus`).kendoDropDownTree({
                    fillMode: 'flat',
                    clearButton: false,
                    dataSource: detailReservationStatus,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    change: (e) => {
                        if (e.sender.value() === "Receipt") {
                            $(`#${reservationElem}-detail-btn-update`).hide();
                        } else {
                            $(`#${reservationElem}-detail-btn-update`).show();
                        }
                    }
                });
            });

            $(`#${reservationElem}-detail-reservationDt`).kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-reservationTelNo`).kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-fullCallCatNm`).kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-boundTelNo`).kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-question`).kendoTextArea({
                rows: 5,
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-memo`).kendoTextArea({
                rows: 3,
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-processNm`).kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-processDt`).kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $(`#${reservationElem}-detail-bound-history`).kendoCpGrid({
                editable: false,
                height: 180,
                columns: [
                    {
                        field: 'boundDt',
                        title: '발신시간',
                        headerAttributes: {class: '!k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'boundTelNo',
                        title: '수/발신번호',
                        headerAttributes: {class: '!k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'rgtrNm',
                        title: '발신자',
                        headerAttributes: {class: '!k-text-center'},
                        attributes: {class: '!k-text-center'}
                    }
                ]
            });

            $(`#${reservationElem}-detail-answer`).kendoTextArea({
                rows: 5
            });

            $(`#${reservationElem}-detail-btn-update`).kendoButton({
                themeColor: 'primary',
                click: () => {
                    if (!reservationDetail.reservationDetailValidator().validate()) {
                        return;
                    }
                    cpProgress("reservation-detail");
                    const updateReservation = () => {
                        let updateReservationDataSource = new cpDataSource(METHOD.PUT, '/consult/v1/reservation/update', {
                            boundId: $(`#${reservationElem}-detail-boundId`).val(),
                            callId: $(`#${reservationElem}-detail-callId`).val(),
                            chargeId: Number($(`#${reservationElem}-detail-chargeId`).val()),
                            reservationStatus: $(`#${reservationElem}-detail-reservationStatus`).data('kendoDropDownTree').value(),
                            description: $(`#${reservationElem}-detail-answer`).data('kendoTextArea').value()
                        }).getDataSource();
                        updateReservationDataSource.read().then(() => {
                            $(`#${reservationElem}-grid`).data('kendoCpGrid').dataSource.read();
                            message.notification({msg: '저장되었습니다.', type: 'success'});
                            reservationDetail.detailHide();
                            cpProgress("reservation-detail", false);
                        });
                    }
                    message.callBackConfirm({
                        msg: '저장하시겠습니까?', callback: updateReservation, cancel: () => {
                            cpProgress("reservation-detail", false);
                        }
                    });
                }
            });

            $(`#${reservationElem}-detail-btn-call-reservationTelNo`).on('click', () => {
                reservationDetail.reservationSendTel();
            });

            $(`#${reservationElem}-detail-btn-call-boundTelNo`).on('click', () => {
                reservationDetail.sendTel();
            });
        },
        dataBindingToDetail: (item) => {
            $(`#${reservationElem}-detail-boundId`).val(item.boundId);
            $(`#${reservationElem}-detail-callId`).val(item.callId);
            $(`#${reservationElem}-detail-reservationDt`).data('kendoTextBox').value(item.reservationDt);
            $(`#${reservationElem}-detail-reservationTelNo`).data('kendoTextBox').value(item.reservationTelNo);
            $(`#${reservationElem}-detail-boundTelNo`).data('kendoTextBox').value(item.boundTelNo);
            $(`#${reservationElem}-detail-fullCallCatNm`).data('kendoTextBox').value(item.fullCallCatNm);
            $(`#${reservationElem}-detail-question`).data('kendoTextArea').value(item.question);
            $(`#${reservationElem}-detail-memo`).data('kendoTextArea').value(item.memo);
            $(`#${reservationElem}-detail-processNm`).data('kendoTextBox').value(item.processNm);
            $(`#${reservationElem}-detail-processDt`).data('kendoTextBox').value(item.processDt);
            $(`#${reservationElem}-detail-reservationStatus`).data('kendoDropDownTree').text(item.reservationStatusNm);
            $(`#${reservationElem}-detail-answer`).data('kendoTextArea').value(item.description);
        },
        clear: () => {
            $(`#${reservationElem}-detail-boundId`).val('');
            $(`#${reservationElem}-detail-callId`).val('');
            $(`#${reservationElem}-detail-reservationDt`).data('kendoTextBox').value('');
            $(`#${reservationElem}-detail-reservationTelNo`).data('kendoTextBox').value('');
            $(`#${reservationElem}-detail-boundTelNo`).data('kendoTextBox').value('');
            $(`#${reservationElem}-detail-fullCallCatNm`).data('kendoTextBox').value('');
            $(`#${reservationElem}-detail-question`).data('kendoTextArea').value('');
            $(`#${reservationElem}-detail-memo`).data('kendoTextArea').value('');
            $(`#${reservationElem}-detail-processNm`).data('kendoTextBox').value('');
            $(`#${reservationElem}-detail-processDt`).data('kendoTextBox').value('');
            $(`#${reservationElem}-detail-reservationStatus`).data('kendoDropDownTree').value('');
            $(`#${reservationElem}-detail-answer`).data('kendoTextArea').value('');
            $(`#${reservationElem}-detail-bound-history`).data('kendoCpGrid').dataSource.data([]);
        },
        showTelIcon: (item) => {
            if (item.processYn === 'N' && USER_INFO.ctiYn === 'Y' && item.reservationTelNo !== '') {
                $(`#${reservationElem}-detail-btn-call-reservationTelNo`).show();
            } else {
                $(`#${reservationElem}-detail-btn-call-reservationTelNo`).hide();
            }

            if (item.processYn === 'N' && USER_INFO.ctiYn === 'Y' && item.boundTelNo !== '') {
                $(`#${reservationElem}-detail-btn-call-boundTelNo`).show();
            } else {
                $(`#${reservationElem}-detail-btn-call-boundTelNo`).hide();
            }
        },
        parseDetailGridData: (items) => {
            items.forEach(item => {
                item.boundDt = item.boundDt == null ? '' : kendo.toString(new Date(item.boundDt), 'yyyy-MM-dd HH:mm');
                item.boundTelNo = item.boundTelNo == null ? '' : formatterHpNo(item.boundTelNo);
                item.rgtrNm = item.rgtrNm == null ? '' : item.rgtrNm;
            });
            return items;
        },
        detailHide: () => {

            const splitter = $(gridMain.gridSplitter).data("kendoSplitter");
            const gridSplitterMainId = `#${splitter.element.find('.c-splitter-grid').attr('id')}`;
            const gridSplitterDetailId = `#${splitter.element.find('.c-splitter-detail').attr('id')}`;

            splitter.size($(gridSplitterMainId), '100%');
            splitter.size($(gridSplitterDetailId), '0%');
        },
        reservationSendTel: () => {
            let telNo = $(`#${reservationElem}-detail-reservationTelNo`).data('kendoTextBox').value().replace(/-/gi, '');
            reservationDetail.call(telNo);
        },
        sendTel: () => {
            let telNo = $(`#${reservationElem}-detail-boundTelNo`).data('kendoTextBox').value().replace(/-/gi, '');
            reservationDetail.call(telNo);
        },
        call: (telNo) => {
            if (ctiBtnAct.isMakeCall()) {
                let boundId = $(`#${reservationElem}-detail-boundId`).val();
                let callId = $(`#${reservationElem}-detail-callId`).val();
                let insertVisitorReserve = new cpDataSource(METHOD.POST, '/consult/v1/visitor-reserve/insert', {
                    boundId: boundId,
                    callId: callId,
                    boundTelNo: telNo
                }).getDataSource();
                insertVisitorReserve.read().then(() => {
                    $(`#${reservationElem}-grid`).data('kendoCpGrid').dataSource.read();
                    ctiBtnAct.revSendTel(telNo, boundId, callId);
                });
            }
        }
    };
    cpProgress(`${reservationElem}-layout`);
    gridMain.init();
    gridMain.gridSetting().then(() => {
        gridMain.reservationGridSearch();
        reservationDetail.init();
    cpProgress(`${reservationElem}-layout`, false);
    });
});