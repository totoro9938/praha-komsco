(function ($) {
    const CHANGE = 'change', KEYUP = 'keyup', NS = '.kendoTextBox';
    const CpTextBox = kendo.ui.TextBox.extend({
        init: function (element, options) {
            let that = this;
            kendo.ui.TextBox.fn.init.call(that, element, options);
            that.element.on(KEYUP + NS, $.proxy(that._keyup, that));
        },
        options: {
            name: "CpTextBox",
            autoBind: true
        },
        events: [CHANGE, KEYUP],
        _keyup: function (e) {
            let that = this;
            let newValue = that.element.val();
            that._value = newValue;
            that.trigger(KEYUP, {
                value: newValue,
                originalEvent: e
            });
        }
    });
    kendo.cssProperties.registerPrefix('CpTextBox', 'k-input-');
    kendo.cssProperties.registerValues('CpTextBox', [{
        prop: 'rounded',
        values: kendo.cssProperties.roundedValues.concat([[
            'full',
            'full'
        ]])
    }]);
    kendo.ui.plugin(CpTextBox);
})(jQuery);
(function ($) {
    let KWINDOW = '.c-window', KWINDOWCONTENT = '.k-window-content', KOVERLAY = '.k-overlay',
        KCONTENTFRAME = 'k-content-frame', ZINDEX = 'zIndex', template = kendo.template;
    let CpWindow = kendo.ui.Window.extend({
        init: function (element, options) {
            let that = this;
            kendo.ui.Window.fn.init.call(that, element, options);
        },
        options: {
            name: "CpWindow"
        },
        _overlay: function (visible) {
            let overlay = this.containment ? this.containment.children(KOVERLAY) : this.appendTo.children(KOVERLAY),
                wrapper = this.wrapper, display = visible ? 'block' : 'none',
                zIndex = parseInt(wrapper.css(ZINDEX), 10) - 1;
            if (!overlay.length) {
                overlay = $('<div class=\'k-overlay\' />');
            }
            console.log('zIndex : '+zIndex);
            overlay.insertBefore(wrapper[0]).css({
                zIndex: zIndex,
                display: display
            });
            if (this.options.modal.preventScroll && !this.containment) {
                this._stopDocumentScrolling();
            }
            return overlay;
        },
        _keydownContent: function (e) {
            let that = this;
        },
        _keydown: function (e) {
            let that = this, options = that.options, keys = kendo.keys, keyCode = e.keyCode, wrapper = that.wrapper,
                offset, handled, distance = 10, isMaximized = options.isMaximized, isMinimized = options.isMinimized,
                newWidth, newHeight, w, h;

            if (e.target != e.currentTarget || that._closing) {
                return;
            }
            if (e.altKey && keyCode == 82) {
                that.refresh();
            }
            if (e.altKey && keyCode == 80) {
                if (that.options.pinned) {
                    that.unpin();
                } else {
                    that.pin();
                }
            }
            if (e.altKey && keyCode == keys.UP) {
                if (isMinimized) {
                    that.restore();
                    that.wrapper.trigger('focus');
                } else if (!isMaximized) {
                    that.maximize();
                    that.wrapper.trigger('focus');
                }
            } else if (e.altKey && keyCode == keys.DOWN) {
                if (!isMinimized && !isMaximized) {
                    that.minimize();
                    that.wrapper.trigger('focus');
                } else if (isMaximized) {
                    that.restore();
                }
            }
            offset = kendo.getOffset(wrapper);
            if (that.containment && !that._isPinned) {
                offset = that.options.position;
            }
            if (options.draggable && !e.ctrlKey && !e.altKey && !isMaximized) {
                that._updateBoundaries();
                if (keyCode == keys.UP) {
                    offset.top = constrain(offset.top - distance, that.minTop, that.maxTop);
                    handled = wrapper.css('top', offset.top);
                } else if (keyCode == keys.DOWN) {
                    offset.top = constrain(offset.top + distance, that.minTop, that.maxTop);
                    handled = wrapper.css('top', offset.top);
                } else if (keyCode == keys.LEFT) {
                    offset.left = constrain(offset.left - distance, that.minLeft, that.maxLeft);
                    handled = wrapper.css('left', offset.left);
                } else if (keyCode == keys.RIGHT) {
                    offset.left = constrain(offset.left + distance, that.minLeft, that.maxLeft);
                    handled = wrapper.css('left', offset.left);
                }
            }
            if (options.resizable && e.ctrlKey && !isMaximized && !isMinimized) {
                if (keyCode == keys.UP) {
                    handled = true;
                    newHeight = wrapper.outerHeight() - distance;
                } else if (keyCode == keys.DOWN) {
                    handled = true;
                    if (that.containment && !that._isPinned) {
                        newHeight = Math.min(wrapper.outerHeight() + distance, that.containment.height - offset.top - toInt(wrapper, 'padding-top') - toInt(wrapper, 'borderBottomWidth') - toInt(wrapper, 'borderTopWidth'));
                    } else {
                        newHeight = wrapper.outerHeight() + distance;
                    }
                }
                if (keyCode == keys.LEFT) {
                    handled = true;
                    newWidth = wrapper.outerWidth() - distance;
                } else if (keyCode == keys.RIGHT) {
                    handled = true;
                    if (that.containment && !that._isPinned) {
                        newWidth = Math.min(wrapper.outerWidth() + distance, that.containment.width - offset.left - toInt(wrapper, 'borderLeftWidth') - toInt(wrapper, 'borderRightWidth'));
                    } else {
                        newWidth = wrapper.outerWidth() + distance;
                    }
                }
                if (handled) {
                    w = constrain(newWidth, options.minWidth, options.maxWidth);
                    h = constrain(newHeight, options.minHeight, options.maxHeight);
                    if (!isNaN(w)) {
                        wrapper.outerWidth(w);
                        that.options.width = w + 'px';
                    }
                    if (!isNaN(h)) {
                        wrapper.outerHeight(h);
                        that.options.height = h + 'px';
                    }
                    that.resize();
                }
            }
            if (handled) {
                e.preventDefault();
            }
        }
    });
    templates = {
        wrapper: template('<div class=\'c-widget c-window\'></div>'),
        action: template('<a role=\'button\' href=\'\\#\' class=\'k-button k-button-md k-rounded-md k-button-flat k-button-flat-base k-icon-button k-window-action\' aria-label=\'#= name #\'>' + '<span class=\'k-button-icon k-icon k-i-#= name.toLowerCase() #\'></span>' + '</a>'),
        titlebar: template('<div class=\'k-window-titlebar k-hstack\'>' + '<span class=\'k-window-title\'>#= title #</span>' + '<div class=\'k-window-actions k-hstack\'></div>' + '</div>'),
        overlay: '<div class=\'k-overlay\'></div>',
        contentFrame: template('<iframe frameborder=\'0\' title=\'#= title #\' class=\'' + KCONTENTFRAME + '\' ' + 'src=\'#= content.url #\'>' + 'This page requires frames in order to show content' + '</iframe>'),
        resizeHandle: template('<div class=\'k-resize-handle k-resize-#= data #\'></div>')
    };
    kendo.ui.plugin(CpWindow);
})(jQuery);

(function ($) {
    const CLICK = 'click';
    const events =[
        'beforeEdit',
        'cancel',
        'cellClose',
        'change',
        'columnHide',
        'columnLock',
        'columnMenuInit',
        'columnMenuOpen',
        'columnReorder',
        'columnResize',
        'columnShow',
        'columnStick',
        'columnUnlock',
        'columnUnstick',
        'dataBinding',
        'dataBound',
        'detailCollapse',
        'detailExpand',
        'detailInit',
        'edit',
        'excelExport',
        'filter',
        'filterMenuInit',
        'filterMenuOpen',
        'group',
        'groupCollapse',
        'groupExpand',
        'navigate',
        'page',
        'pdfExport',
        'remove',
        'rowReorder',
        'rowResize',
        'save',
        'saveChanges',
        'sort',
        'click'
    ]
    let Grid = kendo.ui.Grid.extend({
        init: function (element, options) {
            let that = this;
            kendo.ui.Grid.fn.init.call(that, element, options);
            that.element.on(CLICK,`tbody tr`,$.proxy(that._click, that));
        },
        options: {
            name: "CpGrid",
            loaderType : "skeleton",
            noRecords :{template:`<div class="k-grid-norecords-template">#=this.dataSource.page() || '' # 페이지 조회된 건이 없습니다</div>`}
        },
        events: events,
        _click: function (e) {
            let that = this;
            that.trigger(CLICK, {
                originalEvent: e
            });
        },
        _error: function(e) {
            dsError(e);
            this._progress(false);
        }
    });
    kendo.ui.plugin(Grid);
    kendo.setDefaults('iconType', 'font'); //아이콘타입 font로 유지
})(jQuery);
