import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="location-container">
      <h2>Select Your Location</h2>
      <div class="location-form">
        <select [(ngModel)]="location" class="location-select">
          <option value="">Select Location</option>
          <option value="current">
              <i class="gps-icon">📍</i> Use Current Location
            </option>
          <option *ngFor="let loc of locations" [value]="loc">{{ loc }}</option>
        </select>
        <button (click)="selectLocation()" [disabled]="!location">Continue</button>
      </div>
    </div>
  `,
  styles: [`
    .location-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      background: white;
      border-radius: 8px;
    }
    .location-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .location-select {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    button {
      padding: 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    button:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class LocationComponent implements OnInit {
  location = '';
  locations: string[] = [];

  constructor(
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.locationService.getLocations().subscribe(locations => {
      this.locations = locations;
    });
  }

  selectLocation() {
    if (this.location) {
      this.router.navigate(['/search'], { queryParams: { location: this.location } });
    }
  }
}