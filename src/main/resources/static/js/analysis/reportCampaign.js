$(document).ready(() => {
    let prevData;
    let summary;
    const reportCampaign={
        isSearchBtn : false,
        init :async ()=>{

            $("#report-campaign-splitter").kendoSplitter({
                orientation: "vertical",
                panes: [
                    { collapsible: false, size: "46px", resizable:false, scrollable: false },
                    { collapsible: false}
                ]
            });

            let startDate = new Date();
            startDate.setDate(startDate.getDate() - 1);
            $("#report-campaign-search-date-start").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: startDate,
                size: 'small'
            });
            $("#report-campaign-search-date-end").kendoDatePicker({
                format: "yyyy-MM-dd",
                parseFormats: ['yyyy-MM-dd','yyyyMMdd'],
                value: new Date(),
                size: 'small'
            });

            $("#report-campaign-btn-search").kendoButton({
                themeColor: 'secondary',
                icon : "search",
                size: 'small',
                click: ()=>{
                    reportCampaign.isSearchBtn =true;
                    $("#report-campaign-grid").data("kendoCpGrid").dataSource.read();
                }
            });
            $("#report-campaign-btn-excel").kendoButton({
                icon: "download",
                themeColor: 'success',
                size: 'small',
                click: ()=>{
                    $("#report-campaign-grid").data("kendoCpGrid").saveAsExcel();
                }
            });

            let campaignTypeDataSource =  new cpDataSource(METHOD.GET, "/common/v1/code/CampaignType", {}).getDataSource();
            await campaignTypeDataSource.read().then(() => {
                campaignTypeData = campaignTypeDataSource.data();
                $("#report-campaign-type").kendoDropDownList({
                    dataSource: campaignTypeData,
                    dataTextField: "codeNm",
                    dataValueField: "codeKey",
                    fillMode: "solid",
                    autoWidth: true,
                    optionLabel: {codeNm: '전체', codeKey: ""},
                });
            })
        },
        gridInit : ()=>{
            const rowTemplateF = (dataItem) => {
                let returnTable;
                if (dataItem.campaignTypeNm === '소계') {
                    returnTable = `<tr data-uid=${dataItem.uid} style="background-color: #9fbede30">`;
                } else {
                    returnTable = `<tr data-uid=${dataItem.uid}>`;
                }
                if (dataItem.campaignTypeNm === '소계') {
                    returnTable += `
                    <td style="text-align: center" role="gridcell" colspan="3">
                        ${dataItem.campaignTypeNm}
                    </td>`
                } else {
                    returnTable += `
                    <td style="text-align: center" role="gridcell">
                        ${dataItem.campaignTypeNm}
                    </td>
                    <td style="text-align: center" role="gridcell">
                        ${dataItem.campaignNm}
                    </td>
                    <td style="text-align: center" role="gridcell">
                        ${dataItem.dt}
                    </td>
                    `
                }
                returnTable += `
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.totalCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.processingCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.completeCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.callsuccessCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.skipCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.rejectionCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.impossibleCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.greatsatisfactionCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.satisfactionCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.normalityCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.dissatisfactionCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style="text-align:center" role="gridcell">
                        ${String(dataItem.greatdissatisfactionCnt).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>`;
                prevData = dataItem;
                return returnTable;
            }

            $("#report-campaign-grid").kendoCpGrid({
                autoBind : false,
                rowTemplate: rowTemplateF,
                columns: [
                    { field : "campaignTypeNm",title:"해피콜유형",width:80,attributes :{style : "text-align:center"}},
                    { field : "campaignNm",title:"해피콜명",width:160},
                    { field : "dt",title:"진행기간",width:120,attributes :{style : "text-align:center"}},
                    { field : "totalCnt",title:"총건수",width:60,attributes :{style : "text-align:center"}},
                    { field : "processingCnt",title:"처리총건수",width:60,attributes :{style : "text-align:center"}},
                    {field  : "completeCnt",title: "계",width: 60,attributes :{style : "text-align:center"}},
                    {
                        title:"처리완료",
                        columns:[
                            {field: "callsuccessCnt",title: "통화성공",width:60,attributes :{style : "text-align:center"}},
                            {field: "skipCnt",title: "SKIP",width:60,attributes :{style : "text-align:center"}},
                            {field: "rejectionCnt",title: "거부",width:60,attributes :{style : "text-align:center"}},
                            {field: "impossibleCnt",title: "처리불가",width:60,attributes :{style : "text-align:center"}}
                        ]
                    },
                    {
                        title:"만족도",
                        columns:[
                            {field: "greatsatisfactionCnt",title: "매우만족",width: 60,attributes :{style : "text-align:center"}},
                            {field: "satisfactionCnt",title: "만족",width:60,attributes :{style : "text-align:center"}},
                            {field: "normalityCnt",title: "보통",width:60,attributes :{style : "text-align:center"}},
                            {field: "dissatisfactionCnt",title: "불만족",width:60,attributes :{style : "text-align:center"}},
                            {field: "greatdissatisfactionCnt",title: "매우불만족",width:60,attributes :{style : "text-align:center"}}
                        ]
                    }
                ],
                dataSource: new kendo.data.DataSource({
                    transport : {
                        read : {
                            url : "/analysis/v1/report/campaign",
                            type : "GET",
                            dataType: "json",
                            contentType: 'application/json',
                            complete : (e) =>{
                                if(reportCampaign.isSearchBtn){
                                    reportCampaign.isSearchBtn = false;
                                    message.notification({type:"info"});
                                }
                            }
                        },
                        parameterMap : (options) =>{
                            return{
                                startDate : kendo.toString($("#report-campaign-search-date-start").data("kendoDatePicker").value(), 'yyyy-MM-dd'),
                                endDate : kendo.toString($("#report-campaign-search-date-end").data("kendoDatePicker").value(),'yyyy-MM-dd'),
                                campaignType : $("#report-campaign-type").data("kendoDropDownList").value(),
                                sortType : ""
                            }
                        }
                    },
                    schema: {
                        data : 'data',
                        parse : (res) => {
                            if(res.data.length >1){
                                res.data.forEach((item,i)=> {
                                    if(item.campaignId == 0 ) {
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
    cpProgress("report-campaign-layout");
    reportCampaign.init().then(r=>{
        reportCampaign.gridInit();
        cpProgress("report-campaign-layout",false);
    });
});