package org.iclass.todolist.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class TodoDTO {
    private int workno;
    private String workname;
    private String worktype;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regdate;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime enddate;
    private int priority;
    private String finished;
    private UserAccountDTO userAccount;
}