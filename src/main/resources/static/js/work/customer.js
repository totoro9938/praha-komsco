$(document).ready(() => {
    let targetReleaseArray = [];
    let isCustomerDropped = false;

    const customerTileLayoutArray = [
        {
            colSpan: 1,
            rowSpan: 4,
            header: { text: "고객병합" },
            bodyTemplate: kendo.template($(`#customer-merge-tile-layout-template`).html())
        },
        {
            colSpan: 1,
            rowSpan: 4,
            header: { text: "유의고객" },
            bodyTemplate: kendo.template($(`#customer-black-tile-layout-template`).html())
        },
        {
            colSpan: 1,
            rowSpan: 3,
            bodyTemplate: kendo.template($(`#customer-merge-detail-tile-layout-template`).html())
        },
        {
            colSpan: 1,
            rowSpan: 3,
            bodyTemplate: kendo.template($(`#customer-black-detail-tile-layout-template`).html())
        }
    ];

    let customerTileLayout = $("#customer-tile-layout").kendoTileLayout({
        containers: customerTileLayoutArray,
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
            kendo.resize(e.container, true);
        }

    }).data("kendoTileLayout");

    const customerMerge = {
        init: async () => {
            let customerCustType = new cpDataSource(METHOD.GET, '/common/v1/code/CustType').getDataSource();
            await customerCustType.read().then(() => {
                customerCustType.data().unshift({codeNm: '전체', codeKey: 'all'});
                $('#customer-merge-customer-type').kendoDropDownTree({
                    dataSource: customerCustType.data(),
                    fillMode: 'solid',
                    clearButton: false,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    value: {codeNm: '전체', codeKey: 'all'}
                });
            });
            $('#customer-merge-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    { collapsible: false, size: "36px", resizable:false, scrollable: false },
                    { collapsible: false, resizable: false }
                ]
            });
            $('#customer-merge-btn-open-search-box').kendoButton({
                icon: 'chevron-down',
                size: 'small',
                fillMode: 'flat',
                click: () => {
                    customerMerge.searchBoxOpen();
                }
            });
            $('#customer-merge-btn-search').kendoButton({
                icon: 'search',
                themeColor: 'secondary',
                size: 'small',
                click: () => {
                    customerMerge.search();
                }
            });
            $('#customer-merge-btn-close-search-box').kendoButton({
                icon: 'chevron-up',
                size: 'small',
                fillMode: 'flat',
                click: () => {
                    customerMerge.searchBoxClose();
                }
            });
            let startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            $("#customer-merge-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });
            $("#customer-merge-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });
            $('#customer-merge-search-type').kendoDropDownList({
                dataSource: [
                    {codeNm: '고객명', codeKey: 'CustNm'},
                    {codeNm: '전화번호', codeKey: 'TelNo'},
                    {codeNm: '특이사항', codeKey: 'Description'}
                ],
                fillMode: 'solid',
                autoWidth: true,
                dataTextField: 'codeNm',
                dataValueField: 'codeKey',
                change: function () {
                    let searchText = $('#customer-merge-search-type-detail').data('kendoTextBox');
                    if (this.value() != 'CustNm' && this.value() != 'Description') {
                        searchText.value(formatterHpNo(searchText.value()));
                    }
                }
            });
            $('#customer-merge-search-type-detail').kendoTextBox({
                size: 'small',
                change: (e)=> {
                    let searchType = $('#customer-merge-search-type').data('kendoDropDownList').value();
                    let value = e.value;
                    if (searchType !== 'CustNm' && searchType !== 'Description') {
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
            }).bind('keyup', function (e) {
                if (e.keyCode == 13) {
                    customerMerge.search();
                }
            });


            $('#customer-merge-btn-reset').kendoButton({
                click: () => {
                    customerMerge.detailClear();
                    $('#customer-merge-detail').hide();
                    $('#customer-merge-selected-grid').data('kendoCpGrid').dataSource.data([]);
                    $('#customer-merge-grid').data('kendoCpGrid').dataSource.read();
                }
            });
            $('#customer-merge-btn-merge').kendoButton({
                themeColor: 'primary',
                click: () => {
                    const grid = $('#customer-merge-grid').data('kendoCpGrid');
                    if ($('#customer-merge-detail-selected-custId').val() == '') {
                        message.notification({msg: '병합 할 대상이 없습니다.', type: 'error'});
                        return;
                    }
                    const mergeCustomer = async () => {
                        let releaseArray = [];
                        let mergeArray = [];
                        let targetCustIds = $('#customer-merge-selected-grid').data('kendoCpGrid').dataSource.data();

                        let releaseSet = new Set(targetReleaseArray);
                        if (releaseSet.size > 0) {
                            releaseArray = Array.from(releaseSet);
                            let releaseParam = {
                                unitedCustId: $('#customer-merge-detail-selected-custId').val(),
                                releaseCustId: releaseArray
                            }
                            let saveCustRelease = new cpDataSource(METHOD.PUT, '/work/v1/customer-release', releaseParam).getDataSource();
                            await saveCustRelease.read();
                        }
                        if (targetCustIds.length > 0) {
                            for (let i = 0; i < targetCustIds.length; i++) {
                                if (targetCustIds[i].custId == targetCustIds[i].unitedCustId) {
                                    mergeArray.push(targetCustIds[i].custId);
                                }
                            }
                        }
                        if (mergeArray.length > 0) {
                            let mergeParam = {
                                unitedCustId: $('#customer-merge-detail-selected-custId').val(),
                                targetCustId: mergeArray
                            }

                            let saveCustMerge = new cpDataSource(METHOD.PUT, '/work/v1/customer-united', mergeParam).getDataSource();
                            await saveCustMerge.read();
                        }

                        grid.dataSource.read();
                        targetReleaseArray = [];
                        message.notification({msg: '병합되었습니다.', type: 'success'});
                        customerMerge.detailClear();
                        $('#customer-merge-detail').hide();
                        $('#customer-merge-selected-grid').data('kendoCpGrid').dataSource.data([]);
                    }
                    message.callBackConfirm({msg: '저장하시겠습니까?', callback: mergeCustomer});
                }
            });
            $('#customer-merge-selected-cust-smsYn').kendoCheckBox({
                enabled: false
            });
            $('#customer-merge-selected-cust-telYn').kendoCheckBox({
                enabled: false
            });

        },
        searchResultPrint: () => {
            let target = $('#customer-merge-print-search-options');
            let smsYn = buttonGroupUtils.buttonGroupGetSelectedText("#customer-merge-smsYn");
            let telYn = buttonGroupUtils.buttonGroupGetSelectedText("#customer-merge-telYn");
            let searchText = [{
                label: '등록일자 : ',
                icon: 'c-calendar3',
                text: kendo.toString($("#customer-merge-search-date-start").data('kendoDatePicker').value(), 'yyyy-MM-dd') + ' ~ ' + kendo.toString($("#customer-merge-search-date-end").data('kendoDatePicker').value(), 'yyyy-MM-dd')
            }, {
                label: '고객구분 : ',
                text: $("#customer-merge-customer-type").data("kendoDropDownTree").text()
            }, {
                label: $('#customer-merge-search-type').data('kendoDropDownList').text() + ' : ',
                text: $("#customer-merge-search-type-detail").val()
            }, {
                label: 'SMS 수신여부 : ',
                text: smsYn
            }, {
                label: '해피콜 : ',
                text: telYn
            }];
            searchTextBadge(target, searchText);
        },
        dataBindingToDetail: () => {
            $('#drop-target-guide-text').text('병합대상을 드래그 해주세요.');
            targetReleaseArray = [];
            const grid = $('#customer-merge-grid').data('kendoCpGrid');
            let item = grid.dataItem(grid.select());
            let getCustomerItem = new cpDataSource(METHOD.GET, `/work/v1/customer-item/${item.custUuid}`).getDataSource();
            getCustomerItem.read().then(() => {
                $('#customer-merge-detail').show();
                let selectedCustomerDetail = getCustomerItem.data()[0].customerSelectItemDomain;
                let mergedCustomerList = getCustomerItem.data()[0].customerFindSelectDomain;
                $('#customer-merge-detail-selected-custId').val(selectedCustomerDetail.custId);
                $('#customer-merge-selected-grid').data('kendoCpGrid').dataSource.data([]);
                $('#customer-merge-selected-custNm').data('kendoTextBox').value(selectedCustomerDetail.custNm);
                $('#customer-merge-selected-boundTelNo').data('kendoTextBox').value(selectedCustomerDetail.boundTelNo);
                $('#customer-merge-selected-hpNo').data('kendoTextBox').value(selectedCustomerDetail.hpNo);
                $('#customer-merge-selected-telNo').data('kendoTextBox').value(selectedCustomerDetail.telNo);
                $('#customer-merge-selected-custType').data('kendoTextBox').value(selectedCustomerDetail.custTypeNm);
                if (selectedCustomerDetail.smsYn == 'Y') {
                    $('#customer-merge-selected-cust-smsYn').data('kendoCheckBox').check(true);
                } else {
                    $('#customer-merge-selected-cust-smsYn').data('kendoCheckBox').check(false);
                }
                if (selectedCustomerDetail.telYn == 'Y') {
                    $('#customer-merge-selected-cust-telYn').data('kendoCheckBox').check(true);
                } else {
                    $('#customer-merge-selected-cust-telYn').data('kendoCheckBox').check(false);
                }
                if (mergedCustomerList.length > 0) {
                    $('#customer-merge-selected-grid').data('kendoCpGrid').dataSource.data(mergedCustomerList);
                }
            });

        },
        searchBoxOpen: () => {
            $('#customer-merge-search-element1').hide();
            $('#customer-merge-search-element2').show();
            $('#customer-merge-search-box').show();
            let searchBoxHeight = $('#customer-merge-search-box').height() + 10;
            $('#customer-merge-splitter').data('kendoSplitter').size('#customer-merge-divSearch', `${searchBoxHeight}px`);
            //customerBlackGrid.height(450);
        },
        searchBoxClose: () => {
            $('#customer-merge-search-box').hide();
            $('#customer-merge-search-element1').show();
            $('#customer-merge-search-element2').hide();
            let searchBoxHeight = $('#customer-merge-print-search-options').height() + 10;
            $('#customer-merge-splitter').data('kendoSplitter').size('#customer-merge-divSearch', `${searchBoxHeight}px`);
            //customerBlackGrid.height(400);
        },
        detailClear: () => {
            $('#customer-merge-detail-selected-custId').val('');
            $('#drop-target-guide-text').text('');
            $('#customer-merge-selected-custNm').data('kendoTextBox').value('');
            $('#customer-merge-selected-boundTelNo').data('kendoTextBox').value('');
            $('#customer-merge-selected-hpNo').data('kendoTextBox').value('');
            $('#customer-merge-selected-telNo').data('kendoTextBox').value('');
            $('#customer-merge-selected-custType').data('kendoTextBox').value('');
            $('#customer-merge-selected-cust-smsYn').data('kendoCheckBox').check(false);
            $('#customer-merge-selected-cust-telYn').data('kendoCheckBox').check(false);
        },
        search: () => {
            $('#customer-merge-grid').data('kendoCpGrid').dataSource.read();
        }
    };
    const customerMergeDetail = {
        init: () => {
            $('#customer-merge-selected-custNm').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-merge-selected-boundTelNo').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-merge-selected-hpNo').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-merge-selected-telNo').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-merge-selected-custType').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });
        }
    };
    const customerMergeGrid = {
        init: () => {
            $('#customer-merge-grid').kendoCpGrid({
                dataSource: customerMergeGrid.dataSource(),
                pageable: {
                    refresh: true
                },
                autoBind: true,
                editable: false,
                selectable: true,
                height: "100%",
                scrollable: true,
                change: customerMerge.dataBindingToDetail,
                columns: [
                    {
                        field: 'custNm',
                        title: '고객명',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 90
                    },
                    {
                        field: 'boundTelNo',
                        title: '수/발신번호',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'hpNo',
                        title: '휴대폰',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'telNo',
                        title: '일반전화',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'custTypeNm',
                        title: '고객구분',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70
                    },
                    {
                        field: 'smsYn',
                        title: 'SMS',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70,
                        template: "<input type='checkbox' class='k-checkbox-md' disabled #= smsYn == 'Y' ? 'checked' : '' # />"
                    },
                    {
                        field: 'telYn',
                        title: '해피콜',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70,
                        template: "<input type='checkbox' class='k-checkbox-md' disabled #= telYn == 'Y' ? 'checked' : '' # />"
                    },
                    {
                        field: 'unitedCustCnt',
                        title: '병합',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 50,
                    }
                ],
                dataBound: (e) => {
                    customerMerge.searchResultPrint();
                    customerMerge.searchBoxClose();
                }
            });
            $('#customer-merge-grid').kendoDraggable({
                filter: '.k-master-row',
                dragstart: function (e) {
                    const grid = $('#customer-merge-grid').data('kendoCpGrid');
                    let draggedItem = grid.dataItem(e.currentTarget);
                    let hasItem = dropTargetDataSource.data().find(e => e.custId == draggedItem.custId);
                    if ($('#customer-merge-detail-selected-custId').val() == '' ||
                        $('#customer-merge-detail-selected-custId').val() == draggedItem.custId ||
                        hasItem != undefined) {
                        return;
                    }
                    $('#customer-merge-selected-grid').css({'border-color': '#ff6347'});
                },
                dragend: function (e) {
                    $("#customer-merge-selected-grid").css({'border-color': '#dee2e6'});
                },
                hint: function (element) {
                    const grid = $('#customer-merge-grid').data('kendoCpGrid');
                    let draggedItem = grid.dataItem(element);
                    let hasItem = dropTargetDataSource.data().find(e => e.custId == draggedItem.custId);
                    if ($('#customer-merge-detail-selected-custId').val() == '' ||
                        $('#customer-merge-detail-selected-custId').val() == draggedItem.custId ||
                        hasItem != undefined) {
                        isCustomerDropped = false;
                        return;
                    }
                    isCustomerDropped = true;
                    return $("<div><em style='font-size:32px' class='k-icon k-i-file-add'></em></div>");
                },
                cursorOffset: {top: -30, left: -35}
            });
            let dropTargetDataSource = new kendo.data.DataSource({
                change: (e) => {
                    if (e.action == 'remove' && e.items[0].custId != e.items[0].unitedCustId) {
                        targetReleaseArray.push(e.items[0].custId);
                    }
                },
                data: [],
                schema: {
                    model: {
                        id: 'custId',
                        fields: {
                            custId: {type: 'number'},
                            custNm: {type: 'string'},
                            boundTelNo: {type: 'string'},
                            hpNo: {type: 'string'},
                            telNo: {type: 'string'}
                        }
                    }
                }
            });
            $('#customer-merge-selected-grid').kendoCpGrid({
                height: '250px',
                dataSource: dropTargetDataSource,
                editable: {
                    mode: 'inline',
                    confirmation: false
                },
                columns: [
                    {
                        field: 'custNm',
                        title: '고객명',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 70
                    },
                    {field: 'boundTelNo', title: '수/발신번호', headerAttributes: {class: 'k-text-center'}},
                    {field: 'hpNo', title: '휴대폰', headerAttributes: {class: 'k-text-center'}},
                    {field: 'telNo', title: '일반전화', headerAttributes: {class: 'k-text-center'}},
                    {command: [{name: "destroy", text: ""}], attributes: {class: '!k-text-center'}, width: 50}
                ]
            });
            $('#customer-merge-selected-grid').kendoDropTarget({
                dragenter: draggableFunction.onDropTargetStyling,
                dragleave: draggableFunction.offDropTargetStyling,
                drop: (e) => {
                    const grid = $('#customer-merge-grid').data('kendoCpGrid');
                    let draggableElement = e.draggable.currentTarget;
                    let draggedItem = grid.dataItem(draggableElement);
                    if (!isCustomerDropped) {
                        return;
                    }
                    dropTargetDataSource.add(draggedItem);
                }
            });
        },
        dataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: '/work/v1/customer-page/select',
                        type: 'GET',
                        contentType: 'application/json',
                        dataType: 'json'
                    },
                    parameterMap: (data, type) => {
                        if (type == 'read') {
                            let param = {
                                startDate: kendo.toString($("#customer-merge-search-date-start").data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                                endDate: kendo.toString($("#customer-merge-search-date-end").data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                                custType: $('#customer-merge-customer-type').data('kendoDropDownTree').value() == "all" ? "" : $('#customer-merge-customer-type').data('kendoDropDownTree').value(),
                                searchType: $('#customer-merge-search-type').data('kendoDropDownList').value(),
                                searchTxt: $('#customer-merge-search-type-detail').data('kendoTextBox').value().replaceAll(/-/gi, ''),
                                smsYn: buttonGroupUtils.buttonGroupGetSelectedValue('#customer-merge-smsYn') === 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue('#customer-merge-smsYn'),
                                telYn: buttonGroupUtils.buttonGroupGetSelectedValue('#customer-merge-telYn') === 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue('#customer-merge-telYn'),
                                sortType: '',
                                page: data.page,
                                totalPage: data.pageSize
                            };
                            return param;
                        }
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                schema: {
                    total: (data) => {
                        return data.data.totalCount;
                    },
                    data: 'data.rows',
                    model: {
                        id: 'custId',
                        fields: {
                            custId: {type: 'number'},
                            companyCd: {type: 'string'},
                            custUuid: {type: 'string'},
                            custNo: {type: 'string'},
                            birthDay: {type: 'string'},
                            gender: {type: 'string'},
                            custType: {type: 'string'},
                            telNo: {type: 'string'},
                            hpNo: {type: 'string'},
                            boundTelNo: {type: 'string'},
                            unitedCustId: {type: 'number'},
                            unitedCustCnt: {type: 'number'},
                            personInfoUseYn: {type: 'string'},
                            personInfoAgreeDt: {type: 'string'},
                            personInfoAgreeYmd: {type: 'string'},
                            email: {type: 'string'},
                            emailYn: {type: 'string'},
                            emailAgreeDt: {type: 'string'},
                            emailAgreeYmd: {type: 'string'},
                            telYn: {type: 'string'},
                            telAgreeDt: {type: 'string'},
                            telAgreeYmd: {type: 'string'},
                            firstBoundId: {type: 'number'},
                            firstCallId: {type: 'number'},
                            fistCallDt: {type: 'string'},
                            firstCallYmd: {type: 'string'},
                            firstCallRgtrId: {type: 'number'},
                            lastBoundId: {type: 'number'},
                            lastCallId: {type: 'number'},
                            lastCallDt: {type: 'string'},
                            lastCallYmd: {type: 'string'},
                            lastCallRgtrId: {type: 'number'},
                            description: {type: 'string'},
                            delYn: {type: 'string'},
                            rgtrId: {type: 'number'},
                            regDt: {type: 'string'},
                            regYmd: {type: 'string'},
                            mdfrId: {type: 'number'},
                            mdfDt: {type: 'string'},
                            mdfYmd: {type: 'string'}
                        }
                    }
                }
            });
        },
        height: (h) => {
            //$('#customer-merge-grid').data('kendoCpGrid').setOptions({height: h});
        }
    };
    const customerMergeRadioGroup = {
        init: async () => {

            const custSmsYnData =  new cpDataSource(METHOD.GET, "/common/v1/code/SmsYn", {}).getDataSource();
            await custSmsYnData.read().then(() => {
                $('#customer-merge-smsYn').kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(custSmsYnData.data(),true),
                    index: 0,
                    size: 'small'
                });
            });

            const custTelsYnData =  new cpDataSource(METHOD.GET, "/common/v1/code/TelYn", {}).getDataSource();
            await custTelsYnData.read().then(() => {
                $('#customer-merge-telYn').kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(custTelsYnData.data(),true),
                    index: 0,
                    size: 'small'
                });
            });

            /*
            const customerMergeTelYnRadioGroup = new cpCodeDropDownTree('', 'TelYn', '').getData();
            const customerMergeSmsYnRadioGroup = new cpCodeDropDownTree('', 'SmsYn', '').getData();
            let customerMergeTelYnRadioGroupItems = [{value: '', label: '전체'}];
            let customerMergeSmsYnRadioGroupItems = [];

            await customerMergeTelYnRadioGroup.then((res) => {
                let telYnItem = {};
                for (let i = 0; i < res.length; i++) {
                    telYnItem.value = res[i].codeKey;
                    telYnItem.label = res[i].codeNm;
                    customerMergeTelYnRadioGroupItems.push({...telYnItem});
                }
                let telYnRadioGroupItems = customerMergeTelYnRadioGroupItems;

                $('#customer-merge-telYn').kendoRadioGroup({
                    items: telYnRadioGroupItems,
                    value: '',
                    layout: 'horizontal'
                });
            });

            await customerMergeSmsYnRadioGroup.then((res) => {
                let smsYnItem = {};
                for (let i = 0; i < res.length; i++) {
                    smsYnItem.value = res[i].codeKey;
                    smsYnItem.label = res[i].codeNm;
                    customerMergeSmsYnRadioGroupItems.unshift({...smsYnItem});
                }
                customerMergeSmsYnRadioGroupItems.unshift({value: '', label: '전체'});
                let smsYnRadioGroupItems = customerMergeSmsYnRadioGroupItems;

                $('#customer-merge-smsYn').kendoRadioGroup({
                    items: smsYnRadioGroupItems,
                    value: '',
                    layout: 'horizontal'
                });
            });

             */
        }

    };
    const customerBlack = {
        processStatus: '',
        init: async () => {
            let customerBlackCustType = new cpDataSource(METHOD.GET, '/common/v1/code/CustType').getDataSource();
            await customerBlackCustType.read().then(() => {
                customerBlackCustType.data().unshift({codeNm: '전체', codeKey: 'all'});
                $('#customer-black-customer-type').kendoDropDownTree({
                    dataSource: customerBlackCustType.data(),
                    fillMode: 'solid',
                    autoWidth: true,
                    clearButton: false,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    value: {codeKey: 'all'}
                });
            });

            $('#customer-black-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    { collapsible: false, size: "36px", resizable:false, scrollable: false },
                    { collapsible: false }
                ]
            });
            $('#customer-black-btn-open-search-box').kendoButton({
                icon: 'chevron-down',
                size: 'small',
                fillMode: 'flat',
                click: () => {
                    customerBlack.searchBoxOpen();
                }
            });
            $('#customer-black-btn-search').kendoButton({
                icon: 'search',
                themeColor: 'secondary',
                size: 'small',
                click: () => {
                    customerBlack.search();
                }
            });
            $('#customer-black-btn-close-search-box').kendoButton({
                icon: 'chevron-up',
                size: 'small',
                fillMode: 'flat',
                click: () => {
                    customerBlack.searchBoxClose();
                }
            });

            let startDate = new Date();
            startDate.setMonth(startDate.getMonth() - 1);
            $("#customer-black-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: '',
                size: 'small'
            });
            $("#customer-black-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $('#customer-black-search-type').kendoDropDownList({
                dataSource: [
                    {codeNm: '고객명', codeKey: 'CustNm'},
                    {codeNm: '수/발신전화', codeKey: 'BoundTelNo'},
                    {codeNm: '휴대폰', codeKey: 'HpNo'},
                    {codeNm: '일반전화', codeKey: 'TelNo'},
                    {codeNm: '특이사항', codeKey: 'Description'}
                ],
                fillMode: 'solid',
                autoWidth: true,
                dataTextField: 'codeNm',
                dataValueField: 'codeKey',
                change: function (e) {
                    let searchText = $('#customer-black-search-type-detail').data('kendoTextBox');
                    if (this.value() != 'CustNm' && this.value() != 'Description') {
                        searchText.value(formatterHpNo(searchText.value()));
                    }
                }
            });
            $('#customer-black-search-type-detail').kendoTextBox({
                size: 'small',
                change: function (e) {
                    let searchType = $('#customer-black-search-type').data('kendoDropDownList').value();
                    let value = e.value;
                    if (searchType !== 'CustNm' && searchType !== 'Description') {
                        e.sender.element.val(value.formatterHpNo());
                    }
                }
            }).bind('keyup', function (e) {
                if (e.keyCode == 13) {
                    customerBlack.search();
                }
            });
            $('#customer-black-reason').kendoTextArea({
                rows: 5
            });
            $('#customer-black-btn-approve').kendoButton({
                themeColor: 'primary',
                click: (e) => {
                    if (!reasonValidator.validate()) {
                        return;
                    }
                    customerBlack.processStatus = 'Approve';
                    message.callBackConfirm({msg: '승인하시겠습니까?', callback: customerBlack.updateBlackCustStatus});
                }
            });

            $('#customer-black-btn-reject').kendoButton({
                click: (e) => {
                    if (!reasonValidator.validate()) {
                        return;
                    }
                    customerBlack.processStatus = 'Reject';
                    message.callBackConfirm({msg: '반려하시겠습니까?', callback: customerBlack.updateBlackCustStatus});
                }
            });
            $('#customer-black-btn-release').kendoButton({
                themeColor: 'primary',
                click: (e) => {
                    customerBlack.processStatus = 'Release';
                    message.callBackConfirm({msg: '해제하시겠습니까?', callback: customerBlack.updateBlackCustStatus});
                }
            });
            $('#customer-black-selected-requestReason').kendoTextArea({
                rows: 5,
                readonly: true,
                fillMode: 'flat'
            });
            const reasonValidator = $('#customer-black-reason-validator').kendoValidator({
                errorTemplate: '',
                rules: {
                    rule: (input) => {
                        if (input.is('[name=customer-black-reason]')) {
                            return $('#customer-black-reason').data('kendoTextArea').value() != '';
                        }
                        return true;
                    }
                }
            }).data('kendoValidator');
        },
        searchResultPrint: () => {
            let target = $('#customer-black-print-search-options');
            let searchText = [{
                label: '등록일자 : ',
                icon: 'c-calendar3',
                text: kendo.toString($('#customer-black-search-date-start').data('kendoDatePicker').value(), 'yyyy-MM-dd') + ' ~ ' + kendo.toString($('#customer-black-search-date-end').data('kendoDatePicker').value(), 'yyyy-MM-dd')
            }, {
                label: '고객구분 : ',
                text: $("#customer-black-customer-type").data("kendoDropDownTree").text()
            }, {
                label: $('#customer-black-search-type').data('kendoDropDownList').text() + ' : ',
                text: $("#customer-black-search-type-detail").val()
            }];
            searchTextBadge(target, searchText);
        },
        dataBindingToDetail: () => {
            let skeleton = $('#customer-black-detail  dd');
            skeletonClass(skeleton);
            const grid = $('#customer-black-grid').data('kendoCpGrid');
            let item = grid.dataItem(grid.select());
            $('#customer-black-reason-validator').kendoValidator().data('kendoValidator').reset();
            if (item.processStatus == 'Receipt') {
                $('#customer-black-set-status-box').show();
                $('#customer-black-set-release-box').hide();
                $('#customer-black-reason').data('kendoTextArea').readonly(false);
                $('#customer-black-reason').data('kendoTextArea').setOptions({
                    fillMode: 'solid'
                });
                console.log('receipt')
            } else if (item.processStatus == 'Approve' && item.custType != 'Default') {
                $('#customer-black-set-release-box').show();
                $('#customer-black-set-status-box').hide();
                $('#customer-black-reason').data('kendoTextArea').setOptions({
                    readonly: true,
                    fillMode: 'flat'
                });
            } else if (item.processStatus == 'Release' || item.processStatus == 'Reject') {
                $('#customer-black-reason').data('kendoTextArea').setOptions({
                    readonly: true,
                    fillMode: 'flat'
                });
                $('#customer-black-set-status-box').hide();
                $('#customer-black-set-release-box').hide();
            }
            let getBlackCustomerItem = new cpDataSource(METHOD.GET, `/work/v1/black-customer/${item.custBlackId}`).getDataSource();
            getBlackCustomerItem.read().then(() => {
                //$('#customer-black-detail').show();
                skeletonClass(skeleton, false);
                let data = getBlackCustomerItem.data()[0];
                data.custTypeNm = data.custTypeNm == null ? '' : data.custTypeNm;
                data.requesterNm = data.requesterNm == null ? '' : data.requesterNm;
                data.regDt = data.regDt == null ? '' : kendo.toString(new Date(data.regDt), 'yyyy-MM-dd');
                data.telNo = data.telNo == null ? '' : data.telNo;
                data.boundTelNo = data.boundTelNo == null ? '' : data.boundTelNo;
                data.hpNo = data.hpNo == null ? '' : data.hpNo;
                data.requestReason = data.requestReason == null ? '' : data.requestReason;
                data.rejectReason = data.rejectReason == null ? '' : data.rejectReason;
                customerBlackDetail.dataBindingToDetail(data);
            });

        },
        searchBoxOpen: () => {
            $('#customer-black-search-element1').hide();
            $('#customer-black-search-element2').show();
            $('#customer-black-search-box').show();
            let searchBoxHeight = $('#customer-black-search-box').height() + 10;
            $('#customer-black-splitter').data('kendoSplitter').size('#customer-black-divSearch', `${searchBoxHeight}px`);
            //customerMergeGrid.height(450);
        },
        searchBoxClose: () => {
            $('#customer-black-search-element1').show();
            $('#customer-black-search-element2').hide();
            $('#customer-black-search-box').hide();
            let searchBoxHeight = $('#customer-black-print-search-options').height() + 10;
            $('#customer-black-splitter').data('kendoSplitter').size('#customer-black-divSearch', `${searchBoxHeight}px`);
            //customerMergeGrid.height(400);
        },
        updateBlackCustStatus: () => {
            const grid = $('#customer-black-grid').data('kendoCpGrid');
            let item = grid.dataItem(grid.select());
            let param = {
                custBlackId: item.custBlackId,
                processStatus: customerBlack.processStatus,
                rejectReason: $('#customer-black-reason').data('kendoTextArea').value()
            };
            let updateBlackCustStatus = new cpDataSource(METHOD.PUT, '/work/v1/black-customer/update', param).getDataSource();
            updateBlackCustStatus.read().then(() => {
                $('#customer-black-grid').data('kendoCpGrid').dataSource.read();
                message.notification({msg: '저장되었습니다.', type: 'success'});
                customerBlack.detailClear();
                //$('#customer-black-detail').hide();
            });

        },
        detailClear: () => {
            $('#customer-black-detail-selected-custId').val('');
            $('#customer-black-selected-custType').text('');
            $('#customer-black-selected-requesterNm').text('');
            $('#customer-black-selected-requestDt').text('');
            $('#customer-black-selected-requestReason').data('kendoTextArea').value('');
            $('#customer-black-selected-boundTelNo').text('');
            $('#customer-black-selected-hpNo').text('');
            $('#customer-black-selected-telNo').text('');
            $('#customer-black-reason').data('kendoTextArea').value('');
            $('#customer-black-reason-validator').kendoValidator().data('kendoValidator').reset();
        },
        search: () => {
            $('#customer-black-set-status-box').hide();
            $('#customer-black-set-release-box').hide();
            customerBlack.detailClear();
            $('#customer-black-grid').data('kendoCpGrid').dataSource.read();
            customerBlack.searchBoxClose();
            customerBlack.searchResultPrint();
        }
    };
    const customerBlackDetail = {
        init: () => {
            $('#customer-black-selected-custType').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-black-selected-requesterNm').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-black-selected-requestDt').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-black-selected-telNo').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-black-selected-boundTelNo').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });

            $('#customer-black-selected-hpNo').kendoTextBox({
                readonly: true,
                fillMode: 'flat'
            });
        },
        dataBindingToDetail: (item) => {
            $('#customer-black-selected-custType').data('kendoTextBox').value(item.custTypeNm);
            $('#customer-black-selected-requesterNm').data('kendoTextBox').value(item.requesterNm);
            $('#customer-black-selected-requestDt').data('kendoTextBox').value(item.regDt);
            $('#customer-black-selected-requestReason').data('kendoTextArea').value(item.requestReason);
            $('#customer-black-selected-boundTelNo').data('kendoTextBox').value(item.boundTelNo);
            $('#customer-black-selected-hpNo').data('kendoTextBox').value(item.hpNo);
            $('#customer-black-selected-telNo').data('kendoTextBox').value(item.telNo);
            $('#customer-black-reason').data('kendoTextArea').value(item.rejectReason);
        }
    };
    const customerBlackGrid = {
        init: () => {
            $('#customer-black-grid').kendoCpGrid({
                dataSource: customerBlackGrid.dataSource(),
                pageable: {
                    refresh: true
                },
                autoBind: true,
                editable: false,
                selectable: true,
                height: "100%",
                scrollable: true,
                change: customerBlack.dataBindingToDetail,
                columns: [
                    {
                        field: 'processStatusNm',
                        title: '승인상태',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'custTypeNm',
                        title: '고객구분',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 100
                    },
                    {
                        field: 'custNm',
                        title: '고객명',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 100
                    },
                    {
                        field: 'boundTelNo',
                        title: '수/발신전화',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'requesterNm',
                        title: '요청자',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        width: 100
                    },
                    {
                        field: 'regDt',
                        title: '요청일',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: 'processDt',
                        title: '처리일',
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    }
                ],
                dataBound: (e) => {
                    customerBlack.detailClear();
                    //$('#customer-black-detail').hide();
                    $('#customer-black-reason').data('kendoTextArea').readonly(true);
                    customerBlack.searchResultPrint();
                }
            });
        },
        dataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: '/work/v1/black-customer/select',
                        type: 'GET',
                        contentType: 'application/json',
                        dataType: 'json'
                    },
                    parameterMap: (data, type) => {
                        if (type == 'read') {
                            let param = {
                                startDate: kendo.toString($('#customer-black-search-date-start').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                                endDate: kendo.toString($('#customer-black-search-date-end').data('kendoDatePicker').value(), 'yyyy-MM-dd'),
                                custType: $('#customer-black-customer-type').data('kendoDropDownTree').value() == 'all' ? '' : $('#customer-black-customer-type').data('kendoDropDownTree').value(),
                                searchType: $('#customer-black-search-type').data('kendoDropDownList').value(),
                                searchTxt: $('#customer-black-search-type-detail').data('kendoTextBox').value().replaceAll(/-/gi, ''),
                                sortType: '',
                                outputYn: 'Y',
                                page: data.page,
                                totalPage: data.pageSize
                            };
                            return param;
                        }
                    }
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
                schema: {
                    parse: (res) => {
                        res.data.rows.forEach(item => {
                            item.regDt = item.regDt == null ? '' : kendo.toString(new Date(item.regDt), 'yyyy-MM-dd');
                            item.processDt = item.processDt == null ? '' : kendo.toString(new Date(item.processDt), 'yyyy-MM-dd');
                            item.boundTelNo = item.boundTelNo == null ? '' : item.boundTelNo = formatterHpNo(item.boundTelNo);
                        });
                        return res;
                    },
                    total: 'data.totalCount',
                    data: 'data.rows',
                    model: {
                        id: 'custId',
                        fields: {
                            custId: {type: 'number'},
                            no: {type: 'number'},
                            companyCd: {type: 'string'},
                            custBlackId: {type: 'number'},
                            custUuid: {type: 'string'},
                            custNm: {type: 'string'},
                            unitedCustId: {type: 'number'},
                            boundTelNo: {type: 'string'},
                            telNo: {type: 'string'},
                            hpNo: {type: 'string'},
                            boundId: {type: 'number'},
                            callId: {type: 'number'},
                            custType: {type: 'string'},
                            custTypeNm: {type: 'string'},
                            requesterId: {type: 'number'},
                            requesterNm: {type: 'string'},
                            processStatus: {type: 'string'},
                            processStatusNm: {type: 'string'},
                            processId: {type: 'number'},
                            processYn: {type: 'string'},
                            processDt: {type: 'string'},
                            processYmd: {type: 'string'},
                            delYn: {type: 'string'},
                            rgtrId: {type: 'number'},
                            regDt: {type: 'string'},
                            regYmd: {type: 'string'},
                            mdfrId: {type: 'string'},
                            mdfDt: {type: 'string'},
                            mdfYmd: {type: 'string'}
                        }
                    }
                }
            });
        },
        height(h) {
            //$('#customer-black-grid').data('kendoCpGrid').setOptions({height: h});
        }
    };
    const draggableFunction = {
        onDropTargetStyling: function (e) {
            if (isCustomerDropped) {
                this.element.css({
                    "border-color": "#5cb85c"
                });
            }
        },
        offDropTargetStyling: function (e) {
            if (isCustomerDropped) {
                this.element.css({
                    'border-color': '#ff6347'
                });
            }
        }
    };
    $(document).ready(function () {
        cpProgress('customer-tile-layout');
        customerMergeDetail.init();
        customerBlackDetail.init();
        customerMergeRadioGroup.init().then(() => {
            customerMerge.init().then(() => {
                $('#customer-merge-detail').hide();
                customerMergeGrid.init();
                cpProgress('customer-tile-layout', false);
            });

        });
        customerBlack.init().then(() => {
            //$('#customer-black-detail').hide();
            customerBlackGrid.init();
        });
    });
});
