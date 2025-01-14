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

  constructor() {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  //   const id = this.route.snapshot.params['id'];
  //   if (id) {
  //     this.isEditMode = true;
  //     this.taskId = +id;
  //     this.localService.get('tasks').find((t) => {

  //       t => t.id === this.taskId
  //     });
  //     if (task) {
  //       this.taskForm.patchValue({
  //         title: task.title,
  //         description: task.description,
  //         date: task.date
  //       });
  //     }
  //   }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {

      if (this.isEditMode && this.taskId) {
        // this.localService.({
        //   id: this.taskId,
        //   ...this.taskForm.value,
        //   completed: false
        // });
      } else {
        console.log(this.taskForm.value.date);

        this.localService.set('task', { ...this.taskForm.value, completed: false })
      this.router.navigate(['/tasks']);
    }
  }
}
}