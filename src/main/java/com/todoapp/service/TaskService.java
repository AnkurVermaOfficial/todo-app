package com.todoapp.service;

import com.todoapp.dto.TaskDto;
import com.todoapp.entity.Task;
import com.todoapp.entity.User;
import com.todoapp.exception.ResourceNotFoundException;
import com.todoapp.mapper.TaskMapper;
import com.todoapp.repository.TaskRepository;
import com.todoapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public TaskDto createTask(TaskDto dto, String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = TaskMapper.toEntity(dto);
        task.setUser(user);

        return TaskMapper.toDto(taskRepository.save(task));
    }

    public TaskDto updateTask(Long id, TaskDto dto, String username) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized");
        }

        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setCompleted(dto.isCompleted());

        return TaskMapper.toDto(taskRepository.save(task));
    }

    public void deleteTask(Long id, String username) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        // 🔒 SECURITY CHECK
        if (!task.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized access");
        }

        taskRepository.delete(task);
    }

    public Task markCompleted(Long id, String username) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        // 🔒 SECURITY CHECK
        if (!task.getUser().getUsername().equals(username)) {
            throw new RuntimeException("Unauthorized access");
        }

        task.setCompleted(true);
        return taskRepository.save(task);
    }

    public Page<TaskDto> getTasksByUser(String username, Pageable pageable) {

        return taskRepository
                .findByUserUsername(username, pageable)
                .map(TaskMapper::toDto);
    }
}
