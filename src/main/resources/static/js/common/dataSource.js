'use strict'
const METHOD = Object.freeze({GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE'});

class cpDataSource {

    constructor(method = METHOD.GET, url, param = {}, errCallBack = '' ,button = '', loader = '', contentType = 'application/json') {
        this._method = method;
        this._url = url;
        this._param = param;
        this._button = button;
        this._loader = loader;
        this._contentType = contentType;
        this._errCallBack = errCallBack;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get param() {
        return this._param;
    }

    set param(value) {
        this._param = value;
    }

    get button() {
        return this._button;
    }

    set button(value) {
        this._button = value;
    }

    get loader() {
        return this._loader;
    }

    set loader(value) {
        this._loader = value;
    }

    get contentType() {
        return this._contentType;
    }

    set contentType(value) {
        this._contentType = value;
    }

    get method() {
        return this._method;
    }

    set method(value) {
        if (Object.values(METHOD).includes(value)) this._method = value;
        else this._method = METHOD.GET;
    }
    getDataSource = () => {
        if (this._url === '') {
            let g = {msg: 'url 필수 입니다.', type: 'error'};
            message.notification(g);
            return;
        }

        return new kendo.data.DataSource({
            transport: {
                read: {
                    "url": this.url,
                    "type": this.method,
                    "dataType": "json",
                    "contentType": this.contentType,
                    data: {method: this.method, param: this.param}
                },
                parameterMap: function (data, type) {
                    if (type === 'read') {
                        if (Object.keys(data.param).length > 0 && (data.param.constructor === Object || data.param.constructor === Array)) {
                            if (data.method !== METHOD.GET) return JSON.stringify(data.param);
                            else return Object.entries(data.param).map(e => e.join('=')).join('&');
                        }
                        return '';
                    }
                }
            },
            schema: {
                data: function (response) {
                    if (response?.success) {
                        let data = response.data;
                        if(!Array.isArray(data)) data = new Array(data);
                        return data || [];
                    } else if (response?.success === false){
                        let g = {msg: response.message || '오류가 발생하였습니다.', type: 'error'};
                        message.notification(g);
                        let data = response.data;
                        if(!Array.isArray(data)) data = new Array(data);
                        return data;
                    }
                    return [];
                }
            },
            error:  (e) => {
                if (e.status === 403 || e.xhr?.status === 403) {
                    message.callBackAlert({msg: '세션이 종료되었습니다.', callback: new user().logout})
                    return false;
                }else if (e.xhr?.status === 401){
                    let g = {msg: '접근 권한이 없습니다.', type: 'error'};
                    message.notification(g);
                    return false;
                }
                let error = e.xhr?.responseJSON || e.responseJSON || {message: '오류가 발생하였습니다.'};
                let g = {msg: error.message, type: 'error'};
                message.notification(g);
                if(typeof this._errCallBack === "function") {
                    this._errCallBack();
                }
            }
        });
    }
}

const dsError = (e) => {
    console.log(e)
    if (e.status === 403 || e.xhr?.status === 403) {
        message.callBackAlert({msg: '세션이 종료되었습니다.', callback: new user().logout})
        return false;
    }else if (e.xhr?.status === 401){
        let g = {msg: '접근 권한이 없습니다.', type: 'error'};
        message.notification(g);
        return false;
    }
    let error = e.xhr?.responseJSON || e.responseJSON || {message: '오류가 발생하였습니다.'};
    let g = {msg: error.message, type: 'error'};
    message.notification(g);
}
const girdPrototype = kendo.ui.Grid.prototype;
girdPrototype.options.loaderType = "skeleton";
girdPrototype.options.noRecords = {template:`<div class="k-grid-norecords-template">#=this.dataSource.page() || '' # 페이지 조회된 건이 없습니다</div>`};

