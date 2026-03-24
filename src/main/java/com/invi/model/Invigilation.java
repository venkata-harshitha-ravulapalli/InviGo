package com.invi.model;
import jakarta.persistence.*;

@Entity
public class Invigilation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String examName;
    private String startDate;
    private String startTime;
    private String endTime;
    private String status = "ACTIVE";
    private boolean reminderSent = false;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private ExamHall hall;

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getExamName(){return examName;}
    public void setExamName(String examName){this.examName=examName;}

    public String getStartDate(){return startDate;}
    public void setStartDate(String startDate){this.startDate=startDate;}

    public String getStartTime(){return startTime;}
    public void setStartTime(String startTime){this.startTime=startTime;}

    public String getEndTime(){return endTime;}
    public void setEndTime(String endTime){this.endTime=endTime;}

    public String getStatus(){return status;}
    public void setStatus(String status){this.status=status;}

    public boolean isReminderSent(){return reminderSent;}
    public void setReminderSent(boolean reminderSent){this.reminderSent=reminderSent;}

    public Teacher getTeacher(){return teacher;}
    public void setTeacher(Teacher teacher){this.teacher=teacher;}

    public ExamHall getHall(){return hall;}
    public void setHall(ExamHall hall){this.hall=hall;}
}