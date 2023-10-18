package com.cp.praha.work.shortcut.web;

import com.cp.praha.base.category.service.CategoryService;
import com.cp.praha.base.category.service.request.CategorySelectCommand;
import com.cp.praha.base.category.service.response.CategorySelectDomain;
import com.cp.praha.consult.consultmain.service.response.ShortcutSelectDomain;
import com.cp.praha.work.shortcut.service.ShortCutMgrService;
import com.cp.praha.work.shortcut.service.request.ShortCutInsertCommand;
import com.cp.praha.work.shortcut.service.request.ShortCutSelectCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_SHORT_MGR_SELECT")
public class ShortCutMgrRestController {

    private final CategoryService categoryService;
    private final ShortCutMgrService shortCutMgrService;

    @GetMapping("/shortcut/dept/select")
    public List<CategorySelectDomain> categorySelect(CategorySelectCommand command){
        return categoryService.categorySelect(command);
    }

    @GetMapping("/shortcut/select")
    public List<ShortcutSelectDomain> shortcutSelect(ShortCutSelectCommand command){
        return shortCutMgrService.shortcutSelect(command);
    }

    @PostMapping("/shortcut/insert")
    public int shortcutInsert(@RequestBody ShortCutInsertCommand command){
        return shortCutMgrService.shortcutInsert(command);
    }

    @PutMapping("/shortcut/update")
    public void shortcutUpdate(@RequestBody ShortCutInsertCommand command){
       shortCutMgrService.shortcutUpdate(command);
    }

    @DeleteMapping("/shortcut/delete/{shortcutId}")
    public void shortcutDelete(@PathVariable int shortcutId){
        shortCutMgrService.shortcutDelete(shortcutId);
    }
}
