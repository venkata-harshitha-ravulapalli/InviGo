package com.invi.repository;
import com.invi.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
public interface TeacherRepository extends JpaRepository<Teacher,Long>{
    Teacher findByEmail(String email);
}