$(document).ready(() => {
    const scheduler = {
        init: async () => {
            let scheduleType = [];
            let scheduleTypeds = new cpDataSource(METHOD.GET, '/common/v1/code/ScheduleType').getDataSource();
            await scheduleTypeds.read().then(() => {
                let data = scheduleTypeds.data();
                let scheduleTypeItem = {};
                data.forEach(d => {
                    scheduleTypeItem.text = d.codeNm;
                    scheduleTypeItem.value = d.codeKey;
                    scheduleTypeItem.color = `#${d.codeValue_01}`;
                    scheduleType.push({...scheduleTypeItem});
                });
            });

            kendo.ui.Scheduler.fn._keydown = function (e) {
            };

            const eventTemplate = $("#event-template");
            const $workScheduler = $("#work-scheduler");

            $('#workScheduler-reload').kendoFloatingActionButton({
                icon: 'reload',
                align: "bottom end",
                alignOffset: {x: 10, y: 100},
                size: "small",
                shape: 'rectangle',
                themeColor: "error",
                click: function () {
                    $workScheduler.data('kendoScheduler').dataSource.read();
                }
            });

            const workScheduler = $workScheduler.kendoScheduler({
                allDayEventTemplate: eventTemplate.html(),
                showWorkHours: true,
                views: [
                    {type: "day"},
                    {type: "week"},
                    {
                        type: "month",
                        eventsPerDay: 3,
                        selected: true
                    },
                    "year"
                ],
                editable: {
                    move: false,
                    resize:false,
                    window: {
                        title: "스케쥴 관리",
                        appendTo: '#work-scheduler',
                        open: function (e) {
                            e.sender.setOptions({
                                position: {
                                    top: 50,
                                    left: "30%"
                                }
                            });
                        }
                    }
                },
                date: new Date(),
                workDayStart: new Date(kendo.toString(kendo.date.today(), 'yyyy/M/dd') + ' 07:00 AM'),
                workDayEnd: new Date(kendo.toString(kendo.date.today(), 'yyyy/M/dd') + ' 09:00 PM'),
                workWeekStart: 0,
                workWeekEnd: 6,
                timezone: "Etc/UTC",
                dataSource: {
                    batch: true,
                    transport: {
                        read: {
                            url: "/work/v1/scheduler/read",
                            dataType: "json",
                            contentType: "application/json",
                            type: "GET"
                        },
                        update: {
                            url: "/work/v1/scheduler/update",
                            dataType: "json",
                            contentType: "application/json",
                            type: "PUT"
                        },
                        create: {
                            url: "/work/v1/scheduler/create",
                            dataType: "json",
                            contentType: "application/json",
                            type: "POST"
                        },
                        destroy: {
                            url: "/work/v1/scheduler/delete",
                            dataType: "json",
                            contentType: "application/json",
                            type: "DELETE"
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                let models = options.models[0];
                                models.allDay = (models.isAllDay ? 1 : 0);
                                return kendo.stringify(models);
                            }
                        }
                    },
                    schema: {
                        data: function (res) {
                            let datas = res.data;
                            if (Array.isArray(datas)) {
                                datas = res.data.map(d => {
                                    d.start = new Date(d.start);
                                    d.end = new Date(d.end);
                                    d.RecurrenceException = d.recurrenceException;
                                    return d;
                                });
                            } else {
                                let time_diff = 9 * 60 * 60 * 1000;
                                datas.start = new Date(datas.start + time_diff);
                                datas.end = new Date(datas.end + time_diff);
                                datas.RecurrenceException = datas.recurrenceException;
                            }
                            return datas;
                        },
                        model: {
                            id: "taskId",
                            fields: {
                                taskId: {from: "taskId", type: "number"},
                                title: {
                                    from: "title", validation: {required: true},
                                    change: function (e) {
                                        console.log(e)
                                    }
                                },
                                start: {from: "start", type: "date"},
                                end: {from: "end", type: "date"},
                                startTimeZone: {from: "startTimeZone"},
                                endTimeZone: {from: "endTimeZone"},
                                description: {from: "description"},
                                recurrenceId: {from: "recurrenceId"},
                                recurrenceRule: {from: "recurrenceRule"},
                                recurrenceException: {from: "recurrenceException"},
                                schedulerType: {from: "schedulerType", validation: {required: true}},
                                isAllDay: {type: "boolean", from: "isAllDay"}
                            }
                        }
                    },
                    filter: {
                        logic: "or",
                        filters: []
                    }
                },
                resources: [
                    {
                        field: "schedulerType",
                        title: "스케줄타입",
                        dataSource: scheduleType
                    }
                ],
                save: (e) => {
                    let container = $(e.container);
                    let event = e.event;
                    event.title = container.find("#title").val();
                    event.description = container.find("[name=description]").val();
                    event.dirty = event.title !== '';
                },
                dataBound: (e) => {
                    $(e.sender.wrapper).find('.k-scheduler-content').css({height: 'calc(100vh - 190px)'});

                    $('.event-task-view').parent().kendoTooltip({
                        showOn: "click mouseenter",
                        callout: false,
                        offset: 2,
                        content: function (e) {
                            let target = $(e.target);
                            let title = target.find('.event-task-view').text();
                            let text = target.find('.event-tooltip').text();
                            return getLink(`제목 : ${title}<br><br>${text}`);
                        }
                    });

                    let getLink = (text) => {
                        const domExp = {
                            par: /(http(s)?:\/\/|www.)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}([\/a-z0-9-%#?&=\w])+(\.[a-z0-9]{2,4}(\?[\/a-z0-9-%#?&=\w]+)*)*/gi
                        };
                        return text.replace(domExp.par, function (n) {
                            return `<a href="${n}" target="_blank" style="color: #4A92FE">${n}</a>`;
                        }).replaceAll('\n', '<br>');
                    }
                }
            }).data("kendoScheduler");

            // workScheduler.select(new Date());

            let html = `<div style="display: flex; justify-content: end; width: 100%; height: 100%; gap: 10px">
                <ul id="work-scheduler-checkboxgroup"></ul>
                <span class="k-text k-input k-rounded-md k-input-solid" style="width: 14em;">
                    <input tabindex="-1" id="scheduler-search-box" autocomplete="off" placeholder="검색어를 입력하세요" title="검색어를 입력하세요" class="k-input-inner"  style="width: ">
                    <span class="k-input-suffix"><span class="k-icon k-i-search"></span></span>
                </span>
            </div>`;

            $('#work-scheduler > div > .k-spacer').html(html);

            let checkbox = $("#work-scheduler-checkboxgroup").kendoCheckBoxGroup({
                items: scheduleType.map(d => {
                    return {
                        label: d.text,
                        value: d.value,
                        attributes: {
                            "style": `color:${d.color}; font-weight: bold; margin-right: 5px;`
                        },
                        padding: 0
                    }
                }),
                layout: 'horizontal',
                labelPosition: 'after',
                inputRounded: "full",
                value: scheduleType.map(d => {
                    return d.value
                }),
                change: function (e) {
                    $("#scheduler-search-box").val('');
                    workScheduler.dataSource.filter({
                        operator: function (task) {
                            return $.inArray(task.schedulerType, e.sender.value()) >= 0;
                        }
                    });
                }
            }).data("kendoCheckBoxGroup");

            $("#scheduler-search-box").on('keyup', function (e) {
                let text = $(e.target).val().toLowerCase();
                checkbox.checkAll(true);
                workScheduler.dataSource.filter({
                    "logic": "or", filters: [
                        {
                            field: "title",
                            operator: "contains",
                            value: text
                        },
                        {
                            field: "description",
                            operator: "contains",
                            value: text
                        }
                    ]
                });
            });
        }
    };
    cpProgress('scheduler-layout');
    scheduler.init().then(() => {
        cpProgress('scheduler-layout', false);
    });
});