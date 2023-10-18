$(document).ready(() => {

    const BOARD_ROLE = "BOARD_FREE";
    const BOARD_PARAM = MENU_ARRAY.find(r => r.roleNm === BOARD_ROLE).parameter;

    const elemPrev = 'free-board';
    const gridDataSourceUrl = '/board/v1/free-board/select/page';

    const localStorageGridColumnsNm = 'localStorageFreeBoardGridColumns';
    const localStorageGridColumns = !!window.localStorage.getItem(localStorageGridColumnsNm) ? JSON.parse(window.localStorage.getItem(localStorageGridColumnsNm)) : null;


    const gridMain = {

        gridColumns : [
            { field: "docNm", title: "제목", width: 700, attributes: {style: 'text-overflow: ellipsis; overflow: hidden; white-space: nowrap;'} },
            { field: "confirmPerCnt", title:"조회수", width: 70, attributes: {class: '!k-text-center'} },
            { field: "rgtrDeptNm", title:"등록부서", width:200, attributes: {class: '!k-text-center'} },
            { field: "rgtrNm", title:"등록자", width: 110, attributes: {class: '!k-text-center'} },
            { field: "regDt", title:"등록일시", width:160, attributes: {class: '!k-text-center'} }
        ],
        gridWidth: 0,

        searchStartDate : new Date(new Date().setDate(new Date().getDate() - 60)),
        searchEndDate : new Date(),

        grid : `#${elemPrev}-grid`,
        searchExpansion : `#${elemPrev}-expansion-panel`,
        gridSplitter : `#${elemPrev}-splitter`,
        detailSplitterWidth: '35%',

        isSearchBtn: false,

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
                    { template: kendo.template($(`#free-board-toolbar-template`).html()) }
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
                }
            });

            $(`#${elemPrev}-write-button`).kendoButton({
                themeColor : "primary",
                click : () => {
                    let editorOption ={
                        name: 'free-board-editor',
                        height: 820,
                        width: 1020,
                        top: 100,
                        left: 100,
                    }

                    new popupWindow(`/free-board-editor?cabinetCd=${BOARD_PARAM}`, 'free-board-editor', editorOption).open();
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

            let searchType = new cpCodeDropDownTree(`#${elemPrev}-search-type`, 'DocSearchType', {value: "Title", clearButton: false, fillMode: 'solid', autoWidth: true});
            dropDownTreeUtils.makeDropDownTree(searchType, `#${elemPrev}-search-type`);

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

            gridMain.searchDefaultValues.type = 'Title';

            $(`#${elemPrev}-search-reset`).kendoButton({
                icon: 'arrow-rotate-ccw',
                themeColor: 'none',
                size: 'small',
                click: function(e){
                    $(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value(gridMain.searchStartDate);
                    $(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value(gridMain.searchEndDate);
                    $(`#${elemPrev}-search-type`).data('kendoDropDownTree').value(gridMain.searchDefaultValues.type);
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
                        return {
                            cabinetCd : BOARD_PARAM,
                            startDate: kendo.toString(new Date($(`#${elemPrev}-search-date-start`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                            endDate: kendo.toString(new Date($(`#${elemPrev}-search-date-end`).data('kendoDatePicker').value()), 'yyyy-MM-dd'),
                            searchType: $(`#${elemPrev}-search-type`).data('kendoDropDownTree').value(),
                            searchTxt: $(`#${elemPrev}-search-txt`).data('kendoTextBox').value(),
                            userId : USER_INFO.userId,
                            deptId : USER_INFO.deptId,
                            sortType: '',
                            outputYn : "Y",
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
                    model : {
                        docNm : {type : 'string'},
                        confirmPerCnt : {type : "number"},
                        rgtrDeptNm : {type : "string"},
                        rgtrNm : {type : "string"},
                        regDt : {type : "string"}
                    },
                    parse : (res) => {
                        res.data.rows.forEach((row)=>{
                            row.regDt = kendo.toString(new Date(row.regDt), "yyyy-MM-dd HH:mm");
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
            let searchType              = $(`#${elemPrev}-search-type`).data('kendoDropDownTree');
            let searchTxt               = $(`#${elemPrev}-search-txt`).data('kendoTextBox');

            let searchData = [
                { label: '등록일시', text: `${startDate} ~ ${endDate}`, value: `${startDate} ~ ${endDate}` },
                { label: searchType.text(), text: searchTxt.value(), value: searchTxt.value() }
            ];

            gridCommonUtils.gridSearchPrint(gridMain.searchExpansion, searchData);

            $(gridMain.grid).data('kendoCpGrid').setDataSource(gridMain.gridDataSource());

            gridDetail.detailHide();

        }
    }
    const gridDetail = {

        init : () =>{
            //
        },

        detailShow: (data) => {

            let editorOption ={
                name: 'free-board-detail',
                height: 850,
                width: 850,
                top: 100,
                left: 100,
            }

            new popupWindow(`/free-board-detail?docUuid=${data.docUuid}&cabinetCd=${BOARD_PARAM}`, 'free-board-detail', editorOption).open();

            //게시글 조회수 +1
            const noticeReadCnt =  new cpDataSource(METHOD.POST, `/board/v1/notice/read/insert/${data.docId}`, {}).getDataSource();
            noticeReadCnt.read();

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