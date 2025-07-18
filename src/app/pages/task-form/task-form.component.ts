import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../shared/models/task'; 

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit{
  form!: FormGroup;
  isEditMode = false;
  taskId = '';

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      status: ['New', Validators.required]
    });

    this.taskId = this.route.snapshot.paramMap.get('id') || '';

    if (this.taskId) {
      this.isEditMode = true;
      this.taskService.getTask(this.taskId).subscribe(task => {
        this.form.patchValue(task);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const task = this.form.value;

    if (this.isEditMode) {
      this.taskService.updateTask(this.taskId, task).subscribe(() => {
        window.location.href = '/tasks';
      });
    } else {
      this.taskService.createTask(task).subscribe(() => {
        window.location.href = '/tasks';
      });
    }
  }

}
