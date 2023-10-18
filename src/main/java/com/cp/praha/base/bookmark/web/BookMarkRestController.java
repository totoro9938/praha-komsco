package com.cp.praha.base.bookmark.web;

import com.cp.praha.base.bookmark.service.BookMarkService;
import com.cp.praha.base.bookmark.service.request.BookMarkDeleteCommand;
import com.cp.praha.base.bookmark.service.request.BookMarkInsertCommand;
import com.cp.praha.base.bookmark.service.request.BookMarkSelectCommand;
import com.cp.praha.base.bookmark.service.request.BookMarkUpdateCommand;
import com.cp.praha.base.bookmark.service.response.BookMarkSelectDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/base/v1")
public class BookMarkRestController {

    private final BookMarkService bookMarkService;

    @GetMapping("/bookmark")
    public List<BookMarkSelectDomain> bookMarkSelect(BookMarkSelectCommand command) {
        return bookMarkService.bookMarkSelect(command);
    }

    @PostMapping("/bookmark")
    public ResponseEntity<HttpStatus> bookMarkInsert(@RequestBody @Valid List<BookMarkInsertCommand> command) {
        bookMarkService.bookMarkInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/bookmark")
    public ResponseEntity<HttpStatus> bookMarkUpdate(@RequestBody @Valid List<BookMarkUpdateCommand> command) {
        bookMarkService.bookMarkUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/bookmark")
    public ResponseEntity<HttpStatus> bookMarkDelete(@RequestBody @Valid List<BookMarkDeleteCommand> command) {
        bookMarkService.bookMarkDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
