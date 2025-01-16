import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { UtilService } from '../../core/services/utils.service';
import { UnsavedChangesComponent } from '../../shared/components/unsaved-changes/unsaved-changes.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UnsavedChangesComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly localService = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly utilService = inject(UtilService);

  @ViewChild(UnsavedChangesComponent)
  unsavedChanges!: UnsavedChangesComponent;

  taskForm: FormGroup;
  isEditMode = false;
  taskId?: number;
  taskStorage: any[] = [];

  constructor() {
    const today = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).split('/').reverse().join('-');


    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      date: [today, Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.taskStorage = await this.localService.get('task') || [];

    const id = this.route.snapshot.params['id'];

    if (id) {
      this.isEditMode = true;
      this.taskId = id;

      const task = this.taskStorage.find((task) => task.id === this.taskId);
      if (task) {
        this.taskForm.patchValue(
          {
            ...task,
            date: new Date(task.date).toISOString().split('T')[0]
          }
        );
      }
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = {
        ...this.taskForm.value,
        // Asegurar que la fecha sea un objeto Date
        date: new Date(this.taskForm.value.date)
      };

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
        this.utilService.showToast('Tarea actualizada correctamente');
      } else {
        this.taskStorage.push({
          id: crypto.randomUUID(),
          ...this.taskForm.value,
          completed: false
        });
        this.utilService.showToast('Tarea creada correctamente');
      }
      this.localService.set('task', this.taskStorage);
      this.taskForm.reset();
      this.router.navigate(['/tasks']);
    }
  }

  async onBack(): Promise<void> {
    // Si el formulario está limpio (sin cambios), navegar directamente
    if (!this.taskForm.dirty) {
      this.router.navigate(['/tasks']);
      return;
    }

    // Si hay cambios, mostrar el diálogo
    try {
      const confirmed = await this.unsavedChanges.open();
      if (confirmed) {
        this.router.navigate(['/tasks']);
      }
    } catch (error) {
      console.error('Error en el diálogo:', error);
    }
  }
}
