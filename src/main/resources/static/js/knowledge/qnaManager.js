$(document).ready(() => {
    const qnaElem = 'qna';
    const qnaAuth = 'WORK_QNA_MGR';
    const qnaDeptAuth = userAuthRange(qnaAuth);

    const localStorageQnaColumnsNm = 'localStorageQnaGridColumns';
    const localStorageQnaColumns = !!window.localStorage.getItem(localStorageQnaColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageQnaColumnsNm)) : null;

    const qnaMain = {
        gridColumns: [
            {field: 'title', title: '매뉴얼제목', attributes: {style: `text-overflow: ellipsis; overflow: hidden; white-space: nowrap;`}, width: 180},
            {field: 'callCatNm', title: '상담분류', attributes: {style: `text-overflow: ellipsis; overflow: hidden; white-space: nowrap;`}, width: 180},
            {field: 'regDt', title: '등록일', attributes: {class: '!k-text-center'}, width: 80},
            {field: 'mdfDt', title: '수정일', attributes: {class: '!k-text-center'}, width: 80},
            {field: 'useYn', title: '사용여부', attributes: {class: '!k-text-center'}, width: 40, template: "#= useYn #"},
            {field: 'manualQnaCnt', title: '건수', attributes: {class: '!k-text-center'}, width: 40},
        ],
        gridWidth: 0,
        grid: `#${qnaElem}-grid`,
        searchExpansion: `#${qnaElem}-expansion-panel`,
        gridSplitter: `#${qnaElem}-left-splitter`,
        useYnDataSource: [],

        isSearchBtn: true,
        isNotification: true,

        searchDefaultValues: [],

        init: () => {
            $('#qna-splitter').kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapse: false, size: '65%', resizable: false, scrollable:false},
                    {collapse: false, size: '35%', resizable: false, scrollable:false}
                ]
            });

            gridCommonUtils.init(qnaMain.searchExpansion, qnaMain.gridSplitter, qnaMain.grid, localStorageQnaColumnsNm);
            gridCommonUtils.gridExpansionPanel(qnaMain.searchExpansion, qnaMain.gridSplitter, qnaMain.grid);

            $(qnaMain.gridSplitter).kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapse: false, size: '100%', resizable: false},
                    {collapse: false, size: '0%', resizable: false}
                ]
            });

            qnaMain.gridWidth = gridCommonUtils.gridWidthSet(qnaMain.gridWidth, !!localStorageQnaColumns ? localStorageQnaColumns : qnaMain.gridColumns, qnaMain.gridSplitter);

            $(qnaMain.grid).kendoCpGrid({
                columns: !!localStorageQnaColumns ? localStorageQnaColumns : qnaMain.gridColumns,
                autoBind: true,
                pageable: {
                    refresh: true
                },
                resizable: true,
                reorderable: true,
                scrollable: true,
                selectable: true,
                height: '100%',
                width: qnaMain.gridWidth,

                dataBound: () => {
                    if ($(qnaMain.searchExpansion).closest('.k-expander-content-wrapper').css('display') === 'block') {
                        $(qnaMain.searchExpansion).data('kendoExpansionPanel').toggle();
                        gridCommonUtils.gridResize(qnaMain.gridSplitter, qnaMain.grid);
                    }
                },

                columnResize: () => {
                    const gridOptions = $(qnaMain.grid).data('kendoCpGrid').getOptions();
                    window.localStorage.setItem(localStorageQnaColumnsNm, JSON.stringify(gridOptions.columns));
                },

                columnReorder: () => {
                    setTimeout(function() {
                        const gridOptions = $(qnaMain.grid).data('kendoCpGrid').getOptions();
                        window.localStorage.setItem(localStorageQnaColumns, JSON.stringify(gridOptions.columns));
                    }, 5);
                },

                change: (e) => {
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];

                    $("#qna-update-close").trigger("click");
                    $("#qna-parent-id").val(selectRows.manualId);
                    $("#qna-bottom-list-view").data("kendoListView").setDataSource(qnaDetail.qnaSelectDataSource());
                    $(".k-loading-mask").hide();

                    if (selectRows.manualQnaCnt === 0) {
                        $("#qna-detail-second").show();
                        $("#qna-second-top").show();
                    } else {
                        $("#qna-second-top").hide();
                    }
                }
            });
        }
    }

    const qnaGridSetting = {
        init: async () => {
            let callCat = new cpCatDropDownTree(`#${qnaElem}-call-cat`, {
                value: '0',
                placeholder: '전체',
                clearButton: false,
                fillMode: 'solid',
                autoWidth: true
            });
            callCat.create();
            let data = await callCat.getData();
            let allObject = {
                catId: '0',
                catNm: '전체',
                fullCatNm: '전체',
                items: [],
            }
            let dataSource = new kendo.data.HierarchicalDataSource({data: [allObject, ...data.options.data]});
            $(`#${qnaElem}-call-cat`).data('kendoDropDownTree').setDataSource(dataSource);

            $(`#${qnaElem}-search-type`).kendoDropDownList({
                fillMode: 'solid',
                dataSource: {
                    data: [
                        {codeNm: '제목', codeKey: 'Title'},
                        {codeNm: '내용', codeKey: 'Contents'},
                    ]
                },
                dataTextField: 'codeNm',
                dataValueField: 'codeKey'
            });

            $(`#${qnaElem}-search-text`).kendoTextBox({
                size: 'small',
            }).bind('keyup', function (e) {
                if (e.keyCode === 13) {
                    $(`#${qnaElem}-search-button`).trigger('click');
                }
            });

            const qnaDeptAutoCompleteEvent = (e) => {
                let row = dropTreeRow(e);
                const call = userDropDown.getDeptData(row.deptId);
                call.read().then(()=>{
                    userDropDownCreate.setDataSource(call.data());
                });
            }
            const pageAuth = qnaDeptAuth === AUTH_RANG.NOTHING;
            const pageAuthAll = qnaDeptAuth === AUTH_RANG.ALL;
            const pageAuthSub = qnaDeptAuth !== AUTH_RANG.SUB;
            let setDeptId = !pageAuth && USER_INFO.topDeptId === 1 ? 1 : USER_INFO.deptId;
            if (pageAuth) setDeptId = USER_INFO.deptId;
            let setUserId = pageAuthAll ? 0 : USER_INFO.userId;

            let userDropDown, userDropDownCreate;

            userDropDown = new cpUserDropDown(`#${qnaElem}-agent`, setDeptId, undefined, {
                value: setUserId,
                fillMode: 'solid',
                autoWidth: true,
                size: 'small'
            }, pageAuth, '');
            userDropDownCreate = userDropDown.create();
            await userDropDown.drawingList().then(() => {
                userDropDown.setEnable(pageAuth);
            });
            new cpDeptDropDownTree(`#${qnaElem}-department`, {
                change: qnaDeptAutoCompleteEvent,
                fillMode: 'solid',
                autoWidth: true,
                filter: 'none'
            }, qnaAuth, setDeptId, IS.FALSE, IS.TRUE).init();

            qnaMain.useYnDataSource = new cpDataSource(METHOD.GET, '/common/v1/code/useYn', {}).getDataSource();
            await qnaMain.useYnDataSource.read().then(() => {
                $(`#${qnaElem}-use-type`).kendoButtonGroup({
                    items: buttonGroupUtils.buttonGroupMakeItems(qnaMain.useYnDataSource.data(), true),
                    index: 0,
                    size: 'small'
                });
            });

            $(`#${qnaElem}-search-button`).kendoButton({
                themeColor: 'secondary',
                icon: 'search',
                click: () => {
                    qnaMain.isSearchBtn = true;
                    qnaMain.isNotification = true;
                    qnaGridSetting.gridSearch();
                }
            });

            $(`#${qnaElem}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: `none`,
                click: () => {
                    $(`#${qnaElem}-call-cat`).data('kendoDropDownTree').value(0);
                    $(`#${qnaElem}-department`).data('kendoDropDownTree').value(1);
                    $(`#${qnaElem}-agent`).data('kendoDropDownList').value(0);
                    $(`#${qnaElem}-search-type`).data('kendoDropDownList').value('Title');
                    $(`#${qnaElem}-search-text`).data('kendoTextBox').value('');
                    $(`#${qnaElem}-use-type`).data('kendoButtonGroup').select(0);
                    qnaMain.isSearchBtn = true;
                    qnaMain.isNotification = true;
                    $(`#${qnaElem}-grid`).data("kendoCpGrid").dataSource.read();
                }
            });
        },

        gridDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: '/knowledge/v1/qna-manual/select/page',
                        type: 'GET',
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        complete: () => {
                            if (qnaMain.isSearchBtn) {
                                qnaMain.isSearchBtn = false;
                                if (qnaMain.isNotification) {
                                message.notification({type: 'info'});
                                }
                            }
                        }
                    },
                    parameterMap: (options) => {
                        const param = {
                            manualType: 'M',
                            callCatId: $(`#${qnaElem}-call-cat`).data('kendoDropDownTree').value(),
                            parentId: 0,
                            deptId: 0,
                            chargeId: 0,
                            useYn: buttonGroupUtils.buttonGroupGetSelectedValue(`#${qnaElem}-use-type`) == 'all' ? '' : buttonGroupUtils.buttonGroupGetSelectedValue(`#${qnaElem}-use-type`),
                            searchType: $(`#${qnaElem}-search-type`).data('kendoDropDownList').value(),
                            searchTxt: $(`#${qnaElem}-search-text`).data('kendoTextBox').value(),
                            sortType: '',
                            outputYn: 'Y',
                            page: options.page,
                            totalPage: options.pageSize
                        };
                        if (qnaAuth === AUTH_RANG.NOTHING) {
                            param.deptId = USER_INFO.deptId;
                            param.chargeId = USER_INFO.userId;
                        } else if (qnaAuth === AUTH_RANG.AGENT) {
                            param.deptId = USER_INFO.deptId;
                            param.chargeId = $(`#${qnaElem}-agent`).data('kendoDropDownList').value();
                        } else {
                            param.parentId = $(`#${qnaElem}-department`).data('kendoDropDownTree').value();
                            param.chargeId = $(`#${qnaElem}-agent`).data('kendoDropDownList').value()
                        }
                        return param;
                    }
                },
                schema: {
                    data: 'data.rows',
                    total: 'data.totalCount',
                    model: {
                        title: {type: 'string'},
                        callCatNm: {type: 'string'},
                        regDt: {type: 'date'},
                        mdfDt: {type: 'date'},
                        useYn: {type: 'string'},
                        manualQnaCnt: {type: 'number'},
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            row.regDt = kendo.toString(new Date(row.regDt), 'yyyy-MM-dd HH:mm');
                            row.mdfDt = kendo.toString(new Date(row.mdfDt), 'yyyy-MM-dd HH:mm');
                            if (row.useYn === 'Y') {
                                row.useYn = '<input type="checkbox" class="k-checkbox-md" checked disabled />';
                            } else {
                                row.useYn = '<input type="checkbox" class="k-checkbox-md" disabled />';
                            }
                        });
                        return res;
                    },
                },
                pageSize: DEFAULT_PAGE_SIZE,
                serverPaging: true,
            });
        },

        gridSearch: () => {
            qnaMain.isSearchBtn = true;

            let callCat = $(`#${qnaElem}-call-cat`).data('kendoDropDownTree');
            let chargeId = $(`#${qnaElem}-agent`).data('kendoDropDownList');
            let searchType = $(`#${qnaElem}-search-type`).data('kendoDropDownList');
            let searchTxt = $(`#${qnaElem}-search-text`).data('kendoTextBox');

            let searchData = [
                {label: '상담분류', text: callCat.text(), value: callCat.value() ? callCat.value : '전체'},
                {label: '담당자', text: chargeId.text(), value: chargeId.value() ? chargeId.value : '전체'},
                {
                    label: '사용여부',
                    text: buttonGroupUtils.buttonGroupGetSelectedText(`#${qnaElem}-use-type`),
                    value: buttonGroupUtils.buttonGroupGetSelectedValue(`#${qnaElem}-use-type`)
                },
                {label: searchType.text(), text: searchTxt.value(), value: searchTxt.value()}
            ]

            gridCommonUtils.gridSearchPrint(qnaMain.searchExpansion, searchData);

            $(qnaMain.grid).data('kendoCpGrid').setDataSource(qnaGridSetting.gridDataSource());
        }
    };

    const qnaDetail = {
        init: () => {
            $('#qna-detail-first').hide();

            $('#qna-question-text').kendoTextArea({
                rows: 13,
                resizable: 'none',
            });

            $('#qna-answer-text').kendoTextArea({
                rows: 13,
                resizable: 'none',
            });

            $('#qna-order-number').kendoNumericTextBox({
                format: '0',
                min: 0,
                step: 1,
            });

            $('#qna-set-btn').kendoButton({
                themeColor: 'primary',
                click: () => {
                    const valid = $('#qna-detail-first-valid').data('kendoValidator');
                    if (valid.validate()) {
                        const param = {
                            manualType: 'S',
                            parentId: Number($('#qna-parent-id').val()),
                            manualIdx: !!$('#qna-order-number').data('kendoNumericTextBox').value() ? $('#qna-order-number').data('kendoNumericTextBox').value() : 0,
                            title: $('#qna-question-text').data('kendoTextArea').value(),
                            contents: $('#qna-answer-text').data('kendoTextArea').value(),
                            html: $('#qna-answer-text').data('kendoTextArea').value(),
                        }

                        const qnaInsertDataSource = new cpDataSource(METHOD.POST, '/knowledge/v1/qna-manual/insert', param).getDataSource();
                        qnaInsertDataSource.read().then(() => {
                            //등록 수정 splitter close
                            $('#qna-update-close').trigger('click');

                            //건수가 1건 이상이 되므로
                            $('#qna-second-top').hide()

                            $('#qna-bottom-list-view').data('kendoListView').dataSource.read();
                            qnaMain.isNotification = false;
                            $(`#${qnaElem}-grid`).data("kendoCpGrid").dataSource.read();
                            message.notification({msg: 'Q&A가 저장되었습니다.', type: 'success'});
                        });
                    }
                }
            });

            $('#qna-detail-update').kendoButton({
                themeColor: 'primary',
                click: () => {
                    const valid = $('#qna-detail-first-valid').data('kendoValidator');
                    if (valid.validate()) {
                        const param = {
                            parentId: Number($('#qna-parent-id').val()),
                            manualId: Number($('#qna-manual-id').val()),
                            manualIdx: !!$('#qna-order-number').data('kendoNumericTextBox').value() ? $('#qna-order-number').data('kendoNumericTextBox').value() : 0,
                            title: $('#qna-question-text').data('kendoTextArea').value(),
                            contents: $('#qna-answer-text').data('kendoTextArea').value(),
                            html: $('#qna-answer-text').data('kendoTextArea').value(),
                        }
                        const qnaUpdateDataSource = new cpDataSource(METHOD.PUT, '/knowledge/v1/qna-manual/update', param).getDataSource();
                        qnaUpdateDataSource.read().then(() => {
                            //등록 수정 splitter close
                            $('#qna-update-close').trigger('click');
                            $('#qna-bottom-list-view').data('kendoListView').dataSource.read();
                            qnaMain.isNotification = false;
                            $(`#${qnaElem}-grid`).data("kendoCpGrid").dataSource.read();
                            message.notification({msg: 'Q&A가 수정되었습니다.', type: 'success'});
                        });
                    }
                }
            });

            $('#qna-update-close').kendoButton({
                click: () => {
                    $('#qna-set-btn').hide(); //저장버튼
                    $('#qna-detail-update').hide(); //수정버튼
                    $('#qna-detail-first').hide();
                    $('#qna-question-text').data('kendoTextArea').value('');
                    $('#qna-answer-text').data('kendoTextArea').value('');
                    $('#qna-order-number').data('kendoNumericTextBox').value('');
                    $('#qna-detail-first-valid').data('kendoValidator').reset();
                    $('#qna-detail-second').show();
                }
            });

            $('#qna-insert-btn').kendoButton({
                themeColor: 'primary',
                click: () => {
                    if (!!$('#qna-parent-id').val()) {
                        //메뉴얼을 단 한번이라도 선택했을 경우에만
                        $('#qna-question-text').data('kendoTextArea').value('');
                        $('#qna-answer-text').data('kendoTextArea').value('');
                        $('#qna-order-number').data('kendoNumericTextBox').value('');
                        $('#qna-detail-first-title').html('<h4>Q&A등록</h4>');
                        $('#qna-detail-first').show();
                        $('#qna-set-btn').show();
                        $('#qna-detail-update').hide();
                        $('#qna-detail-first-valid').data('kendoValidator').reset();
                        $('#qna-detail-second').hide();
                    } else {
                        message.notification({msg: '메뉴얼은 선택해야 합니다.', type: 'error'})
                    }
                }
            });

            $('#qna-bottom-list-view').kendoListView({
                height: '90%',
                dataSource: [],
                layout: 'flex',
                flex: {
                    direction: 'column'
                },
                template: kendo.template($('#qna-listview').html()),
                dataBound: (e) => {
                    $('.qna-listview-register').kendoTextBox({fillMode: 'flat', readonly: true});
                    $('.qna-listview-update').kendoTextBox({fillMode: 'flat', readonly: true});
                    $('.qna-listview-question').kendoTextArea({fillMode: 'flat', readonly: true, rows: 5, resizable: 'none'});
                    $('.qna-listview-answer').kendoTextArea({fillMode: 'flat', readonly: true, rows: 5, resizable: 'none'});

                    e.sender.dataItems().map((data) => {
                        $(`#qna-listview-update-btn-${data.manualId}`).on('click',() => {
                            $('#qna-manual-id').val(data.manualId);
                            $('#qna-question-text').data('kendoTextArea').value(data.title);
                            $('#qna-answer-text').data('kendoTextArea').value(data.contents);
                            $('#qna-order-number').data('kendoNumericTextBox').value(data.manualIdx);
                            $('#qna-detail-first-title').html('<h4>Q&A수정</h4>');

                            $('#qna-detail-first').show();
                            $('#qna-set-btn').hide();
                            $('#qna-detail-update').show();
                            $('#qna-detail-first-valid').data('kendoValidator').reset();
                            $('#qna-detail-second').hide();
                        })
                        $(`#qna-listview-delete-btn-${data.manualId}`).on('click',() => {
                            $('#qna-manual-id').val(data.manualId);
                            message.callBackConfirm({msg: '삭제 하시겠습니까?', callback: qnaDetail.qnaDelete});
                        })
                    });
                }
            });

            $('#qna-detail-first-valid').kendoValidator({
                rules: {
                    required: (input) => {
                        if (input.is('[name=questionText]')) {
                            return input.data('kendoTextArea').value() !== '';
                        }
                        if (input.is('[name=answerText]')) {
                            return input.data('kendoTextArea').value() !== '';
                        }
                        return true
                    },
                },
                messages: {
                    required: () => {
                        return ''
                    },
                }
            }).data('kendoValidator');
        },

        qnaDelete: () => {
            const param = {
                parentId: Number($('#qna-parent-id').val()),
                manualId: Number($('#qna-manual-id').val()),
            }
            const qnaDeleteDataSource = new cpDataSource(METHOD.PUT, '/knowledge/v1/qna-manual/delete', param).getDataSource();
            qnaDeleteDataSource.read().then(() => {
                //등록 수정 splitter close
                $('#qna-update-close').trigger('click');

                $('#qna-bottom-list-view').data('kendoListView').dataSource.read().then(() => {
                    if ($('#qna-bottom-list-view').data('kendoListView').dataSource.data().length === 0) {
                        //삭제한 이후 건수가 0인 경우
                        $('#qna-second-top').show();
                    }
                });
                qnaMain.isNotification = false;
                $(`#${qnaElem}-grid`).data("kendoCpGrid").dataSource.read();
                message.notification({msg: 'Q&A가 삭제되었습니다.', type: 'success'});
            })
        },

        qnaSelectDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: '/knowledge/v1/qna-manual/select/qna',
                        type: 'GET',
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                    },
                    parameterMap: () => {
                        const param = {
                            manualId: $("#qna-parent-id").val(),
                            outputYn: 'Y',
                        };
                        return param;
                    }
                },
                schema: {
                    data: 'data',
                    model: {
                        title: {type: 'string'},
                        contents: {type: 'string'},
                        regDt: {type: 'date'},
                        rgtrNm: {type: 'string'},
                        mdfDt: {type: 'date'},
                        mdfrNm: {type: 'string'},
                    },
                    parse: (res) => {
                        res.data.forEach((data) => {
                            data.regDt = kendo.toString(new Date(data.regDt), "yyyy-MM-dd");
                            data.mdfDt = kendo.toString(new Date(data.mdfDt), "yyyy-MM-dd");
                        })
                        return res;
                    }
                },
            })
        }
    };

    cpProgress(`${qnaElem}-layout`);
    qnaMain.init();
    qnaGridSetting.init().then(() => {
      qnaGridSetting.gridSearch();
      qnaDetail.init();
      cpProgress(`${qnaElem}-layout`, false);
    });
});