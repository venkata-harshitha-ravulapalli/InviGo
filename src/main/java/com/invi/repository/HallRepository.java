package com.invi.repository;
import com.invi.model.ExamHall;
import org.springframework.data.jpa.repository.JpaRepository;
public interface HallRepository extends JpaRepository<ExamHall,Long>{}