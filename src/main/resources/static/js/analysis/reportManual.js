$(document).ready(() => {
    let summary;
    const reportManual={
        isSearchBtn : false,
        init :async ()=>{

            $("#report-manual-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: false, size: "46px", resizable:false, scrollable: false },
                    { collapsible: false}
                ]
            });

            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
            $("#report-manual-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });
            $("#report-manual-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $("#report-manual-btn-search").kendoButton({
                themeColor: 'secondary',
                icon : "search",
                size: 'small',
                click: ()=>{
                    reportManual.isSearchBtn =true;
                    $("#report-manual-grid").data("kendoCpGrid").dataSource.read();
                }
            });
            $("#report-manual-btn-excel").kendoButton({
                icon: "download",
                themeColor: 'success',
                size: 'small',
                click: ()=>{
                    $("#report-manual-grid").data("kendoCpGrid").saveAsExcel();
                }
            });

            await new cpDeptDropDownTree('#report-manual-department', {clearButton: false, fillMode: 'solid', autoWidth: true},"REPORT_MANUAL_LIST",USER_INFO.deptId,IS.TRUE,IS.FALSE).init();
        },
        gridInit : ()=>{
            $("#report-manual-grid").kendoCpGrid({
                autoBind : false,
                columns: [
                    { field : "deptNm",title:"부서",width:100},
                    { field : "totCnt",title:"등록건수",width:80,attributes :{style : "text-align:center"}},
                    { field : "mdfCnt",title:"수정건수",width:80,attributes :{style : "text-align:center"}},
                    { field : "delCnt",title:"삭제건수",width:80,attributes :{style : "text-align:center"}},
                    {
                        title:"부서",
                        columns:[
                            {field: "deptRegCnt",title: "신규등록",width:60,attributes :{style : "text-align:center"}},
                            {field: "deptMdfCnt",title: "수정등록",width:60,attributes :{style : "text-align:center"}},
                            {field: "deptDelCnt",title: "삭제",width:60,attributes :{style : "text-align:center"}}
                        ]
                    },
                    {
                        title:"콜센터요청",
                        columns:[
                            {field: "callRegCnt",title: "신규등록",width:60,attributes :{style : "text-align:center"}},
                            {field: "callMdfCnt",title: "수정등록",width:60,attributes :{style : "text-align:center"}},
                            {field: "callDelCnt",title: "삭제",width:60,attributes :{style : "text-align:center"}}
                        ]
                    }
                ],
                dataSource: new kendo.data.DataSource({
                    transport : {
                        read : {
                            url : "/analysis/v1/report/manual",
                            type : "GET",
                            dataType: "json",
                            contentType: 'application/json',
                            complete : (e) =>{
                                if(reportManual.isSearchBtn){
                                    reportManual.isSearchBtn = false;
                                    message.notification({type:"info"});
                                }
                            }
                        },
                        parameterMap : (options) =>{
                            let auth = userAuthRange("REPORT_MANUAL_LIST")!== AUTH_RANG.NOTHING ? true : false;
                            return{
                                startDate : kendo.toString($("#report-manual-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                                endDate : kendo.toString($("#report-manual-search-date-end").data("kendoDatePicker").value(),'yyyy-MM-dd'),
                                parentId: auth ? $("#report-manual-department").data("kendoDropDownTree").value():0,
                                deptId: auth ? 0 : $("#report-manual-department").data("kendoDropDownTree").value()
                            }
                        }
                    },
                    schema: {
                        data : 'data',
                        parse : (res) => {
                            if(res.data.length >1){
                                res.data.forEach((item,i)=> {
                                    if(item.deptId == 0 ) {
                                        summary = item;
                                        res.data.splice(i, 1);
                                    }
                                })
                                res.data.push(summary);
                            }
                            return res;
                        }
                    }
                }),
                height: '100%',
                resizable: false,
                dataBound : () =>{
                    summary = undefined;
                }
            });
        }
    }
    cpProgress("report-manual-layout");
    reportManual.init().then(r=>{
        reportManual.gridInit();
        cpProgress("report-manual-layout",false);
    });
});