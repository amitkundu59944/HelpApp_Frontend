import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../models/types';

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="doctor-item">
      <div class="status-indicator" [class.available]="doctor.isAvailable"></div>
      <span>{{ doctor.name }}</span>
      <button *ngIf="doctor.isAvailable" class="contact-btn" (click)="contactDoctor()">
        Contact Doctor
      </button>
    </div>
  `,
  styles: [`
    .doctor-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 10px 0;
      padding: 8px;
      background: #f8f9fa;
      border-radius: 4px;
    }
    .status-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ccc;
    }
    .available {
      background: #4CAF50;
    }
    .contact-btn {
      padding: 5px 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-left: auto;
    }
    .contact-btn:hover {
      background: #0056b3;
    }
  `]
})
export class DoctorCardComponent {
  @Input() doctor!: Doctor;

  contactDoctor() {
    // In a real application, this would open a contact form or chat interface
    alert(`Contacting ${this.doctor.name}`);
  }
}