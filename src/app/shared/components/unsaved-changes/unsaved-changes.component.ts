
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-unsaved-changes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isOpen" class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">¿Estás seguro?</h5>
          <button type="button" class="btn-close" (click)="onCancel()">&times;</button>
        </div>
        <div class="modal-body">
          <p>Se perderán los cambios no guardados</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" (click)="onCancel()">
            Cancelar
          </button>
          <button type="button" class="btn btn-danger" (click)="onConfirm()">
            Aceptar
          </button>
        </div>
      </div>
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
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .modal-content {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(5px);
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .modal-header {
      padding: 1rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .btn-close {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      opacity: 0.5;
      padding: 0;
      display: flex;
      align-items: center;
      
      &:hover {
        opacity: 0.75;
      }
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
      line-height: 1;
    }

    .btn-light {
      background: rgba(0, 0, 0, 0.05);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .btn-danger {
      background: #dc3545;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      color: white;
      
      &:hover {
        background: #bb2d3b;
      }
    }
  `]
})
export class UnsavedChangesComponent {
  isOpen = false;
  private resolveRef: ((value: boolean) => void) | null = null;

  open(): Promise<boolean> {
    this.isOpen = true;
    return new Promise<boolean>(resolve => {
      this.resolveRef = resolve;
    });
  }

  onConfirm(): void {
    this.isOpen = false;
    if (this.resolveRef) {
      this.resolveRef(true);
      this.resolveRef = null;
    }
  }

  onCancel(): void {
    this.isOpen = false;
    if (this.resolveRef) {
      this.resolveRef(false);
      this.resolveRef = null;
    }
  }
}