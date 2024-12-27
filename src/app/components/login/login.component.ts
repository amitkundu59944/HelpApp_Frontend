import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
        <div class="login-container">
      <h1 class="app-title">Know More App</h1>
      <h2>Login</h2>
      <div class="login-form">
        <input [(ngModel)]="username" placeholder="Username" type="text">
        <input [(ngModel)]="password" placeholder="Password" type="password">
        <div class="role-selector">
          <button [class.active]="selectedRole === 'client'" (click)="selectedRole = 'client'">Client</button>
          <button [class.active]="selectedRole === 'admin'" (click)="selectedRole = 'admin'">Admin</button>
        </div>
        <button (click)="login()">Login</button>
        <p *ngIf="error" class="error">{{ error }}</p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .login-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .role-selector {
      display: flex;
      gap: 10px;
    }
    .active {
      background: #0056b3;
    }
    .error {
      color: red;
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  selectedRole: 'client' | 'admin' = 'client';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (!this.username || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.authService.login(this.username, this.password, this.selectedRole)
      .subscribe(success => {
        if (success) {
          if (this.selectedRole === 'client') {
            this.router.navigate(['/location']);
          } else {
            this.router.navigate(['/admin']);
          }
        } else {
          this.error = 'Invalid credentials';
        }
      });
  }
}