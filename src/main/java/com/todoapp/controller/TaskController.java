package com.todoapp.controller;

import com.todoapp.dto.TaskDto;
import com.todoapp.entity.Task;
import com.todoapp.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public TaskDto createTask(@RequestBody TaskDto dto) {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return taskService.createTask(dto, username);
    }

    @GetMapping
    public Page<TaskDto> getTasks(Pageable pageable) {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return taskService.getTasksByUser(username, pageable);
    }

    @PutMapping("/{id}")
    public TaskDto updateTask(@PathVariable Long id,
                              @RequestBody TaskDto dto) {

        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return taskService.updateTask(id, dto, username);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        taskService.deleteTask(id,username);
        return "Task deleted successfully";
    }

    @PatchMapping("/{id}/complete")
    public Task markCompleted(@PathVariable Long id) {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
        return taskService.markCompleted(id,username);
    }
}