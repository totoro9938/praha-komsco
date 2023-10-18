const AUTH_RANG = Object.freeze({ALL: 'ALL', SUB: 'SUB', AGENT: 'AGENT', NOTHING: "NOTHING"});
const POSITION = Object.freeze({BOTTOM: 'bottom', TOP: 'top', LEFT: 'left', RIGHT: "right", CENTER: 'center'});
const IS = Object.freeze({TRUE: true, FALSE: false});
// const schedulerTypes = [
//     {text: "센터1", value: '03', color: "#5b2aad"},
//     {text: "일반", value: '04', color: "#5a9293"},
//     {text: "공휴일", value: '01', color: "#ef8779"},
//     {text: "임시 업무일", value: '02', color: "#325e0d"},
//     {text: "기타", value: '99', color: "#134781"}
// ];
const DEFAULT_PAGE_SIZE = 30;

String.prototype.toHHMMSS = function () {
    let sec_num = parseInt(this, 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}
String.prototype.formatterHpNo = function (type = '1') {
    let formatNum;

    let value = this.trim();
    value = value.replace(/[^0-9]/g, "");

    if (value.length === 12) {
        if (type === '0') {
            formatNum = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-****');
        } else {
            formatNum = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    } else if (value.length === 11) {
        if (type === '0') {
            formatNum = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-****');
        } else {
            formatNum = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        }
    } else if (value.length === 8) {
        formatNum = value.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
        if (value.indexOf('02') === 0) {
            if (type === '0') {
                formatNum = value
                    .replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-****');
            } else if (value.length === 9) {
                formatNum = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
            } else {
                formatNum = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        } else {
            if (type === '0') {
                formatNum = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-****');
            } else {
                formatNum = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
            }
        }
    }

    return formatNum;
}

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

$.fn.clearForm = function () {
    return this.each(function () {
        var type = this.type,
            tag = this.tagName.toLowerCase();
        if (tag === 'form') {
            return $(':input', this).clearForm();
        }
        if (
            type === 'text' ||
            type === 'password' ||
            type === 'hidden' ||
            tag === 'textarea'
        ) {
            this.value = '';
        } else if (type === 'checkbox' || type === 'radio') {
            this.checked = false;
        } else if (tag === 'select') {
            this.selectedIndex = -1;
        }
    });
};

const message = {
    test: function () {
        kendo.alert('sdfsdfsdfsdfs');
    },
    callBackAlert: function (obj) {
        let opt = $.extend({title: document.title, msg: '처리하겠습니까?', callback: ''}, obj);
        let $div = $('<div id = "callBackAlert"></div>');
        $('body').append($div);
        $($div).kendoDialog({
            title: opt.title,
            content: opt.msg,
            minWidth: 300,
            minHeight: 100,
            closable: false,
            actions: [
                {
                    text: '확인',
                    action: function () {
                        if (typeof (opt.callback) === 'function') {
                            opt.callback.call();
                        }
                        return true;
                    },
                    primary: true
                }
            ],
            close: function () {
                $($div).data('kendoDialog').destroy();
            },
            open: function(e) {
                setTimeout(()=>{
                    e.sender.wrapper.find('.k-button-solid-primary').trigger('focus');
                },50)
            }
        });
    },
    callBackConfirm: function (obj) {
        let opt = $.extend({title: document.title, msg: '처리하겠습니까?', callback: '', cancel: ''}, obj);
        let $div = $('<div id="callBackConfirm"></div>');
        $('body').append($div);
        $($div).kendoDialog({
            title: opt.title,
            content: opt.msg,
            minWidth: 300,
            minHeight: 150,
            closable: false,
            actions: [
                {
                    text: '취소',
                    action: function () {
                        if (typeof opt.cancel === 'function') {
                            opt.cancel.call();
                        }
                    }
                },
                {
                    text: '확인',
                    action: function () {

                        if (typeof opt.callback === 'function') {
                            opt.callback.call();
                        }

                        return true;
                    },
                    primary: true
                }
            ],
            close: function () {
                $($div).data('kendoDialog').destroy();
            },
            open: function(e) {
                setTimeout(()=>{
                    e.sender.wrapper.find('.k-button-solid-primary').trigger('focus');
                },50)
            }
        });
    },
    notification: function (obj) {

        let opt = $.extend({title: '', msg: '조회 되었습니다.', type: 'success'}, obj);
        let div = $('<span id="notice-message" style="display: none"></span>')
        let notification = div.kendoNotification({
            appendTo: `#notice-message-container`,
            animation: {
                open: {
                    effects: "slideIn:right"
                },
                close: {
                    effects: "slideIn:right",
                    reverse: true
                }
            },
            templates: [{
                type: "info",
                template: kendo.template(`<div class="c-notice">
                                <i class="bi bi-info-circle-fill c-notice-img"></i>
                                <h3>#= title #</h3>
                           <p>#= message #</p>
                    </div>`)
            }, {
                type: "error",
                template: kendo.template(`<div class="c-notice">
                            <i class="bi bi-bug-fill c-notice-img"></i>
                            <h3>#= title #</h3>
                            <p>#= message #</p>
                        </div>`)
            }, {
                type: "success",
                template: kendo.template(`<div class="c-notice">
                            <i class="bi bi-check-circle-fill c-notice-img"></i>
                             <h3>#= title #</h3>
                             <p>#= message #</p>
                        </div>`)
            }, {
                type: "warning",
                template: kendo.template(`<div class="c-notice">
                            <i class="bi bi-envelope-check-fill c-notice-img"></i>
                            <h3>#= title #</h3>
                            <p>#= message #</p>
                        </div>`)
            }]
        }).data("kendoNotification");
        notification.show({title: opt.msg, message: ''}, opt.type);
    },
    alarmNotification: function (obj) {

        let opt = $.extend({id: 0, title: '알람', message: '조회 되었습니다.<br>xptmxsdfsdf', type: 'warning'}, obj);

        let alarm = $(`#alarm-message-${opt.id}`).data('kendoNotification');
        if (alarm) return false;

        let div = $(`<span id="alarm-message-${opt.id}" style="display: none"></span>`)
        $('body').append(div);
        div.kendoNotification({
            appendTo: `#alarm-message-container`,
            width: "25em",
            maxHeight: 400,
            stacking: "down",
            autoHideAfter: (1000 * 60 * 5),
            hide: function () {
                div.remove();
            },
            animation: {
                open: {
                    effects: "slideIn:left"
                },
                close: {
                    effects: "slideIn:left",
                    reverse: true
                }
            },
            templates: [
                {
                    type: "info",
                    template: kendo.template(`<div style="cursor: ">
                            <div style="width: 100%;">
                                <i class="bi bi-envelope-check-fill c-notice-img"></i>
                                <h3 style="margin-block-end: 0;margin-block-start: 0;padding-top: 8px;">#= title #</h3>
                            </div>
                            <div style="width: 100%;padding-inline-start: 10px;">
                            <pre style="white-space: pre-line;text-decoration: underline;cursor: pointer;">#= message #</pre>
                            </div>
                        </div>`)
                }
            ]
        }).data("kendoNotification");
        div.data("kendoNotification").show(opt, "info");
    }
}
let START_INTERVAL = [];
let END_INTERVAL = [];

class AlarmRegistration {
    constructor(obj) {
        this.alarmData = obj;
    }

    run() {
        let isRange = this.isRange;
        let alarmDatas = this.alarmData;
        let validate = this.validate;
        // START_INTERVAL = _.remove(START_INTERVAL, (data) => {
        //     clearInterval(data.interval);
        //     return false;
        // });
        // END_INTERVAL = _.remove(END_INTERVAL, (data) => {
        //     clearInterval(data.interval);
        //     return false;
        // });
        alarmDatas.filter(r => !validate(r, isRange)).map(alarmData => {
            if(END_INTERVAL.filter(r => r.id === alarmData.alarmId ).length === 0){
                console.log('start!')
                new alertMessage(alarmData, isRange, validate).setMessage();
            }
        });

    }

    isRange(start, end) {
        return kendo.date.isInDateRange(new Date(), start, end);
    }

    validate(alarmData, isRange) {
        return (alarmData.completeYn === 'Y' ||
            alarmData.readYn === 'Y' ||
            alarmData.delYn === 'Y' ||
            !isRange(kendo.parseDate(alarmData.startDt), kendo.parseDate(alarmData.endDt))
        );
    }
}

class alertMessage {
    constructor(alarmData, isRange, validate) {
        this.alarmData = alarmData;
        this.isRange = isRange;
        this.validate = validate;
    }

    setMessage() {
        let alarmData = this.alarmData;
        let msg = {id: alarmData.alarmId, title: alarmData.title, message: alarmData.contents};
        let isRange = this.isRange;
        let validate = this.validate;
        let startInterval = setInterval(() => {
            if (isRange(kendo.parseDate(alarmData.startDt), kendo.parseDate(alarmData.endDt))) {
                clearInterval(startInterval);
                START_INTERVAL = _.remove(START_INTERVAL, (data) => {
                    return !data.interval === startInterval;
                });
                try {
                    message.alarmNotification(msg);
                    let messageInterval = setInterval(() => {
                        if (alarmData.alarmCycle === 0 ||
                            !isRange(kendo.parseDate(alarmData.startDt), kendo.parseDate(alarmData.endDt))) {
                            if (alarmData.alarmCycle === 0) message.alarmNotification(msg);
                            clearInterval(messageInterval);
                            END_INTERVAL = END_INTERVAL.filter(data => {
                                return data.interval !== parseInt(messageInterval);
                            });
                        } else {
                            let row = HOME_ALARM_DATA.find(data => data.alarmId === msg.id);
                            if (validate(row, isRange)) {
                                clearInterval(messageInterval);
                                END_INTERVAL = END_INTERVAL.filter(data => {
                                    return data.interval !== parseInt(messageInterval);
                                });
                                return false;
                            }
                            message.alarmNotification(msg);
                        }
                    }, (alarmData.alarmCycle));
                    END_INTERVAL.push({id: alarmData.alarmId, interval: messageInterval});
                    console.log(END_INTERVAL)
                } catch (e) {
                    console.error(e);
                }
            }
        }, 3000);
        START_INTERVAL.push({id: alarmData.alarmId, interval: startInterval});
    }
}


const dropTreeRow = (e) => {
    try {

        let sender = e.sender;

        return sender.dataItem(sender.treeview._current);
    } catch (e) {
        console.error(e);
        return {};
    }
}

const commonDropTreeRow = (selector) => {
    let tree = $(selector).data("kendoDropDownTree");
    return tree.dataItem(tree.treeview._current);

}

const userAuthRange = (range) => {

    let authString = `ROLE_${range}_RANGE`;
    let auths = USER_AUTHORITY.filter(auth => auth.authority.includes(authString));

    return auths.find((v) => v.authority === `${authString}_ALL`) ?
        AUTH_RANG.ALL : auths.find((v) => v.authority === `${authString}_SUB`) ?
            AUTH_RANG.SUB : auths.find((v) => v.authority === `${authString}_AGENT`) ?
                AUTH_RANG.AGENT : AUTH_RANG.NOTHING;
}

class cpDropDownTree {
    object;
    #defaultOptions = {
        fillMode: "flat",
        messages: {
            noData: "검색된 내용이 없습니다."
        },
        height: 300,
        draggable: false,
        clearButton: false,
        delay: 0
    }

    constructor(selector, url, options) {
        this.url = url;
        this.selector = $(selector);

        this.options = $.extend(this.#defaultOptions, options);
    }

    create() {
        this.object = this.selector
            .kendoDropDownTree(this.options)
            .data("kendoDropDownTree");


        this.object.tree.on("keydown", function(e) {
            let container = this;
            let treeDiv = $(container);
            let top = treeDiv.scrollTop();
            let h = treeDiv.offset().top+treeDiv.height();
            let offset = treeDiv.find('.k-focus').offset();
            if(!offset)return;
            let point = offset.top-h;

            if(e.keyCode === 40 ){
                if(point > 0)treeDiv.animate({scrollTop : top+28}, 0);
            }else if(e.keyCode === 38 && top > 0){
                if(point < 0)treeDiv.animate({scrollTop : top-28}, 0);
            }

        });
        return this.object;
    }
}

//속
new cpDataSource(METHOD.GET, `/common/v1/dept-all?deptId=0`).getDataSource().read();

class cpDeptDropDownTree {
    object;
    userAuth;
    deptId;
    allObject = {
        deptCd: "root",
        deptNm: "전체",
        fullDeptNm: "전체",
        items: [],
        parentId: 0,
        deptId: 0
    }

    constructor(selector, options, userAuth, deptId, all = IS.TRUE,centerOnly = IS.FALSE) {
        this.userAuth = userAuthRange(userAuth);
        let value = {value: deptId}
        this.url = '/common/v1/dept-all';
        this.selector = selector;
        this.centerOnly = centerOnly;

        this.options = $.extend({
            'valueTemplate': '<span>#: fullDeptNm # </span>',
            'dataTextField': "deptNm",
            'dataValueField': "deptId",
            'filter': "contains"
        }, options, value);
        this.deptId = deptId;
        this.all = all;
    }

    init() {

        this.object = this.create();
        this.drawingTree().then(console.log);
        this.setEnable();
        return this.object;
    }

    create() {
        return new cpDropDownTree(this.selector, this.url, this.options).create();
    }

    getData() {
        let all = this.all;
        let allObject = this.allObject;
        let param;
        if(this.centerOnly){
            param = {"deptId": 1};
        }else{
            if (this.userAuth === AUTH_RANG.SUB || this.userAuth === AUTH_RANG.AGENT) {
                param = {"deptId": this.deptId};
            } else {
                param = {"deptId": 0};
            }
        }
        let call = new cpDataSource(METHOD.GET, this.url, param).getDataSource();

        return call.read().then(function () {
            return new kendo.data.HierarchicalDataSource({
                data: all ? [allObject, ...call.data()] : call.data()
            });
        });

    }

    async drawingTree() {
        let data = await this.getData();
        this.object.setDataSource(data);
        return data;
    }

    setEnable() {
        let isReadonly = false;
        let t = this.object;
        let arrow = t._arrow;
        if (this.userAuth === AUTH_RANG.AGENT || this.userAuth === AUTH_RANG.NOTHING) {
            isReadonly = true;
        }

        isReadonly ? arrow.addClass('hidden') : arrow.removeClass('hidden');
        t.readonly(isReadonly);
    }
}

new cpDataSource(METHOD.GET, `/common/v1/cat/CatCall`).getDataSource().read();

class cpCatDropDownTree {
    object;

    constructor(selector, options = {}, type = 'CatCall') {

        this.url = `/common/v1/cat/${type}`;
        this.selector = $(selector);

        this.options = $.extend({
            'valueTemplate': '<span>#: fullCatNm # </span>',
            'dataTextField': "catNm",
            'dataValueField': "catId",
            'filter': "contains"
        }, options);
    }

    init() {
        this.object = this.create();
        this.drawingTree().then(r => r);
        this.setEnable();
        return this.object;
    }

    create() {
        return new cpDropDownTree(this.selector, this.url, this.options).create();
    }

    getData() {
        let call = new cpDataSource(METHOD.GET, this.url).getDataSource();

        return call.read().then(function () {
            return new kendo.data.HierarchicalDataSource({
                data: call.data()
            });
        });

    }

    async drawingTree() {
        let data = await this.getData();
        this.object.setDataSource(data);
        return data;
    }

    setEnable() {
    }
}

class cpCodeDropDownTree {
    object;

    constructor(selector, codeGroupCd, options, readonly = false) {
        this.url = `/common/v1/code/${codeGroupCd}`;
        this.selector = $(selector);
        this.options = $.extend({
            'dataTextField': "codeNm",
            'dataValueField': "codeKey"
        }, options);
        this.readonly = readonly;
        this.codeGroupCd = codeGroupCd;
    }

    init() {
        this.object = this.create();
        let readonly = this.readonly;
        this.drawingTree().then(() => {
            this.setEnable(readonly);
        });

        return this.object;
    }

    getData() {
        let param = {};
        let call = new cpDataSource(METHOD.GET, this.url, param).getDataSource();

        return call.read().then(function () {
            return call.data();
        });

    }

    create() {
        return new cpDropDownTree(this.selector, this.url, this.options).create();
    }

    async drawingTree() {
        let data = await this.getData();
        this.object.setDataSource(data);
        return data;
    }

    setEnable(isReadonly) {
        let t = this.object;
        let arrow = t._arrow;
        isReadonly ? arrow.addClass('hidden') : arrow.removeClass('hidden');
        t.readonly(isReadonly);
    }
}

const dropListRow = (e) => {
    try {

        let sender = e.sender;

        return sender.dataItem(sender.listView._current);
    } catch (e) {
        console.error(e);
        return {};
    }
}

const commonDropListRow = (selector) => {
    let dropDownList = $(selector).data("kendoDropDownList");
    return dropDownList.dataItem(dropDownList.listView._current);

}

class cpUserDropDown {
    object;
    #defaultOptions = {
        fillMode: "flat",
        filter: "startswith",
        filterTitle: "사용자명",
        messages: {
            noData: "검색된 내용이 없습니다."
        },
        dataTextField: "userNm",
        dataValueField: "userId",
        optionLabel: {userNm: '전체', userId: 0},
        height: 250,
        clearButton: true
    }

    constructor(selector, deptId = 0, param = [{useYn: "Y"}], options, readonly = false, ctiYn = 'N',matchDept = false) {
        this.matchDept = matchDept;
        this.defaultUrl = "/common/v1/user/";
        if(this.matchDept)
            this.defaultUrl = "/common/v1/user/match/";

        this.url = `${this.defaultUrl}${deptId}${param.reduce((per, currt, idx) => {
            return `${idx > 0 ? '&' : ''}${per}useYn=${currt.useYn}`;
        }, '?')}`;
        this.selector = $(selector);
        this.options = {...this.#defaultOptions, ...options}
        this.readonly = readonly;
        this.param = param;
        this.ctiYn = ctiYn;
    }

    init() {
        let create = this.create();
        let readonly = this.readonly;
        this.drawingList().then(() => {
            this.setEnable(readonly);
        });

        return create;
    }

    getDeptData(deptId) {
        this.url = `${this.defaultUrl}${deptId}${this.param.reduce((per, currt, idx) => {
            return `${idx > 0 ? '&' : ''}${per}useYn=${currt.useYn}`;
        }, '?')}`;

        return new cpDataSource(METHOD.GET, this.url, {}).getDataSource();

    }

    getData() {
        let call = new cpDataSource(METHOD.GET, this.url, {}).getDataSource();

        return call.read().then(function () {
            return call.data();
        });

    }

    create() {
        this.object = this.selector
            .kendoDropDownList(this.options)
            .data("kendoDropDownList");
        return this.object;
    }

    async drawingList() {
        let data = await this.getData();
        if(this.ctiYn === "Y"){
            data = data.filter((item) => item.ctiYn === "Y")
        }
        this.object.setDataSource(data);
        return data;
    }

    setEnable(isReadonly) {
        let t = this.object;
        let arrow = t._arrow;
        isReadonly ? arrow.addClass('hidden') : arrow.removeClass('hidden');
        t.readonly(isReadonly);
        if(isReadonly){
            t.value(USER_INFO.userId);
        } else {
            t.value(t.options.value || 0);
        }
    }
}

class cpUpload {
    #defaultOptions = {
        async: {
            saveUrl: "/common/v1/file/upload",
            removeUrl: "/common/v1/file/delete",
            batch: false,
            autoUpload: false,
            concurrent: false
        },
        validation: {
            maxFileSize: 31457280
        },
        upload: (e) => {
            e.data = {
                data: kendo.stringify(e.sender.options.param)
            };
        },
        success: (e) => {
            e.files = $.extend(e.files, e.response.data);
            setTimeout(() => {
                let fileCnt = e.sender.getFiles();

                e.sender.options.customData.badge.text(`${fileCnt.length}`);
            }, 100)

        },
        error: function (e) {
            if (e.XMLHttpRequest?.status === 403) {
                message.callBackAlert({msg: '세션이 종료되었습니다.', callback: new user().logout})
                return false;
            }
            let error = e.XMLHttpRequest?.responseText;
            try {
                error = JSON.parse(error);
            } catch (e) {
                error = {message: '오류가 발생하였습니다.'};
            }
            let g = {msg: error.message, type: 'error'};
            message.notification(g);
        },
        remove: (e) => {
            let files = e.files;
            files.forEach(file => delete file.Title)
            e.data = {
                data: kendo.stringify(files)
            };
        },
        select: () => {
        }
    }
    #popover;
    fileObject;
    badge;

    constructor(popoverPosition = POSITION.BOTTOM, options = {}, param = {}) {
        this.options = $.extend(this.#defaultOptions, options, {param: param});
        this.popoverPosition = popoverPosition;
    }

    getFileInfo() {
        return this.fileObject.getFiles();
    }

    pupover(selector, badgeUuid) {

        if (!this.#popover) {
            this.badge = $(`#${badgeUuid}`).kendoBadge({
                themeColor: 'primary',
                shape: 'rounded',
                text: '0',
                position: 'edge',
                align: 'top end'
            }).data('kendoBadge');

            let badgeObject = {customData: {"badge": this.badge}};
            let options = $.extend(this.options, badgeObject);
            let uuid = this.uuid();
            this.#popover = $(`#${selector}`).kendoPopover({
                showOn: "click",
                body: `<div style="height:200px">
                        <input name="files" id="${uuid}" type="file" style="height: 300px;"/>
                        <span style="font-size: 8px;float:right;">최대파일크기30MB</span>
                    </div>`,
                actionsLayout: "center",
                height: 440,
                width: 400,
                customData: {
                    "fnc": () => {
                        this.fileObject = this.fileObject || $(`#${uuid}`).kendoUpload(options).data('kendoUpload')
                    }
                },
                show: function (e) {
                    e.sender.options.customData.fnc.call()
                },
                actions: [],
                position: this.popoverPosition
            }).data('kendoPopover');
        }
    }

    uuid() {
        return kendo.guid();
    }

    createBadge(badge) {
        let popoverUuid = this.uuid();
        let badgeUuid = this.uuid();
        $(`#${badge}`).append(`<a id="${popoverUuid}" role="button"
                       class="k-button k-button-solid-base k-button-solid k-button-rectangle k-button-md k-rounded-md ">
                        <span class="bi bi-cloud-upload"></span>&nbsp;업로드<span id="${badgeUuid}">0</span>
                    </a>`);
        this.pupover(popoverUuid, badgeUuid);
    }
}

const cpFileInfo = (uuid) => {
    let call = new cpDataSource(METHOD.GET, `/common/v1/file/${uuid}`).getDataSource();
    call.read().then(() => {
        return call.data()
    });
}

const cpFileDown = (uuid, progress) => {
    if (progress) cpProgress(progress);
    $.fileDownload(`/common/v1/file/download/${uuid}`, {
        successCallback: function (url) {
            if (progress) cpProgress(progress, false);
            iframeDelete(url);
        },
        failCallback: function (responseHtml, url) {
            if (progress) cpProgress(progress, false);
            iframeDelete(url);
            let g = {msg: '파일다운로드 중 오류가 발생하였습니다.', type: 'error'};
            message.notification(g);
        }
    });

    const iframeDelete = (url) => {
        let $iframe = $(`[src="${url}"]`);
        if ($iframe) {
            $iframe.remove();
        }
    }
}

const cpProgress = (selector, is = true) => {
    kendo.ui.progress($(`#${selector}`), is);
}

const byteCheck = (value) => {
    let character;
    let bytes = 0;
    let contentsLength = value.length;

    for (k = 0; k < contentsLength; k++) {
        character = value.charAt(k);
        if (escape(character).length > 4)
            bytes += 2;
        else
            bytes++;
    }
    return bytes;
}

const formatterHpNo = (value) => {
    let formatNum;
    value = value.replace(/[^0-9]/g, "");

    if (value.length === 12) {
        formatNum = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (value.length === 11) {
        formatNum = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (value.length === 8) {
        formatNum = value.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else {
        if (value.indexOf('02') === 0) {
            if (value.length === 9) {
                formatNum = value.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3');
            } else {
                formatNum = value.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
            }
        } else {
            formatNum = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
    }

    return formatNum;
}

const formatterYmdToDate = (value) => {
    if (value.length == 8) {
        return value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    }
}

const searchTextBadge= (target, searchText = []) => {
    target.children().remove();
    searchText.map(d =>{
        let o = $('<span style="margin-right: 5px"></span>');
        if(d.text !==''){
            d.text = d.text.replaceAll("null", "");
            target.append(o);
            o.kendoBadge({
                themeColor: 'search',
                size: 'large',
                //fill: 'outline',
                text: `<label class="c-search-label">${d.label}</label><label class="c-search-value">${d.text}</label>`
            });
        }
    });
}

const skeletonClass = (selector,isShow = true,isText=true) => {
  if(selector){
      let classList = ['k-skeleton', 'k-skeleton-text', 'k-skeleton-pulse'];
      if(!isText){
          classList = classList.filter(r => r !== 'k-skeleton-text');
      }
      isShow ? selector.addClass(classList.join(' ')) : selector.removeClass(classList.join(' '));

  }
}

const buttonGroupUtils ={
    buttonGroupMakeItems :  (data,isAll = false) =>{
        let buttonItem = [];
        if(isAll)buttonItem.push({attributes : {'data-value': 'all'} , text:"전체"});

        data.forEach((e) =>{
            let items = {};
            items.attributes = {'data-value': e.codeKey};
            items.text = e.codeNm;
            buttonItem.push(items);
        })
        return buttonItem;
    },
    buttonGroupGetSelectedText : (targetId) => {
        let selectedIndex = $(targetId).data('kendoButtonGroup').selectedIndices[0];
        return $(targetId).data('kendoButtonGroup').element.find(`button[role=button]`).eq(selectedIndex).find('.k-button-text').html().trim();
    },
    buttonGroupGetSelectedValue: (targetId) => {
        let selectedIndex = $(targetId).data('kendoButtonGroup').selectedIndices[0];
        return $(targetId).data('kendoButtonGroup').element.find(`button[role=button]`).eq(selectedIndex).attr('data-value').trim();
    }
}

const radioGroupUtils = {
    radioGroupMakeItems : (data, isAll = false) => {
        let radioItem = [];
        if(isAll) radioItem.push({value: 'all', label: '전체'});

        data.forEach((e) =>{
            let items = {};
            items.value = e.codeKey
            items.label = e.codeNm;
            radioItem.push(items);
        });
        return radioItem;
    }
}

const dropDownTreeUtils = {
    makeDropDownTree: async (dropTree, selector, isAll = false) => {
        dropTree.create();
        let data = await dropTree.getData();
        if(isAll) data.unshift({codeKey: 'all', codeNm: '전체'});
        let dataSource = new kendo.data.HierarchicalDataSource({data: data});
        $(selector).data("kendoDropDownTree").setDataSource(dataSource);
    },
}