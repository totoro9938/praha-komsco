package com.cp.praha.work.area.web;

import com.cp.praha.work.area.service.AreaService;
import com.cp.praha.work.area.service.request.AreaDeleteCommand;
import com.cp.praha.work.area.service.request.AreaInsertCommand;
import com.cp.praha.work.area.service.request.AreaSelectPageCommand;
import com.cp.praha.work.area.service.request.AreaUpdateCommand;
import com.cp.praha.work.area.service.response.AreaSelectItemDomain;
import com.cp.praha.work.area.service.response.AreaSelectPageDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_AREA_MGR_SELECT")
public class AreaRestController {
    private final AreaService areaService;


    @GetMapping("/area/select/page")
    public List<AreaSelectPageDomain> areaSelectPage(AreaSelectPageCommand command){
        return areaService.areaSelectPage(command);
    }


    @GetMapping("/area/item/{areaUuid}")
    public AreaSelectItemDomain areaSelectItem(@PathVariable("areaUuid") String uuid){
        return areaService.areaSelectItem(uuid);
    }

    @Secured("ROLE_WORK_AREA_MGR_INSERT")
    @PostMapping("area/insert")
    public void areaInsert(@RequestBody @Valid AreaInsertCommand command){
         areaService.areaInsert(command);
    }

    @Secured("ROLE_WORK_AREA_MGR_UPDATE")
    @PutMapping("area/update")
    public void areaUpdate(@RequestBody @Valid AreaUpdateCommand command){
        areaService.areaUpdate(command);
    }


    @Secured("ROLE_WORK_AREA_MGR_DELETE")
    @PutMapping("area/delete")
    public void areaDelete(@RequestBody AreaDeleteCommand command){
        areaService.areaDelete(command);
    }

}
