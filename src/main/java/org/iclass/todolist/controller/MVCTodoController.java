package org.iclass.todolist.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.iclass.todolist.dto.TodoDTO;
import org.iclass.todolist.service.TodoService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j

public class MVCTodoController {

    private final TodoService todoService;

    @RequestMapping("/list")
    public String list(
            @ModelAttribute("dto") TodoDTO todoDTO,
            Model model
    ) {
        todoDTO.setRegdate(todoService.regDate());
        todoDTO.setEnddate(todoService.endDate());
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() instanceof UserDetails){
            log.info("인증정보 : {}", authentication);
            model.addAttribute("username", authentication.getName());
        }


        return "list";
    }

}
