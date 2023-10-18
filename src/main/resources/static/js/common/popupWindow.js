let OPEN_POPUPS = []

class popupWindow {
    #defaultOptions = {
        createNew: false,
        scrollbar: false,
        resizable: false,
        scrollbars: false,
        center: 'parent'
    }

    constructor(url, name = "", options = {}, callback) {
        this.url = url;
        this.name = name;
        this.options = $.extend(this.#defaultOptions, options);
        let winHeight = document.body.clientHeight;
        let winWidth = document.body.clientWidth;
        let winX = window.screenX || window.screenLeft || 0;
        let winY = window.screenY || window.screenTop || 0;

        winX = winX > 0 ? winX : Math.abs(winX);
        winY = winY > 0 ? winY : Math.abs(winX);
        let popX = winX + (winWidth - options.width) / 2;
        let popY = winY + (winHeight - options.height) / 2;
        popY = popY > 0 ? popY : 50;
        popX = popX > 0 ? popX : 50;

        let params = [];
        params.push('location=' + (options.location ? 'yes' : 'no'));
        params.push('menubar=' + (options.menubar ? 'yes' : 'no'));
        params.push('toolbar=' + (options.toolbar ? 'yes' : 'no'));
        params.push('scrollbars=' + (options.scrollbars ? 'yes' : 'no'));
        params.push('status=' + (options.status ? 'yes' : 'no'));
        params.push('resizable=' + (options.resizable ? 'yes' : 'no'));
        params.push('height=' + options.height);
        params.push('width=' + options.width);
        params.push('left=' + (options.left || popY));
        params.push('top=' +  (options.top || popX));
        this.options = params;
        this.callback = callback;
        this.menuArray = JSON.parse(localStorage.getItem("MENU_ARRAY"));
    }

    open() {

        let name = this.name;
        let checkWin = this.winFind(this.name)
        if (checkWin) {
            this.focus(checkWin);
            return;
        }

        let callback = this.callback;
        let win = window.open(this.url, name, this.options.join(","));
        win.pageNm = name;
        let timer = setInterval(function () {
            if (win.closed) {
                clearInterval(timer);
                if (typeof callback === 'function') callback.call();

                new popupWindow().userClose(win.pageNm);
            }
        }, 50);
        let p = OPEN_POPUPS.find(popup => popup.pageNm === name);
        if (!p) {
            OPEN_POPUPS.push(win);
        }
    }

    userClose(name) {
        let f = this.winFind(name);
        if (f) {
            this.menuArray.filter(r => r.roleNm === name).map(m => {
                $(`#icon_${m.programId}`).removeClass("k-i-c-grid-fill cp-open-color").addClass('k-i-c-grid');
            });
            OPEN_POPUPS.splice($.inArray(f, OPEN_POPUPS), 1);
        }
    }

    close(name) {
        OPEN_POPUPS
            .filter(popup => popup.name === name)
            .map(win => {
                win.close();
            });
    }

    allClose() {
        OPEN_POPUPS.map(r => {
            r.close()
        });
    }

    winFind(name) {
        return OPEN_POPUPS.find(r => r.pageNm === name);
    }

    focus(win) {
        setTimeout(function () {
            win?.focus();
        }, 50);
    }
}