package com.invi.repository;

import com.invi.model.Invigilation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InvigilationRepository extends JpaRepository<Invigilation, Long> {

    List<Invigilation> findByTeacherIdAndStartDate(Long teacherId, String startDate);

    List<Invigilation> findByHallIdAndStartDate(Long hallId, String startDate);

    List<Invigilation> findByStatusAndReminderSent(String status, boolean reminderSent);
}