package rw.qt.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Tasks {
    private static final String LOW_PRIORITY = "LOW";
    private static final String NORMAL_PRIORITY = "NORMAL";
    private static final String HIGH_PRIORITY = "HIGH";
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
