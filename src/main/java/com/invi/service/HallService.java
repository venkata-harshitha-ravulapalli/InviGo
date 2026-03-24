package com.invi.service;

import com.invi.model.ExamHall;
import com.invi.repository.HallRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class HallService {

    private final HallRepository repo;
    public HallService(HallRepository repo){this.repo=repo;}

    public ExamHall add(ExamHall h){ return repo.save(h);}
    public List<ExamHall> all(){ return repo.findAll();}
}