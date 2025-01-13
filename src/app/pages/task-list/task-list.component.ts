import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Task } from '../../core/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;
  tasks: Task[] = [];
  taskToDelete: number | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  onNewTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  onEdit(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  onToggleComplete(task: Task): void {
    this.taskService.toggleComplete(task.id);
  }

  onDeleteClick(taskId: number): void {
    this.taskToDelete = taskId;
    this.confirmDialog.open();
  }

  onDeleteConfirmed(): void {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete);
      this.tasks = this.taskService.getTasks();
    }
  }
}
