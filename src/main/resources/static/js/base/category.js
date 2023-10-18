$(document).ready(() => {
    const catServiceBaseUrl = "base/v1";
    const catSaveSuccessMassage = {msg: '저장 되었습니다.', type: 'success'};
    const catMoveSuccessMassage = {msg: '이동 되었습니다.', type: 'success'};

    const catMgr = {
        init: async () => {
            catDropDownTree.catDropDownTreeInit("cat-dropdown-tree");
            catDropDownTree.catDropDownTreeRefresh();
            catGrid.makeCatGrid();
            catPageControl.init();
        },
    };

    const catGrid = {
        catGridParam: () => {
            let getItems = catDropDownTree.getCodeGroupCd("cat-dropdown-tree");
            let param = {
                treeYn: "N",
                catGroupCd: getItems.catGroupCd,
                parentId: getItems.parentId,
                useYn: $("input:checkbox[id='cat-search-useYn']").is(":checked") ? "" : "Y",
                delYn: $("input:checkbox[id='cat-search-delYn']").is(":checked") ? "" : "N",
                outputYn: "Y",
                sortType: "",
            };
            return param;
        },
        makeCatGrid: () => {
            let dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: catServiceBaseUrl + "/cat",
                        type: "GET",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8'
                    },
                    create: {
                        url: catServiceBaseUrl + "/cat",
                        type: "POST",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            catDropDownTree.catDropDownTreeRefresh();
                            $('#cat-grid').data("kendoCpGrid").dataSource.read();
                            message.notification(catSaveSuccessMassage);
                        }
                    },
                    update: {
                        url: catServiceBaseUrl + "/cat",
                        type: "PUT",
                        dataType: "json",
                        contentType: 'application/json; charset=utf-8',
                        complete: (e) => {
                            catDropDownTree.catDropDownTreeRefresh();
                            $('#cat-grid').data("kendoCpGrid").dataSource.read();
                            message.notification(catSaveSuccessMassage);
                        }
                    },
                    parameterMap: (options, type) => {
                        if (type == "read") {
                            return catGrid.catGridParam();
                        } else if (type == "create") {
                            let dataArray = new Array();
                            let getItems = catDropDownTree.getCodeGroupCd("cat-dropdown-tree");
                            $.each(options.models, (i, data) => {
                                data.parentId = getItems.parentId;
                                if (getItems.parentId == 0) {
                                    data.catGroupCd = getItems.catGroupCd;
                                } else {
                                    data.catGroupCd = "";
                                }
                                dataArray.push(data);
                            })
                            return JSON.stringify(dataArray);
                        } else if (type == "update") {
                            let dataArray = new Array();
                            $.each(options.models, (i, data) => {
                                data.catGroupCd = "";
                                data.reIdxYn = "Y";
                                dataArray.push(data);
                            });
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
                        id: "catId",
                        fields: {
                            catId: {type: "number", nullable: false, editable: false},
                            catUuid: {type: "string", editable: false},
                            catGroupCd: {type: "string"},
                            fullCatNm: {type: "string"},
                            parentId: {type: "number", defaultValue: "0", editable: false},
                            catLvl: {type: "number", editable: false},
                            catIdx: {type: "string", validation: {min: 0}, defaultValue: "0"},
                            catPath: {type: "string", editable: false},
                            sortPath: {type: "string", editable: false},
                            valuePath: {type: "string", editable: false},
                            catValue: {type: "string"},
                            catValue_01: {type: "string"},
                            catValue_02: {type: "string"},
                            catValue_03: {type: "string"},
                            catValue_04: {type: "string"},
                            catValue_05: {type: "string"},
                            catNm: {
                                type: "string",
                                editable: true,
                                validation: {
                                    required: {
                                        message: "카테고리명은 필수 입니다."
                                    }
                                }
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
                            inheritUseYn: {
                                type: "string",
                                defaultValue: "Y",
                                editable: false
                            },
                            delYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            inheritDelYn: {
                                type: "string",
                                defaultValue: "N",
                                editable: false
                            },
                            description: {type: "string"},
                            mdfDt: {editable: false, nullable: true},
                            regDt: {editable: false, nullable: true},
                            mdfrId: {editable: false, nullable: true},
                            rgtrId: {editable: false, nullable: true},
                            no: {editable: false, nullable: true},
                        }
                    },
                    parse: function (response) {
                        let getItems = catDropDownTree.getCodeGroupCd("cat-dropdown-tree");
                        if (getItems.catGroupCd == "") response.data = null;
                        return response;
                    }
                },
                batch: true,
                requestStart: (e) => {
                },
                requestEnd: (e) => {
                },

            });

            $('#cat-grid').kendoCpGrid({
                dataSource: dataSource,
                height: '100%',
                editable: "incell",
                filterable: false,
                selectable: true,
                sort: {field: "no", dir: "asc"},
                batch: true,
                columns: [
                    {field: "catId", hidden: true},
                    {field: "catLvl", hidden: true},
                    {field: "catIdx", title: "순서", width: 20, attributes: {class: '!k-text-center'}},
                    {field: "catNm", title: "카테고리명", width: 80},
                    {field: "catValue", title: "KEY", width: 80},
                    {field: "catValue_01", title: "확장1", width: 40},
                    {field: "catValue_02", title: "확장2", width: 40},
                    {field: "catValue_03", title: "확장3", width: 40},
                    {field: "catValue_04", title: "확장4", width: 40},
                    {field: "catValue_05", title: "확장5", width: 40},
                    {
                        field: "useYn",
                        title: "사용",
                        template: '<input type="checkbox" class="k-checkbox-md catGridCheckBox" data-filed="useYn" #= useYn=="Y" || useYn == null ? checked="checked" : "" #></input>',
                        width: 20,
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        field: "delYn",
                        title: "삭제",
                        template: '<input type="checkbox" class="k-checkbox-md catGridCheckBox" data-filed="delYn" #= delYn=="Y" ? checked="checked" : "" #></input>',
                        width: 20,
                        attributes: {class: '!k-text-center'}
                    },
                    {
                        command: [{
                            name: "cat-move",
                            template: "<span style='cursor: pointer' class='k-icon k-i-redo k-icon k-grid-cat-move'></span>",
                            click: function (e) {
                                let tr = $(e.target).closest("tr");
                                let data = this.dataItem(tr);
                                let authStrings = 'ROLE_BASE_CAT_MGR_EXTEND_01';
                                let auths = USER_AUTHORITY.filter(auth => auth.authority.includes(authStrings));
                                if (data.catId != null && data.catGroupCd != "" && auths.length > 0) {
                                    catMoveMgr.open(data.catId, data.catPath, data.catNm, data.catLvl);
                                } else {
                                    e.preventDefault(false);
                                }
                            },
                            visible: function (dataItem) {
                                let authStrings = 'ROLE_BASE_CAT_MGR_EXTEND_01';
                                let auths = USER_AUTHORITY.filter(auth => auth.authority.includes(authStrings));
                                return auths.length > 0;
                            }
                        }],
                        width: 20,
                        attributes: {class: '!k-text-center'},
                        title: "이동"
                    }
                ],
            }).on("click", ".catGridCheckBox", (e) => {
                let filed = $(e.target).data('filed');
                catGplist = $("#cat-grid").data("kendoCpGrid");
                dataRow = $(e.target).closest("tr");
                dataItem = catGplist.dataItem(dataRow);
                if ($(e.target).is(":checked")) {
                    dataItem[filed] = "Y";
                } else {
                    dataItem[filed] = "N";
                }
                dataItem.dirty = true;
            })
        }
    }
    /**
     * DropDownTree 관련 js
     *
     */
    const catDropDownTree = {
        catDropDownTreeInit: (id) => {
            if ($("#" + id).data("kendoDropDownTree") === undefined) {
                let data;
                if (id == "cat-dropdown-tree") {
                    data = {
                        filter: "startswith",
                        placeholder: "선택하세요.",
                        fillMode: "solid",
                        messages: {
                            noData: "검색된 내용이 없습니다."
                        },
                        dataTextField: "fullCatNm",
                        dataValueField: "no",
                        height: 300,
                        autoWidth: true,
                        clearButton: true,
                    }
                    data.change = () => {
                        $('#cat-grid').data("kendoCpGrid").dataSource.read();
                    }
                } else {
                    data = {
                        filter: "startswith",
                        placeholder: "선택하세요.",
                        fillMode: "solid",
                        messages: {
                            noData: "검색된 내용이 없습니다."
                        },
                        dataTextField: "nm",
                        dataValueField: "catId",
                        height: 300,
                        autoWidth: true,
                        clearButton: true,
                    }
                }
                $("#" + id).kendoDropDownTree(data);
            }
        },
        catDropDownTreeRefresh: (catId, catPath, catNm, catLvl) => {
            if (catId === undefined) {
                let treeSelParam = {
                    catGroupCd: "",
                    parentId: 0,
                    useYn: "Y",
                    delYn: "N",
                    outputYn: "Y",
                    sortType: "",
                }
                let catDropDownData = new cpDataSource(METHOD.GET, catServiceBaseUrl + "/cat/treeSelect", treeSelParam).getDataSource();
                catDropDownData.read().then(() => {
                    let data = catDropDownTree.categoryTreeFormat(catDropDownData.data());
                    let treeData = new kendo.data.HierarchicalDataSource({
                        data: [...data]
                    });
                    $("#cat-dropdown-tree").data("kendoDropDownTree").setDataSource(treeData);
                });
            } else {
                let treeItem = catDropDownTree.getCodeGroupCd("cat-dropdown-tree");
                let catMoveDropDownData = new cpDataSource(METHOD.GET, catServiceBaseUrl + "/cat/moveTreeSelect/" + treeItem.catGroupCd).getDataSource();
                catMoveDropDownData.read().then(() => {
                    let data = catDropDownTree.categoryMoveTreeFormat(catMoveDropDownData.data(), catId, catPath, catNm, catLvl).items;
                    data.unshift({nm: "전체", catId: 0});
                    let treeData = new kendo.data.HierarchicalDataSource({
                        data: [...data]
                    });
                    $("#cat-move-drop-down-tree").data("kendoDropDownTree").setDataSource(treeData);
                    $("#cat-move-drop-down-tree").data("kendoDropDownTree").search("");
                });
            }
        },
        categoryTreeFormat: (data) => {
            let tree = [];
            data.forEach((element, i) => {
                element.items = [];
                if (element.catId === "Cat") {
                    element.fullCatNm = element.fullCodeNm;
                    tree.push(element);
                }
            })
            let returnData = data.filter((element) => element.catId !== "Cat")
            returnData.forEach((element) => {
                let parentTree;
                tree.forEach((subTree) => {
                    if (subTree.catGroupCd === element.catGroupCd) {
                        parentTree = subTree;
                    }
                });
                if (parentTree !== undefined) {
                    catDropDownTree.makeCatTree(element, parentTree);
                }
            })
            return tree;
        },
        categoryMoveTreeFormat: (data, catId, catPath, catNm, catLvl) => {
            let tree = {items: []};
            let returnData = data.filter((e) => e.catPath.split(".")[catLvl - 1] !== catPath.split(".")[catLvl - 1])
            returnData.forEach((element) => {
                element.items = [];
                catDropDownTree.makeCatTree(element, tree);
            })
            return tree;
        },
        makeCatTree: (inputData, tree, count = 0) => {
            const splitPath = inputData.catPath.split('.');
            if (!tree.items.find((element) => element.catPath.split('.')[count] === splitPath[count])) {
                tree.items.push(inputData);
                return;
            } else {
                const nextTree = tree.items.find((element) => element.catPath.split('.')[count] === splitPath[count])
                count += 1;
                return catDropDownTree.makeCatTree(inputData, nextTree, count);
            }
        },
        getCodeGroupCd: (selectorId) => {
            let treeView = $("#" + selectorId).data("kendoDropDownTree");
            let allTreeData = treeView.items();
            let selectItem = $("#" + selectorId).val();
            let parentId = 0;
            let catGroupCd = "";
            $.each(allTreeData, (i, data) => {
                if (treeView.dataItem(data).no == selectItem) {
                    catGroupCd = treeView.dataItem(data).catGroupCd;
                    parentId = treeView.dataItem(data).catId === "Cat" ? 0 : treeView.dataItem(data).catId;
                }
            });
            let treeItems = {};
            treeItems.parentId = parentId;
            treeItems.catGroupCd = catGroupCd;
            return treeItems;
        },
        clearDropDownTree: (selectorId) => {
            $("#" + selectorId).data("kendoDropDownTree").value('');
            $("#" + selectorId).data("kendoDropDownTree").trigger("change");
        }
    }


    /**
     * 조직이동 window 관련 js
     *
     */
    const catMoveMgr = {
        catMoveWindowInitOpen: () => {
            let $div = $(`<div id="cat-move-window"></div>`);
            $div.kendoWindow({
                width: 600,
                height: 150,
                position: {
                    top: "40%",
                    left: "30%"
                },
                actions: ["Close"],
                title: "카테고리 이동",
                visible: false,
                modal: true,
                draggable: false,
                resizable: false,
                autoFocus: false,
                appendTo: $("#program-111").parent(),
                content: {
                    template: kendo.template($("#cat-move-window-template").html())
                },
                close: (e) => {
                    $("#cat-grid").data("kendoCpGrid").dataSource.read();
                    $("#cat-move-form").clearForm();
                    e.sender.destroy();
                },
                open: (e) => {
                    catMoveMgr.catWindowOpen();
                },
            }).data("kendoWindow").refresh().open();
            ;
        },
        open: (catId, catPath, catNm, catLvl) => {
            $("#cat-move-catId").val(catId);
            $("#cat-move-catPath").val(catPath);
            $("#cat-move-catNm").val(catNm);
            $("#cat-move-catLvl").val(catLvl);
            catMoveMgr.catMoveWindowInitOpen();
        },
        catWindowOpen: () => {
            let formdata = $("#cat-move-form").serializeJSON();
            $('#move-cat-id').val(formdata.catId);
            catDropDownTree.catDropDownTreeInit("cat-move-drop-down-tree");
            catDropDownTree.catDropDownTreeRefresh(formdata.catId, formdata.catPath, formdata.catNm, formdata.catLvl);
            $('#select-move-cat-name').html("[ " + formdata.catNm + " ] 를(을)");
            $("#cat-move-Btn").kendoButton({
                themeColor: "primary",
                //icon: "check",
                click: (e) => {
                    let errorTemplate = '<div class="k-widget k-tooltip k-tooltip-error" style="margin:2% 2% 2% 28%;">' +
                        '#=message#<div class="k-callout c-k-callout-n"></div></div>';
                    let valid = $("#cat-move-valid").kendoValidator({
                        errorTemplate: errorTemplate,
                        rules: {
                            required: (input) => {
                                if (input.is("[name=targetCatId]")) return input.data("kendoDropDownTree").value() != "";
                                else return true;
                            }
                        }
                    }).data("kendoValidator");
                    if (valid.validate()) catMoveMgr.catMoveSave();
                }
            });
        },
        catMoveSave: () => {
            let catMove = new cpDataSource(METHOD.PUT, catServiceBaseUrl + "/cat/cat-move", catMoveMgr.catMoveParam()).getDataSource();
            catMove.read().then(() => {
                $("#cat-move-window").data("kendoWindow").close();
                catDropDownTree.catDropDownTreeRefresh();
                message.notification(catMoveSuccessMassage);
            });
        },
        catMoveParam: () => {
            let targetCatId = $("#cat-move-drop-down-tree").val() != '' ? $("#cat-move-drop-down-tree").val() : 0;
            let param = {
                objectCatId: $("#move-cat-id").val(),
                targetCatId: targetCatId,
            };
            return param;
        }
    }

    const catPageControl = {
        init: () => {
            $("#cat-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    {collapsible: false, size: '46px', resizable: false, scrollable: false },
                    {collapsible: false}
                ]
            });
            $('.cat-search-check-box').on("click", (e) => {
                $('#cat-grid').data("kendoCpGrid").dataSource.read();
            });


            $("#cat-add-button").kendoButton({
                click: (e) => {
                    grid = $("#cat-grid").data("kendoCpGrid");
                    list = grid.dataItem($("#cat-grid tbody>tr:eq(0)"));
                    catNm = $("#cat-grid th[data-field=catNm]").attr("data-index");

                    let valid = $("#cat-grid").kendoValidator().data("kendoValidator");

                    if (list) {
                        if (!list.catNm) {
                            grid.editCell(grid.tbody.find("td").eq(catNm));
                        } else if (valid.validate()) {
                            grid.addRow();
                            grid.editCell(grid.tbody.find("td").eq(catNm));
                        }
                    } else {
                        grid.addRow();
                        grid.editCell(grid.tbody.find("td").eq(catNm));
                    }
                }
            });

            $("#cat-save-button").kendoButton({
                themeColor: "primary",
                click: (e) => {
                    $('#cat-grid').data("kendoCpGrid").saveChanges();
                }
            });

            $("#cat-cancel-button").kendoButton({
                click: (e) => {
                    catDropDownTree.catDropDownTreeRefresh();
                    $('#cat-grid').data("kendoCpGrid").cancelChanges();
                }
            });
        },
    }

    cpProgress('cat-layout');
    catMgr.init().then(() => {
        cpProgress('cat-layout', false)
    });
});
