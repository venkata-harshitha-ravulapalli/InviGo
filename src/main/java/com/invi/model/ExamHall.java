package com.invi.model;
import jakarta.persistence.*;

@Entity
public class ExamHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String hallName;
    private int capacity;

    public Long getId(){return id;}
    public void setId(Long id){this.id=id;}

    public String getHallName(){return hallName;}
    public void setHallName(String hallName){this.hallName=hallName;}

    public int getCapacity(){return capacity;}
    public void setCapacity(int capacity){this.capacity=capacity;}
}