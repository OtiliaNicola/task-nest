
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen">
      <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow">
            <div class="modal-header border-0">
              <h5 class="modal-title">{{ title }}</h5>
              <button type="button" class="btn-close" (click)="onCancel()"></button>
            </div>
            <div class="modal-body">
              <p>{{ message }}</p>
            </div>
            <div class="modal-footer border-0">
              <button type="button" class="btn btn-light" (click)="onCancel()">
                Cancelar
              </button>
              <button type="button" class="btn btn-danger" (click)="onConfirm()">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1050;
    }

    .modal-content {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(5px);
    }

    .modal-header {
      padding: 1rem 1.5rem;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
    }

    .btn-light {
      background: rgba(0, 0, 0, 0.05);
      border: none;
      
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .btn-danger {
      background: #dc3545;
      border: none;
      
      &:hover {
        background: #bb2d3b;
      }
    }
  `]
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirmar eliminación';
  @Input() message = '¿Estás seguro de que deseas eliminar esta tarea?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  isOpen = false;

  open(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close(): void {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  onConfirm(): void {
    this.confirm.emit();
    this.close();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close();
  }
}