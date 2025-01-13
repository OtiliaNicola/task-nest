import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../core/interfaces/task.interface';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onNewTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  toggleComplete(id: number): void {
    this.taskService.toggleComplete(id);
  }
}