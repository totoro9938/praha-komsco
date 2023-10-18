$(document).ready(() => {
    const codeMain = {
        init: () => {
            $("#code-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    {collapsible: false, size: '46px', resizable: false, scrollable: false },
                    {collapsible: false}
                ]
            });

            $("#code-add-button").kendoButton({
                click: (e) => {
                    let grid = $("#code-grid").data("kendoCpGrid");
                    let list = grid.dataItem($("#code-grid tbody>tr:eq(0)"));
                    let codeNm = $("#code-grid th[data-field=codeGroupNm]").attr("data-index");

                    let valid = $("#code-grid").kendoValidator().data("kendoValidator");
                    if (list) {
                        if (!list.codeGroupNm) {
                            grid.editCell(grid.tbody.find("td").eq(parseInt(codeNm) + 1));
                        } else if (valid.validate()) {
                            grid.addRow();
                            grid.editCell(grid.tbody.find("td").eq(parseInt(codeNm) + 1));
                        }
                    } else {
                        grid.addRow();
                        grid.editCell(grid.tbody.find("td").eq(parseInt(codeNm) + 1));
                    }
                }
            });

            $("#code-save-button").kendoButton({
                themeColor: "primary",
                click: (e) => {
                    let valid = $('#code-grid').kendoValidator().data("kendoValidator");
                    if (valid.validate()) $('#code-grid').data("kendoCpGrid").saveChanges();
                }
            });

            $("#code-cancel-button").kendoButton({
                click: (e) => {
                    $('#code-grid').data("kendoCpGrid").cancelChanges();
                }
            });

            if (USER_INFO.userId == 1) {
                $("input:checkbox[id='code-search-sysYn']").prop("checked", true);
            } else {
                $("input:checkbox[id='code-search-sysYn']").hide();
                $("#code-search-sysYn-label").hide();
                $("#code-btn-div").hide();
            }
            $('.code-search-check-box').on("click", (e) => {
                $('#code-grid').data("kendoCpGrid").dataSource.read();
            });
        }
    }
    const codeGrid = {
        init: async () => {
            $('#code-grid').kendoCpGrid({
                dataSource: codeGrid.codeDataSoruce(),
                height: '100%',
                sortable: true,
                editable: "incell",
                filterable: false,
                selectable: true,
                batch: true,
                detailTemplate: kendo.template($("#code-detail-template").html()),
                detailInit: codeGrid.codeGridDtailInit,
                detailExpand: (e) => {
                    let grid = e.sender;
                    let rows = grid.element.find(".k-master-row").not(e.masterRow);

                    rows.each((e) => {
                        grid.collapseRow(rows);
                    });
                },
                columns: [
                    {
                        field: "codeGroupNm",
                        title: "그룹명",
                        width: 110,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"}
                    },
                    {
                        field: "codeGroupCd",
                        title: "그룹코드",
                        width: 90,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"}
                    },
                    {
                        field: "codeNmTitle",
                        title: "그룹명타이틀",
                        width: 50,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"},
                        sortable: false
                    },
                    {
                        field: "codeKeyTitle",
                        title: "코드키타이틀",
                        width: 50,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"},
                        sortable: false
                    },
                    {
                        field: "maxAllowLvl",
                        title: "허용레벨",
                        width: 40,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:center"},
                        sortable: false
                    },
                    {
                        field: "codeValueTitle_01",
                        title: "확장1",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"},
                        sortable: false
                    },
                    {
                        field: "codeValueTitle_02",
                        title: "확장2",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"},
                        sortable: false
                    },
                    {
                        field: "codeValueTitle_03",
                        title: "확장3",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"},
                        sortable: false
                    },
                    {
                        field: "codeValueTitle_04",
                        title: "확장4",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"},
                        sortable: false
                    },
                    {
                        field: "codeValueTitle_05",
                        title: "확장5",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {style: "text-align:left"},
                        sortable: false
                    },
                    {
                        field: "sysYn",
                        title: "시스템",
                        template: '<input type="checkbox" class="k-checkbox-md code-grid-checkbox" data-filed="sysYn" #= sysYn=="Y" || sysYn == null ? checked="checked" : "" # #= USER_INFO.userId != 1 ? "disabled" : true#></input>',
                        width: 30,
                        attributes: {
                            style: "text-align:center"
                        },
                        headerAttributes: {
                            class: 'k-text-center'
                        },
                        sortable: false
                    },
                    {
                        field: "useYn",
                        title: "사용",
                        template: '<input type="checkbox" class="k-checkbox-md code-grid-checkbox" data-filed="useYn" #= useYn=="Y" || useYn == null ? checked="checked" : "" # #= USER_INFO.userId != 1 ? "disabled" : true#></input>',
                        width: 20,
                        attributes: {
                            style: "text-align:center"
                        },
                        headerAttributes: {
                            class: 'k-text-center'
                        },
                        sortable: false
                    },
                    {
                        field: "delYn",
                        title: "삭제",
                        template: '<input type="checkbox" class="k-checkbox-md code-grid-checkbox" data-filed="delYn" #= delYn=="Y" ? checked="checked" : "" # #= USER_INFO.userId != 1 ? "disabled" : true#></input>',
                        width: 20,
                        attributes: {
                            style: "text-align:center"
                        },
                        headerAttributes: {
                            class: 'k-text-center'
                        },
                        sortable: false
                    },
                ],
                saveChanges: (e) => {
                    const grid = e.sender;
                    const saveDatas = grid.dataSource.data();
                    const codeGroupNm = $("#code-grid th[data-field=codeGroupNm]").attr("data-index");
                    const codeGroupCd = $("#code-grid th[data-field=codeGroupCd]").attr("data-index");
                    saveDatas.forEach((data) => {
                        if (!data.codeGroupNm) {
                            grid.editCell(grid.tbody.find("td").eq(parseInt(codeGroupNm) + 1));
                            e.preventDefault();
                        } else if (!data.codeGroupCd) {
                            grid.editCell(grid.tbody.find("td").eq(parseInt(codeGroupCd) + 1));
                            e.preventDefault();
                        }
                    })
                },
                beforeEdit: (e) => {
                    if (USER_INFO.userId != 1) e.preventDefault();
                }
            }).on("click", ".code-grid-checkbox", (e) => {
                let filed = $(e.target).data('filed');
                let codeGplist = $("#code-grid").data("kendoCpGrid");
                let dataRow = $(e.target).closest("tr");
                let dataItem = codeGplist.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            })
        },
        codeDataSoruce: () => {
            return new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "base/v1/code/group",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    create: {
                        url: "base/v1/code/group",
                        type: "POST",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            $('#code-grid').data("kendoCpGrid").dataSource.read();
                            message.notification({msg: "저장되었습니다.", type: "success"});
                        }
                    },
                    update: {
                        url: "base/v1/code/group",
                        type: "PUT",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            $('#code-grid').data("kendoCpGrid").dataSource.read();
                            message.notification({msg: "저장되었습니다.", type: "success"});
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type == "read") {
                            let param = {
                                sysYn: $("input:checkbox[id='code-search-sysYn']").is(":checked") ? "" : "N",
                                useYn: $("input:checkbox[id='code-search-useYn']").is(":checked") ? "" : "Y",
                                delYn: $("input:checkbox[id='code-search-delYn']").is(":checked") ? "" : "N",
                                sortType: "",
                            }
                            return param;
                        } else if (type == "create") {
                            let dataArray = new Array();
                            options.models.forEach((data) => {
                                delete data.delYn;
                                dataArray.push(data);
                            })
                            return JSON.stringify(dataArray);
                        } else if (type == "update") {
                            let dataArray = new Array();
                            options.models.forEach((data) => {
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
                        id: "codeGroupCd",
                        fields: {
                            codeGroupCd: {
                                type: "string",
                                validation: {
                                    required: {message: "코드그룹 키값은 필수입니다."}
                                }
                            },
                            codeGroupNm: {
                                type: "string",
                                validation: {
                                    required: {message: "코드그룹명은 필수입니다."}
                                }
                            },
                            codeGroupIdx: {
                                type: "number",
                                defaultValue: "0"
                            },
                            codeNmTitle: {type: "string"},
                            codeKeyTitle: {type: "string"},
                            codeValueTitle_01: {type: "string"},
                            codeValueTitle_02: {type: "string"},
                            codeValueTitle_03: {type: "string"},
                            codeValueTitle_04: {type: "string"},
                            codeValueTitle_05: {type: "string"},
                            maxAllowLvl: {
                                type: "number",
                                validation: {required: true, min: 1},
                                defaultValue: "1"
                            },
                            memoryManYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            sysYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            useYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            delYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            description: {type: "string"},
                        }
                    }
                },
                batch: true,
                requestStart: (e) => {
                },
                requestEnd: (e) => {
                }
            });
        },
        codeGridDtailInit: (e) => {
            let data = e.data
            $(`#code-detail-grid-treelist-${data.codeGroupCd}`).val(data.codeGroupCd);
            $(`#code-detail-maxLevel-${data.codeGroupCd}`).val(data.maxAllowLvl);
            $(`#code-detail-splitter-${data.codeGroupCd}`).kendoSplitter({
                orientation: "vertical",
                panes: [
                    {collapsible: false, size: "46px", resizable: false, scrollable: false },
                    {collapsible: false}
                ]
            });
            $(`#code-detail-save-button-${data.codeGroupCd}`).kendoButton({
                themeColor: "primary",
                click: (e) => {
                    let valid = $(`#code-detail-grid-treelist-${data.codeGroupCd}`).kendoValidator().data("kendoValidator");
                    if (valid.validate()) $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList").saveChanges();
                }
            });

            $(`#code-detail-cancel-button-${data.codeGroupCd}`).kendoButton({
                click: (e) => {
                    $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList").cancelChanges();
                }
            });
            $(`.code-detail-search-check-box-${data.codeGroupCd}`).on("click", (e) => {
                $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList").dataSource.read();
            });
            $(`#code-detail-add-button-${data.codeGroupCd}`).kendoButton({
                click: (e) => {
                    let grid = $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList");
                    let list = grid.dataItem($(`#code-detail-grid-treelist-${data.codeGroupCd} tbody > tr:eq(0)`));
                    let codeNm = $(`#code-detail-grid-treelist-${data.codeGroupCd} th[data-field=codeNm]`).attr("data-index");
                    let valid = $(`#code-detail-grid-treelist-${data.codeGroupCd}`).kendoValidator().data("kendoValidator");
                    if (list) {
                        if (!list.codeNm) {
                            grid.editCell(grid.tbody.find("td").eq(codeNm));
                        } else if (valid.validate()) {
                            grid.addRow();
                            grid.editCell(grid.tbody.find("td").eq(codeNm));
                        }
                    } else {
                        grid.addRow();
                        grid.editCell(grid.tbody.find("td").eq(codeNm));
                    }
                }
            });
            codeGrid.codeDetailTreeListInit(e.data);
        },
        codeDetailTreeListInit: (data) => {
            $(`#code-detail-grid-treelist-${data.codeGroupCd}`).kendoTreeList({
                dataSource: codeGrid.codeDetailTreeListDataSource(data),
                height: '100%',
                sortable: false,
                editable: "incell",
                filterable: false,
                selectable: true,
                batch: true,
                columns: [
                    {
                        command: [{
                            name: "createchildrow",
                            template: `<button type="button" style="margin: 0;" data-command="createchildrow" class="k-button k-button-md k-rounded-md k-button-solid undefined k-button-solid-base"><span class="k-icon k-button-icon k-icon k-button-icon k-i-plus"></span</button>`,
                            click: (e) => {
                                let tr = $(e.target).closest("tr");
                                let grid = $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList");
                                let clickData = grid.dataItem(tr);
                                let codeNm = $(`#code-detail-grid-treelist-${data.codeGroupCd} th[data-field=codeNm]`).attr("data-index");
                                grid.addRow(tr);
                                let nextData = grid.dataItem(tr.next());
                                if (nextData.isNew()) {
                                    nextData.codeLvl = parseInt(clickData.codeLvl) + 1;
                                    grid.editCell(tr.next().find("td").eq(codeNm));
                                } else {
                                    let lastData = grid.dataItem(grid.tbody.find("tr").last());
                                    lastData.codeLvl = parseInt(clickData.codeLvl) + 1;
                                    grid.editCell(grid.tbody.find("tr").last().find("td").eq(codeNm));
                                }
                            },
                        },
                            {
                                name: "cancelchildrow",
                                template: `<button type="button"  style="margin: 0;" data-command="cancelchildrow" class="k-button k-button-md k-rounded-md k-button-solid undefined k-button-solid-base"><span class="k-icon k-button-icon k-icon k-button-icon k-i-cancel"></span</button>`,
                                click: (e) => {
                                    let tr = $(e.target).closest("tr");
                                    let uid = $(tr).data('uid');
                                    let grid = $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList");
                                    let codeDataSource = grid.dataSource;
                                    let item = codeDataSource.getByUid(uid);
                                    codeDataSource.cancelChanges(item);
                                },
                            }],
                        width: 20,
                        attributes: {class: '!k-text-center'},
                    },
                    {
                        field: "codeLvl",
                        title: "레벨",
                        width: 30,
                        expandable: true,
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: "codeIdx",
                        title: "순서",
                        width: 40,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: "codeNm",
                        title: "코드명",
                        width: 80,
                        headerAttributes: {class: 'k-text-center'}
                    },
                    {
                        field: "codeKey",
                        title: "코드키",
                        width: 80,
                        headerAttributes: {class: 'k-text-center'}
                    },
                    {
                        field: "useYn",
                        title: "사용",
                        template: `<input type="checkbox" class="k-checkbox-md code-grid-checkbox-${data.codeGroupCd}" data-filed="useYn" #= useYn=="Y" || useYn == null ? checked="checked" : "" # #= sysYn=="Y" || sysYn == null ? USER_INFO.userId != 1 ? "disabled" : true : "" #></input>`,
                        width: 20,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        sortable: false
                    },
                    {
                        field: "delYn",
                        title: "삭제",
                        template: '<input type="checkbox" class="k-checkbox-md code-grid-checkbox-${data.codeGroupCd}" data-filed="delYn" #= delYn=="Y" ? checked="checked" : "" # #= sysYn=="Y" || sysYn == null ? USER_INFO.userId != 1 ? "disabled" : true : "" #></input>',
                        width: 20,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        sortable: false
                    },
                    {
                        field: "codeValue_01",
                        title: "확장1",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'}
                    },
                    {
                        field: "codeValue_02",
                        title: "확장2",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'}
                    },
                    {
                        field: "codeValue_03",
                        title: "확장3",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'}
                    },
                    {
                        field: "codeValue_04",
                        title: "확장4",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'}
                    },
                    {
                        field: "codeValue_05",
                        title: "확장5",
                        width: 60,
                        headerAttributes: {class: 'k-text-center'}
                    },
                    {
                        field: "sysYn",
                        title: "시스템",
                        template: '<input type="checkbox" class="k-checkbox-md code-grid-checkbox-${data.codeGroupCd}" data-filed="sysYn" #= sysYn=="Y" || sysYn == null ? checked="checked" : "" # #= USER_INFO.userId != 1 ? "disabled" : true#></input>',
                        width: 30,
                        headerAttributes: {class: 'k-text-center'},
                        attributes: {class: '!k-text-center'},
                        sortable: false
                    },
                ],
                saveChanges: (e) => {
                    const grid = e.sender;
                    const saveDatas = grid.dataSource.data();
                    const codeNm = $(`#code-detail-grid-treelist-${data.codeGroupCd} th[data-field=codeNm]`).attr("data-index");
                    const codeKey = $(`#code-detail-grid-treelist-${data.codeGroupCd} th[data-field=codeKey]`).attr("data-index");
                    saveDatas.forEach((data) => {
                        if (!data.codeNm) {
                            grid.editCell(grid.tbody.find("td").eq(codeNm));
                            e.preventDefault();
                        } else if (!data.codeKey) {
                            grid.editCell(grid.tbody.find("td").eq(codeKey));
                            e.preventDefault();
                        }
                    })
                },
                dataBound: (e) => {
                    let items = e.sender.items();
                    let dataItems = e.sender.dataItems();
                    let maxLevel = $(`#code-detail-maxLevel-${data.codeGroupCd}`).val();
                    dataItems.forEach((item, i) => {
                        if (maxLevel > item.codeLvl) {
                            let dataItem = e.sender.dataItem(items[i]);
                            let row = $(items[i]);
                            if (dataItem.isNew()) {
                                row.find("[data-command='createchildrow']").hide();
                                row.find("[data-command='cancelchildrow']").show();
                            } else {
                                row.find("[data-command='cancelchildrow']").hide();
                                row.find("[data-command='createchildrow']").show();
                            }
                        } else {
                            let row = $(items[i]);
                            let dataItem = e.sender.dataItem(items[i]);
                            if (dataItem.isNew()) {
                                row.find("[data-command='createchildrow']").hide();
                                row.find("[data-command='cancelchildrow']").show();
                            } else {
                                row.find("[data-command='createchildrow']").hide();
                                row.find("[data-command='cancelchildrow']").hide();
                            }
                        }
                    });
                },
                edit: (e) => {
                    if (e.model.sysYn == "Y" || e.model.sysYn == null) {
                        if (USER_INFO.userId != 1) {
                            if ($(e.container).attr("data-container-for") != "codeNm" && $(e.container).attr("data-container-for") != "codeIdx") {
                                e.sender.closeCell(e.container);
                            }
                        }
                    }
                }
            }).on("click", `.code-grid-checkbox-${data.codeGroupCd}`, (e) => {
                let filed = $(e.target).data('filed');
                let codelist = $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList");
                let dataRow = $(e.target).closest("tr");
                let clickCheckData = codelist.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    clickCheckData[filed] = "Y";
                } else {
                    clickCheckData[filed] = "N";
                }
                clickCheckData.dirty = true;
            });
        },
        codeDetailTreeListDataSource: (data) => {
            return new kendo.data.TreeListDataSource({
                transport: {
                    read: {
                        url: "base/v1/code",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                    },
                    create: {
                        url: "base/v1/code",
                        type: "POST",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList").dataSource.read();
                            message.notification({msg: "저장되었습니다.", type: "success"});
                        }
                    },
                    update: {
                        url: "base/v1/code",
                        type: "PUT",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            $(`#code-detail-grid-treelist-${data.codeGroupCd}`).data("kendoTreeList").dataSource.read();
                            message.notification({msg: "저장되었습니다.", type: "success"});
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type == "read") {
                            let param = {
                                codeGroupCd: data.codeGroupCd,
                                parentId: 0,
                                sysYn: "",
                                useYn: $(`input:checkbox[id='code-detail-search-useYn-${data.codeGroupCd}']`).is(":checked") ? "" : "Y",
                                delYn: $(`input:checkbox[id='code-detail-search-delYn-${data.codeGroupCd}']`).is(":checked") ? "" : "N",
                                sortType: "",
                            }
                            return param;
                        } else if (type == "create") {
                            let dataArray = new Array();
                            options.models.forEach((dataItem) => {
                                dataItem.codeGroupCd = data.codeGroupCd;
                                dataArray.push(dataItem);
                            })
                            return JSON.stringify(dataArray);
                        } else if (type == "update") {
                            let dataArray = new Array();
                            options.models.forEach((dataItem) => {
                                dataItem.codeGroupCd = data.codeGroupCd;
                                dataArray.push(dataItem);
                            })
                            return JSON.stringify(dataArray);
                        }
                    },
                    error: (e) => {
                        let error = e.xhr.responseJSON || {message: '오류가 발생하였습니다.'};
                        let g = {msg: error.message, type: 'error'};
                        message.notification(g);
                    }
                },
                schema: {
                    data: "data",
                    model: {
                        id: "codeId",
                        fields: {
                            codeId: {type: "number", nullable: false, editable: false},
                            codeGroupCd: {type: "string", nullable: false, editable: false},
                            parentId: {nullable: false, type: "number"},
                            codeLvl: {
                                type: "number",
                                defaultValue: "0",
                                editable: false
                            },
                            codeIdx: {
                                type: "number",
                                defaultValue: "0"
                            },
                            codeNm: {
                                type: "string",
                                validation: {
                                    required: {message: "코드명은 필수입니다."}
                                }
                            },
                            codeKey: {
                                type: "string",
                                validation: {
                                    required: {message: "코드키 값은 필수입니다."}
                                }
                            },
                            codeValue_01: {type: "string"},
                            codeValue_02: {type: "string"},
                            codeValue_03: {type: "string"},
                            codeValue_04: {type: "string"},
                            codeValue_05: {type: "string"},
                            useYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            sysYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            delYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            description: {type: "string"},
                        },
                    }
                },
                batch: true,
                requestStart: (e) => {
                },
                requestEnd: (e) => {
                }
            });
        }

    }

    cpProgress('code-layout');
    codeMain.init();
    codeGrid.init().then(() => {
        cpProgress('code-layout', false);
    });
});
