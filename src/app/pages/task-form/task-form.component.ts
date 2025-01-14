import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly localService = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  taskForm: FormGroup;
  isEditMode = false;
  taskId?: number;
  taskStorage: any[] = [];

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.taskStorage = await this.localService.get('task') || [];

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.isEditMode = true;
      this.taskId = +id;

      const task = this.taskStorage.find((task) => task.id === this.taskId);
      if (task) {
        this.taskForm.patchValue(task);
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.isEditMode && this.taskId) {
        this.taskStorage = this.taskStorage.map((task) => {
          if (task.id === this.taskId) {
            return {
              id: this.taskId,
              ...this.taskForm.value,
              completed: task.completed
            };
          }
          return task;
        });
      } else {
        this.taskStorage.push({
          id: this.taskStorage.length + 1,
          ...this.taskForm.value,
          completed: false
        });
      }
      this.localService.set('task', this.taskStorage);
      this.taskForm.reset();
      this.router.navigate(['/tasks']);
    }
  }
}