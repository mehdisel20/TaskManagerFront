import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; 

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Les mots de passe ne correspondent pas.";
      return;
    }

    const payload = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.authService.register(payload).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => this.errorMessage = err.error.message || "Erreur lors de l'inscription."
    });
  }
}
