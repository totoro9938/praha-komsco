const callHistoryData = [
    {
        callDate: "2022-01-10 13:11",
        callClass: "010-1111-2222",
        question: "여권 발급 받으려면 어떤 서류를 챙겨야하는지 알려주세요. ",
        answer: "상담완료",
        agent: "상담원1",
        callTime: "00:01:22"
    },
    {
        callDate: "2022-01-10 10:56",
        callClass: "02-123-4567",
        question: "가로등 점멸 문의",
        answer: "상담완료",
        agent: "상담원2",
        callTime: "00:12:56"
    },
    {
        callDate: "2022-01-14 16:30",
        callClass: "",
        question: "기접수건으로 재인입/ 어제 담당부서 전화번호 안내 받았는데 번호를 잃어버렸다고 하심",
        answer: "상담완료",
        agent: "상담원1",
        callTime: "00:05:12"
    },
    {
        callDate: "2022-01-14 16:37",
        callClass: "",
        question: "수도요금-뒷집 고지서가 본인 집에 오고 본인 집은 고지서가 오지 않는다고 함",
        answer: "담당자호전환",
        agent: "상담원2",
        callTime: "00:13:11"
    },
    {
        callDate: "2022-01-14 16:15",
        callClass: "",
        question: "2000cc 카렌스를 가지고 있는데 1월에 폐차를 하려고하면 어떻게 해야하는지 문의/연납고지서가 나왔다함",
        answer: "상담완료",
        agent: "상담원3",
        callTime: "00:15:43"
    },
    {
        callDate: "2022-01-14 16:11",
        callClass: "",
        question: "시청 정문 입구 일자리 창출 부서에서 팩스번호 안내 받아 4대보험 완납증명서 보냈다며 들어 갔는지 문의",
        answer: "상담완료",
        agent: "상담원5",
        callTime: "00:05:53"
    },
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},
    {callDate: "　", callClass: "", question: "", answer: "", agent: "", callTime: ""},

];

$("#tabstrip3").kendoTabStrip({
        animation: {open: {effects: "fadeIn"}}
    }
).data("kendoTabStrip").activateTab($("#tab3_1"));

$("#customerName").kendoTextBox({});
$("#subal").kendoTextBox({});
$("#phoneNumber").kendoTextBox({});
$("#homeNumber").kendoTextBox({});

$('#custClass').kendoBadge({
    themeColor: 'success',
    text: '일반고객'
});

$("#remark").kendoTextArea({
    rows: 2,
});

$("#badge").kendoBadge({
    text: 2,
    themeColor: "error",
});

$("#smsReceiveYn").kendoSwitch({
    messages: {
        checked: "",
        unchecked: "",
    },
    checked: true,
});
$("#happyCallReceiveYn").kendoSwitch({
    messages: {
        checked: "",
        unchecked: "",
    },
    checked: true,
});

$("#callClass").kendoDropDownList();
$("#callCategory").kendoDropDownList();
$("#question").kendoTextArea({
    rows: 8
});
$("#answer").kendoTextArea({
    rows: 8,
});
$("#memo").kendoTextArea({
    rows: 3,
});
$("#callType").kendoRadioGroup({
    items: ["상담완료", "예약상담", "상담이관", "담당자호전환", "상담사호전환"],
    layout: "horizontal",
    value: "상담완료"
});

$("#customerBlackRegistryBtn").kendoButton({
    themeColor: "primary",
    icon: "save"
});
$("#customerSearchBtn").kendoButton({
    themeColor: "info",
    icon: "search",
    size:'small'
});
$("#customerSaveBtn").kendoButton({
    themeColor: "success",
    icon: "save"
});

$("#sendSMSBtn").kendoButton({
    themeColor: "dark"
});
$("#manualRequestBtn").kendoButton({
    themeColor: "light"
});
$("#callSaveBtn").kendoButton({
    themeColor: "teritary"
});
$("#resetBtn").kendoButton({
    themeColor: "warning"
});

$('#callHistoryGrid').kendoListView({
    height: 770,
    scrollable: true,
    dataSource: {
        data: callHistoryData,
        pageSize: 15
    },
    selectable: "multiple",
    pageable: true,
    template: kendo.template($("#template").html())
});

let userDropDown = new cpUserDropDown("#main-users",USER_INFO.deptId);
let userDropDownCreate = userDropDown.init();

const deptAutoCompleteEvent = (e) => {

    let row = dropTreeRow(e);
    let call = userDropDown.getDeptData(row.deptId);
    call.read().then(()=>{
        userDropDownCreate.setDataSource(call.data());
    });

}
const codeTreeCheng = (e) => {
    console.log(dropTreeRow(e));
}


let options = {change:deptAutoCompleteEvent};
let deptDropDownTree = new cpDeptDropDownTree('#main-dept',options,'CONSULT_MAIN',USER_INFO.deptId).init();

let codeOptions = {change:codeTreeCheng};
let codeDropDownTree = new cpCodeDropDownTree('#main-code','CallClass',codeOptions).init();

let callClassOptions = {change:codeTreeCheng};
let callClassDropDownTree = new cpCodeDropDownTree('#main-callClass','CallClass',codeOptions).init();



let catOptions = {change:codeTreeCheng};
let catDropDownTree = new cpCatDropDownTree('#main-call-cat',catOptions).init();



