import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTasks();
    console.log(this.fetchTasks());
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      New: 'Nouveau',
      InProgress: 'En cours',
      Paused: 'En Pause',
      Completed: 'Terminé',
      Canceled: 'Annulé',
    };
    return statusMap[status] || status;
  }

  fetchTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
        console.log(tasks);
      },
      error: (err) => {
        this.error = 'Erreur de chargement';
        this.loading = false;
      },
    });
  }

  onDelete(id: string): void {
    if (confirm('Supprimer cette tâche ?')) {
      this.taskService.deleteTask(id).subscribe(() => this.fetchTasks());
    }
  }

  onEdit(id: string): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  onAdd(): void {
    this.router.navigate(['/tasks/add']);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'terminée':
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'en_cours':
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  }

  getStatusIcon(status: string): string {
    switch (status.toLowerCase()) {
      case 'terminée':
      case 'completed':
        return 'fas fa-check-circle';
      case 'en_cours':
      case 'in_progress':
        return 'fas fa-clock';
      default:
        return 'fas fa-exclamation-circle';
    }
  }

  trackByTaskId(index: number, task: any): any {
    return task.id;
  }
}
