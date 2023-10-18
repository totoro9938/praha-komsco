$(document).ready(() => {
    const surveyMain = {
        isSearchBtn: false,
        init: () => {
            $('#survey-detail-splitter').kendoSplitter({
                orientation: 'horizontal',
                panes: [
                    {collapsible: false, resizable: false},
                    {collapsible: false, size: 0, resizable: false}
                ]
            });
            $('#survey-splitter').kendoSplitter({
                orientation: 'vertical',
                panes: [
                    {collapsible: false, size: '70px', resizable: false},
                    {collapsible: false}
                ]
            });

            $('#survey-btn-search').kendoButton({
                icon: 'search',
                click: () => {
                    surveyMain.isSearchBtn = true;
                    $('#survey-grid').data('kendoCpGrid').dataSource.page(1);
                    surveyMain.searchBoxClose();
                }
            });

            $('#survey-search-box-btn-close').kendoButton({
                icon: 'close',
                click: () => {
                    surveyMain.searchBoxClose();
                }
            });

            $('#survey-btn-open-search-box').kendoButton({
                icon: 'search',
                click: () => {
                    surveyMain.searchBoxOpen();
                }
            });

            $('#survey-btn-open-insert-btn').kendoButton({
                click: () => {
                    surveyDetail.detailReset();
                    surveyDetail.openDetail();
                }
            });
            $('#survey-detail-header-btn-close').on('click', () => {
                surveyDetail.closeDetail();
            });
        },
        searchBoxOpen: () => {
            $('#survey-searching-field').show();
            $('#survey-searched-field-box').hide();
            $('#survey-searching-btn-box').show();
            $('#survey-searched-btn-box').hide();
        },
        searchBoxClose: () => {
            $('#survey-searching-field').hide();
            $('#survey-searched-field-box').show();
            $('#survey-searching-btn-box').hide();
            $('#survey-searched-btn-box').show();
        },
    };

    const surveySearchBox = {
        init: async () => {
            $("#survey-search-text").kendoTextBox({}).on("keyup", (e) => {
                if (e.which == 13) $('#survey-grid').data('kendoCpGrid').dataSource.page(1);
            });
            $("#survey-user-yn").kendoDropDownList({
                dataSource: [{codeNm: '사용', codeKey: 'Y'}, {codeNm: '미사용', codeKey: 'N'}],
                dataTextField: "codeNm",
                dataValueField: "codeKey",
                fillMode: "flat",
                optionLabel: {codeNm: '전체', codeKey: ""}
            });

            await new cpCodeDropDownTree("#survey-type-list", "QuestionType").getData().then(data => {
                let droplist = $("#survey-type-list").kendoDropDownList({
                    dataSource: data,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    value: "Satisfaction",
                    fillMode: 'flat'
                }).data("kendoDropDownList");
                droplist.readonly(true);
                let arrow = droplist._arrow;
                arrow.addClass('hidden');
            });
        }
    };

    const surveyGrid = {
        init: () => {
            $("#survey-grid").kendoCpGrid({
                columns: [
                    {field: "questionId", hidden: true},
                    {field: "questionTypeNm", title: "설문지유형", width: 100, attributes: {style: "text-align:center"}},
                    {field: "questionNm", title: "설문지명", width: 150, attributes: {style: "text-align:left"}},
                    {
                        field: "description",
                        title: "비고",
                        width: 200,
                        attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
                    },
                    {field: "rgtrNm", title: "등록자", width: 70, attributes: {style: "text-align:center"}},
                    {field: "regYmd", title: "등록일", width: 100, attributes: {style: "text-align:center"}},
                    {
                        field: "useYn",
                        title: "사용여부",
                        template: '<input type="checkbox" class="k-checkbox-md" data-filed="useYn" readonly #= useYn=="Y" || useYn == null ? checked="checked" : "" #></input>',
                        width: 70,
                        attributes: {
                            style: "text-align:center"
                        }
                    }
                ],
                dataSource: surveyGrid.surveyDataSource(),
                change: surveyGrid.gridSelectRow,
                height: 'calc(100% - 10px)',
                resizable: false,
                selectable: "single",
                pageable: {
                    refresh: true
                },
                autoBind: true
            });
        },
        surveyDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "/work/v1/survey/selectPage",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: () => {
                            if (surveyMain.isSearchBtn) {
                                surveyMain.isSearchBtn = false;
                                message.notification({type: "info"});
                            }
                        }
                    },
                    parameterMap: (options) => {
                        return {
                            questionType: "",
                            useYn: $("#survey-user-yn").data("kendoDropDownList").value(),
                            questionNm: $("#survey-search-text").data("kendoTextBox").value(),
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
                        questionId: {type: 'number'},
                        questionIdx: {type: 'number'},
                        questionUuid: {type: 'string'},
                        questionType: {type: 'string'},
                        questionTypeNm: {type: 'string'},
                        questionNm: {type: 'string'},
                        questionAskCnt: {type: 'number'},
                        description: {type: 'string'},
                        useYn: {type: 'string'},
                        rgtrId: {type: 'number'},
                        rgtrNm: {type: 'string'},
                        regDt: {type: 'number'},
                        regYmd: {type: 'string'},
                    },
                    parse: (res) => {
                        res.data.rows.forEach((row) => {
                            if (row.regDt) {
                                row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd H:mm");
                            }
                            if (row.regYmd) {
                                let ymd = row.regYmd
                                row.regYmd = ymd.substring(0, 4) + '-' + ymd.substring(4, 6) + '-' + ymd.substring(6, 8);
                            }
                        })
                        return res;
                    }
                },
                serverPaging: true,
                pageSize: 20,
                requestEnd: (e) => {
                    const type = e.type;
                    if (type === "read") {
                        surveyGrid.gridSearchFiledPrint();
                        // $('#survey-splitter').data('kendoSplitter').size('#survey-divSearch', '70px');
                    }
                }
            });
        },
        gridSelectRow: (e) => {
            const grid = $('#survey-grid').data("kendoCpGrid");
            let item = grid.dataItem(grid.select());
            surveyGrid.detailSet(item);
            surveyDetail.openDetail();
            // });
        },
        gridSearchFiledPrint: () => {
            let target = $('#survey-searched-field-box');
            let searchText = [{
                label: '설문지명 : ',
                text: $("#survey-search-text").data("kendoTextBox").value() == "" ? "전체" : $("#survey-search-text").data("kendoTextBox").value()
            }, {
                label: '설문지유형 : ',
                text: $("#survey-type-list").data("kendoDropDownList").value() == "" ? "전체" : $("#survey-type-list").data("kendoDropDownList").text()
            }, {
                label: '사용여부 : ',
                text: $("#survey-user-yn").data("kendoDropDownList").text()
            }];
            searchTextBadge(target, searchText);
            return searchText;
        },
        detailSet: (data) => {
            surveyDetail.detailReset();
            $("#survey-question-id").val(data.questionId);
            $("#survey-question-name").data("kendoTextBox").value(data.questionNm);
            $("#survey-question-type").data("kendoDropDownList").value(data.questionType);
            $("#survey-question-useYn").data("kendoRadioGroup").value(data.useYn);
            $("#survey-question-description").data("kendoTextArea").value(data.description);
            $("#survey-ask-question-grid").data("kendoCpGrid").dataSource.read();
            questionAskGrid.buttonControl(true);
        }
    }

    const questionAskGrid = {
        init: () => {
            $("#survey-ask-question-grid").kendoCpGrid({
                columns: [
                    {
                        field: "questionAskChecked",
                        headerTemplate: "<input type='checkbox' id='question-ask-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: '<input type="checkbox" name="question-ask-grid-checkbox" class="k-checkbox-md question-ask-check" data-filed="questionAskChecked"></input>',
                        attributes: {style: 'text-align:center'},
                        width: 50,
                        editable: false
                    },
                    {field: "questionId", hidden: true},
                    {field: "questionAskIdx", title: "순번", width: 80, attributes: {style: "text-align:center"}},
                    {
                        field: "questionAskContent",
                        title: "문항",
                        attributes: {style: "text-align:left; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"}
                    },
                    {
                        field: "questionAskAnswerType",
                        title: "답변유형",
                        width: 150,
                        attributes: {style: "text-align:left"},
                        template: "#=questionAskAnswerTypeNm#",
                        editor: surveyDetail.detailGridEditor
                    },
                ],
                dataSource: questionAskGrid.askQuestionDataSource(),
                height: "calc(100% - 10px)",
                change: questionAskGrid.selectRow,
                resizable: false,
                selectable: "single",
                autoBind: false,
                editable: "incell",
                dataBound: () => {
                    questionAskAnswerGrid.buttonControl(false);
                    $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataSource.data([]);
                }
            }).on("click", ".question-ask-check", (e) => {
                let filed = $(e.target).data('filed');
                let grid = $("#survey-ask-question-grid").data("kendoCpGrid");
                let dataRow = $(e.target).closest("tr");
                let dataItem = grid.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            }).on("click", "#question-ask-check-all", (e) => {
                let dataItems = $("#survey-ask-question-grid").data("kendoCpGrid").dataItems();
                if ($(e.target).is(":checked")) {
                    dataItems.forEach((data, index) => {
                        if (data["questionAskChecked"] == "N") {
                            $("input:checkbox[name=question-ask-grid-checkbox]").eq(index).prop("checked", true);
                            data["questionAskChecked"] = "Y";
                            data.dirty = true;
                        }
                    })
                } else {
                    dataItems.forEach(data => {
                        if (data["questionAskChecked"] == "Y") {
                            $("input:checkbox[name=question-ask-grid-checkbox]").prop("checked", false);
                            data["questionAskChecked"] = "N";
                            data.dirty = true;
                        }
                    })
                }
            });
            $("#survey-ask-question-addBtn").kendoButton({
                click: () => {
                    if ($("#survey-question-id").val() != 0) {
                        let grid = $('#survey-ask-question-grid').data("kendoCpGrid");
                        let list = grid.dataItem($("#survey-ask-question-grid tbody>tr:eq(0)"));
                        let valid = $("#survey-ask-question-grid").kendoValidator().data("kendoValidator");
                        let content = $("#survey-ask-question-grid th[data-field=questionAskContent]").attr("data-index");
                        let answerType = $("#survey-ask-question-grid th[data-field=questionAskAnswerType]").attr("data-index");

                        if (list) {
                            if (!list.questionAskContent) {
                                grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                            } else if (!list.questionAskAnswerType) {
                                grid.editCell(grid.tbody.find("td").eq(parseInt(answerType)));
                            } else if (valid.validate()) {
                                grid.addRow();
                                grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                            }
                        } else {
                            grid.addRow();
                            grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                        }
                    }
                }
            });
            $("#survey-ask-question-reset").kendoButton({
                click: () => {
                    $('#survey-ask-question-grid').data('kendoCpGrid').cancelChanges();
                    questionAskAnswerGrid.buttonControl(false);
                }
            });
            $("#survey-ask-question-delBtn").kendoButton({
                click: () => {
                    let gridData = $("#survey-ask-question-grid").data("kendoCpGrid").dataItems();
                    if (gridData.length > 0) {
                        let checked = gridData.filter(r => r.questionAskChecked == "Y");
                        if (checked.length > 0) {
                            new cpDataSource(METHOD.DELETE, "/work/v1/survey/question-ask-delete", checked).getDataSource().read().then(() => {
                                message.notification({msg: "삭제되었습니다.", type: "success"});
                                $("#survey-ask-question-grid").data("kendoCpGrid").dataSource.read()
                            })
                        } else
                            message.notification({msg: "삭제할 문항을 선택해 주세요", type: 'error'})
                    }
                }
            });
            $("#survey-ask-question-saveBtn").kendoButton({
                themeColor: "primary",
                click: () => {
                    if ($("#survey-question-id").val() != 0) {
                        let grid = $('#survey-ask-question-grid').data("kendoCpGrid");
                        let list = grid.dataItem($("#survey-ask-question-grid tbody>tr:eq(0)"));
                        let valid = $("#survey-ask-question-grid").kendoValidator().data("kendoValidator");
                        let content = $("#survey-ask-question-grid th[data-field=questionAskContent]").attr("data-index");
                        let answerType = $("#survey-ask-question-grid th[data-field=questionAskAnswerType]").attr("data-index");

                        if (list) {
                            if (!list.questionAskContent) {
                                grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                            } else if (!list.questionAskAnswerType) {
                                grid.editCell(grid.tbody.find("td").eq(parseInt(answerType)));
                            } else if (valid.validate()) {
                                grid.saveChanges();
                            }
                        }
                    } else message.notification({msg: "설문지를 선택해주세요.", type: "error"})
                }
            });

            $("#survey-ask-question-grid").kendoTooltip({
                filter: "td:nth-child(4)",
                position: "bottom",
                width: 300,
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
                    let dataItem = $("#survey-ask-question-grid").data("kendoCpGrid").dataItem(e.target.closest("tr"));
                    let content = dataItem.questionAskContent;
                    return content;
                }
            });
        },
        askQuestionDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: () => {
                            return `work/v1/survey/question-ask/${$("#survey-question-id").val()}`;
                        },
                        type: METHOD.GET,
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    create: {
                        url: "work/v1/survey/question-ask",
                        type: METHOD.POST,
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다.", type: "success"});
                            $("#survey-ask-question-grid").data("kendoCpGrid").dataSource.read()
                        }
                    },
                    update: {
                        url: "work/v1/survey/question-ask",
                        type: METHOD.POST,
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다.", type: "success"});
                            $("#survey-ask-question-grid").data("kendoCpGrid").dataSource.read()
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type === "create" || type === "update") {
                            let dataArray = new Array();
                            let questionId = $("#survey-question-id").val();
                            options.models.forEach((data) => {
                                data.questionId = questionId;
                                dataArray.push(data);
                            })
                            return JSON.stringify(dataArray);
                        }
                    },
                    error: (e) => {
                        let error = e.xhr.responseJSON || {message: '오류가 발생하였습니다.'};
                        let g = {msg: error.message, type: 'error'};
                        message.notification(g);
                    },
                },
                schema: {
                    data: "data",
                    model: {
                        id: "questionId",
                        fields: {
                            questionAskChecked: {type: "string", editable: false, defaultValue: "N"},
                            questionId: {type: "number", editable: false},
                            questionAskId: {type: "number", editable: false},
                            questionAskIdx: {
                                type: "number",
                                validation: {required: {message: "순번 필수입니다.", min: 0}},
                                defaultValue: "0"
                            },
                            questionAskTarget: {type: "string", defaultValue: "Cust",},
                            questionAskTargetNm: {type: "string"},
                            questionAskContent: {type: "string", validation: {required: {message: "문항은 필수입니다."}}},
                            questionAskAnswerType: {type: "string", validation: {required: {message: "답변유형은 필수입니다."}}},
                            questionAskAnswerTypeNm: {type: "string"},
                            questionAskAnswerCnt: {
                                type: "number",
                                validation: {required: {min: 1}},
                                defaultValue: 1
                            },
                            descriptionYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            useYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            rgtrId: {type: "number"},
                            regDt: {type: "string"},
                            mdfrId: {type: "number"},
                            mdfDt: {type: "string"},
                        }
                    },
                    parse: (res) => {
                        if (!!res.data) {
                            res.data.forEach((data) => {
                                data.questionAskChecked = "N";
                            })
                        }
                        return res;
                    }
                },
                batch: true,
                requestStart: (e) => {
                },
                requestEnd: (e) => {
                }
            });
        },
        selectRow: (e) => {
            let item = e.sender.dataItem(e.sender.select());
            if (item.questionId > 0 && item.questionAskId > 0 && (item.questionAskAnswerType == "MultiSelect" || item.questionAskAnswerType == "SingleSelect")) {
                $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataSource.read();
                questionAskAnswerGrid.buttonControl(true);
            } else {
                $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataSource.data([]);
                questionAskAnswerGrid.buttonControl(false);
            }
        },
        buttonControl: (readOnly) => {
            let buttons = ["#survey-ask-question-addBtn", "#survey-ask-question-reset", "#survey-ask-question-delBtn", "#survey-ask-question-saveBtn"];
            buttons.forEach(btn => {
                $(btn).data("kendoButton").enable(readOnly);
            });
        }
    };

    const questionAskAnswerGrid = {
        init: () => {
            $("#survey-ask-answer-question-grid").kendoCpGrid({
                columns: [
                    {
                        field: "questionAskAnswerChecked",
                        headerTemplate: "<input type='checkbox' id='question-ask-answer-check-all' style='vertical-align: middle' class='k-checkbox-md k-rounded-md header-checkbox'>",
                        template: '<input type="checkbox" name="question-ask-answer-grid-checkbox" class="k-checkbox-md question-ask-answer-check" data-filed="questionAskAnswerChecked" ></input>',
                        attributes: {style: 'text-align:center'},
                        width: 50,
                        editable: false
                    },
                    {field: "questionId", hidden: true},
                    {field: "questionAskId", hidden: true},
                    {field: "questionAskAnswerIdx", title: "순번", width: 80, attributes: {style: "text-align:center"}},
                    {field: "questionAskAnswerContent", title: "답변", attributes: {style: "text-align:left"}},
                    {
                        field: "questionAskAnswerScore",
                        title: "배점",
                        width: 150,
                        attributes: {style: "text-align:center"}
                    },
                ],
                dataSource: questionAskAnswerGrid.askAnswerQuestionDataSource(),
                height: "calc(100% - 10px)",
                resizable: false,
                selectable: "single",
                autoBind: false,
                editable: "incell"
            }).on("click", ".question-ask-answer-check", (e) => {
                let filed = $(e.target).data('filed');
                let grid = $("#survey-ask-answer-question-grid").data("kendoCpGrid");
                let dataRow = $(e.target).closest("tr");
                let dataItem = grid.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            }).on("click", "#question-ask-answer-check-all", (e) => {
                let dataItems = $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataItems();
                if ($(e.target).is(":checked")) {
                    dataItems.forEach((data, index) => {
                        if (data["questionAskAnswerChecked"] == "N") {
                            $("input:checkbox[name=question-ask-answer-grid-checkbox]").eq(index).prop("checked", true);
                            data["questionAskAnswerChecked"] = "Y";
                            data.dirty = true;
                        }
                    })
                } else {
                    dataItems.forEach(data => {
                        if (data["questionAskAnswerChecked"] == "Y") {
                            $("input:checkbox[name=question-ask-answer-grid-checkbox]").prop("checked", false);
                            data["questionAskAnswerChecked"] = "N";
                            data.dirty = true;
                        }
                    })
                }
            });
            ;

            $("#survey-ask-answer-question-addBtn").kendoButton({
                click: () => {
                    let parentgrGrid = $("#survey-ask-question-grid").data("kendoCpGrid");
                    let item = parentgrGrid.dataItem(parentgrGrid.select());
                    if (!!item) {
                        if (item.questionId > 0 && item.questionAskId > 0 && (item.questionAskAnswerType == "MultiSelect" || item.questionAskAnswerType == "SingleSelect")) {
                            let grid = $('#survey-ask-answer-question-grid').data("kendoCpGrid");
                            let list = grid.dataItem($("#survey-ask-answer-question-grid tbody>tr:eq(0)"));
                            let valid = $("#survey-ask-answer-question-grid").kendoValidator().data("kendoValidator");
                            let content = $("#survey-ask-answer-question-grid th[data-field=questionAskAnswerContent]").attr("data-index");
                            let score = $("#survey-ask-answer-question-grid th[data-field=questionAskAnswerScore]").attr("data-index");

                            if (list) {
                                if (!list.questionAskAnswerContent) {
                                    grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                                } else if (list.questionAskAnswerScore < 0) {
                                    grid.editCell(grid.tbody.find("td").eq(parseInt(score)));
                                } else if (valid.validate()) {
                                    grid.addRow();
                                    grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                                }
                            } else {
                                grid.addRow();
                                grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                            }
                        }
                    }
                }
            });
            $("#survey-ask-answer-question-reset").kendoButton({
                click: () => {
                    $('#survey-ask-answer-question-grid').data('kendoCpGrid').cancelChanges();
                }
            });
            $("#survey-ask-answer-question-delBtn").kendoButton({
                click: () => {
                    let gridData = $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataItems();
                    if (gridData.length > 0) {
                        let checked = gridData.filter(r => r.questionAskAnswerChecked == "Y");
                        if (checked.length > 0) {
                            new cpDataSource(METHOD.DELETE, "/work/v1/survey/question-ask-answer-delete", checked).getDataSource().read().then(() => {
                                message.notification({msg: "삭제되었습니다.", type: "success"});
                                $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataSource.read()
                            })
                        } else
                            message.notification({msg: "삭제할 문항을 선택해 주세요", type: 'error'})
                    }
                }
            });
            $("#survey-ask-answer-question-saveBtn").kendoButton({
                themeColor: "primary",
                click: () => {
                    let grid = $("#survey-ask-question-grid").data("kendoCpGrid");
                    let item = grid.dataItem(grid.select());
                    if (item.questionId > 0 && item.questionId > 0 && (item.questionAskAnswerType == "MultiSelect" || item.questionAskAnswerType == "SingleSelect")) {
                        let grid = $('#survey-ask-answer-question-grid').data("kendoCpGrid");
                        let list = grid.dataItem($("#survey-ask-answer-question-grid tbody>tr:eq(0)"));
                        let valid = $("#survey-ask-answer-question-grid").kendoValidator().data("kendoValidator");
                        let content = $("#survey-ask-answer-question-grid th[data-field=questionAskAnswerContent]").attr("data-index");
                        let score = $("#survey-ask-answer-question-grid th[data-field=questionAskAnswerScore]").attr("data-index");

                        if (list) {
                            if (!list.questionAskAnswerContent) {
                                grid.editCell(grid.tbody.find("td").eq(parseInt(content)));
                            } else if (list.questionAskAnswerScore < 0) {
                                grid.editCell(grid.tbody.find("td").eq(parseInt(score)));
                            } else if (valid.validate()) {
                                grid.saveChanges();
                            }
                        }
                    }
                }
            });
        },
        askAnswerQuestionDataSource: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: `work/v1/survey/question-ask-answer`,
                        type: METHOD.GET,
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    create: {
                        url: "work/v1/survey/question-ask-answer",
                        type: METHOD.POST,
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다.", type: "success"});
                            $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataSource.read()
                        }
                    },
                    update: {
                        url: "work/v1/survey/question-ask-answer",
                        type: METHOD.POST,
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            message.notification({msg: "저장되었습니다.", type: "success"});
                            $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataSource.read()
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type === "read") {
                            let grid = $("#survey-ask-question-grid").data("kendoCpGrid");
                            let item = grid.dataItem(grid.select());
                            return {
                                questionId: item.questionId,
                                questionAskId: item.questionAskId
                            }
                        } else if (type === "create" || type === "update") {
                            let dataArray = new Array();
                            let grid = $("#survey-ask-question-grid").data("kendoCpGrid");
                            let item = grid.dataItem(grid.select());
                            let questionId = item.questionId;
                            let questionAskId = item.questionAskId;
                            options.models.forEach((data) => {
                                data.questionId = questionId;
                                data.questionAskId = questionAskId;
                                dataArray.push(data);
                            })
                            return JSON.stringify(dataArray);
                        }
                    },
                    error: (e) => {
                        let error = e.xhr.responseJSON || {message: '오류가 발생하였습니다.'};
                        let g = {msg: error.message, type: 'error'};
                        message.notification(g);
                    },
                },
                schema: {
                    data: "data",
                    model: {
                        id: "questionId",
                        fields: {
                            questionAskAnswerChecked: {type: "string", editable: false, defaultValue: "N"},
                            questionId: {type: "number", editable: false},
                            questionAskId: {type: "number", editable: false},
                            questionAskAnswerId: {type: "number", editable: false},
                            questionAskAnswerIdx: {
                                type: "number",
                                validation: {required: {message: "순번 필수입니다.", min: 0}},
                                defaultValue: "0"
                            },
                            questionAskAnswerContent: {type: "string", validation: {required: {message: "답변은 필수입니다."}}},
                            questionAskAnswerScore: {type: "number", validation: {required: {message: "배점은 필수입니다."}}},
                            rgtrId: {type: "number"},
                            regDt: {type: "string"},
                            mdfrId: {type: "number"},
                            mdfDt: {type: "string"},
                        }
                    },
                    parse: (res) => {
                        if (!!res.data) {
                            res.data.forEach((data) => {
                                data.questionAskAnswerChecked = "N";
                            })
                        }
                        return res;
                    }
                },
                batch: true,
                requestStart: (e) => {
                },
                requestEnd: (e) => {
                }
            });
        },
        buttonControl: (readOnly) => {
            let buttons = ["#survey-ask-answer-question-addBtn", "#survey-ask-answer-question-reset", "#survey-ask-answer-question-delBtn", "#survey-ask-answer-question-saveBtn"];
            buttons.forEach(btn => {
                $(btn).data("kendoButton").enable(readOnly);
            });
        }
    }

    const surveyDetail = {
        answerTypeData: {},
        questionAskSelectData: [],
        surveyDetailTileLayOut: [
            {
                colSpan: 2,
                rowSpan: 1,
                header: {
                    template: `<div style="display: inline-block"><h3>설문지 기본정보</h3></div>`
                },
                bodyTemplate: `<div class="k-card-body consult" id="survey-questionValid">
                            <form id="survey-questionForm">
                                <div style="width: 50%;display: inline-block">
                                    <div class="c-table">
                                        <input type="hidden" id="survey-question-id" name ="questionId" value = "0">
                                        <div class="c-table-row">
                                            <div class="c-table-cell">
                                                <dt>설문지명 </dt>
                                                <dd><input id="survey-question-name" name="questionNm"></dd>
                                            </div>
                                            <div class="c-table-cell">
                                                <dt>사용여부</dt>
                                                <dd><div id="survey-question-useYn" name="useYn"></div></dd>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="c-table">
                                        <div class="c-table-row">
                                           <div class="c-table-cell">
                                                <dt>설문지유형</dt>
                                                <dd><input id="survey-question-type" name="questionType"></dd>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style="width: 49%; display: inline-block;vertical-align: top;">
                                    <div class="c-table">
                                        <div class="c-table-row" id="consult-customer-info-valid">
                                            <div class="c-table-cell">
                                                <dt>비고</dt>
                                                <dd><textarea id="survey-question-description" name="description" required style="width: 100%"></textarea></dd>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                            <div class="k-card-footer" style="width: 100%">
                                <button id="survey-question-delBtn" >삭제</button>
                                <button id="survey-question-saveBtn">저장</button>
                            </div>`
            },
            {
                colSpan: 2,
                rowSpan: 1,
                header: {
                    template: `<div style="display: inline-block"><h3>설문지 문항</h3></div>`
                },
                bodyTemplate: `
            <div id="survey-ask-question-divGrid" class="pane-content" style="height: 100%;">
                <div id="survey-ask-question-grid" class="surveyGrid""></div>
            </div>
            <div class="k-card-footer" style="width: 100%">
                <button id="survey-ask-question-reset" >초기화</button>
                <button id="survey-ask-question-addBtn" >추가</button>
                <button id="survey-ask-question-delBtn" >선택삭제</button>
                <button id="survey-ask-question-saveBtn">저장</button>
            </div>`
            },
            {
                colSpan: 2,
                rowSpan: 1,
                header: {
                    template: `<div style="display: inline-block"><h3>답변 항목</h3></div>`
                },
                bodyTemplate: `
            <div id="survey-ask-answer-question-divGrid" class="pane-content" style="height: 100%;">
                <div id="survey-ask-answer-question-grid" class="surveyGrid""></div>
            </div>
            <div class="k-card-footer" style="width: 100%">
                <button id="survey-ask-answer-question-reset" >초기화</button>
                <button id="survey-ask-answer-question-addBtn" >추가</button>
                <button id="survey-ask-answer-question-delBtn" >선택삭제</button>
                <button id="survey-ask-answer-question-saveBtn">저장</button>
            </div>`
            }
        ],
        init: () => {
            new cpCodeDropDownTree("", "QuestionAskAnswerType").getData().then(data => {
                surveyDetail.answerTypeData = data;
            });
            $("#survey-detail-tileLayout").kendoTileLayout({
                containers: surveyDetail.surveyDetailTileLayOut,
                columns: 2,
                columnsWidth: "50%",
                rowsHeight: '33%',
                height: "100%",
                reorderable: false,
                resizable: false,
                gap: {
                    columns: 10,
                    rows: 0
                },
                resize: function (e) {
                },
                reorder: function (e) {
                }

            }).data("kendoTileLayout");

            $("#survey-question-name").kendoTextBox();
            new cpCodeDropDownTree("#survey-question-type", "QuestionType").getData().then(data => {
                $("#survey-question-type").kendoDropDownList({
                    dataSource: data,
                    dataTextField: 'codeNm',
                    dataValueField: 'codeKey',
                    value: "Satisfaction",
                    fillMode: 'flat'
                });
                let droplist = $("#survey-question-type").data("kendoDropDownList");
                droplist.readonly(true);
                let arrow = droplist._arrow;
                arrow.addClass('hidden');
            });
            $("#survey-question-useYn").kendoRadioGroup({
                items: [
                    {label: "사용", value: "Y"},
                    {label: "미사용", value: "N"},
                ],
                layout: "horizontal",
                value: "Y"
            });
            $("#survey-question-description").kendoTextArea({rows: 4});
            $("#survey-question-delBtn").kendoButton({
                click: () => {
                    let questionId = $("#survey-question-id").val();
                    if (questionId != 0) {
                        cpProgress('survey-detail-tileLayout');
                        message.callBackConfirm({
                            msg: '삭제하시겠습니까?', callback: () => {
                                let questionIsn = new cpDataSource(METHOD.DELETE, `/work/v1/survey/question-delete/${questionId}`).getDataSource();
                                questionIsn.read().then(() => {
                                    $('#survey-grid').data('kendoCpGrid').dataSource.read();
                                    surveyDetail.detailReset();
                                    surveyDetail.closeDetail();
                                    message.notification({msg: "삭제되었습니다.", type: "success"});
                                    cpProgress('survey-detail-tileLayout', false);
                                });
                            }, cancel: () => {
                                cpProgress('survey-detail-tileLayout', false);
                            }
                        });

                    }
                }
            });
            $("#survey-question-saveBtn").kendoButton({
                themeColor: "primary",
                click: () => {
                    let valid = $("#survey-questionForm").kendoValidator({
                        errorTemplate: "",
                        rules: {
                            rule: (input) => {
                                if (input.is("[name=questionNm]")) return input.data("kendoTextBox").value() != "";
                                else if (input.is("[name=questionType]")) return input.data("kendoDropDownList").value() != "";
                                else if (input.is("[name=description]")) return input.data("kendoTextArea").value() != "";
                                return true;
                            }
                        }
                    }).data("kendoValidator");
                    if (valid.validate()) {
                        let param = $("#survey-questionForm").serializeJSON();
                        let questionIsn = new cpDataSource(METHOD.POST, "/work/v1/survey/question/save", param).getDataSource();
                        questionIsn.read().then(() => {
                            $("#survey-question-id").val(questionIsn.data().length);
                            questionAskGrid.buttonControl(true);
                            $('#survey-grid').data('kendoCpGrid').dataSource.read();
                            message.notification({msg: "저장되었습니다.", type: "success"});
                        });
                    }
                }
            });
        },
        openDetail: () => {
            $("#survey-detail-splitter").data("kendoSplitter").size($('#survey-detail'), '55%');
        },
        closeDetail: () => {
            $("#survey-detail-splitter").data('kendoSplitter').size($('#survey-detail'), "0%");
        },
        detailReset: () => {
            $("#survey-question-id").val(0);
            $("#survey-question-name").data("kendoTextBox").value("");
            $("#survey-question-type").data("kendoDropDownList").value("Satisfaction");
            $("#survey-question-useYn").data("kendoRadioGroup").value("Y");
            $("#survey-question-description").data("kendoTextArea").value("");
            $("#survey-ask-question-grid").data("kendoCpGrid").dataSource.data([]);
            $("#survey-ask-answer-question-grid").data("kendoCpGrid").dataSource.data([]);
            questionAskGrid.buttonControl(false);
            questionAskAnswerGrid.buttonControl(false);
        },
        detailGridEditor: (container, options) => {
            let input = $(`<input required validationMessage="답변유형은 필수입니다." name="${options.field}" />`);
            input.appendTo(container);
            input.kendoDropDownList({
                dataSource: surveyDetail.answerTypeData,
                dataTextField: 'codeNm',
                dataValueField: 'codeKey',
                value: "SingleSelect",
                fillMode: 'flat',
                change: function (e) {
                    const grid = $('#survey-ask-question-grid').data('kendoCpGrid');
                    const item = grid.dataItem(grid.select());
                    item.questionAskAnswerTypeNm = e.sender.text();
                }
            });
        },
    }
    cpProgress("survey-layout");
    surveyMain.init();
    surveySearchBox.init().then(() => {
        surveyGrid.init();
        surveyDetail.init()
        questionAskGrid.init();
        questionAskAnswerGrid.init();
        surveyGrid.gridSearchFiledPrint();
        cpProgress("survey-layout", false);
    });
});