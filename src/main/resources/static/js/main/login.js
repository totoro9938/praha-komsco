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
            open: function (e) {
                setTimeout(() => {
                    e.sender.wrapper.find('.k-button-solid-primary').trigger('focus');
                }, 50)
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
            open: function (e) {
                setTimeout(() => {
                    e.sender.wrapper.find('.k-button-solid-primary').trigger('focus');
                }, 50)
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

const dsError = (e) => {
    console.log(e)
    if (e.xhr?.status === 400) {
        let g = {msg: e.xhr.responseJSON.message, type: 'error'};
        $('#err-a').show();
        $('#error-text').show();
        $('#error-text').text(e.xhr.responseJSON.message)
        return false;
    }
    let error = e.xhr?.responseJSON || e.responseJSON || {message: '오류가 발생하였습니다.'};
    let g = {msg: error.message, type: 'error'};
    message.notification(g);
    if (typeof this._errCallBack === "function") {
        this._errCallBack();
    }
};
const startReq = () =>{
    $('#err-a').hide();
    $('#err-text').hide();
}
let dataSource = new kendo.data.DataSource({
    transport: {
        read: {
            type: 'POST',
            url: '/login',
            contentType: "application/json",
            dataType: 'json'
        },
        parameterMap: function (data, type) {
            if (type === 'read') {

                return JSON.stringify({
                    "companyCd": $('#companyCd').val(),
                    "userCd": $('#userCd').val(),
                    "userPwd": $('#userPwd').val()
                });
            }
        }
    },
    schema: {
        type: "json",
        data: function (response) {
            $('#message').html(response.data.userUuid);
        }
    },
    error: dsError,
    requestStart:startReq
});

let otpRegDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            type: 'POST',
            url: '/auth/register',
            contentType: "application/json",
            dataType: 'json'
        },
        parameterMap: function (data, type) {
            if (type === 'read') {

                console.log(JSON.stringify(data))
                return JSON.stringify({
                    "userId": $('#userId').val(),
                    "secretKey": $('#secretKey').val(),
                    "userCd": $('#userCd').val(),
                    "userPwd": $('#userPwd').val()
                });
            }
        }
    },
    schema: {
        type: "json",
        data: 'data'
    },
    error: dsError,
    requestStart:startReq
});

let userOtpCheckDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            type: 'POST',
            url: '/auth/user-otp-check',
            contentType: "application/json",
            dataType: 'json'
        },
        parameterMap: function (data, type) {
            if (type === 'read') {
                return JSON.stringify({
                    "companyCd": $('#companyCd').val(),
                    "userCd": $('#userCd').val(),
                    "userPwd": $('#userPwd').val()
                });
            }
        }
    },
    schema: {
        type: "json",
        data: 'data'
    },
    error: dsError,
    requestStart:startReq
});

$(document).ready(function () {
    const otpYn = $('#otpYn').val();
    if(otpYn === 'Y'){
        otpView();
    }
    let $loginForm = $("#loginForm");
    let validatable = $loginForm.kendoValidator({
        validationSummary: false,
        validateOnBlur: true,
        validate: function (e) {
            console.debug(e);
        }
    }).data("kendoValidator");

    $loginForm.keypress(function (event) {
        if (event.which == 13) {
            if (validatable.validate()) {
                otpCheck();
            }
        }
    });

    $("#loginBtn").kendoButton({
        themeColor: "primary",
        badge: {
            size: 300
        },
        click: function () {
            if (validatable.validate()) {
                otpCheck();
            }
        }
    });
    const userCd = $('#userCd');
    const userPwd = $('#userPwd');
    if (userCd.val() === '') {
        userCd.focus();
    } else {
        userPwd.focus();
    }
});

const otpCheck = () => {
    userOtpCheckDataSource.read().then(() => {
        const result = userOtpCheckDataSource.data();
        openWin(result);
    });

    function openWin(result) {
        console.log(result);
        const row = result[0];
        let $div = $(`<div id="otp-window"></div>`);
        if(row.save) {
            $div.kendoWindow({
                width: 500,
                height: row.save ? 550 : 300,
                position: {
                    top: "27%",
                    left: "35%"
                },
                actions: [],
                title: row.save ? "OTP 등록" : "OTP 인증",
                visible: false,
                modal: true,
                draggable: false,
                resizable: false,
                autoFocus: false,
                content: {
                    template: kendo.template($("#otp-window-template").html())
                },
                open: () => {
                    $('#qr-code').prop("src", row.qrCodeUrl);
                    $('#userId').val(row.userId);
                    $('#secretKey').val(row.secretKey);
                    if (row.save) {
                        $('#otp-number').hide();
                    } else {
                        $('#otp-reg').hide();
                    }
                    $('#sendOtp').kendoButton({
                        themeColor: "primary",
                        badge: {
                            size: 300
                        },
                        click: function () {
                            let fn = row.save ? reg : login;
                            fn.call();
                        }
                    });
                },
                close: (e) => {
                    e.sender.destroy();
                }
            }).data("kendoWindow").refresh().open();
        }else{
            otpView();
        }

        function reg() {

            otpRegDataSource.options.data = {
                "userId": $('#userId').val(),
                "secretKey": $('#secretKey').val(),
                "userCd": $('#userCd').val(),
                "userPwd": $('#userPwd').val()
            };
            otpRegDataSource.read().then(() => {
                $(`#otp-window`).data('kendoWindow').close();
                const result = otpRegDataSource.data();
                openWin(result);
            });
        }
    }
};
function login(){
    const loginForm = $('#loginForm');
    loginForm.submit();
}
function otpView() {
    $('#otpBtn').kendoButton({
        themeColor: "primary",
        badge: {
            size: 300
        },
        click: function () {
            login();
        }
    });

    $('#login-area').hide();
    $('#otp-area').show();
}

