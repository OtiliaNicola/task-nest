import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Task } from '../../core/interfaces/task.interface';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  private readonly localService = inject(LocalStorageService);
  private readonly router = inject(Router);

  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;
  tasks: Task[] = [];
  taskToDelete: number | null = null;

  constructor(
  ) {}

  ngOnInit(): void {

  //  this.localService.get().subscribe((data)=>{
  //   this.tasks = data; 
    
  //  });
  }

  onNewTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  onEdit(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id]);
  }

  onToggleComplete(task: Task): void {
    // this.localService.toggleComplete(task);
  }

  onDeleteClick(taskId: number): void {
    this.taskToDelete = taskId;
    this.confirmDialog.open();
  }

  onDeleteConfirmed(): void {
    if (this.taskToDelete) {
      // this.localService.deleteTask(this.taskToDelete);
      //this.tasks = this.taskService.getTasks();
    }
  }
}
