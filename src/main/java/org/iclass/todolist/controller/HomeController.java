package org.iclass.todolist.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j

public class HomeController {

    @GetMapping({"/", "/index"})
    public String index() {
        return "index";
    }
}
