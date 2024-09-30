package org.iclass.todolist.service;


import lombok.RequiredArgsConstructor;
import org.iclass.todolist.dao.TodoMapper;
import org.iclass.todolist.dto.TodoDTO;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoMapper mapper;

    public List<TodoDTO> getTodoList(){
        return mapper.selectList();
    }

    @Transactional
    public TodoDTO insert(TodoDTO dto){
        mapper.insert(dto);
        int currSeq = mapper.curr_seq();
        return mapper.selectById(currSeq);
    }

    public LocalDateTime regDate(){
        return mapper.regDate();
    }

    public LocalDateTime endDate(){
        return mapper.endDate();
    }


}