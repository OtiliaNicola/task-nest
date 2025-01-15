import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { Task } from '../../core/interfaces/task.interface';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { UtilService } from '../../core/services/utils.service';

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
  private readonly utilService = inject(UtilService);

  @ViewChild('confirmDialog') confirmDialog!: ConfirmDialogComponent;
  tasks: Task[] = [];
  taskToDelete: number | null = null;
  taskStorage: any[] = [];

  constructor(
  ) {}

 ngOnInit(): void {
    this.taskStorage = this.localService.get('task') || [];
    this.tasks = this.taskStorage;
   };
  

  onNewTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  onEdit(task: Task): void {
    this.router.navigate(['/tasks/edit', task.id], {
      queryParams: {
        title: task.title,
        description: task.description,
        date: task.date
      }
    });
  }

  onToggleComplete(task: Task): void {
    this.taskStorage.forEach((item)=>{
      if(item.id === task.id){
        item.completed = !item.completed;
      }
    })
    this.localService.set('task', this.taskStorage);
    this.tasks = this.taskStorage;
  }

  onDeleteClick(taskId: number): void {
    this.taskToDelete = taskId;
    this.confirmDialog.open();
  }

  onDeleteConfirmed(): void {
    if (this.taskToDelete) {
      this.taskStorage = this.taskStorage.filter((task) => task.id !== this.taskToDelete);
      this.localService.set('task', this.taskStorage);
      this.tasks = this.taskStorage;
      this.utilService.showToast('Tarea eliminada correctamente');
      this.taskToDelete = null;
    }
  }

  toDoCounter(){
    return this.tasks.filter(task => !task.completed).length;
  }

  completeTasksCounter(){
    return this.tasks.filter(task => task.completed).length;
  }
}