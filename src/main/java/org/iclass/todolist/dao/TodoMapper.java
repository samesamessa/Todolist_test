package org.iclass.todolist.dao;


import org.apache.ibatis.annotations.Mapper;
import org.iclass.todolist.dto.TodoDTO;

import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface TodoMapper {

    TodoDTO selectOne(int workno);
    List<TodoDTO> selectList();
    int insert(TodoDTO dto);
    int update(TodoDTO dto);
    int delete(int workno);
    int curr_seq();
    LocalDateTime regDate();
    LocalDateTime endDate();
    TodoDTO selectById(int workno);
}