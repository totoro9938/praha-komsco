'use strict'

let MENU_ARRAY;
let mainTabs;
let clientDb;
kendo.culture('ko-KR');
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};
window.onbeforeunload = function () {
    /*
    //새로고침 로그아웃
        new cpDataSource(METHOD.GET,'/logout')
            .getDataSource()
            .fetch(()=>{

            });
            */
    ipron.AgentLogout(USER_INFO.ctiStation, USER_INFO.ctiId, 0);
    new popupWindow().allClose();

}
let IS_TAB = false;
let homeAlarmBadge;
$(document).ready(function () {
    document.title = CENTER_NAME;
    $("#appbar").kendoAppBar({
        items: [
            {
                template: '<span class="k-icon k-i-menu" id="toolbar" style="cursor: pointer" title="메뉴"></span>',
                type: "contentItem"
            },
            {width: 16, type: "spacer"},
            {
                template: `<span id="logo" style="color: white; font-size: 24px; font-weight: bold;">${CENTER_NAME}</span>`,
                type: "contentItem"
            },
            {width: 60, type: "spacer"},
            {
                template: `<input id="cti-phone-number" class="cp-cti-phone-number" style="width: 175px;">`,
                type: "contentItem"
            },
            {
                template: `<span id="soft-phone" style="display: none;">
                            <button id="cti-button-make-call" data-role="button">걸기</button>
                            <button id="cti-button-answer-call" data-role="button">받기</button>
                            <button id="cti-button-clear-call" data-role="button">끊기</button>
                            <button id="cti-button-hold" data-role="button">보류</button>
                            <button id="cti-button-retrieve-call" data-role="button">해제</button>
                            <button id="cti-button-state-ready" data-role="button">수신대기</button>
                            <button id="cti-button-single-step-transfer" data-role="button">호전환</button>
                            <span style="z-index: 100004;"><button id="cti-button-snarl" data-role="button" >통화종료</button></span>
                           </span>`,
                type: "contentItem"
            },
            {width: 1, type: "spacer"},
            {
                template:
                    `
                    <span id="agent-status-bar" style="display: none;">
                        <ui id="cti-status-popover" style="z-index: 100004;"><span id="cti-status" style="height: 30px; width: 100px; cursor: pointer;font-size:18px;font-weight: bold;"></span></ui>
                    </span>
                    <span id="cti-report" style="width: 200px;height: 30px;text-align:center;display: none;"></span>
                    `,
                type: "contentItem"
            },
            {type: "spacer"},
            {
                template: '<button id="home-transferListOpen" title="담당자찾기"></button>',
                type: "contentItem"
            },
            {type: "spacer"},
            {
                template: `<span>
                            <button id="home-alarm" title="알림센터"></button>
                           </span>`,
                type: "contentItem"
            },
            {width: 30, type: "spacer"},
            {
                template: `<button id="home-top-btn" title="로그아웃 및 패스워드변경"></button>`, type: "contentItem"
            },
            {width: 16, type: "spacer"}
        ]
    });


    $("#toolbar").on("click", function (e, is) {
        let drawerInstance = $("#drawer-content").data('kendoDrawer');
        let drawerContainer = drawerInstance.drawerContainer;
        let isOpen = true;
        if (drawerContainer.hasClass("k-drawer-expanded")) {
            isOpen = false;
        }

        resize(is || isOpen);

        function resize(isOpen) {
            if (isOpen) {
                drawerInstance.show();
            } else {
                drawerInstance.hide();
            }

            //let openWindow = $('[name=program-open]').parents().find('.k-display-inline-flex');
            let openWindow = $('[name=program-open]').parent();

            if (openWindow) {
                setTimeout(function () {
                    kendo.resize(openWindow);
                }, 400);
            }
        }
    });

    $("#home-top-btn").kendoFloatingActionButton({
        icon: "c-three-dots-vertical",
        align: 'top end',
        themeColor: "primary",
        size: "small",
        alignOffset: {
            x: 10,
            y: 10
        },
        collapse: function (e) {
            e.sender.setOptions({icon: 'c-three-dots-vertical'});
            // $('#home-top-btn > span').removeClass('k-i-c-x-lg');
            // $('#home-top-btn > span').addClass('k-i-c-three-dots-vertical');
        },
        expand: function (e) {
            //$(".k-animation-container.k-animation-container-shown").parent().css('z-index', 200000);
            $('.k-animation-container.k-animation-container-shown').css('z-index', 200000);
            e.sender.setOptions({icon: 'c-x-lg'});
            // $('#home-top-btn > span').removeClass('k-i-c-three-dots-vertical');
            // $('#home-top-btn > span').addClass('k-i-c-x-lg');
        },
        click: function () {
            let alarmWin = $('#home-alert-window').data("kendoWindow");
            if(alarmWin) {
                alarmWin.close();
                $("#home-alarm").data("kendoFloatingActionButton").setOptions({icon: 'c-bell-fill-rotate-30'});
                // $('#home-alarm > span').removeClass('k-i-c-x-lg');
                // $('#home-alarm > span').addClass('k-i-c-bell-fill-rotate-30');
            }
            keyFrameSet();
        },
        items: [{
            label: '로그아웃',
            icon: 'c-door-closed',
            cssClass: 'z-index1000004',
            click: function () {
                message.callBackConfirm({msg: '로그아웃 하시겠습니까?', callback: new user().logout})
            }
        }, {
            label: '패스워드변경',
            icon: 'c-key',
            cssClass: 'z-index1000004',
            click: function () {
                new user().passwordWindow();
            },
        }]
    });

    $("#home-transferListOpen").kendoFloatingActionButton({
        icon: 'c-people-fill',
        align: "top end",
        size: "small",
        shape: 'rectangle',
        alignOffset: {
            x: 104,
            y: 10
        },
        click: function () {
            let opt = {
                height: 600,
                width: 1240,
                top: 200,
                left: 200,
            };
            new popupWindow('/transferList', "transfer", opt).open()
        }
    });

    let authStr = USER_AUTHORITY.filter(auth => auth.authority.includes("ROLE_CONSULT_MAIN_SELECT"));
    if(authStr.length <= 0) $("#home-transferListOpen").hide();

    $("#home-alarm").kendoFloatingActionButton({
        icon: 'c-bell-fill-rotate-30',
        align: "top end",
        size: "small",
        shape: 'rectangle',
        alignOffset: {
            x: 57,
            y: 10
        },
        click: function (e) {
            let alarmWin = $('#home-alert-window').data("kendoWindow");
            if (alarmWin) {
                e.sender.setOptions({icon: 'c-bell-fill-rotate-30'});
                // $('#home-alarm > span').removeClass('k-i-c-x-lg');
                // $('#home-alarm > span').addClass('k-i-c-bell-fill-rotate-30');
                alarmWin.close();
            } else {
                e.sender.setOptions({icon: 'c-x-lg'});
                // $('#home-alarm > span').removeClass('k-i-c-bell-fill-rotate-30');
                // $('#home-alarm > span').addClass('k-i-c-x-lg');
                new user().alertMake();
            }
            keyFrameSet();
        }
    });
    // homeAlarmBadge = $('#home-alarm-badge').kendoBadge({
    //     themeColor: 'error',
    //     shape: 'dot'
    // }).data('kendoBadge');

    tab.init();
    new menuClass().menuMaker().catch(console.error);

    new menuClass().addWindow({programId: 1000001, programNm: '대시보드', url: '/dashboard'});
});

const HOME_ALARM_CALL = new cpDataSource(METHOD.GET, `/common/v1/user/alert?readYn=`).getDataSource();
let HOME_ALARM_DATA = [];

const switchChange = (e) => {
    if (e.checked) {

        let sender = e.sender;
        let data = sender.options.alarmData;
        alarmOnRead(data);
    }
}


const alarmFilter = (type) => {

    let list = $("#home-alarm-list-view").data('kendoListView');

    let f = type ? [{field: "alarmType", operator: "eq", value: type}] : [];

    let listData = new kendo.data.DataSource({
        data: HOME_ALARM_DATA,
        filter: {
            logic: "or",
            filters: f
        },
        sort: [
            {field: "readYn", dir: "asc"},
            {field: "alarmType", dir: "asc"}
        ]
    });


    list.setDataSource(listData);
}
const alarmOnclick = (e) => {
    let data = e.data.row;
    let expr = data.alarmType;
    let drawer = $("#drawer-content").data('kendoDrawer');
    let isWindow = true;
    let menu;
    let editorOption;
    switch (expr) {
        case 'Campaign':
        case 'SmsRv':
        case 'Transfer':
        case 'Message':
        case 'Res':
            menu = MENU_ARRAY.find(menu => menu.programId === data.menuId);
            break;
        case 'Callback':
            menu = MENU_ARRAY.find(menu => menu.programId == data.srcId3);
            break;
        case 'Notice':
            editorOption = {
                name: `${data.srcId2}`,
                height: 750,
                width: 850
            }
            isWindow = false;
            break;
        default:
            console.log(`none ${expr}`);
    }

    if (isWindow) {
        if (!menu) return;
        let wrapper = drawer.drawerItemsWrapper;
        wrapper.find('li').removeClass('k-state-selected');
        let item = wrapper.find(`#menu-${menu.programId}`);
        item.addClass('k-state-selected');
        item.find(".k-icon").removeClass("k-i-c-grid").addClass("k-i-c-grid-fill cp-open-color");
        if (menu && menu.popupYn === 'N') {
            new menuClass().addWindow(menu);
        } else if (menu && menu.popupYn === 'Y') {
            let layout = {height: 1000, width: 1000}
            try {
                layout = JSON.parse(menu.parameter);
            } catch (e) {
                console.log('팝업 기본값 설정.')
            }
            new popupWindow(menu.url, menu.roleNm, layout).open()
        }

    } else {
        new popupWindow(`/notice-detail?docUuid=${editorOption.name}`, `${editorOption.name}`, editorOption).open();
    }

    alarmOnRead(data);
}

const alarmOnRead = (data) => {

    if (data.readYn === 'Y') return;

    let url = `/common/v1/user/alert/read/${data.alarmId}`;
    let call = new cpDataSource(METHOD.PUT, url).getDataSource();
    return call.read().then(function () {

        HOME_ALARM_DATA = HOME_ALARM_DATA.map(r => {
            if (r.alarmId === data.alarmId) r.readYn = 'Y';
            return r;
        });
        alarmFilter();

        let messageObj = {title: '알림센터', msg: '읽음 처리 되었습니다.', type: 'success'}
        message.notification(messageObj);
    });
}

const todayWorkingList = [{type: "Reservation", roleNm: "CONSULT_RESERVE_LIST"},
    {type: "EmpTransfer", roleNm: "WORK_TRANSFER_LIST"},
    {type: "Callback", roleNm: "CONSULT_CALLBACK_LIST"},
    {type: "Campaign", roleNm: "CONSULT_HAPPYCALL_LIST"}];

const todayWorking = (type) => {
    console.log(type);
    let menu = MENU_ARRAY.find(r => r.roleNm === todayWorkingList.find(t => t.type === type).roleNm);
    if (menu) new menuClass().addWindow(menu);

}
const ALARM_TYPE = Object.freeze([
    {
        "type": "Res",
        "text": "예약",
        "menuId": 140,
        "color": "#EE347BFF",
        "switchChange": switchChange,
        "onClick": alarmOnclick
    },
    {
        "type": "Callback",
        "text": "콜백",
        "menuId": 142,
        "color": "#F1873CFF",
        "switchChange": switchChange,
        "onClick": alarmOnclick
    },
    {
        "type": "Campaign",
        "text": "캠페인",
        "menuId": 185,
        "color": "#e3be43",
        "switchChange": switchChange,
        "onClick": alarmOnclick
    },
    {
        "type": "SmsRv",
        "text": "문자",
        "menuId": 357,
        "color": "#3ca85b",
        "switchChange": switchChange,
        "onClick": alarmOnclick
    },
    {
        "type": "Transfer",
        "text": "이관",
        "menuId": 141,
        "color": "#0FA0EEFF",
        "switchChange": switchChange,
        "onClick": alarmOnclick
    },
    {
        "type": "Message",
        "text": "쪽지",
        "menuId": 133,
        "color": "#252dc4",
        "switchChange": switchChange,
        "onClick": alarmOnclick
    },
    {
        "type": "Notice",
        "text": "공지",
        "color": "#7A3296FF",
        "switchChange": switchChange,
        "onClick": alarmOnclick
    },
]);

const homeAlertFnc = {
    dataSet: (data) => {
        return `<div class="c-home-alert">
                        <span style="float:right;position: relative;top:36px;" id="cp-alert-badge-${data.alarmId}"></span>
                        <h5 style="margin-block-end: 0px;margin-block-start: 20px;position: relative;top: -20px;">
                        <span id="cp-alert-avatar-${data.alarmId}"></span>
                        ${data.title}
                         <nobr style="float:right;">${kendo.toString(new Date(data.regDt), "yyyy-MM-dd H:mm:ss")}</nobr>
                        </h5>
                        <p style="margin-block-start: 5px;margin-block-end: 5px;margin-inline-start: 10px;position: relative;top: -17px;width: 85%;">
                        <small style="white-space: pre-line;text-decoration: underline;cursor: pointer" id="btn-${data.alarmId}" data-bind="click: onClick"> ${data.contents.replaceAll('\n', '<br>')}</small>
                        </p>
                    </div>`;
    },
    readYnFilter: (obj, check = undefined) => {
        if (check) return obj.readYn === check;
        else return true;
    },
    listDataSource: () => {
        return new kendo.data.DataSource({
            data: HOME_ALARM_DATA,
            sort: [
                {field: "readYn", dir: "asc"},
                {field: "alarmType", dir: "asc"}
            ]
        })
    },
    kendoInit: () => {
        let listView = $("#home-alarm-list-view");
        if (listView.data('kendoListView')) {
            listView.data('kendoListView').setDataSource(homeAlertFnc.listDataSource());
            return;
        }
        listView.kendoListView({
            dataSource: homeAlertFnc.listDataSource(),
            template: `#= homeAlertFnc.dataSet(data) #`,
            selectable: true,
            dataBound: function (e) {
                alarmCnt();
                e.sender.dataItems().map(data => {

                    let row = ALARM_TYPE.find(t => t.type === data.alarmType);
                    let avatar = $(`#cp-alert-avatar-${data.alarmId}`);

                    avatar.kendoAvatar({
                        style: {
                            "background-color": row.color
                        },
                        text: row.text.replace('페인', '')
                    });

                    let fnc = kendo.observable({
                        onClick: row.onClick,
                        row: $.extend(data, {menuId: row.menuId})
                    });
                    kendo.bind($(`#btn-${data.alarmId}`), fnc);
                    let is = (data.readYn === 'N');
                    if (is) {
                        $(`#cp-alert-badge-${data.alarmId}`).kendoSwitch({
                            size: "small",
                            checked: !is,
                            messages: {
                                checked: "읽음",
                                unchecked: "안읽음"
                            },
                            alarmData: data,
                            enabled: is,
                            change: row.switchChange
                        });
                    } else {
                        $(`#cp-alert-badge-${data.alarmId}`).kendoBadge({
                            themeColor: 'success',
                            text: '읽음'
                        });
                    }
                });
            },
            change: function (e) {
                console.log(e);
            }
        });
    },
    callJob(isNew = true) {
        if (isNew) cpProgress('alarm-work-container');
        new cpDataSource(METHOD.GET, `/common/v1/user/call-job`)
            .getDataSource()
            .fetch(function () {
                let rows = this.view();
                let worked = rows
                    .filter(row => row.callType)
                    .map(row => {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            bodyTemplate: `<div class="c-info-container">
                                            <div class="c-info-holder">
                                                <span class="c-item-values">${row.cnt}</span>
                                                <span class="c-text-indicator">${row.callTypeNm}</span>
                                            </div>
                                        </div>`
                        }
                    });

                let working = rows
                    .filter(row => todayWorkingList.find(t => t.type === row.callType))
                    .map(row => {
                        return {
                            colSpan: 1,
                            rowSpan: 1,
                            bodyTemplate: `<div class="c-info-container">
                                            <div class="c-info-holder">
                                                <span class="c-item-values-working" style="cursor: pointer" onclick="todayWorking('${row.callType}')">${row.nonProcessCnt}</span>
                                                <span class="c-text-indicator">${row.callTypeNm}</span>
                                            </div>
                                        </div>`
                        }
                    });

                let homeCallJobTodayWork = $("#home-call-job-today-work").data('kendoTileLayout');
                let homeCallJobTodayWorking = $("#home-call-job-today-working").data('kendoTileLayout');
                if (homeCallJobTodayWork) {
                    homeCallJobTodayWork.setOptions({
                        containers: worked
                    });
                    homeCallJobTodayWorking.setOptions({
                        containers: working
                    });
                    if (isNew) cpProgress('alarm-work-container', false);
                    return false;
                }

                $("#home-call-job-today-work").kendoTileLayout({
                    containers: worked,
                    columns: 3,
                    columnsWidth: 123,
                    rowsHeight: 76,
                    width: '100%',
                    height: 'auto',
                    gap: {
                        columns: 5,
                        rows: 5
                    }
                });
                $("#home-call-job-today-working").kendoTileLayout({
                    containers: working,
                    columns: 4,
                    columnsWidth: 91,
                    rowsHeight: 76,
                    width: '100%',
                    height: 'auto',
                    gap: {
                        columns: 5,
                        rows: 5
                    }
                });

                if (!isNew) {
                    alarmEffect = kendo.fx("#alarm-work-container").flip("vertical", $("#home-call-job-today-working"), $("#home-call-job-today-work")).duration(500);
                    todayShow();
                } else {
                    cpProgress('alarm-work-container', false);
                }
            });
    },
    callJobChart() {

        $("#home-call-job-chart").kendoChart({
            title: {
                text: `${USER_INFO.userNm} 님 오늘 상담 현황`
            },
            legend: {
                position: "left"
            },
            seriesDefaults: {
                labels: {
                    visible: false,
                    background: "transparent",
                    template: "#= category #(#= value# 건)",
                    position: "outsideEnd",
                }
            },
            tooltip: {
                visible: true,
                template: "#= category #(#= value# 건)"
            },
            chartArea: {
                height: 250,
                width: 380
            },
            dataSource: {
                transport: {
                    read: {
                        url: "/common/v1/user/call-job",
                        dataType: "json"
                    }
                },
                schema: {
                    data: 'data'
                }
            },
            series: [{
                type: "column",
                field: "cnt",
                categoryField: "callTypeNm",
                padding: 0
            }]
        });
    }
}
let alarmEffect;

function todayShow(e) {
    let reverse = true;
    if (e) {
        $('.today-work-text').removeClass('active');
        $(e).addClass('active');
        let title = $(e).prop("title");
        reverse = title === 'working';
        homeAlertFnc.callJob();
    }
    let h = reverse ? 83 : 166;
    $('#alarm-work-container').height(h);
    alarmEffect.stop();
    reverse ? alarmEffect.reverse() : alarmEffect.play();
}

class user {
    homeAlert;

    logout() {
        ipron.AgentLogout(USER_INFO.ctiStation, USER_INFO.ctiId, 0);
        window.location.href = '/logout';
    }

    passwordWindow() {
        let $div = $(`<div id="home-password-window" style="" ></div>`);

        $div.kendoWindow({
            width: 500,
            height: 520,
            position: {
                top: 60,
                left: '40%'
            },
            title : "패스워드 변경",
            resizable: false,
            content: '/user-password',
            modal: {
                preventScroll: true
            },
            close: function (e) {
                e.sender.destroy();
            },
            open: function (e) {
            },
            error: function (e) {
                if (e.xhr?.status === 403) {
                    message.callBackAlert({msg: '세션이 종료되었습니다.', callback: new user().logout})
                    return false;
                }
            }
        }).data('kendoWindow').open();
    }

    alertCheck() {
        let alert = $('#home-alert-window').data("kendoWindow");
        if (alert) {
            alert.refresh();
            return true;
        }
        return false;
    }

    alertMake() {
        let $div = $(`<div id="home-alert-window" style="background-color: rgba(239, 240, 241, 0.29);" ></div>`);
        if (this.alertCheck()) return false;
        $div.kendoWindow({
            width: 400,
            maxHeight: 800,
            resizable: false,
            draggable: false,
            appendTo: '#alarm-container-window',
            title: false,
            content: {
                template: `
                            <div>
                                <span style="display: flex;justify-content: space-between;">
                                    <div class="k-block c-alarm-title-todo-color" style="width: 100%;height: 24px;padding: 0em 0.2em;text-align: center;margin-right: 3px;">
                                        <span class="today-work-text active" title="working" onclick="todayShow(this)">오늘의 할일</span> 
                                    </div>
                                    <div class="k-block c-alarm-title-info-color" style="width: 100%;height: 24px;padding: 0em 0em;text-align: center;">
                                    <span class="today-work-text" title="worked" onclick="todayShow(this)">오늘의 상담현황</span>
                                    </div>
                                </span>
                                <div id="alarm-work-container" class="alarm-work-container">
                                    <div id="home-call-job-today-work" style="position: absolute"></div>
                                    <div id="home-call-job-today-working" style="position: absolute"></div>
                                </div>
                                <div class="k-block c-alarm-title-msg-report-color" style="width: 100%;height: 24px;padding: 0em 0em;text-align: center;margin-top: 5px;">알림 현황</div>
                                <div id="home-alarm-status" ></div>
                                <ul id="home-alarm-read-check-box" style="margin-bottom: 5px;"></ul>
                                <ul id="home-alarm-check-box" style="margin-bottom: 5px;"></ul>
                                <ul id="home-alarm-list-view"></ul>
                                <button id="home-fab-text"></button>
                            </div>
                        `
            },
            modal: false,
            close: function () {
                this.destroy();
            },
            refresh: function () {
                homeAlertFnc.kendoInit();
                homeAlertFnc.callJob(false);
                if ($("#home-fab-text").data('kendoFloatingActionButton')) return;
                setTimeout(() => {

                    $("#home-fab-text").kendoFloatingActionButton({
                        icon: 'reload',
                        align: "top end",
                        size: "small",
                        shape: 'rectangle',
                        positionMode: 'absolute',
                        alignOffset: {
                            y: 5,
                            x: 5
                        },
                        click: homeAlertFnc.callJob
                    });
                }, 100)

            },
            error: function (e) {
                if (e.xhr?.status === 403) {
                    message.callBackAlert({msg: '세션이 종료되었습니다.', callback: new user().logout})
                    return false;
                }
            }
        }).data('kendoWindow').open();
    }
}

class menuClass {
    constructor() {
        this.menuUrl = '/home/v1/program-user';
    }

    getData() {
        let call = new cpDataSource(METHOD.GET, this.menuUrl,).getDataSource();
        return call.read().then(function () {
            let menuData = Object.freeze(call.data());
            localStorage.setItem("MENU_ARRAY", kendo.stringify(menuData));
            MENU_ARRAY = JSON.parse(localStorage.getItem("MENU_ARRAY"));
            return menuData;
        });
    }

    async menuMaker() {
        const data = await this.getData();
        let level3 = true;
        let isOpen = true;
        let openParentsId = 0;
        let menuTemplate = data
            .filter(menu => menu.programLvl > 1 && menu.programLvl <= 3)
            .reduce((addMenus, menu) => {
                const {programLvl, parentId, programId, programNm} = menu;
                let contents;
                if (programLvl === 2) {
                    if (openParentsId === 0) openParentsId = programId;
                    contents = `${addMenus}<li data-role='drawer-item' class='c-drawer-top-item'>
                        <span class='k-icon k-i-c-list-stars'></span>
                        <span class='k-item-text' data-id='${programId}'><b style="color:#76a744">${programNm}</b></span>
                        <span class='k-spacer'></span>
                        <span class='k-icon ${(isOpen ? "class='k-i-arrow-chevron-down'" : "k-i-arrow-chevron-right")}'></span>
                        </li>`;

                    level3 = true;
                    isOpen = false;

                    return contents;
                } else {

                    contents = `${addMenus}${level3 ? "<li data-role='drawer-separator'></li>" : ''}
                        <li data-role='drawer-item' class='menu-level-3 ${(openParentsId === parentId ? "" : "hidden")}' id='menu-${programId}'>
                        <span class='k-icon k-i-c-grid' id='icon_${programId}'></span>
                        <span class='k-item-text' data-id='${programId}' >${programNm}</span>
                        </li>`;
                    if (level3) level3 = false;
                    return contents;
                }
            }, '');

        this.menuDrawer(`<ui>${menuTemplate}</ui>`);
        return `<ui>${menuTemplate}</ui>`;
    }

    menuDrawer(menuRTemplate) {

        let drw = $("#drawer-content").kendoDrawer({
            mode: "push",
            position: 'left',
            template: menuRTemplate,
            width: 200,
            minHeight: 400,
            swipeToOpen: false,
            autoCollapse: false,
            itemClick: this.itemClick
        }).data('kendoDrawer');
        drw.constructor.prototype.addContents = IS_TAB ? this.addTab : this.addWindow;
    }

    itemClick(e) {
        let programId = Number(e.item.find(".k-item-text").attr("data-id"));

        if (!e.item.hasClass("menu-level-3")) {
            let expandIcon = e.item.find("span.k-i-arrow-chevron-right");
            let collapseIcon = e.item.find("span.k-i-arrow-chevron-down");

            let parentsIds = _.filter(MENU_ARRAY, {"parentId": programId, "programLvl": 3});
            let parentsIdsLng = parentsIds.length;

            let depth3 = `.k-drawer-item:not(.k-drawer-separator):lt(${parentsIdsLng})`;
            if (expandIcon.length) {
                e.item.nextAll(depth3).removeClass("hidden");
                expandIcon.removeClass("k-i-arrow-chevron-right").addClass("k-i-arrow-chevron-down");
            }

            if (collapseIcon.length) {
                e.item.nextAll(depth3).addClass("hidden");
                collapseIcon.addClass("k-i-arrow-chevron-right").removeClass("k-i-arrow-chevron-down");
            }
        } else {
            if (programId > 0) {
                let menu = MENU_ARRAY.find(menu => menu.programId === programId);
                if (menu && menu.popupYn === 'N') {
                    e.item.find(".k-icon").removeClass("k-i-c-grid").addClass("k-i-c-grid-fill cp-open-color");
                    this.addContents(menu);
                } else if (menu && menu.popupYn === 'Y') {
                    e.item.find(".k-icon").removeClass("k-i-c-grid").addClass("k-i-c-grid-fill cp-open-color");

                    let layout = {height: 1000, width: 1000}
                    try {
                        layout = JSON.parse(menu.parameter);
                    } catch (e) {
                        console.log('팝업 기본값 설정.')
                    }
                    new popupWindow(menu.url, menu.roleNm, layout).open()
                }
            }
        }
    }

    addTab(menu) {
        let {url, programId, programNm} = menu;
        let contUrl = url;
        let title = programNm;
        if (contUrl === '') {
            kendo.alert("URL 정보가 없습니다.");
            return;
        }

        let $program = $(`#tab_${programId}`);
        if ($program.length > 0) {
            let items = mainTabs.items();
            $.each(items, function (i, v) {
                let isTab = $(v).children(`#tab_${programId}`).length;
                if (isTab > 0) {
                    if ('tabstrip_ts_active' !== $(v)[0].id) mainTabs.select(i);
                    return false;
                }
            });
            return;
        }

        const cont = {
            tabId: programId,
            text: title,
            contentUrl: contUrl
        }
        mainTabs.append([cont]);
        let idx = (mainTabs.items().length - 1)
        mainTabs.select(idx);

        configureCloseTab(idx, programId);

        configureSortable();
    }

    addWindow(data) {
        const {programId, programNm, url} = data;


        function windowCheck(programId) {
            let win = $(`#program-${programId}`).data('kendoCpWindow');
            $('[name=program-open]').each((i, e) => {
                if ($(e).prop('id') !== `program-${programId}`) {

                    let closeWin = $(e).data('kendoCpWindow');
                    if (closeWin && !closeWin.winCloseStatus) {
                        closeWin.close();
                    }
                    $('.k-drawer-items').find(`#icon_${programId}`).find(`#icon_${programId}`).addClass("k-i-c-grid-fill");
                }
            });
            if (win?.winCloseStatus) {
                win.open();
            }
            return win;
        }

        if (!windowCheck(programId)) {
            let $div = $(`<div id="program-${programId}" name="program-open" style="z-index: 100;"></div>`);

            $div.kendoCpWindow({
                width: "100%",
                maxWidth: '100%',
                minHeight: 'calc(100vh - 85px)',
                height : "100%",
                resizable: false,
                title: false,
                programId: programId,
                content: url,
                autoFocus: false,
                appendTo: "#tabstrip",
                draggable: false,
                close: function (e) {
                    windowCheck(programId);
                    if (e.userTriggered || e.sender.userTriggered) {
                        this.destroy();
                        menuWinDestroy(programId);
                    } else {
                        $(`#badge-${programId}`).data('kendoBadge').themeColor('secondary');
                        e.sender.winCloseStatus = true;
                    }
                },
                open: function (e) {
                    e.sender.winCloseStatus = false;

                    let menuTabHeight = $('.k-drawer-content').height();
                    $('.k-drawer-content .k-window').not().css('minHeight', `calc(100vh - ${menuTabHeight + 61}px)`);
                    kendo.resize('.k-window');

                    windowCheck(programId);
                    let b = $(`#badge-${programId}`).data('kendoBadge');
                    if (b) {
                        b.themeColor('primary');

                        $(`#program-${programId} .k-splitter`).each(function(){
                            let splitterId = `#${$(this).attr('id')}`;
                            let gridId = `#${$(this).find('.c-grid').attr('id')}`;
                            gridCommonUtils.gridResize(splitterId, gridId, 400);
                        });

                        return;
                    }

                    let badge = $(`<span id="badge-${programId}" name="badge-open" style="justify-content: space-between;padding-left:5px;margin: 1px 1px 1px 1px;height: 21px;min-width: 110px;"></span>`);
                    $('#home-window-badge').append(badge);

                    badge.kendoBadge({
                        themeColor: 'primary',
                        size: 'small',
                        shape: 'rounded',
                        text: `
                            <span class="k-button-text" style="padding-right:35px;font-size: small;cursor: pointer;" onclick="$('#program-${programId}').data('kendoCpWindow').open()">${programNm}</span>
                                <span style="cursor: pointer" class="${programId > 1000000 ? 'hidden' : ''}" onclick="homeMenuClose('program-${programId}')"><span class="k-button-icon k-icon k-i-close"></span></span>`
                    });
                },
                error: function (e) {
                    if (e.xhr?.status === 403) {
                        message.callBackAlert({msg: '세션이 종료되었습니다.', callback: new user().logout})
                        return false;
                    } else {
                        $div.data('kendoCpWindow').content(e.xhr.responseText);
                    }
                }
            }).data('kendoCpWindow').open();
        }
    }
}

const homeMenuClose = (id) => {
    let closeFunc = ()=> {
        let win = $(`#${id}`).data('kendoCpWindow');
        win.userTriggered = true;
        if (win._close) {
            win.destroy();
            menuWinDestroy(id.replace('program-', ''));
        } else {
            win.close();
        }
    }

    if(id == 'program-250') {
        message.callBackConfirm({msg:"상담메인을 닫으시겠습니까?", callback:()=>{
                closeFunc();
            } });
    } else {
        closeFunc();
    }
}

function menuWinDestroy(programId) {
    $('.k-drawer-items').find(`#icon_${programId}`)
        .removeClass("k-i-c-grid-fill cp-open-color")
        .addClass("k-i-c-grid");

    $('.k-state-selected')
        .removeClass('k-state-selected');
    let cnt = 0;
    $('[name=program-open]').each((i, obj) => {
        cnt++;
        let dr = $(obj);
        dr.data('kendoCpWindow').open();

        let selectBar = $(obj).prop('id');
        $(`#${selectBar.replace('program', 'menu')}`).addClass('k-state-selected');
        return false;
    });
    if (cnt === 0) {
        if (!$("#drawer-content").data('kendoDrawer').visible) $("#toolbar").trigger("click");
    }
    $(`#badge-${programId}`).remove();
}

const configureSortable = () => {
    $("#tabstrip ul.k-tabstrip-items").kendoSortable({
        filter: "li.k-item",
        axis: "x",
        container: "ul.k-tabstrip-items",
        hint: function (element) {
            return $(`<div id='hint' class='k-widget k-header k-tabstrip'>
                        <ul class='k-tabstrip-items k-reset'>
                        <li class='k-item k-state-active k-tab-on-top'>${element.html()}</li>
                        </ul>
                      </div>`);
        },
        start: function (e) {
            mainTabs.activateTab(e.item);
        },
        change: function (e) {
            const tabstrip = $("#tabstrip").data("kendoTabStrip"),
                reference = tabstrip.tabGroup.children().eq(e.newIndex);

            if (e.oldIndex < e.newIndex) {
                tabstrip.insertAfter(e.item, reference);
            } else {
                tabstrip.insertBefore(e.item, reference);
            }
        }
    });
};

const configureCloseTab = (idx, programId) => {

    const tabsElements = $('#tabstrip li[role="tab"]');
    const el = `<span data-type="remove" id="tab_${programId}" class="k-link"><span class="k-icon k-i-x"></span></span>`;

    const onclick = $(tabsElements[idx]).append(el);

    onclick.on("click", "[data-type='remove']", function (e) {
        e.preventDefault();
        e.stopPropagation();

        $('.k-drawer-items').find(`#icon_${programId}`).removeClass("k-i-folder-open").addClass("k-i-folder");
        const item = $(e.target).closest(".k-item");
        mainTabs.remove(item.index());

        if (mainTabs.items().length > 0 && item.hasClass('k-state-active')) {
            mainTabs.select(0);
        }
    });

};
const keyFrameSet = () => {
    let cnt = HOME_ALARM_DATA.filter(r => r.readYn === 'N');
    let bell = $('#home-alarm > span');

    let keyFrameOptions = {
        name: 'bell-motion',
        duration: '0.5s',
        timingFunction: 'ease',
        delay: '0s',
        iterationCount: 'infinite',
        direction: 'alternate-reverse',
        fillMode: ''
    };

    if (cnt.length > 0) {
        bell.playKeyframe(keyFrameOptions);
    } else {
        bell.resetKeyframe();
    }
    return cnt;
}
const alarmCnt = () => {

    let cnt = keyFrameSet();

    let homeAlarmStatus = $("#home-alarm-status");
    let alarmStatus = ALARM_TYPE
        .map(row => {
            let unRead = cnt.filter(r => (r.alarmType === row.type));
            let type = HOME_ALARM_DATA.filter(r => r.alarmType === row.type);
            return {
                colSpan: 1,
                rowSpan: 1,
                bodyTemplate: `<div class="c-info-container" onclick="alarmFilter('${row.type}')" style="cursor: pointer">
                                            <div class="c-info-holder">
                                                <span>
                                                    <span class="c-item-values">${type.length}</span>/<span class="c-item-values-working-small">${unRead.length}</span>
                                                </span>
                                                <span class="c-text-indicator">${row.text}</span>
                                            </div>
                                        </div>`
            }
        });

    let containers = [{
        colSpan: 1,
        rowSpan: 1,
        bodyTemplate: `<div class="c-info-container" onclick="alarmFilter()" style="cursor: pointer">
                                            <div class="c-info-holder">
                                                <span>
                                                    <span class="c-item-values">${HOME_ALARM_DATA.length}</span>/<span class="c-item-values-working-small">${cnt.length}</span>
                                                </span>
                                                <span class="c-text-indicator">전체</span>
                                            </div>
                                        </div>`
    }, ...alarmStatus];

    let status = homeAlarmStatus.data('kendoTileLayout');
    if (status) {
        status.setOptions({containers: containers});
        return;
    }
    homeAlarmStatus.kendoTileLayout({
        containers: containers,
        columns: 4,
        columnsWidth: 91,
        rowsHeight: 70,
        width: '100%',
        height: 'auto',
        gap: {
            columns: 5,
            rows: 5
        }
    });

}
let softPhoneObject;
const tab = {
    init: function () {
        const tabsOpt = {
            value: 'tabId',
            animation: false,
            dataTextField: "text",
            dataContentUrlField: "contentUrl",
            navigatable: true,
            error(e) {
            }
        };
        let bellColor1 = "rgb(255,255,255)";
        let bellColor2 = "rgb(243,93,73)";
        $.keyframe.define([{
            name: 'bell-motion',
            "0%": {
                "transform": "translate3d(-1px, 0, 0) rotate(-20deg)",
                "color": bellColor1
            },
            "100%": {
                "transform": "translate3d(1px, 0, 0) rotate(20deg)",
                "color": bellColor2
            }
        }]);
        mainTabs = $("#tabstrip").kendoTabStrip(tabsOpt).data("kendoTabStrip");
        softPhoneObject = new SoftPhone(USER_INFO.ctiYn === 'Y' && USER_INFO.ctiStation != null);
        if (!String.softPhoneObject) String.softPhoneObject = softPhoneObject;
        $('.cp-navigation').on('click', function () {
            this.classList.toggle('active');
            $('.cp-alert-tag')[0].classList.toggle('active');
            $('.cp-users-tag')[0].classList.toggle('active');
        });
        HOME_ALARM_CALL.sort([
            {field: "readYn", dir: "asc"},
            {field: "alarmType", dir: "asc"}
        ]);

        HOME_ALARM_CALL.fetch(function () {
            HOME_ALARM_DATA = this.view();
            let alarmTimer = new Worker('/js/common/timer.js');
            alarmTimer.postMessage(60000);
            alarmTimer.onmessage = () => {
                new AlarmRegistration(HOME_ALARM_DATA).run();
            }
            alarmCnt();
        });

        clientDb = new Dexie("centerlink",{autoOpen : true ,allowEmptyDB:true ,chromeTransactionDurability:"default"});


        function connect() {
            let socket = new SockJS(`${WEBSOCKET_URL}/ws`);
            let stompClient = Stomp.over(socket);

            stompClient.connect({"userId": USER_INFO.userId}, function (frame) {
                stompClient.subscribe('/user/topic/alarm', function (e) {
                    let message = parseMessage(e);
                    let isAdd = IS.TRUE;
                    HOME_ALARM_DATA = HOME_ALARM_DATA.map(r => {
                        if (r.alarmId === message.alarmId) {
                            isAdd = IS.FALSE;
                            return $.extend(r, message);
                        }
                        return r;
                    });

                    if (isAdd) HOME_ALARM_DATA.push(message);
                    new AlarmRegistration(HOME_ALARM_DATA).run();
                    alarmCnt();
                    homeAlertFnc.kendoInit();
                });
                stompClient.subscribe('/user/topic/all-message', function (e) {
                    let result = parseMessage(e);
                    let msg = {"id": kendo.guid(), "title": result.type, "message": result.message};
                    message.alarmNotification(msg);
                });

                stompClient.subscribe('/user/topic/job', function (e) {
                    let result = parseMessage(e);
                    console.log(result)
                    if ("SMS_RV" === result.type) {

                        let alarm = new cpDataSource(METHOD.GET, `/common/v1/user/alert?readYn=`).getDataSource();

                        alarm.fetch(function () {
                            HOME_ALARM_DATA = this.view();
                            new AlarmRegistration(HOME_ALARM_DATA).run();
                            alarmCnt();
                            homeAlertFnc.kendoInit();
                        });

                    }
                });

                function parseMessage(e) {
                    let body = JSON.parse(e.body);
                    try {
                        return JSON.parse(body.message);
                    } catch (e) {
                        return body;
                    }
                }
            });
            socket.onclose = function () {
                setTimeout(function () {
                    socket = connect();
                }, 10000);
            }
        }

        connect();
    }
}




const gridCommonUtils = {

    init: (expandPanelId, splitterId, gridId, localGridStorage) => {


    },
    gridExpansionPanel: (expandPanelId, splitterId, gridId) => {

        $('.c-grid-search-box').css('visibility', 'visible');

        if(!$(expandPanelId)) {
            return;
        }else{

            $(expandPanelId).kendoExpansionPanel({
                title: '-',
                subTitle: '검색',
                expand: function (e) {
                    gridCommonUtils.gridResize(splitterId, gridId);
                },
                collapse: function (e) {
                    gridCommonUtils.gridResize(splitterId, gridId);
                }
            });

        }

        gridCommonUtils.gridResize(splitterId, gridId, 300);

    },
    gridSearchPrint: (expandPanelId, searchData) => {

        if(!$(expandPanelId)) {
            return;
        }else{
            let searchString = '';
            searchData.forEach(function(d){
                if(d.text.length > 0 && d.value != '0' && d.value.length > 0){
                    if(searchString.length > 0){searchString += ' | ';}
                    searchString += `<label>${d.label} : </label> ${d.text}`
                }
            });

            $(expandPanelId).data('kendoExpansionPanel').header.find('.k-expander-title').html(searchString);
        }

    },
    gridResize: (splitterId, gridId, delay = 200) => {
        if(splitterId !== "#undefined" && gridId !== "#undefined") {
            setTimeout(function () {
                let splitterTop = $(splitterId).offset().top + 10;
                $(splitterId).height(`calc(100vh - ${splitterTop}px)`);
                kendo.resize($(splitterId));
                kendo.resize($(gridId));

                const splitter = $(splitterId).data('kendoSplitter');
                const gridSplitterMainId = '#' + splitter.element.find('.c-splitter-grid').attr('id');
                const gridSplitterDetailId = '#' + splitter.element.find('.c-splitter-detail').attr('id');

                const detailSplitterWidth = !!splitter.size($(gridSplitterDetailId)) ? splitter.size($(gridSplitterDetailId)) : '0%';
                splitter.size($(gridSplitterMainId), `calc(100% - ${detailSplitterWidth})`);
                splitter.size($(gridSplitterDetailId), `${detailSplitterWidth}`);
            }, delay);
        }
    },
    gridWidthSet: (defaultGridWidth, gridColumnsData, splitterId) => {
        let gridWidth = 0;
        defaultGridWidth = defaultGridWidth.toString().replace(/[^0-9]/g, '');

        if(defaultGridWidth > 0){
            gridWidth = defaultGridWidth;
        }else{

            gridColumnsData.forEach((d) => {
                !!d.width ? gridWidth += Number(d.width.toString().replace(/[^0-9]/g, '')) : gridWidth += 0;
            });

            const toolbarWidth = $(splitterId).data('kendoSplitter')._size.width;

            if(gridWidth < toolbarWidth){
                gridWidth = '100%';
            }else{
                gridWidth = gridWidth + 'px';
            }
        }
        return gridWidth;
    }

}
