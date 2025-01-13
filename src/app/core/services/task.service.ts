import { Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = signal<Task[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      this.tasks.set(JSON.parse(stored));
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks()));
  }

  getTasks(): Task[] {
    return this.tasks();
  }

  addTask(task: Omit<Task, 'id' | 'completed'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      completed: false
    };
    
    this.tasks.update(tasks => [...tasks, newTask]);
    this.saveToLocalStorage();
  }

  updateTask(task: Task): void {
    this.tasks.update(tasks => 
      tasks.map(t => t.id === task.id ? task : t)
    );
    this.saveToLocalStorage();
  }

  deleteTask(id: number): void {
    this.tasks.update(tasks => tasks.filter(t => t.id !== id));
    this.saveToLocalStorage();
  }

  toggleComplete(id: number): void {
    this.tasks.update(tasks => 
      tasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    this.saveToLocalStorage();
  }
}