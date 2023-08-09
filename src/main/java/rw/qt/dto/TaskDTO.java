package rw.qt.dto;

import java.sql.Date;
import java.util.List;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private long id;
    private String title;
    private Date startDate;
    private Date endDate;
    private String status;
    private String priority;
    private String description;
    private List<Long> assignees;
    private List<Long> projects;
}
