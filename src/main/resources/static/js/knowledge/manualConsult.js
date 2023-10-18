const manualConsultSelectPageUrl = "/knowledge/v1/manual-consult/select/page";
const manualConsultKeywordSelectUrl = "/knowledge/v1/manual-consult/keyword/select";

const userSetStatus = !!localStorage.getItem("MANUAL_CONSULT")? JSON.parse(localStorage.getItem("MANUAL_CONSULT")) : {}; //사용자의 spliiter 열고 닫은 상태 및 최신순, 조회순 상태 값 저장

const manualConsult = {
    init :async () => {
        await searchRankingSection.widgetSetting();
        await manualContentsSection.widgetSetting();
        manualConsultGridSetting.searchRankingGrid.drawGrid();
        manualSetting();
        $("#manual-consult-search-button").trigger("click");
    },
}

const searchRankingSection = {
    widgetSetting : () => {

        window.onresize = () => {
            const innerWidth = window.innerWidth;
            if(innerWidth < 1000){
                $("#manual-consult-search-ranking-section").hide();
                $("#manual-consult-search-splitter").data("kendoSplitter").collapse(".k-pane:first");
                $("#manual-consult-contents-section").css("width","100%");
            }else{
                if($("#manual-consult-search-ranking-section").is(":visible") === false){
                    //hide 상태에서만 보이게하고 펼쳐짐
                    $("#manual-consult-search-ranking-section").show();
                }
                $("#manual-consult-contents-section").css("width","calc(100% - 315px)");
            }
        };

        const ds = new kendo.data.DataSource({
            data: [
                { text: "금일", value: 'T', sortField:"기간검색",attributes: {style: "width:25%;"},},
                { text: "일주일", value: 'W', sortField:"기간검색",attributes: {style: "width:25%;"} },
                { text: "1개월", value: 'M', sortField:"기간검색",attributes: {style: "width:25%;"}},
                { text: "전체", value: 'A', sortField:"기간검색",attributes: {style: "width:25%;"}},
                { text: "1월", value: '01', sortField:"월별검색", attributes: {style: "width:25%;"}},
                { text: "2월", value: '02', sortField:"월별검색", attributes: {style: "width:25%;"}},
                { text: "3월", value: '03', sortField:"월별검색", attributes: {style: "width:25%;"}},
                { text: "4월", value: '04', sortField:"월별검색", attributes: {style: "width:25%;"}},
                { text: "5월", value: '05', sortField:"월별검색", attributes: {style: "width:25%;"}},
                { text: "6월", value: '06', sortField:"월별검색", attributes: {style: "width:25%;"}},
                { text: "7월", value: '07', sortField:"월별검색",attributes: {style: "width:25%;"}},
                { text: "8월", value: '08',  sortField:"월별검색",attributes: {style: "width:25%;"}},
                { text: "9월", value: '09',  sortField:"월별검색",attributes: {style: "width:25%;"}},
                { text: "10월", value: '10',  sortField:"월별검색",attributes: {style: "width:25%;"}},
                { text: "11월", value: '11', sortField:"월별검색",attributes: {style: "width:25%;"}},
                { text: "12월", value: '12',  sortField:"월별검색",attributes: {style: "width:25%;"}},
             ],
            group : {field : "sortField"}
        })

        $('#manual-consul-search-group-drop-down-list').kendoDropDownList({
            dataSource : ds,
            groupTemplate: "#: data #",
            fillMode: 'flat',
            change: function (e) {
                $("#manual-consult-search-ranking-grid").data("kendoCpGrid").dataSource.read({selectValue : e.sender.value()});
            },
            dataTextField: 'text',
            dataValueField: 'value',
            value : 'T',
        });
    },
};

const manualContentsSection = {
    widgetSetting :async () => {
        $("#manual-consult-sort-type-radio-group").kendoRadioGroup({
            items: [{value : "new", label : "최신순"},{value : "view", label : "조회순"}],
            value: "new",
            layout: "horizontal"
        });

        $('#manual-consult-contents-splitter').kendoSplitter({
            orientation: 'vertical',
            panes: [
                {resizable: false},
                {collapsible: true, size: '50%', resizable: false}
            ],
            collapse : () => {
                //축소 이벤트
                userSetStatus.qnaCloseYn = "Y"; // Q&A 닫힘여부
                localStorage.setItem("MANUAL_CONSULT",kendo.stringify(userSetStatus));
            },
            expand : () => {
                //확장 이벤트
                userSetStatus.qnaCloseYn = "N";
                localStorage.setItem("MANUAL_CONSULT",kendo.stringify(userSetStatus));
            },
            resize : () =>{
                //확장 + 축소
                $("#manual-consult-manual-list-view").children(".k-listview-content").css("height", "100%");
            }
        });

        $('#manual-consult-search-splitter').kendoSplitter({
            panes: [
                {collapsible: true, size: '300px', resizable: false},
                {resizable: false}
            ],
            collapse : () => {
              //축소 이벤트
                userSetStatus.searchCloseYn = "Y"; // 검색어순위 닫힘여부
                localStorage.setItem("MANUAL_CONSULT",kendo.stringify(userSetStatus));
            },
            expand : () => {
              //확장 이벤트
                userSetStatus.searchCloseYn = "N";
                localStorage.setItem("MANUAL_CONSULT",kendo.stringify(userSetStatus));
            },
        });

        $("#manual-consult-contents-qna-splitter").kendoSplitter({
            orientation: "vertical",
            panes: [{ collapsible: false, size: "100%", resizable: false }, { collapsible: false }],
        });

        let callCat  = new cpCatDropDownTree('#manual-consult-call-cat-drop-down-tree',{
            value:0,
            placeholder:"전체",
            clearButton: false,
            dataTextField: "fullCatNm",
            dataValueField: "catId",
            fillMode: 'solid',
            autoWidth: true,
            size: 'small',
            height : 300
        });
        callCat.create();
        let data = await callCat.getData();
        let allObject = {
            catId: 0,
            catNm: "전체",
            fullCatNm: "전체",
            items: []
        }
        let dataSource = new kendo.data.HierarchicalDataSource({data: [allObject,...data.options.data]});
        $("#manual-consult-call-cat-drop-down-tree").data("kendoDropDownTree").setDataSource(dataSource);


        let importanceCodeDataSource =  new cpDataSource(METHOD.GET, "/common/v1/code/ManualImportance", {}).getDataSource();
        await importanceCodeDataSource.read().then(()=>{
            $("#manual-consult-importance-drop-down-list").kendoDropDownList({
                dataSource: importanceCodeDataSource.data(),
                dataTextField: "codeNm",
                dataValueField: "codeKey",
                fillMode: 'solid',
                autoWidth: true,
                size: 'small',
                optionLabel: {codeNm: '전체', codeKey: ""},
            })
        })

        $("#manual-consult-search-text").kendoTextBox({
            size:"small"
        }).on("keyup",(e) => {
            if (e.keyCode === 13) {
                $("#manual-consult-search-button").trigger("click");
            }
        });

        $("#manual-consult-search-type-drop-down-list").kendoDropDownList({
            dataSource: [{codeNm : "AND", codeKey: "AND"},{codeNm : "OR", codeKey: "OR"}],
            dataTextField: "codeNm",
            dataValueField: "codeKey",
            fillMode: "solid",
            size: 'small'
        });

        $("#manual-consult-search-type-title-check").kendoCheckBox({
            label: '제목',
            checked : true,
        });

        $("#manual-consult-search-type-contents-check").kendoCheckBox({
            label: '내용',
            checked : true,
        });

        $("#manual-consult-search-button").kendoButton({
            themeColor: "secondary",
            size: "small",
            icon: 'search',
            click : () => {
                if(valid.validate()) {
                    const keyword = $("#manual-consult-search-text").data('kendoTextBox').value().trim();
                    if(!!keyword){
                        const keywordCount = new cpDataSource(METHOD.POST, `/knowledge/v1/manual-consult/insert/${keyword}`).getDataSource();
                        keywordCount.read().then(()=>{
                            //검색어 순위 조회(선택되어 있는 버튼그룹의 버튼을 기준으로)
                            $("#manual-consult-search-ranking-grid").data("kendoCpGrid").dataSource.read(
                                {selectValue : $("#manual-consul-search-group-drop-down-list").data("kendoDropDownList").value()},
                            );
                        });
                    }
                    $(".k-listview-content").scrollTop(0); //scrollable : endless인 경우 scroll 맨 위 상태에서 setDataSource해야 제대로 작동
                    $("#manual-consult-manual-list-view").data("kendoListView").setDataSource(manualConsultDataSource.manualListViewDataSource());
                    $("#manual-consult-qna-list-view").data("kendoListView").setDataSource(manualConsultDataSource.qnaListViewDataSource());

                    userSetStatus.sortType = $("#manual-consult-sort-type-radio-group").data("kendoRadioGroup").value();
                    localStorage.setItem("MANUAL_CONSULT", kendo.stringify(userSetStatus));
                }
            },
        });


        const valid = $("#manual-consult-search-valid").kendoValidator({
            rules : {
                rule : (input) =>{
                    if (input.is("[name = searchText]")){
                        if(input.val().trim().length > 0 && input.val().trim().length < 2){
                            message.notification({msg: "검색어가 있는 경우 2글자 이상이어야 합니다.", type:"error"})
                            return false;
                        }
                    }
                    return true;
                }
            },
        }).data("kendoValidator");


        $('#manual-consult-manual-list-view').kendoListView({
            height : "100%",
            dataSource: [],
            layout: "flex",
            scrollable: "endless",
            selectable : true,
            flex: {
                direction: "column"
            },
            template: kendo.template($("#manual-consult-manual-listview").html()),
            dataBound : (e) => {
                e.sender.dataItems().map((data)=>{
                  if($(`#manual-consult-listview-title-${data.manualId}`).data("kendoTooltip") === undefined){
                      $(`#manual-consult-listview-title-${data.manualId}`).kendoTooltip({
                          //width: "45%",
                          height: "auto",
                          position: "bottom",
                          callout : false,
                          content: () => {
                              const text = `<span style="font-size: 15px;font-weight: 550;">${data.html}</span>`;
                              return text;
                          }
                      });

                  }
              })

            },
            change : () => {
                let listView = $('#manual-consult-manual-list-view').data("kendoListView");
                let selected =listView.dataItem(listView.select());
                if(!!selected.manualUuid){
                    let detailOption = {
                        top : 30,
                        left : 100,
                        width: 1400,
                        height: 900
                    };

                    new popupWindow(`/manual-detail?manualUuid=${selected.manualUuid}&level=2&parentType=consult-manual`, selected.manualUuid, detailOption).open();
                }else{
                    message.notification({msg:"매뉴얼을 찾을 수 없습니다.", type:"error"})
                }
            }
        });

        $('#manual-consult-qna-list-view').kendoListView({
            height : "100%",
            dataSource: [],
            layout: "flex",
            scrollable: "endless",
            selectable : true,
            flex: {
                direction: "column"
            },
            template: kendo.template($("#manual-consult-qna-listview").html()),
            change : () => {
                let listView = $('#manual-consult-qna-list-view').data("kendoListView");
                let selected =listView.dataItem(listView.select());

                if(!!selected.parentUuid){
                    let detailOption = {
                        top : 30,
                        left : 100,
                        width: 1400,
                        height: 900
                    };

                    new popupWindow(`/manual-detail?manualUuid=${selected.parentUuid}&level=2&parentType=consult-manual&manualId=${selected.manualId}`, selected.parentUuid, detailOption).open();
                }else{
                    message.notification({msg:"매뉴얼을 찾을 수 없습니다.", type:"error"})
                }
            }
        });

    }
}

const manualSetting = () => {
    const settingsValue = JSON.parse(localStorage.getItem("MANUAL_CONSULT"));
    if(!!settingsValue){
        if(settingsValue.searchCloseYn === "Y"){
            //사용자가 이전에 검색어순위를 닫아뒀을 경우
            $("#manual-consult-search-splitter").data("kendoSplitter").collapse(".k-pane:first");
        }else{
            $("#manual-consult-search-splitter").data("kendoSplitter").expand(".k-pane:first");
        }

        if(settingsValue.qnaCloseYn === "Y"){
            //사용자가 이전에 qna창을 닫아뒀을 경우
            $("#manual-consult-contents-splitter").data("kendoSplitter").collapse(".k-pane:last");
        }else{
            $("#manual-consult-contents-splitter").data("kendoSplitter").expand(".k-pane:last");
        }

        if(!!settingsValue.sortType){
            $("#manual-consult-sort-type-radio-group").data("kendoRadioGroup").value(settingsValue.sortType);
        }
    }
};

const manualConsultGridSetting = {
    searchRankingGrid : {
        drawGrid : () => {
            $("#manual-consult-search-ranking-grid").kendoCpGrid({
                columns: [
                    {
                        field: "number",
                        title:"순위",
                        width:60,
                        attributes: {style: 'text-align:center'},
                    },
                    {
                        field: "searchKeyword",
                        title: "검색어",
                        attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'},
                    },
                    {
                        field: "searchCnt",
                        title: "건수",
                        width:60,
                        attributes: {style: 'text-align:center'},
                    },
                ],
                dataSource: manualConsultDataSource.keywordDataSource(),
                change: (e) => {
                    const cell = e.sender.select();
                    const selectRows = e.sender.dataSource.view()[cell.closest("tr").index()];
                    $("#manual-consult-search-text").data('kendoTextBox').value(selectRows.searchKeyword);
                    $("#manual-consult-search-button").trigger("click");

                },
                height: "100%",
                resizable: false,
                selectable: true,
            });
        }
    }
};

const manualConsultDataSource = {
    keywordDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : manualConsultKeywordSelectUrl,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                },
                parameterMap : (options) =>{
                    const param = {
                        type : !!options.selectValue ? options.selectValue: 'T',
                        outputYn : 'Y',
                        totalPage : 10,
                    };
                    return param;
                }
            },
            schema: {
                data : 'data',
                model : {
                    searchKeyword : {type : 'string'},
                    searchCnt : {type : 'string'},
                },
                parse : (res) => {
                    let number = 1;
                    res.data.forEach((data)=>{
                        data.number = number;
                        number ++;
                    })
                    return res;
                }
            },
        })
    },

    manualListViewDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : manualConsultSelectPageUrl,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                },

                parameterMap : (options) =>{
                    const param = {
                        manualType : "M",
                        callCatId : Number($('#manual-consult-call-cat-drop-down-tree').data('kendoDropDownTree').value()),
                        keyword : $("#manual-consult-search-text").data('kendoTextBox').value().trim(),
                        condition : $("#manual-consult-search-type-drop-down-list").data('kendoDropDownList').value(),
                        importance : $("#manual-consult-importance-drop-down-list").data('kendoDropDownList').value(),
                        keywordType : "",
                        sortType : "",
                        outputYn : "Y",
                        page : options.page,
                        totalPage : options.pageSize,
                    };

                    let sortType = $("#manual-consult-sort-type-radio-group").data("kendoRadioGroup").value();
                    let searchTypeTitle = $("#manual-consult-search-type-title-check").data("kendoCheckBox").value();
                    let searchTypeContents = $("#manual-consult-search-type-contents-check").data("kendoCheckBox").value();

                    if(sortType === "new"){
                        //최신순으로 조회하는 경우
                        param.sortType = "B.MDF_DT desc";
                    }else if(sortType === "view"){
                        //조회순으로 조회하는 경우
                        param.sortType = "B.READ_CNT desc";
                    }


                    if(searchTypeTitle){
                       //제목 checkbox true
                        param.keywordType += "Title";
                    }
                    if(searchTypeContents){
                        //제목 checkbox true
                        param.keywordType += "Content";
                    }

                    if(!searchTypeTitle && !searchTypeContents){
                        //제목, 내용 체크가 둘다 빠져있을 경우
                        param.keywordType = "TitleContent";
                    }

                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                total : 'data.totalCount',
                model : {
                    importanceNm : {type : 'string'},
                    fullDeptNm : {type : 'string'},
                    chargeNm : {type : 'string'},
                    callCatNm : {type : 'string'},
                    title : {type : 'string'},
                    contents : {type : 'string'},
                    manualQnaCnt : {type : 'number'},
                    mdfDt : {type : 'date'},
                },
                parse : (res) => {
                    const keywordValue = $("#manual-consult-search-text").data('kendoTextBox').value().trim();
                        const keywordArr = keywordValue.split(' ');
                        res.data.rows.forEach((row)=>{
                            if(!!keywordValue){
                                //검색어가 있을 경우 해당 검색어 style 추가
                                keywordArr.forEach((keyword)=>{
                                    row.title = row.title.replaceAll(keyword,`<span style="color: #d89c46; font-weight: 550;">${keyword}</span>`);
                                    row.contents = row.contents.replaceAll(keyword,`<span style="color: #d89c46; font-weight: 550;">${keyword}</span>`);
                                })
                            }
                            if(row.importance === "H"){
                                row.importanceNm = `<span class="k-badge k-badge-solid k-badge-solid-error k-badge-md k-rounded-md">${row.importanceNm}</span>`;
                            }else if(row.importance === "M"){
                                row.importanceNm = `<span class="k-badge k-badge-solid k-badge-solid-warning k-badge-md k-rounded-md">${row.importanceNm}</span>`;
                            }else if(row.importance === "L"){
                                row.importanceNm = `<span class="k-badge k-badge-solid k-badge-solid-success k-badge-md k-rounded-md">${row.importanceNm}</span>`;
                            }
                            row.title = `<span>${row.title}</span>`;

                            row.mdfDt = kendo.toString(new Date(row.mdfDt), "yyyy-MM-dd");
                        })

                    return res;
                }
            },
            serverPaging: true,
            pageSize : 15,
        })
    },

    qnaListViewDataSource : () => {
        return new kendo.data.DataSource({
            transport : {
                read : {
                    url : manualConsultSelectPageUrl,
                    type : "GET",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                },

                parameterMap : (options) =>{
                    const param = {
                        manualType : "S",
                        callCatId : Number($('#manual-consult-call-cat-drop-down-tree').data('kendoDropDownTree').value()),
                        keyword : $("#manual-consult-search-text").data('kendoTextBox').value().trim(),
                        condition : $("#manual-consult-search-type-drop-down-list").data('kendoDropDownList').value(),
                        keywordType : "",
                        importance : '',
                        sortType : '',
                        outputYn : "Y",
                        page : options.page,
                        totalPage : options.pageSize,
                    };

                    if($("#manual-consult-search-type-title-check").data("kendoCheckBox").value()){
                        //제목 checkbox true
                        param.keywordType += "Title";
                    }
                    if($("#manual-consult-search-type-contents-check").data("kendoCheckBox").value()){
                        //제목 checkbox true
                        param.keywordType += "Content";
                    }

                    if(!$("#manual-consult-search-type-title-check").data("kendoCheckBox").value() && !$("#manual-consult-search-type-contents-check").data("kendoCheckBox").value()){
                        //제목, 내용 체크가 둘다 빠져있을 경우
                        param.keywordType = "TitleContent";
                    }

                    return param;
                }
            },
            schema: {
                data : 'data.rows',
                total : 'data.totalCount',
                model : {
                    rgtrNm : {type : 'string'},
                    callCatNm : {type : 'string'},
                    title : {type : 'string'},
                    contents : {type : 'string'},
                    regDt : {type : 'date'},
                },
                parse : (res) => {
                    const keywordValue = $("#manual-consult-search-text").data('kendoTextBox').value().trim();
                    const keywordArr = keywordValue.split(' ');
                    res.data.rows.forEach((row)=>{
                        if(!!keywordValue){
                            //검색어가 있을 경우 해당 검색어 style 추가
                            keywordArr.forEach((keyword)=>{
                                row.title = row.title.replaceAll(keyword,`<span style="color: #d89c46; font-weight: 550;">${keyword}</span>`);
                                row.contents = row.contents.replaceAll(keyword,`<span style="color: #d89c46; font-weight: 550;">${keyword}</span>`);
                            })
                        }
                        row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd");
                    });
                    return res;
                }
            },
            serverPaging: true,
            pageSize : 10
        })
    },
};

cpProgress('manual-consult-layout');
manualConsult.init().then(()=>{
    cpProgress('manual-consult-layout', false);
});