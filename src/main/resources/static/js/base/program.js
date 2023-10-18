$(document).ready(() => {
  const programSelectUrl = "/base/v1/program/select";
  const programUpdateUrl = "/base/v1/program/update";
  const programInsertUrl = "/base/v1/program/insert";
  const programMoveUrl = "/base/v1/program/program-move"
  const program = {
    init: async () => {
      $("#program-drop-down-tree").kendoDropDownTree({
        placeholder: "전체",
        height: 350,
        filter: "startswith",
        fillMode: "solid",
        autoWidth: true,
        messages: {
          noData: "검색된 내용이 없습니다."
        },
        dataTextField: "programNm",
        dataValueField: "programId",
        clearButton: false,
        change: (e) => {
          $("#program-grid").data("kendoCpGrid").dataSource.read();
        },
      });
      programDropDownTree.drawDropDownTree();
      program.drawGrid(program.getGridDataSource());
      programBind.buttonBind();
      programBind.checkBoxBind();
      programMove.programMovewindowInit();
      programMove.kendoWidgetInitSetting();
    },

    dataSourceParam: (treeYn = 'N') => {
      const parentId = $("#program-drop-down-tree").data("kendoDropDownTree").value();
      const param = {
        treeYn: treeYn,
        parentId: parentId != null && parentId != "" ? parentId : 0,
        useYn: $("input:checkbox[id='program-use-yn-check']").is(":checked") ? "" : "Y",
        delYn: $("input:checkbox[id='program-del-yn-check']").is(":checked") ? "" : "N",
        outputYn: 'Y',
        sortType: '',
      };
      return param;
    },

    getGridDataSource: function () {
      const data = new kendo.data.DataSource({
        batch: true,
        transport: {
          read: {
            url: programSelectUrl,
            type: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
          },
          update: {
            url: programUpdateUrl,
            type: "PUT",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            complete: (e) => {
              programDropDownTree.drawDropDownTree(program.dataSourceParam("Y"));
              $("#program-grid").data("kendoCpGrid").dataSource.read();
            }
          },
          create: {
            url: programInsertUrl,
            type: "POST",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            complete: (e) => {
              programDropDownTree.drawDropDownTree(program.dataSourceParam("Y"));
              $("#program-grid").data("kendoCpGrid").dataSource.read();
            }
          },
          parameterMap: (data, type) => {
            methodType = type;
            if (type === "read") {
              return program.dataSourceParam();
            } else if (type === 'update') {
              return JSON.stringify(data.models);

            } else if (type === 'create') {
              let parentId = $("#program-drop-down-tree").data("kendoDropDownTree").value();
              parentId = parentId != '' && parentId != null ? parentId : 0;
              data.models.forEach((model) => {
                model.parentId = parentId;
              })
              return JSON.stringify(data.models);
            }
          }
        },
        schema: {
          data: "data",
          total: "total",
          model: {
            id: "programId",
            fields: {
              programId: {editable: false, type: "number", nullable: false},
              parentId: {type: "number"},
              programLvl: {type: "number"},
              programIdx: {type: "number"},
              programPath: {type: "string"},
              sortPath: {type: "string"},
              programNm: {
                type: "string", validation: {
                  required: {
                    message: "프로그램명은 필수입니다"
                  }
                }
              },
              fullProgramNm: {type: "string"},
              roleNm: {
                type: "string", validation: {
                  required: {
                    message: "role명은 필수입니다"
                  }
                }
              },
              url: {
                type: "string", validation: {
                  required: {
                    message: "URL은 필수입니다"
                  }
                }
              },
              parameter: {type: "string"},
              navigateUrl: {type: "string"},
              programDefaultYn: {type: "string", defaultValue: "N", editable: false},
              width: {type: "number"},
              height: {type: "number"},
              programUpdate: {type: "string", defaultValue: "N", editable: false},
              programDelete: {type: "string", defaultValue: "N", editable: false},
              programInsert: {type: "string", defaultValue: "N", editable: false},
              programPrint: {type: "string", defaultValue: "N", editable: false},
              programDown: {type: "string", defaultValue: "N", editable: false},
              deptRangeAll: {type: "string", defaultValue: "N", editable: false},
              deptRangeSub: {type: "string", defaultValue: "N", editable: false},
              deptRangeOwn: {type: "string", defaultValue: "N", editable: false},
              agentSelect: {type: "string", defaultValue: "N", editable: false},
              programExtend_01: {type: "string"},
              programExtend_02: {type: "string"},
              programExtend_03: {type: "string"},
              programExtend_04: {type: "string"},
              programExtend_05: {type: "string"},
              programExtend_06: {type: "string"},
              programExtend_07: {type: "string"},
              programExtend_08: {type: "string"},
              programExtend_09: {type: "string"},
              programExtend_10: {type: "string"},
              programExtend_11: {type: "string"},
              programExtend_12: {type: "string"},
              programExtend_13: {type: "string"},
              programExtend_14: {type: "string"},
              programExtend_15: {type: "string"},
              menuYn: {type: "string", defaultValue: "N", editable: false},
              popupYn: {type: "string", defaultValue: "N", editable: false},
              sysYn: {type: "string", defaultValue: "Y", editable: false},
              inheritSysYn: {type: "string", defaultValue: "N", editable: false},
              useYn: {type: "string", defaultValue: "Y", editable: false},
              authUseYn: {type: "string", defaultValue: "N", editable: false},
              inheritAuthUseYn: {type: "string", defaultValue: "N", editable: false},
              delYn: {type: "string", defaultValue: "N", editable: false},
              inheritDelYn: {type: "string", defaultValue: "N", editable: false},
              description: {type: "string"},
              reIdxYn: {type: "string", defaultValue: "N", editable: false},
            },
          },
        },
        error: function (e) {
          const error = e.xhr.responseJSON || {message: '오류가 발생하였습니다.'};
          const obj = {msg: error.message, type: 'error'};
          message.notification(obj);
        },
        requestEnd: (e) => {
          const type = e.type;

          if (type === "create" || type === "update") {
            const obj = {msg: "데이터가 저장되었습니다.", type: "info"};
            message.notification(obj);
          }
        }
      });
      return data;
    },

    drawGrid: (gridData) => {

      if ($("#program-grid").data("kendoCpGrid")) {
        $("#program-grid").data("kendoCpGrid").setDataSource(gridData);
      } else {
        $("#program-grid").kendoCpGrid({
          editable: "incell",
          columns: [
            {
              field: "programIdx",
              sortable: {initialDirection: "desc"},
              title: "순서",
              width: 90,
              attributes: {class: '!k-text-center'},
              locked: true
            },
            {
              field: "programNm",
              title: "프로그램명",
              width: 180,
              locked: true,
            },
            {
              field: "roleNm",
              title: "역할 접두어",
              width: 200,
              locked: true
            },
            {
              field: "useYn",
              title: "사용",
              width: 70,
              attributes: {class: '!k-text-center'},
              locked: true,
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="useYn"  #= useYn=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "delYn",
              title: "삭제",
              width: 70,
              attributes: {class: '!k-text-center'},
              locked: true,
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="delYn" #= delYn=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "url",
              title: "URL",
              width: 200,
            },
            {
              field: "parameter",
              title: "파라미터",
              width: 200,
            },
            {
              field: "menuYn",
              title: "메뉴",
              width: 70,
              attributes: {class: '!k-text-center'},
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="menuYn" #= menuYn=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "programDefaultYn",
              title: "기본",
              width: 70,
              attributes: {class: '!k-text-center'},
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="programDefaultYn" #= programDefaultYn=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "popupYn",
              title: "팝업",
              width: 70,
              attributes: {class: '!k-text-center'},
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="popupYn" #= popupYn=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "programInsert",
              title: "저장",
              width: 70,
              attributes: {class: '!k-text-center'},
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="programInsert" #= programInsert=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "programUpdate",
              title: "수정",
              width: 70,
              attributes: {class: '!k-text-center'},
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="programUpdate" #= programUpdate=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "programDelete",
              title: "삭제",
              width: 70,
              attributes: {class: '!k-text-center'},
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="programDelete" #= programDelete=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              field: "programDown",
              title: "엑셀다운",
              width: 70,
              attributes: {class: '!k-text-center'},
              template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="programDown" #= programDown=="Y" ? "checked=checked" : "" # ></input>',
              editor: program.edit,
            },
            {
              columns: [
                {
                  field: "deptRangeAll",
                  title: "전체부서",
                  width: 100,
                  attributes: {class: '!k-text-center'},
                  template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="deptRangeAll" #= deptRangeAll=="Y" ? "checked=checked" : "" # ></input>',
                  editor: program.edit,
                },
                {
                  field: "deptRangeSub",
                  title: "하위부서",
                  width: 100,
                  attributes: {class: '!k-text-center'},
                  template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="deptRangeSub" #= deptRangeSub=="Y" ? "checked=checked" : "" # ></input>',
                  editor: program.edit,
                },
                {
                  field: "agentSelect",
                  title: "상담사선택",
                  width: 100,
                  attributes: {class: '!k-text-center'},
                  template: '<input type="checkbox" class="k-checkbox-md program-grid-checkbox" data-field="agentSelect" #= agentSelect=="Y" ? "checked=checked" : "" # ></input>',
                  editor: program.edit,
                },
              ],
              title: "조회",
              attributes: {class: '!k-text-center'},
            },
            {
              field: "programExtend_01",
              title: "확장1",
              width: 100,
            },
            {
              field: "programExtend_02",
              title: "확장2",
              width: 100,
            },
            {
              field: "programExtend_03",
              title: "확장3",
              width: 100,
            },
            {
              field: "programExtend_04",
              title: "확장4",
              width: 100,
            },
            {
              field: "programExtend_05",
              title: "확장5",
              width: 100,
            },
            {
              field: "programExtend_06",
              title: "확장6",
              width: 100,
            },
            {
              field: "programExtend_07",
              title: "확장7",
              width: 100,
            },
            {
              field: "programExtend_08",
              title: "확장8",
              width: 100,
            },
            {
              field: "programExtend_09",
              title: "확장9",
              width: 100,
            },
            {
              field: "programExtend_10",
              title: "확장10",
              width: 100,
            },
            {
              command: [{
                name: "program-move",
                template: "<span style='cursor: pointer' class='k-icon k-i-redo k-icon k-grid-program-move'></span>",
                click: function (e) {
                  let tr = $(e.target).closest("tr");
                  let data = this.dataItem(tr);
                  let authStrings = 'ROLE_BASE_PROGRAM_MGR_EXTEND_01';
                  let auths = USER_AUTHORITY.filter(auth => auth.authority.includes(authStrings));
                  if (data.programId != null && auths.length > 0) {
                    programMove.open(data.programId, data.programPath, data.programNm, data.programLvl);
                  } else {
                    e.preventDefault(false);
                  }
                },
                visible: function (dataItem) {
                  let authStrings = 'ROLE_BASE_PROGRAM_MGR_EXTEND_01';
                  let auths = USER_AUTHORITY.filter(auth => auth.authority.includes(authStrings));
                  return auths.length > 0;
                }
              }],
              width: 90,
              attributes: {class: '!k-text-center'},
              title: "이동"
            }
          ],
          height: "100%",
          resizable: false,
          selectable: true,
          dataSource: gridData,
          dataBound: (e) => {
            $("#program-btn-add").unbind("click");
            $("#program-btn-add").bind("click", function () {
              grid = $("#program-grid").data("kendoCpGrid");
              list = grid.dataItem($("#program-grid tbody>tr:eq(0)"));
              const programIndex = $("#program-grid th[data-field=programNm]").attr("data-index");
              const roleIndex = $("#program-grid th[data-field=roleNm]").attr("data-index");
              const urlIndex = $("#program-grid th[data-field=url]").attr("data-index");
              const lockColumnLength = $(".k-grid-header-locked th").length;
              if (list) {
                if (!list.programNm) {
                  grid.editCell(grid.lockedTable.find("td").eq(programIndex));
                } else if (!list.roleNm) {
                  grid.editCell(grid.lockedTable.find("td").eq(roleIndex));
                } else if (!list.url) {
                  grid.editCell(grid.table.find("td").eq(urlIndex - lockColumnLength));
                } else {
                  grid.addRow();
                  grid.editCell(grid.lockedTable.find("td").eq(programIndex));
                }
              } else {
                grid.addRow();
                grid.editCell(grid.lockedTable.find("td").eq(programIndex));
              }
            });
          },
          saveChanges: (e) => {
            const grid = e.sender;
            const saveDatas = grid.dataSource.data();
            const programIndex = $("#program-grid th[data-field=programNm]").attr("data-index");
            const roleIndex = $("#program-grid th[data-field=roleNm]").attr("data-index");
            const urlIndex = $("#program-grid th[data-field=url]").attr("data-index");
            const lockColumnLength = $(".k-grid-header-locked th").length;

            saveDatas.forEach((data) => {
              if (!data.programNm) {
                grid.editCell(grid.lockedTable.find("td").eq(programIndex));
                e.preventDefault();
              } else if (!data.roleNm) {
                grid.editCell(grid.lockedTable.find("td").eq(roleIndex));
                e.preventDefault();
              } else if (!data.url) {
                grid.editCell(grid.table.find("td").eq(urlIndex - lockColumnLength));
                e.preventDefault();
              }
            })
          }
        }).on("click", ".program-grid-checkbox", (e) => {
          programList = $("#program-grid").data("kendoCpGrid");
          let field = $(e.target).data('field');
          let dataRow = $(e.target).closest("tr");
          let dataItem = programList.dataItem(dataRow);
          if ($(e.target).is(":checked")) {
            dataItem[field] = "Y";
          } else {
            dataItem[field] = "N";
          }
          dataItem.dirty = true;
        })
      }
    },

    edit: function (container, options) {
      let colNm = options.field;
      let check = "";
      if (options.model[colNm] == "Y") {
        check = '<input type="checkbox" data-filed="' + colNm + '" class="k-checkbox-md" checked="checked" />';
      } else {
        check = '<input type="checkbox" data-filed="' + colNm + '" class="k-checkbox-md" />';
      }

      $(check).appendTo(container);
    },
  }

  const programDropDownTree = {
    drawDropDownTree: (param) => {
      if (param === undefined) {
        param = {
          treeYn: 'Y',
          parentId: 0,
          useYn: 'Y',
          delYn: 'N',
          outputYn: 'Y',
          sortType: '',
        }
      }

      const programSelDataSource = new cpDataSource(METHOD.GET, programSelectUrl, param, "", "").getDataSource();

      programSelDataSource.read().then(() => {
        const data = programSelDataSource.data();
        const treeSortData = programDropDownTree.dropDownTreeSortData(data);
        $("#program-drop-down-tree").data("kendoDropDownTree").setDataSource(treeSortData);
      })
    },

    dropDownTreeSortData: (data) => {
      const tree = {
        programNm: "전체",
        programId: 0,
        expanded: true,
        items: [],
      };

      data.forEach((element) => {
        element.items = [];
        if (element.hasOwnProperty("url")) {
          element.reUrl = element.url;
          delete element.url;
        }
        programDropDownTree.add(element, tree);
      });

      return new Array(tree);
    },

    add: (inputData, tree, count = 0) => {
      const splitPath = inputData.sortPath.split('.');
      if (inputData.programLvl === count) {
        return;
      } else if (!tree.items.find((element) => element.sortPath.split('.')[count] === splitPath[count])) {
        tree.items.push(inputData);
        return;
      } else {
        const nextTree = tree.items.find((element) => element.sortPath.split('.')[count] === splitPath[count])
        count += 1;
        return programDropDownTree.add(inputData, nextTree, count);
      }
    },
  }

  const programBind = {

    buttonBind: () => {
      $("#program-splitter").kendoSplitter({
        orientation: "vertical",
        panes: [
          {collapsible: false, size: '46px', resizable: false, scrollable: false },
          {collapsible: false}
        ]
      });

      $("#program-btn-add").kendoButton({});

      $("#program-btn-save").kendoButton({
        themeColor: "primary",
        click: (e) => {
          $("#program-grid").data("kendoCpGrid").saveChanges();
        },
      });

      $("#program-btn-cancel").kendoButton({
        click: (e) => {
          $("#program-grid").data("kendoCpGrid").cancelChanges();
        },
      });
    },

    checkBoxBind: () => {
      $(".program-select-box").find(".program-yn-check-box").change(() => {
        $("#program-grid").data("kendoCpGrid").dataSource.read();
        programDropDownTree.drawDropDownTree(program.dataSourceParam("Y"));
      })
    }
  }

  const programMove = {
    programMovewindowInit: () => {
      $("#program-move-window").kendoWindow({
        width: 600,
        height: 150,
        position: {
          top: "45%",
          left: "37%"
        },
        actions: ["Close"],
        title: "프로그램 이동",
        visible: false,
        modal: true,
        draggable: false,
        resizable: false,
        close: () => {
          programMove.clearDropDownTree("program-move-drop-down-tree")
          $("#program-grid").data("kendoCpGrid").dataSource.read();
        }
      });
    },

    kendoWidgetInitSetting: () => {
      $("#program-move-drop-down-tree").kendoDropDownTree({
        placeholder: "전체",
        height: 350,
        filter: "startswith",
        fillMode: "solid",
        messages: {
          noData: "검색된 내용이 없습니다."
        },
        dataTextField: "programNm",
        dataValueField: "programId",
        clearButton: false,
      });

      $("#program-move-Btn").kendoButton({
        themeColor: "success",
        icon: "check",
        click: (e) => {
          const programMoveDataSource = new cpDataSource(METHOD.PUT, programMoveUrl, programMove.programMoveParam()).getDataSource();
          programMoveDataSource.read().then(() => {
            $("#program-move-window").data("kendoWindow").close();
            programDropDownTree.drawDropDownTree(program.dataSourceParam("Y"));
            message.notification({msg: '이동 되었습니다.', type: 'success'});
          });

        }
      });
    },

    programMoveParam: () => {
      let targetProgramId = $("#program-move-drop-down-tree").val() != '' ? $("#program-move-drop-down-tree").val() : 0;
      let param = {
        objectProgramId: $("#move-program-id").val(),
        targetProgramId: targetProgramId,
      };
      return param;
    },

    open: (programId, programPath, programNm, programLvl) => {
      $("#program-move-window").data("kendoWindow").refresh().open();
      programMove.moveDrawTree(programPath, programLvl);
      $('#move-program-id').val(programId);
      $('#select-move-program-name').html("[ " + programNm + " ] 를(을)");
    },

    moveDrawTree: (programPath, programLvl) => {
      const param = {
        treeYn: 'Y',
        parentId: 0,
        useYn: 'Y',
        delYn: 'N',
        outputYn: 'Y',
        sortType: '',
      };

      const programMoveDataSource = new cpDataSource(METHOD.GET, programSelectUrl, param, "", "").getDataSource();

      programMoveDataSource.read().then(() => {
        const data = programMoveDataSource.data();
        const returnData = data.filter((e) => e.programPath.split(".")[programLvl - 1] !== programPath.split(".")[programLvl - 1]);
        const treeSortData = programDropDownTree.dropDownTreeSortData(returnData);
        $("#program-move-drop-down-tree").data("kendoDropDownTree").setDataSource(treeSortData);
      })
    },

    clearDropDownTree: (selectorId) => {
      $("#" + selectorId).data("kendoDropDownTree").value('');
      $("#" + selectorId).data("kendoDropDownTree").trigger("change");
    },
  }

  cpProgress('program-layout');
  program.init().then(() => {
    cpProgress('program-layout', false);
  });
});
