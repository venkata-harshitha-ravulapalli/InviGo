package com.invi.service;

import com.invi.model.Teacher;
import com.invi.repository.TeacherRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository repo;

    public TeacherService(TeacherRepository repo){this.repo=repo;}

    public Teacher add(Teacher t){ return repo.save(t);}
    public List<Teacher> getAll(){ return repo.findAll();}
}