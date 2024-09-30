package org.iclass.todolist.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iclass.todolist.dto.TodoDTO;
import org.iclass.todolist.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j

public class APITodoController {

    private final TodoService todoService;

    @GetMapping("/api/list")
    public ResponseEntity<?> loadTable() {
        List<TodoDTO> list = todoService.getTodoList();
        log.info(":::::::::::::::::: list : {}", list);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/api/list")
    public ResponseEntity<?> insertTodoList(@RequestBody TodoDTO dto){
        TodoDTO sDTO = todoService.insert(dto);
        log.info("::::::::::::::::: dto : {}", dto);
        log.info("::::::::::::::::: sDTO : {}", sDTO);
        if(sDTO == null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return ResponseEntity.ok(sDTO);
    }
}