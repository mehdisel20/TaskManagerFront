import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../../core/services/task.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isAuthenticated = false;
  totalTasks = 0;
  inProgressTasks = 0;
  completedTasks = 0;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); 

    if (this.isAuthenticated) {
      this.loadTaskStats();
    }
  }

  onCreateTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  private loadTaskStats(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.totalTasks = tasks.length;
        this.inProgressTasks = tasks.filter(t => t.status === 'InProgress').length;
        this.completedTasks = tasks.filter(t => t.status === 'Completed').length;
      },
      error: () => {
        // en cas d'erreur, on peut afficher une alerte ou logguer
        this.totalTasks = this.inProgressTasks = this.completedTasks = 0;
      }
    });
  }
}
