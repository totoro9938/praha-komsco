/**
 * Kendo UI v2021.3.914 (http://www.telerik.com/kendo-ui)
 * Copyright 2021 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
















 */

(function (f) {
    if (typeof define === 'function' && define.amd) {
        define(["kendo.core"], f);
    } else {
        f();
    }
}(function () {
    (function ($, undefined) {
        /* FlatColorPicker messages */

        if (kendo.ui.FlatColorPicker) {
            kendo.ui.FlatColorPicker.prototype.options.messages =
                $.extend(true, kendo.ui.FlatColorPicker.prototype.options.messages, {
                    "apply": "적용",
                    "cancel": "취소",
                    "noColor": "색상 없음",
                    "clearColor": "색 지우기"
                });
        }

        /* ColorPicker messages */

        if (kendo.ui.ColorPicker) {
            kendo.ui.ColorPicker.prototype.options.messages =
                $.extend(true, kendo.ui.ColorPicker.prototype.options.messages, {
                    "apply": "적용",
                    "cancel": "취소",
                    "noColor": "색상 없음",
                    "clearColor": "색 지우기"
                });
        }

        /* ColumnMenu messages */

        if (kendo.ui.ColumnMenu) {
            kendo.ui.ColumnMenu.prototype.options.messages =
                $.extend(true, kendo.ui.ColumnMenu.prototype.options.messages, {
                    "sortAscending": "오름차순 정렬",
                    "sortDescending": "내림차순 정렬",
                    "filter": "필터 적용",
                    "column": "열",
                    "columns": "열 설정",
                    "columnVisibility": "열 위치",
                    "clear": "비우기",
                    "cancel": "취소",
                    "done": "완료",
                    "settings": "열 설정 변경",
                    "lock": "고정",
                    "unlock": "고정 해제",
                    "stick": "열 고정",
                    "unstick": "열 고정 해제",
                    "setColumnPosition": "열 위치 설정",
                    "apply": "적용",
                    "reset": "되돌리기",
                    "buttonTitle": "{0} 열 설정 변경"
                });
        }

        /* DateRangePicker messages */

        if (kendo.ui.DateRangePicker) {
            kendo.ui.DateRangePicker.prototype.options.messages =
                $.extend(true, kendo.ui.DateRangePicker.prototype.options.messages, {
                    "startLabel": "시작일",
                    "endLabel": "종료일"
                });
        }

        /* Editor messages */

        if (kendo.ui.Editor) {
            kendo.ui.Editor.prototype.options.messages =
                $.extend(true, kendo.ui.Editor.prototype.options.messages, {
                    "bold": "굵게",
                    "italic": "이탤릭체",
                    "underline": "밑줄",
                    "strikethrough": "취소선",
                    "superscript": "위첨자",
                    "subscript": "아래첨자",
                    "justifyCenter": "가운데 정렬",
                    "justifyLeft": "왼쪽 정렬",
                    "justifyRight": "오른쪽 정렬",
                    "justifyFull": "양쪽 정렬",
                    "insertUnorderedList": "순서 없는 목록",
                    "insertOrderedList": "순차 목록",
                    "indent": "들여쓰기",
                    "outdent": "내어쓰기",
                    "createLink": "링크 삽입",
                    "unlink": "링크 제거",
                    "insertImage": "이미지 첨부",
                    "insertFile": "파일 첨부",
                    "insertHtml": "HTML파일 첨부",
                    "viewHtml": "HTML 보기",
                    "fontName": "글꼴 설정",
                    "fontNameInherit": "글꼴 가져오기",
                    "fontSize": "글자 크기",
                    "fontSizeInherit": "글자크기 가져오기",
                    "formatBlock": "HTML 태그 설정",
                    "formatting": "글자 형식",
                    "foreColor": "글자 색상",
                    "backColor": "배경 색상",
                    "style": "Styles",
                    "emptyFolder": "빈 폴더",
                    "uploadFile": "파일 업로드",
                    "overflowAnchor": "도구 더보기",
                    "orderBy": "정렬 기준:",
                    "orderBySize": "크기",
                    "orderByName": "제목",
                    "invalidFileType": "선택한 파일 \"{0}\" 의 형식이 유효하지 않습니다. 지원되는 파일 형식은 다음과 같습니다. {1}.",
                    "deleteFile": '"{0}"파일을 삭제하시겠습니까?',
                    "overwriteFile": '"{0}"라는 제목의 파일이 이미 현재 경로에 존재합니다. 덮어쓰시겠습니까?',
                    "directoryNotFound": "이 제목의 경로가 존재하지 않습니다.",
                    "imageWebAddress": "웹 주소",
                    "imageAltText": "텍스트",
                    "imageWidth": "가로 길이 (px)",
                    "imageHeight": "세로 길이 (px)",
                    "fileWebAddress": "웹 주소",
                    "fileTitle": "제목",
                    "linkWebAddress": "웹 주소",
                    "linkText": "텍스트",
                    "linkToolTip": "도움말",
                    "linkOpenInNewWindow": "새 창에서 링크 열기",
                    "dialogUpdate": "수정",
                    "dialogInsert": "삽입",
                    "dialogButtonSeparator": "Or",
                    "dialogCancel": "취소",
                    "cleanFormatting": "설정 초기화",
                    "createTable": "테이블 생성",
                    "addColumnLeft": "좌측 열 추가",
                    "addColumnRight": "우측 열 추가",
                    "addRowAbove": "상단 행 추가",
                    "addRowBelow": "하단 행 추가",
                    "deleteRow": "행 삭제",
                    "deleteColumn": "열 삭제",
                    "dialogOk": "확인",
                    "tableWizard": "테이블 도우미",
                    "tableTab": "테이블",
                    "cellTab": "셀",
                    "accessibilityTab": "접근성",
                    "caption": "캡션",
                    "summary": "요약",
                    "width": "너비",
                    "height": "높이",
                    "units": "Units",
                    "cellSpacing": "셀과 글자 간격",
                    "cellPadding": "셀 간격(padding)",
                    "cellMargin": "셀 간격(margin)",
                    "alignment": "정렬",
                    "background": "배경",
                    "cssClass": "CSS 클래스",
                    "id": "ID",
                    "border": "Border",
                    "borderStyle": "Border Style",
                    "collapseBorders": "셀 붙이기",
                    "wrapText": "텍스트 줄바꿈",
                    "associateCellsWithHeaders": "헤더 연결",
                    "alignLeft": "왼쪽 정렬",
                    "alignCenter": "가운데 정렬",
                    "alignRight": "오른쪽 정렬",
                    "alignLeftTop": "왼쪽 상단 정렬",
                    "alignCenterTop": "가운데 상단 정렬",
                    "alignRightTop": "우측 상단 정렬",
                    "alignLeftMiddle": "왼쪽 중앙 정렬",
                    "alignCenterMiddle": "가운데 중앙 정렬",
                    "alignRightMiddle": "오른쪽 중앙 정렬",
                    "alignLeftBottom": "좌측 하단 정렬",
                    "alignCenterBottom": "가운데 하단 정렬",
                    "alignRightBottom": "오른쪽 하단 정렬",
                    "alignRemove": "정렬 제거",
                    "columns": "열",
                    "rows": "행",
                    "selectAllCells": "모든 셀 선택",
                    "print": "프린트",
                    "headerRows": "머리글 행",
                    "headerColumns": "머리글 열",
                    "tableSummaryPlaceholder": "요약 속성이 HTML5와 호환되지 않습니다.",
                    "associateNone": "없음",
                    "associateScope": "'scope'속성을 사용하여 연결",
                    "associateIds": "ID를 사용하여 연결",
                    "copyFormat": "적용된 포맷 복사",
                    "applyFormat": "포맷 적용",
                    "borderNone": "없음"
                });
        }

        /* FileBrowser messages */

        if (kendo.ui.FileBrowser) {
            kendo.ui.FileBrowser.prototype.options.messages =
                $.extend(true, kendo.ui.FileBrowser.prototype.options.messages, {
                    "uploadFile": "업로드",
                    "orderBy": "정렬 기준",
                    "orderByName": "파일 제목",
                    "orderBySize": "파일 크기",
                    "directoryNotFound": "이 제목의 경로가 존재하지 않습니다.",
                    "emptyFolder": "빈 폴더",
                    "deleteFile": '"{0}"파일을 삭제하시겠습니까?',
                    "invalidFileType": "선택한 파일 \"{0}\"이 유효하지 않습니다. Supported file types are {1}.",
                    "overwriteFile": "\"{0}\"라는 제목의 파일이 이미 현재 경로에 존재합니다. 덮어쓰시겠습니까?",
                    "dropFilesHere": "마우스로 파일을 끌어오세요",
                    "search": "검색"
                });
        }

        /* FileManager messages */

        if (kendo.ui.FileManager) {
            kendo.ui.FileManager.prototype.options.messages =
                $.extend(true, kendo.ui.FileManager.prototype.options.messages, {
                    toolbar: {
                        createFolder: "새 폴더",
                        upload: "업로드",
                        sortDirection: "정렬 방향",
                        sortDirectionAsc: "오름차순 정렬",
                        sortDirectionDesc: "내림차순 정렬",
                        sortField: "정렬 기준",
                        nameField: "제목",
                        sizeField: "크기",
                        typeField: "파일 형식",
                        dateModifiedField: "수정한 날짜",
                        dateCreatedField: "만든 날짜",
                        listView: "리스트로 보기",
                        gridView: "그림으로 보기",
                        search: "검색",
                        details: "자세히",
                        detailsChecked: "On",
                        detailsUnchecked: "Off",
                        "delete": "삭제",
                        rename: "이름 바꾸기"
                    },
                    views: {
                        nameField: "제목",
                        sizeField: "크기",
                        typeField: "파일 형식",
                        dateModifiedField: "수정한 날짜",
                        dateCreatedField: "만든 날짜",
                        items: "항목"
                    },
                    dialogs: {
                        upload: {
                            title: "파일 업로드",
                            clear: "리스트 비우기",
                            done: "완료"
                        },
                        moveConfirm: {
                            title: "확인",
                            content: "<p style='text-align: center;'>이동 또는 복사하시겠습니까?</p>",
                            okText: "복사",
                            cancel: "이동",
                            close: "닫기"
                        },
                        deleteConfirm: {
                            title: "확인",
                            content: "<p style='text-align: center;'>선택된 파일을 삭제하시겠습니까?</br>이 작업은 취소할 수 없습니다.</p>",
                            okText: "삭제",
                            cancel: "취소",
                            close: "닫기"
                        },
                        renamePrompt: {
                            title: "프롬프트",
                            content: "<p style='text-align: center;'>파일의 새 이름을 입력하십시오.</p>",
                            okText: "이름 바꾸기",
                            cancel: "취소",
                            close: "닫기"
                        }
                    },
                    previewPane: {
                        noFileSelected: "선택된 파일 없음",
                        extension: "형식",
                        size: "크기",
                        created: "만든 날짜",
                        createdUtc: "만든 날짜 UTC",
                        modified: "수정된 날짜",
                        modifiedUtc: "수정된 날짜 UTC",
                        items: "항목"
                    }
                });
        }

        /* FilterCell messages */

        if (kendo.ui.FilterCell) {
            kendo.ui.FilterCell.prototype.options.messages =
                $.extend(true, kendo.ui.FilterCell.prototype.options.messages, {
                    "isTrue": "참",
                    "isFalse": "거짓",
                    "filter": "분류",
                    "clear": "초기화",
                    "operator": "연산자"
                });
        }

        /* FilterCell operators */

        if (kendo.ui.FilterCell) {
            kendo.ui.FilterCell.prototype.options.operators =
                $.extend(true, kendo.ui.FilterCell.prototype.options.operators, {
                    "string": {
                        "eq": "같은 항목",
                        "neq": "다른 항목",
                        "startswith": "시작하는 단어",
                        "contains": "포함하는 단어",
                        "doesnotcontain": "포함하지 않는 단어",
                        "endswith": "끝나는 단어",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보",
                        "isempty": "비어있음",
                        "isnotempty": "비어있지 않음",
                        "isnullorempty": "값이 없음",
                        "isnotnullorempty": "값이 있음"
                    },
                    "number": {
                        "eq": "같은 항목",
                        "neq": "다른 항목",
                        "gte": "이상",
                        "gt": "초과",
                        "lte": "이하",
                        "lt": "미만",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보"
                    },
                    "date": {
                        "eq": "같은 날짜",
                        "neq": "다른 날짜",
                        "gte": "같거나 그 이후",
                        "gt": "이후",
                        "lte": "같거나 그 이전",
                        "lt": "이전",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보"
                    },
                    "enums": {
                        "eq": "같은 항목",
                        "neq": "다른 항목",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보"
                    }
                });
        }

        /* FilterMenu messages */

        if (kendo.ui.FilterMenu) {
            kendo.ui.FilterMenu.prototype.options.messages =
                $.extend(true, kendo.ui.FilterMenu.prototype.options.messages, {
                    "info": "다음과 같은 값으로 항목 표시:",
                    "title": "다음과 같은 값으로 항목 표시",
                    "isTrue": "참",
                    "isFalse": "거짓",
                    "filter": "분류",
                    "clear": "초기화",
                    "and": "And",
                    "or": "Or",
                    "selectValue": "-값 선택-",
                    "operator": "연산자",
                    "value": "값",
                    "cancel": "취소",
                    "done": "완료",
                    "into": "in",
                    "buttonTitle": "{0} 필터 열 설정"
                });
        }

        /* FilterMenu operator messages */

        if (kendo.ui.FilterMenu) {
            kendo.ui.FilterMenu.prototype.options.operators =
                $.extend(true, kendo.ui.FilterMenu.prototype.options.operators, {
                    "string": {
                        "eq": "같은 항목",
                        "neq": "다른 항목",
                        "startswith": "시작하는 단어",
                        "contains": "포함하는 단어",
                        "doesnotcontain": "포함하지 않는 단어",
                        "endswith": "끝나는 단어",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보",
                        "isempty": "비어있음",
                        "isnotempty": "비어있지 않음",
                        "isnullorempty": "값이 없음",
                        "isnotnullorempty": "값이 있음"
                    },
                    "number": {
                        "eq": "같은 항목",
                        "neq": "다른 항목",
                        "gte": "이상",
                        "gt": "초과",
                        "lte": "이하",
                        "lt": "미만",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보"
                    },
                    "date": {
                        "eq": "같은 항목",
                        "neq": "다른 항목",
                        "gte": "같거나 그 이후",
                        "gt": "이후",
                        "lte": "같거나 그 이전",
                        "lt": "이전",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보"
                    },
                    "enums": {
                        "eq": "같은 항목",
                        "neq": "다른 항목",
                        "isnull": "기록되지 않음",
                        "isnotnull": "기록된 모든 정보"
                    }
                });
        }

        /* FilterMultiCheck messages */

        if (kendo.ui.FilterMultiCheck) {
            kendo.ui.FilterMultiCheck.prototype.options.messages =
                $.extend(true, kendo.ui.FilterMultiCheck.prototype.options.messages, {
                    "checkAll": "전체 선택",
                    "clearAll": "전체 초기화",
                    "clear": "초기화",
                    "filter": "분류",
                    "search": "검색",
                    "cancel": "취소",
                    "selectedItemsFormat": "{0} 항목 선택됨",
                    "done": "완료",
                    "into": "in"
                });
        }

        /* Gantt messages */

        if (kendo.ui.Gantt) {
            kendo.ui.Gantt.prototype.options.messages =
                $.extend(true, kendo.ui.Gantt.prototype.options.messages, {
                    "actions": {
                        "addChild": "하위 항목 생성",
                        "append": "항목 생성",
                        "insertAfter": "항목 추가",
                        "insertBefore": "전 위치에 항목 생성",
                        "pdf": "PDF파일 추출"
                    },
                    "cancel": "취소",
                    "deleteDependencyWindowTitle": "의존성 삭제",
                    "deleteTaskWindowTitle": "Task 삭제",
                    "destroy": "삭제",
                    "editor": {
                        "assingButton": "할당",
                        "editorTitle": "Task",
                        "end": "종료",
                        "percentComplete": "완료",
                        "plannedStart": "예약된 시작",
                        "plannedEnd": "예약된 종료",
                        "resources": "리소스",
                        "resourcesEditorTitle": "리소스",
                        "resourcesHeader": "리소스",
                        "start": "시작",
                        "title": "제목",
                        "unitsHeader": "유닛"
                    },
                    "plannedTasks": {
                        "switchText": "계획된 작업",
                        "offsetTooltipAdvanced": "마감일보다 일찍 종료",
                        "offsetTooltipDelay": "마감일 연기",
                        "seconds": "초",
                        "minutes": "분",
                        "hours": "시",
                        "days": "일"
                    },
                    "save": "저장",
                    "views": {
                        "day": "일별",
                        "end": "종료",
                        "month": "월별",
                        "start": "시작",
                        "week": "주별",
                        "year": "연도별"
                    }
                });
        }

        /* Grid messages */

        if (kendo.ui.Grid) {
            kendo.ui.Grid.prototype.options.messages =
                $.extend(true, kendo.ui.Grid.prototype.options.messages, {
                    "commands": {
                        "cancel": "변경 취소",
                        "canceledit": "취소",
                        "create": "새 항목 추가",
                        "destroy": "삭제",
                        "edit": "편집",
                        "excel": "Excel 파일 추출",
                        "pdf": "PDF 파일 추출",
                        "save": "바뀐 항목 저장",
                        "select": "선택",
                        "update": "수정"
                    },
                    "editable": {
                        "cancelDelete": "취소",
                        "confirmation": "이 기록을 삭제하시겠습니까?",
                        "confirmDelete": "삭제"
                    },
                    "noRecords": "사용할 수 있는 레코드가 없습니다.",
                    "search": "검색중...",
                    "expandCollapseColumnHeader": "",
                    "groupHeader": "그룹화 하려면 컨트롤키와 스페이스바를 누르세요",
                    "ungroupHeader": "그룹화를 해제하려면 컨트롤키와 스페이스바를 누르세요"
                });
        }

        /* TaskBoard messages */

        if (kendo.ui.TaskBoard) {
            kendo.ui.TaskBoard.prototype.options.messages =
                $.extend(true, kendo.ui.TaskBoard.prototype.options.messages, {
                    "edit": "편집",
                    "createNewCard": "새 카드 만들기",
                    "create": "생성",
                    "search": "검색",
                    "previewCard": "카드 미리보기",
                    "addCard": "카드 추가하기",
                    "editCard": "카드 편집",
                    "deleteCard": "카드 삭제",
                    "addColumn": "열 추가",
                    "editColumn": "열 편집",
                    "deleteColumn": "열 삭제",
                    "close": "닫기",
                    "cancel": "취소",
                    "delete": "삭제",
                    "saveChanges": "바뀐 항목 저장",
                    "title": "제목:",
                    "description": "설명:",
                    "newColumn": "새로운 열 추가",
                    "deleteColumnConfirm": "이 열을 삭제하시겠습니까?",
                    "deleteCardConfirm": "이 카드를 삭제하시겠습니까?"
                });
        }

        /* TreeList messages */

        if (kendo.ui.TreeList) {
            kendo.ui.TreeList.prototype.options.messages =
                $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                    "noRows": "표기할 항목이 존재하지 않음",
                    "loading": "Loading...",
                    "requestFailed": "요청이 실패하였습니다.",
                    "retry": "재시도",
                    "commands": {
                        "edit": "편집",
                        "update": "수정",
                        "canceledit": "취소",
                        "create": "새 항목 추가",
                        "createchild": "하위 항목 추가",
                        "destroy": "삭제",
                        "excel": "Excel 파일로 추출",
                        "pdf": "PDF 파일로 추출"
                    }
                });
        }

        /* Groupable messages */

        if (kendo.ui.Groupable) {
            kendo.ui.Groupable.prototype.options.messages =
                $.extend(true, kendo.ui.Groupable.prototype.options.messages, {
                    "empty": "열 머리글을 끌어 해당 열별로 그룹화하려면 여기에 놓으십시오."
                });
        }

        /* NumericTextBox messages */

        if (kendo.ui.NumericTextBox) {
            kendo.ui.NumericTextBox.prototype.options =
                $.extend(true, kendo.ui.NumericTextBox.prototype.options, {
                    "upArrowText": "증가 값",
                    "downArrowText": "감소 값"
                });
        }

        /* MediaPlayer messages */

        if (kendo.ui.MediaPlayer) {
            kendo.ui.MediaPlayer.prototype.options.messages =
                $.extend(true, kendo.ui.MediaPlayer.prototype.options.messages, {
                    "pause": "일시정지",
                    "play": "재생",
                    "mute": "음소거",
                    "unmute": "음소거 해제",
                    "quality": "퀄리티",
                    "fullscreen": "전체 화면"
                });
        }

        /* Pager messages */

        if (kendo.ui.Pager) {
            kendo.ui.Pager.prototype.options.messages =
                $.extend(true, kendo.ui.Pager.prototype.options.messages, {
                    "allPages": "전체 보기",
                    "display": "{2} 항목 중 {0} - {1}",
                    "empty": "표기할 항목이 존재하지 않음",
                    "page": "페이지",
                    "pageButtonLabel": "페이지 {0}",
                    "pageSizeDropDownLabel": "페이지 크기 드롭다운",
                    "of": "{0}의",
                    "itemsPerPage": "페이지당 항목",
                    "first": "첫 페이지로 이동",
                    "previous": "이전 페이지로 이동",
                    "next": "다음 페이지로 이동",
                    "last": "마지막 페이지로 이동",
                    "refresh": "새로고침",
                    "morePages": "더보기"
                });
        }

        /* TreeListPager messages */

        if (kendo.ui.TreeListPager) {
            kendo.ui.TreeListPager.prototype.options.messages =
                $.extend(true, kendo.ui.TreeListPager.prototype.options.messages, {
                    "allPages": "전체 보기",
                    "display": "{2} 항목 중 {0} - {1}",
                    "empty": "표기할 항목이 존재하지 않음",
                    "page": "페이지",
                    "of": "{0}의",
                    "itemsPerPage": "페이지 당 항목",
                    "first": "첫 페이지로 이동",
                    "previous": "이전 페이지로 이동",
                    "next": "다음 페이지로 이동",
                    "last": "마지막 페이지로 이동",
                    "refresh": "새로고침",
                    "morePages": "더보기"
                });
        }

        /* PivotGrid messages */

        if (kendo.ui.PivotGrid) {
            kendo.ui.PivotGrid.prototype.options.messages =
                $.extend(true, kendo.ui.PivotGrid.prototype.options.messages, {
                    "measureFields": "여기에 데이터 필드 놓기",
                    "columnFields": "여기에 열 필드 놓기",
                    "rowFields": "여기에 행 필드 놓기"
                });
        }

        /* PivotFieldMenu messages */

        if (kendo.ui.PivotFieldMenu) {
            kendo.ui.PivotFieldMenu.prototype.options.messages =
                $.extend(true, kendo.ui.PivotFieldMenu.prototype.options.messages, {
                    "info": "값으로 항목 표시:",
                    "filterFields": "필드 필터",
                    "filter": "분류",
                    "include": "필드 포함...",
                    "title": "포함할 필드",
                    "clear": "초기화",
                    "ok": "Ok",
                    "cancel": "취소",
                    "operators": {
                        "contains": "포함하는 단어",
                        "doesnotcontain": "포함하지 않는 단어",
                        "startswith": "시작하는 단어",
                        "endswith": "끝나는 단어",
                        "eq": "같은 항목",
                        "neq": "다른 항목"
                    }
                });
        }

        /* RecurrenceEditor messages */

        if (kendo.ui.RecurrenceEditor) {
            kendo.ui.RecurrenceEditor.prototype.options.messages =
                $.extend(true, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                    "repeat": "반복",
                    "recurrenceEditorTitle": "반복 편집",
                    "frequencies": {
                        "never": "반복안함",
                        "hourly": "매 시간",
                        "daily": "매일",
                        "weekly": "매주",
                        "monthly": "매월",
                        "yearly": "매년"
                    },
                    "hourly": {
                        "repeatEvery": "반복 시점: ",
                        "interval": " 시간"
                    },
                    "daily": {
                        "repeatEvery": "반복 시점: ",
                        "interval": " 일"
                    },
                    "weekly": {
                        "interval": " 주",
                        "repeatEvery": "반복 시점: ",
                        "repeatOn": "반복: "
                    },
                    "monthly": {
                        "repeatEvery": "반복 시점: ",
                        "repeatOn": "반복: ",
                        "interval": " 월",
                        "day": "일 ",
                        "date": "날짜"
                    },
                    "yearly": {
                        "repeatEvery": "반복 시점: ",
                        "repeatOn": "반복: ",
                        "interval": " 년",
                        "of": " of ",
                        "month": "월",
                        "day": "일",
                        "date": "날짜"
                    },
                    "end": {
                        "label": "종료:",
                        "mobileLabel": "종료",
                        "never": "반복안함",
                        "after": "이후 ",
                        "occurrence": "반복 횟수",
                        "on": "On "
                    },
                    "offsetPositions": {
                        "first": "첫번째",
                        "second": "두번째",
                        "third": "세번째",
                        "fourth": "네번째",
                        "last": "마지막"
                    },
                    "weekdays": {
                        "day": "일",
                        "weekday": "평일",
                        "weekend": "주말"
                    }
                });
        }

        /* MobileRecurrenceEditor messages */

        if (kendo.ui.MobileRecurrenceEditor) {
            kendo.ui.MobileRecurrenceEditor.prototype.options.messages =
                $.extend(true, kendo.ui.MobileRecurrenceEditor.prototype.options.messages, kendo.ui.RecurrenceEditor.prototype.options.messages, {
                    "cancel": "취소",
                    "update": "저장",
                    "endTitle": "반복 종료",
                    "repeatTitle": "반복 패턴",
                    "headerTitle": "반복 이벤트",
                    "end": {
                        "patterns": {
                            "never": "반복안함",
                            "after": "...이후",
                            "on": "반복 시점"
                        },
                        "never": "Never",
                        "after": "이후 반복 종료",
                        "on": "반복 종료"
                    },
                    "daily": {
                        "interval": ""
                    },
                    "hourly": {
                        "interval": ""
                    },
                    "weekly": {
                        "interval": ""
                    },
                    "monthly": {
                        "interval": "",
                        "repeatBy": "반복: ",
                        "dayOfMonth": "날짜(월)",
                        "dayOfWeek": "요일",
                        "repeatEvery": "반복 시점",
                        "every": "Every",
                        "day": "Day "
                    },
                    "yearly": {
                        "interval": "",
                        "repeatBy": "Repeat by: ",
                        "dayOfMonth": "날짜(월)",
                        "dayOfWeek": "요일",
                        "repeatEvery": "반복 시점: ",
                        "every": "모든",
                        "month": "월",
                        "day": "일"
                    }
                });
        }

        /* Scheduler messages */

        if (kendo.ui.Scheduler) {
            kendo.ui.Scheduler.prototype.options.messages =
                $.extend(true, kendo.ui.Scheduler.prototype.options.messages, {
                    "allDay": "하루 종일",
                    "date": "날짜",
                    "event": "이벤트",
                    "time": "시간",
                    "showFullDay": "하루 전체 보기",
                    "showWorkDay": "업무 시간만 보기",
                    "today": "오늘",
                    "save": "저장",
                    "cancel": "취소",
                    "destroy": "삭제",
                    "resetSeries": "시리즈 리셋",
                    "deleteWindowTitle": "이벤트 삭제",
                    "ariaSlotLabel": "선택한 위치 {0:t} ~ {1:t}",
                    "ariaEventLabel": "{0} on {1:D} at {2:t}",
                    "editable": {
                        "confirmation": "이 이벤트를 삭제하시겠습니까?"
                    },
                    "views": {
                        "day": "일",
                        "week": "주",
                        "workWeek": "근무 주",
                        "agenda": "아젠다",
                        "month": "월",
                        "year": "년",
                        "timeline": "타임라인"
                    },
                    "recurrenceMessages": {
                        "deleteWindowTitle": "반복 항목 삭제",
                        "resetSeriesWindowTitle": "시리즈 리셋",
                        "deleteWindowOccurrence": "현재 발생 항목 삭제",
                        "deleteWindowSeries": "시리즈 삭제",
                        "deleteRecurringConfirmation": "이 이벤트를 삭제하시겠습니까?",
                        "deleteSeriesConfirmation": "전체 시리즈를 삭제하시겠습니까?",
                        "editWindowTitle": "반복 항목 수정",
                        "editWindowOccurrence": "현재 발생 항목 수정",
                        "editWindowSeries": "시리즈 수정",
                        "deleteRecurring": "이 이벤트 또는 전체 시리즈를 삭제하시겠습니까?",
                        "editRecurring": "이 이벤트 또는 전체 시리즈를 수정하시겠습니까?"
                    },
                    "editor": {
                        "title": "제목",
                        "start": "시작",
                        "end": "종료",
                        "allDayEvent": "종일",
                        "description": "설명",
                        "repeat": "반복",
                        "timezone": "시간대",
                        "startTimezone": "시작 시간대",
                        "endTimezone": "종료 시간대",
                        "separateTimezones": "별도의 시작 및 종료 시간대 사용",
                        "timezoneEditorTitle": "시간대 설정",
                        "timezoneEditorButton": "시간대 설정",
                        "timezoneTitle": "시간대",
                        "noTimezone": "시간대 사용 안함",
                        "editorTitle": "이벤트"
                    },
                    "search": "검색어를 입력하세요"
                });
        }

        /* Spreadsheet messages */

        if (kendo.spreadsheet && kendo.spreadsheet.messages.borderPalette) {
            kendo.spreadsheet.messages.borderPalette =
                $.extend(true, kendo.spreadsheet.messages.borderPalette, {
                    "allBorders": "모든 테두리",
                    "insideBorders": "테두리 내부",
                    "insideHorizontalBorders": "내부 수평 테두리",
                    "insideVerticalBorders": "내부 수직 테두리",
                    "outsideBorders": "외부 테두리",
                    "leftBorder": "왼쪽 테두리",
                    "topBorder": "상단 테두리",
                    "rightBorder": "우측 테두리",
                    "bottomBorder": "하단 테두리",
                    "noBorders": "테두리 없음",
                    "reset": "색상 재설정",
                    "customColor": "사용자 지정 색상...",
                    "apply": "적용",
                    "cancel": "취소"
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.dialogs) {
            kendo.spreadsheet.messages.dialogs =
                $.extend(true, kendo.spreadsheet.messages.dialogs, {
                    "apply": "적용",
                    "save": "저장",
                    "cancel": "취소",
                    "remove": "제거",
                    "retry": "재시도",
                    "revert": "되돌리기",
                    "okText": "OK",
                    "formatCellsDialog": {
                        "title": "포맷",
                        "categories": {
                            "number": "숫자",
                            "currency": "공용",
                            "date": "날짜"
                        }
                    },
                    "fontFamilyDialog": {
                        "title": "글씨체"
                    },
                    "fontSizeDialog": {
                        "title": "글자 크기"
                    },
                    "bordersDialog": {
                        "title": "테두리"
                    },
                    "alignmentDialog": {
                        "title": "정렬",
                        "buttons": {
                            "justtifyLeft": "왼쪽 정렬",
                            "justifyCenter": "가운데 정렬",
                            "justifyRight": "오른쪽 정렬",
                            "justifyFull": "양쪽 정렬",
                            "alignTop": "상단 정렬",
                            "alignMiddle": "중앙 정렬",
                            "alignBottom": "하단 정렬"
                        }
                    },
                    "mergeDialog": {
                        "title": "셀 병합",
                        "buttons": {
                            "mergeCells": "모든 셀 병합",
                            "mergeHorizontally": "수평 셀 병합",
                            "mergeVertically": "수직 셀 병합",
                            "unmerge": "셀 분할"
                        }
                    },
                    "freezeDialog": {
                        "title": "창 고정",
                        "buttons": {
                            "freezePanes": "창 고정",
                            "freezeRows": "행 고정",
                            "freezeColumns": "열 고정",
                            "unfreeze": "창 고정 해제"
                        }
                    },
                    "confirmationDialog": {
                        "text": "이 시트를 제거하시겠습니까?",
                        "title": "시트 제거"
                    },
                    "validationDialog": {
                        "title": "데이터 유효성 검사",
                        "hintMessage": "올바른 {0} 값 {1}을(를) 입력하십시오.",
                        "hintTitle": "확인 {0}",
                        "criteria": {
                            "any": "모든 값",
                            "number": "숫자",
                            "text": "텍스트",
                            "date": "날짜",
                            "custom": "사용자 지정",
                            "list": "리스트"
                        },
                        "comparers": {
                            "greaterThan": "초과",
                            "lessThan": "미만",
                            "between": "사이",
                            "notBetween": "사이에 있지 않음",
                            "equalTo": "같음",
                            "notEqualTo": "같지 않음",
                            "greaterThanOrEqualTo": "이상",
                            "lessThanOrEqualTo": "이하"
                        },
                        "comparerMessages": {
                            "greaterThan": "{0}보다 큰 값",
                            "lessThan": "{0}보다 작은 값",
                            "between": "{0} 와 {1} 사이의 값",
                            "notBetween": "{0} 와 {1} 사이의 값이 아님",
                            "equalTo": "{0}와 같음",
                            "notEqualTo": "{0}와 같지 않음",
                            "greaterThanOrEqualTo": "{0} 이상",
                            "lessThanOrEqualTo": "{0} 이하",
                            "custom": "다음과 같은 공식을 만족: {0}"
                        },
                        "labels": {
                            "criteria": "기준",
                            "comparer": "비교연산자",
                            "min": "최솟값",
                            "max": "최댓값",
                            "value": "값",
                            "start": "시작",
                            "end": "종료",
                            "onInvalidData": "유효하지 않은 데이터에 대해",
                            "rejectInput": "입력 거부",
                            "showWarning": "경고 표시",
                            "showHint": "도움말 표시",
                            "hintTitle": "도움말 제목",
                            "hintMessage": "도움말 메시지",
                            "ignoreBlank": "공백 무시"
                        },
                        "placeholders": {
                            "typeTitle": "제목 입력",
                            "typeMessage": "메시지 입력"
                        }
                    },
                    "exportAsDialog": {
                        "title": "내보내기...",
                        "labels": {
                            "fileName": "파일 제목",
                            "saveAsType": "형식으로 저장",
                            "exportArea": "내보내기",
                            "paperSize": "용지 크기",
                            "margins": "여백",
                            "orientation": "방향",
                            "print": "프린트",
                            "guidelines": "기준선",
                            "center": "중앙",
                            "horizontally": "가로",
                            "vertically": "세로"
                        }
                    },
                    "modifyMergedDialog": {
                        "errorMessage": "병합된 셀의 일부를 변경할 수 없습니다."
                    },
                    "useKeyboardDialog": {
                        "title": "복사 및 붙여넣기",
                        "errorMessage": "이러한 작업은 메뉴를 통해 호출할 수 없습니다. 대신 바로가기 키를 사용하십시오 :",
                        "labels": {
                            "forCopy": "복사",
                            "forCut": "잘라내기",
                            "forPaste": "붙여넣기"
                        }
                    },
                    "unsupportedSelectionDialog": {
                        "errorMessage": "이 작업은 여러 선택에서 수행할 수 없습니다."
                    },
                    "insertCommentDialog": {
                        "title": "주석 삽입",
                        "labels": {
                            "comment": "주석",
                            "removeComment": "주석 제거"
                        }
                    },
                    "insertImageDialog": {
                        "title": "이미지 삽입",
                        "info": "이미지를 여기로 끌거나 클릭하여 선택",
                        "typeError": "JPEG, PNG 또는 GIF 이미지를 선택하십시오."
                    }
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.filterMenu) {
            kendo.spreadsheet.messages.filterMenu =
                $.extend(true, kendo.spreadsheet.messages.filterMenu, {
                    "sortAscending": "정렬 범위 A 에서 Z",
                    "sortDescending": "정렬 범위 Z 에서 A",
                    "filterByValue": "값으로 필터링",
                    "filterByCondition": "조건으로 필터링",
                    "apply": "적용",
                    "search": "검색",
                    "addToCurrent": "현재 항목에 추가",
                    "clear": "초기화",
                    "blanks": "(빈칸)",
                    "operatorNone": "없음",
                    "and": "AND",
                    "or": "OR",
                    "operators": {
                        "string": {
                            "contains": "텍스트에 포함",
                            "doesnotcontain": "텍스트에 포함되어있지 않음",
                            "startswith": "시작하는 단어",
                            "endswith": "끝나는 단어"
                        },
                        "date": {
                            "eq": "날짜",
                            "neq": "날짜가 아닙니다.",
                            "lt": "날짜가 이전입니다.",
                            "gt": "날짜가 이후입니다."
                        },
                        "number": {
                            "eq": "같음",
                            "neq": "같지 않음",
                            "gte": "이상",
                            "gt": "초과",
                            "lte": "이하",
                            "lt": "미만"
                        }
                    }
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.colorPicker) {
            kendo.spreadsheet.messages.colorPicker =
                $.extend(true, kendo.spreadsheet.messages.colorPicker, {
                    "reset": "색상 재설정",
                    "customColor": "사용자 지정 색상...",
                    "apply": "적용",
                    "cancel": "취소"
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.toolbar) {
            kendo.spreadsheet.messages.toolbar =
                $.extend(true, kendo.spreadsheet.messages.toolbar, {
                    "addColumnLeft": "왼쪽 열 추가",
                    "addColumnRight": "오른쪽 열 추가",
                    "addRowAbove": "상단 행 추가",
                    "addRowBelow": "하단 행 추가",
                    "alignment": "정렬",
                    "alignmentButtons": {
                        "justtifyLeft": "왼쪽 정렬",
                        "justifyCenter": "가운데 정렬",
                        "justifyRight": "오른쪽 정렬",
                        "justifyFull": "양쪽 정렬",
                        "alignTop": "상단 정렬",
                        "alignMiddle": "중앙 정렬",
                        "alignBottom": "하단 정렬"
                    },
                    "backgroundColor": "배경",
                    "bold": "굵게",
                    "borders": "테두리",
                    "colorPicker": {
                        "reset": "색상 재설정",
                        "customColor": "사용자 지정 색상..."
                    },
                    "copy": "복사",
                    "cut": "잘라내기",
                    "deleteColumn": "열 삭제",
                    "deleteRow": "행 삭제",
                    "excelImport": "Excel에서 가져오기...",
                    "filter": "필터",
                    "fontFamily": "글씨체",
                    "fontSize": "글자 크기",
                    "format": "사용자 지정 포맷...",
                    "formatTypes": {
                        "automatic": "자동",
                        "number": "숫자",
                        "percent": "백분율",
                        "financial": "금액",
                        "currency": "통화",
                        "date": "날짜",
                        "time": "시간",
                        "dateTime": "날짜와 시간",
                        "duration": "지속시간",
                        "moreFormats": "포맷 더보기..."
                    },
                    "formatDecreaseDecimal": "소수점 줄이기",
                    "formatIncreaseDecimal": "소수점 늘리기",
                    "freeze": "창 고정",
                    "freezeButtons": {
                        "freezePanes": "창 고정",
                        "freezeRows": "행 고정",
                        "freezeColumns": "열 고정",
                        "unfreeze": "창 고정 해제"
                    },
                    "insertComment": "주석 삽입",
                    "insertImage": "이미지 삽입",
                    "italic": "이탤릭체",
                    "merge": "셀 병합",
                    "mergeButtons": {
                        "mergeCells": "모든 셀 병합",
                        "mergeHorizontally": "수평 셀 병합",
                        "mergeVertically": "수직 셀 병합",
                        "unmerge": "셀 병합 해제"
                    },
                    "open": "열기...",
                    "paste": "복사",
                    "quickAccess": {
                        "redo": "재실행",
                        "undo": "실행 취소"
                    },
                    "saveAs": "...로 저장",
                    "sortAsc": "오름차순 정렬",
                    "sortDesc": "내림차순 정렬",
                    "sortButtons": {
                        "sortSheetAsc": "A 에서 Z로 시트 정렬",
                        "sortSheetDesc": "Z 에서 A로 시트 정렬",
                        "sortRangeAsc": "정렬 범위 A 에서 Z",
                        "sortRangeDesc": "정렬 범위 Z 에서 A"
                    },
                    "textColor": "글자 색상",
                    "textWrap": "텍스트 감싸기",
                    "underline": "밑줄",
                    "validation": "데이터 유효성 검사..."
                });
        }

        if (kendo.spreadsheet && kendo.spreadsheet.messages.view) {
            kendo.spreadsheet.messages.view =
                $.extend(true, kendo.spreadsheet.messages.view, {
                    "errors": {
                        "shiftingNonblankCells": "데이터 손실 가능성 때문에 셀을 삽입할 수 없습니다. 다른 삽입 위치를 선택하거나 워크시트 끝에서 데이터를 삭제합니다.",
                        "filterRangeContainingMerges": "병합된 셀이 포함된 필터를 만들 수 없습니다.",
                        "validationError": "입력한 값이 셀에 설정된 유효성 검사 규칙을 위반합니다."
                    },
                    "tabs": {
                        "home": "기본 메뉴",
                        "insert": "삽입",
                        "data": "데이터"
                    }
                });
        }

        /* Slider messages */

        if (kendo.ui.Slider) {
            kendo.ui.Slider.prototype.options =
                $.extend(true, kendo.ui.Slider.prototype.options, {
                    "increaseButtonTitle": "증가",
                    "decreaseButtonTitle": "감소"
                });
        }

        /* ListBox messaages */

        if (kendo.ui.ListBox) {
            kendo.ui.ListBox.prototype.options.messages =
                $.extend(true, kendo.ui.ListBox.prototype.options.messages, {
                    "tools": {
                        "remove": "삭제",
                        "moveUp": "위로 이동",
                        "moveDown": "아래로 이동",
                        "transferTo": "다음으로 보내기",
                        "transferFrom": "다음으로부터 보내기",
                        "transferAllTo": "다음으로 모두 보내기",
                        "transferAllFrom": "다음으로부터 모두 보내기"
                    }
                });
        }

        /* TreeList messages */

        if (kendo.ui.TreeList) {
            kendo.ui.TreeList.prototype.options.messages =
                $.extend(true, kendo.ui.TreeList.prototype.options.messages, {
                    "noRows": "표기할 항목이 존재하지 않음",
                    "loading": "로딩중...",
                    "requestFailed": "요청에 실패하였습니다.",
                    "retry": "재시도",
                    "commands": {
                        "edit": "편집",
                        "update": "수정",
                        "canceledit": "취소",
                        "create": "새 항목 추가",
                        "createchild": "하위 항목 추가",
                        "destroy": "삭제",
                        "excel": "Excel 파일로 추출",
                        "pdf": "PDF 파일로 추출"
                    }
                });
        }

        /* TreeView messages */

        if (kendo.ui.TreeView) {
            kendo.ui.TreeView.prototype.options.messages =
                $.extend(true, kendo.ui.TreeView.prototype.options.messages, {
                    "loading": "로딩중...",
                    "requestFailed": "요청에 실패하였습니다.",
                    "retry": "재시도"
                });
        }

        /* Upload messages */

        if (kendo.ui.Upload) {
            kendo.ui.Upload.prototype.options.localization =
                $.extend(true, kendo.ui.Upload.prototype.options.localization, {
                    "select": "업로드 할 파일 선택",
                    "cancel": "취소",
                    "retry": "재시도",
                    "remove": "삭제",
                    "clearSelectedFiles": "초기화",
                    "uploadSelectedFiles": "파일 업로드",
                    "dropFilesHere": "업로드할 파일을 여기에 놓기",
                    "statusUploading": "업로드 중",
                    "statusUploaded": "업로드 완료",
                    "statusWarning": "경고",
                    "statusFailed": "업로드 실패",
                    "headerStatusPaused": "일시 중지됨",
                    "headerStatusUploading": "업로드 중...",
                    "headerStatusUploaded": "업로드 완료",
                    "uploadSuccess": "파일이 성공적으로 업로드되었습니다.",
                    "uploadFail": "파일을 업로드하지 못했습니다.",
                    "invalidMaxFileSize": "파일 크기가 너무 큽니다.",
                    "invalidMinFileSize": "파일 크기가 너무 작습니다.",
                    "invalidFileExtension": "허용되지 않은 파일 형식입니다."
                });
        }

        /* Validator messages */

        if (kendo.ui.Validator) {
            kendo.ui.Validator.prototype.options.messages =
                $.extend(true, kendo.ui.Validator.prototype.options.messages, {
                    "required": "{0}이 필요합니다.",
                    "pattern": "{0}이 유효하지 않습니다.",
                    "min": "{0}은 {1}보다 크거나 같아야 합니다.",
                    "max": "{0}은 {1}보다 작거나 같아야 합니다.",
                    "step": "{0}이 유효하지 않습니다.",
                    "email": "{0}은 올바른 이메일이 아닙니다.",
                    "url": "{0}은 올바른 URL이 아닙니다",
                    "date": "{0}은 올바른 날짜가 아닙니다.",
                    "dateCompare": "종료일은 시작일과 같거나 이후여야 합니다."
                });
        }

        /* kendo.ui.progress method */
        if (kendo.ui.progress) {
            kendo.ui.progress.messages =
                $.extend(true, kendo.ui.progress.messages, {
                    loading: "로딩중..."
                });
        }

        /* Dialog */

        if (kendo.ui.Dialog) {
            kendo.ui.Dialog.prototype.options.messages =
                $.extend(true, kendo.ui.Dialog.prototype.options.localization, {
                    "close": "닫기"
                });
        }

        /* Calendar */
        if (kendo.ui.Calendar) {
            kendo.ui.Calendar.prototype.options.messages =
                $.extend(true, kendo.ui.Calendar.prototype.options.messages, {
                    "weekColumnHeader": ""
                });
        }

        /* Alert */

        if (kendo.ui.Alert) {
            kendo.ui.Alert.prototype.options.messages =
                $.extend(true, kendo.ui.Alert.prototype.options.localization, {
                    "okText": "OK"
                });
        }

        /* Confirm */

        if (kendo.ui.Confirm) {
            kendo.ui.Confirm.prototype.options.messages =
                $.extend(true, kendo.ui.Confirm.prototype.options.localization, {
                    "okText": "OK",
                    "cancel": "취소"
                });
        }

        /* Prompt */
        if (kendo.ui.Prompt) {
            kendo.ui.Prompt.prototype.options.messages =
                $.extend(true, kendo.ui.Prompt.prototype.options.localization, {
                    "okText": "OK",
                    "cancel": "취소"
                });
        }

        /* DateInput */
        if (kendo.ui.DateInput) {
            kendo.ui.DateInput.prototype.options.messages =
                $.extend(true, kendo.ui.DateInput.prototype.options.messages, {
                    "year": "연도",
                    "month": "월",
                    "day": "일",
                    "weekday": "요일",
                    "hour": "시간",
                    "minute": "분",
                    "second": "초",
                    "dayperiod": "오전/오후"
                });
        }

        /* List messages */

        if (kendo.ui.List) {
            kendo.ui.List.prototype.options.messages =
                $.extend(true, kendo.ui.List.prototype.options.messages, {
                    "clear": "초기화",
                    "noData": "데이터를 찾을 수 없습니다."
                });
        }

        /* DropDownList messages */

        if (kendo.ui.DropDownList) {
            kendo.ui.DropDownList.prototype.options.messages =
                $.extend(true, kendo.ui.DropDownList.prototype.options.messages, kendo.ui.List.prototype.options.messages);
        }

        /* ComboBox messages */

        if (kendo.ui.ComboBox) {
            kendo.ui.ComboBox.prototype.options.messages =
                $.extend(true, kendo.ui.ComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
        }

        /* AutoComplete messages */

        if (kendo.ui.AutoComplete) {
            kendo.ui.AutoComplete.prototype.options.messages =
                $.extend(true, kendo.ui.AutoComplete.prototype.options.messages, kendo.ui.List.prototype.options.messages);
        }

        /* MultiColumnComboBox messages */

        if (kendo.ui.MultiColumnComboBox) {
            kendo.ui.MultiColumnComboBox.prototype.options.messages =
                $.extend(true, kendo.ui.MultiColumnComboBox.prototype.options.messages, kendo.ui.List.prototype.options.messages);
        }

        /* DropDownTree messages */

        if (kendo.ui.DropDownTree) {
            kendo.ui.DropDownTree.prototype.options.messages =
                $.extend(true, kendo.ui.DropDownTree.prototype.options.messages, {
                    "singleTag": "항목이 선택되었습니다.",
                    "clear": "초기화",
                    "deleteTag": "삭제",
                    "noData": "데이터를 찾을 수 없습니다."
                });
        }

        /* MultiSelect messages */

        if (kendo.ui.MultiSelect) {
            kendo.ui.MultiSelect.prototype.options.messages =
                $.extend(true, kendo.ui.MultiSelect.prototype.options.messages, {
                    "singleTag": "항목이 선택되었습니다.",
                    "clear": "초기화",
                    "deleteTag": "삭제",
                    "noData": "데이터를 찾을 수 없습니다.",
                    "downArrow": "선택"
                });
        }

        /* Chat messages */

        if (kendo.ui.Chat) {
            kendo.ui.Chat.prototype.options.messages =
                $.extend(true, kendo.ui.Chat.prototype.options.messages, {
                    "placeholder": "메시지를 입력하세요...",
                    "toggleButton": "도구 모음 전환",
                    "sendButton": "메시지 보내기"
                });
        }

        /* Wizard messages */

        if (kendo.ui.Wizard) {
            kendo.ui.Wizard.prototype.options.messages =
                $.extend(true, kendo.ui.Wizard.prototype.options.messages, {
                    "reset": "리셋",
                    "previous": "이전",
                    "next": "다음",
                    "done": "완료",
                    "step": "단계",
                    "of": "of"
                });
        }

        /* PDFViewer messages */

        if (kendo.ui.PDFViewer) {
            kendo.ui.PDFViewer.prototype.options.messages =
                $.extend(true, kendo.ui.PDFViewer.prototype.options.messages, {
                    defaultFileName: "문서",
                    toolbar: {
                        zoom: {
                            zoomLevel: "확대 정도",
                            zoomOut: "축소",
                            zoomIn: "확대",
                            actualWidth: "실제 너비",
                            autoWidth: "자동 너비",
                            fitToWidth: "너비에 맞춤",
                            fitToPage: "페이지에 맞춤"
                        },
                        open: "열기",
                        exportAs: "내보내기",
                        download: "다운로드",
                        pager: {
                            first: "첫 페이지로 가기",
                            previous: "이전 페이지로 가기",
                            next: "다음 페이지로 가기",
                            last: "마지막 페이지로 가기",
                            of: " of {0} ",
                            page: "page",
                            pages: "pages"
                        },
                        print: "프린트",
                        toggleSelection: "선택 사용",
                        togglePan: "패닝 사용",
                        search: "찾기"
                    },
                    errorMessages: {
                        notSupported: "PDF파일만 허용됩니다.",
                        parseError: "PDF파일을 처리할 수 없습니다.",
                        notFound: "파일을 찾을 수 없습니다.",
                        popupBlocked: "팝업이 차단되었습니다."
                    },
                    dialogs: {
                        exportAsDialog: {
                            title: "내보내기...",
                            defaultFileName: "문서",
                            pdf: "PDF문서 형식 (.pdf)",
                            png: "PNG파일 (.png)",
                            svg: "SVG파일 (.svg)",
                            labels: {
                                fileName: "파일 제목",
                                saveAsType: "다른 이름으로 저장",
                                page: "페이지"
                            }
                        },
                        okText: "OK",
                        save: "저장",
                        cancel: "취소",
                        search: {
                            inputLabel: "텍스트 검색",
                            matchCase: "대소문자 일치",
                            next: "다음",
                            previous: "이전",
                            close: "닫기",
                            of: "of"
                        }
                    }
                });
        }

        /* Captcha messages */

        if (kendo.ui.Captcha) {
            kendo.ui.Captcha.prototype.options.messages =
                $.extend(true, kendo.ui.Captcha.prototype.options.messages, {
                    "reset": "captcha 리셋",
                    "audio": "captcha 듣기",
                    "imageAlt": "이미지에서 captcha 코드 입력",
                    "success": "확인 성공"
                });
        }

        /* OrgChart messages */

        if (kendo.ui.OrgChart) {
            kendo.ui.OrgChart.prototype.options.messages =
                $.extend(true, kendo.ui.OrgChart.prototype.options.messages, {
                    label: "조직도 차트",
                    edit: "편집",
                    create: "추가",
                    destroy: "삭제",
                    destroyContent: "이 항목과 모든 하위 항목을 삭제하시겠습니까?",
                    destroyTitle: "항목 삭제",
                    cancel: "취소",
                    save: "저장",
                    menuLabel: "편집 메뉴",
                    uploadAvatar: "새 아바타 업로드",
                    parent: "상관",
                    name: "이름",
                    title: "직책",
                    none: "--없음--",
                    expand: "펼치기",
                    collapse: "접기"
                });
        }

    })(window.kendo.jQuery);
}));