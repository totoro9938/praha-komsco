$(document).ready(() => {
    let prevData;
    const callCatPerDay={
        isSearchBtn : false,
        init :async ()=>{

            $("#callcat-day-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: false, size: "45px", resizable:false, scrollable: false },
                    { collapsible: false}
                ]
            });

            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
            $("#callcat-day-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });
            $("#callcat-day-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $("#callcat-day-btn-search").kendoButton({
                themeColor: 'secondary',
                icon : "search",
                size: 'small',
                click: ()=>{
                    callCatPerDay.isSearchBtn =true;
                    $("#callcat-day-grid").data("kendoCpGrid").dataSource.read();
                }
            });
            $("#callcat-day-btn-excel").kendoButton({
                icon: "download",
                themeColor: 'success',
                size: 'small',
                click: ()=>{
                    $("#callcat-day-grid").data("kendoCpGrid").saveAsExcel();
                }
            });
            let callCat  = new cpCatDropDownTree('#callcat-day-callcat',{value:"0",placeholder:"전체", fillMode: 'solid', autoWidth: true});
            callCat.create();
            let data = await callCat.getData();
            let allObject = {
                catId: "0",
                catNm: "전체",
                fullCatNm: "전체",
                items: []
            }
            let dataSource = new kendo.data.HierarchicalDataSource({data: [allObject,...data.options.data]});
            $("#callcat-day-callcat").data("kendoDropDownTree").setDataSource(dataSource);
        },
        gridInit : ()=>{
            const rowTemplateF = (dataItem) =>{
                let path1Cnt = $("#callcat-day-grid").data("kendoCpGrid").dataItems().filter(data => dataItem.catLvl != 0 && data.catPath.split('.')[0] === dataItem.catPath.split('.')[0]).length -1;
                let path2Cnt = $("#callcat-day-grid").data("kendoCpGrid").dataItems().filter(data => dataItem.catLvl != 0 && data.catPath.split('.')[1] === dataItem.catPath.split('.')[1]).length;
                let returnTable ="";
                if(dataItem.catLvl==0){
                    returnTable = `<tr data-uid=${dataItem.uid} style="background-color: #9fbede30">
                        <td style="text-align:center" role="gridcell" colspan="3">
                            ${dataItem.catPath1}
                        </td>`;
                }else{
                    returnTable = `<tr data-uid=${dataItem.uid}>`;
                    if(prevData === undefined || prevData.catPath.split('.')[0]!= dataItem.catPath.split('.')[0]){
                        returnTable +=  `<td style="text-align:center" role="gridcell" rowspan="${path1Cnt}">
                                ${dataItem.catPath1}
                            </td>`;
                    }
                    if(dataItem.catPath2 == ""){
                        returnTable +=  `<td style="text-align:center" role="gridcell">
                                ${dataItem.catPath2}
                            </td>`;
                    }else if(prevData === undefined || prevData.catPath.split('.')[1] != dataItem.catPath.split('.')[1]){
                        returnTable +=  `<td style="text-align:center" role="gridcell" rowspan="${path2Cnt}">
                                ${dataItem.catPath2}
                            </td>`;
                    }
                    returnTable +=  `<td style="text-align:center" role="gridcell">
                        ${dataItem.catPath3}
                    </td>`;

                }
                returnTable += `
                   
                    <td style="text-align:center" role="gridcell">
                         ${String(dataItem.defaultCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.reservationCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.empTransferCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.callTransferCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.callTotalCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.processCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.transferCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>`;
                prevData = dataItem;
                return returnTable;
            }

            $("#callcat-day-grid").kendoCpGrid({
                autoBind : false,
                rowTemplate: rowTemplateF,
                columns: [
                    {
                        title:"상담분류",
                        columns:[
                            {field: "catPath1",title: "대",width: 60,attributes :{style : "text-align:center"}},
                            {field: "catPath2",title: "중",width:60,attributes :{style : "text-align:center"}},
                            {field: "catPath3",title: "소",width:60,attributes :{style : "text-align:center"}},
                        ]
                    },
                    {
                        title:"상담건",
                        columns:[
                            {field: "defaultCnt",title: "상담완료",width: 60,attributes :{style : "text-align:center"}},
                            {field: "reservationCnt",title: "예약상담",width:60,attributes :{style : "text-align:center"}},
                            {field: "empTransferCnt",title: "업무이관",width:60,attributes :{style : "text-align:center"}},
                            {field: "callTransferCnt",title: "호전환",width:60,attributes :{style : "text-align:center"}},
                            {field: "callTotalCnt",title: "계",width:60,attributes :{style : "text-align:center"}}
                        ]
                    },
                    { field : "processCnt",title:"직접처리",width:60,attributes :{style : "text-align:center"}},
                    { field : "transferCnt",title:"부서연결",width:60,attributes :{style : "text-align:center"}}
                ],
                dataSource: callCatPerDay.callCatDayDataSource(),
                height: '100%',
                resizable: false,
                dataBound : (e) =>{
                    prevData = undefined;
                },
                excelExport: (e) => {
                    let rangedate = kendo.toString(new Date(), 'yyyy-MM-dd');
                    e.workbook.fileName = "상담분류별접수현황(일별) " +rangedate+ ".xlsx";
                }
            });
        },
        callCatDayDataSource : () =>{
            return new kendo.data.DataSource({
                transport : {
                    read : {
                        url : "/analysis/v1/report/call-cat-day",
                        type : "GET",
                        dataType: "json",
                        contentType: 'application/json',
                        complete : (e) =>{
                            if(callCatPerDay.isSearchBtn){
                                callCatPerDay.isSearchBtn = false;
                                message.notification({type:"info"});
                            }
                        }
                    },
                    parameterMap : (options) =>{
                        return{
                            startDate : kendo.toString($("#callcat-day-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                            endDate : kendo.toString($("#callcat-day-search-date-end").data("kendoDatePicker").value(),'yyyy-MM-dd'),
                            callCatId : $("#callcat-day-callcat").data("kendoDropDownTree").value(),
                            sortType :"",
                        }
                    }
                },
                schema: {
                    data : 'data',
                }
            })
        }
    }
    cpProgress("callcat-day-layout");
    callCatPerDay.init().then(r=>{
        callCatPerDay.gridInit();
        cpProgress("callcat-day-layout",false);
    });
});