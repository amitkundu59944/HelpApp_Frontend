import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from '../../services/hospital.service';
import { Hospital, Doctor, Disease } from '../../models/types';
import { DoctorCardComponent } from '../doctor-card/doctor-card.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, DoctorCardComponent],
  template: `
    <div class="search-container">
      <h2>Search in {{ location }}</h2>
      
      <div class="search-options">
        <button [class.active]="searchType === 'hospital'" (click)="searchType = 'hospital'">
          Search by Hospital
        </button>
        <button [class.active]="searchType === 'disease'" (click)="searchType = 'disease'">
          Search by Disease
        </button>
      </div>

      <div *ngIf="searchType === 'disease'" class="disease-search">
        <select [(ngModel)]="selectedDisease" (change)="searchByDisease()">
          <option value="">Select Disease</option>
          <option *ngFor="let disease of diseases" [value]="disease.name">
            {{ disease.name }}
          </option>
        </select>

        <div *ngIf="doctors.length" class="results">
          <h3>Available Doctors</h3>
          <div *ngFor="let doctor of doctors" class="doctor-card">
            <app-doctor-card [doctor]="doctor"></app-doctor-card>
          </div>
        </div>
      </div>

      <div *ngIf="searchType === 'hospital'" class="hospital-search">
        <div class="results">
          <h3>Hospitals Near You</h3>
          <div *ngFor="let hospital of hospitals" class="hospital-card">
            <div class="hospital-header" (click)="toggleHospital(hospital)">
              <h4>{{ hospital.name }}</h4>
              <p>{{ hospital.distance }}km away</p>
            </div>
            <div *ngIf="selectedHospital === hospital" class="departments">
              <div *ngFor="let dept of hospital.departments" class="department">
                <h5>{{ dept.name }}</h5>
                <app-doctor-card *ngFor="let doctor of dept.doctors" [doctor]="doctor"></app-doctor-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }
    .search-options {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    button {
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .active {
      background: #0056b3;
    }
    select {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .results {
      margin-top: 20px;
    }
    .hospital-card {
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    .hospital-header {
      padding: 15px;
      background: #f8f9fa;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .hospital-header:hover {
      background: #e9ecef;
    }
    .departments {
      padding: 15px;
    }
    .department {
      margin: 15px 0;
      padding: 10px;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .department h5 {
      color: #0056b3;
      margin-bottom: 10px;
    }
  `]
})
export class SearchComponent implements OnInit {
  location = '';
  searchType: 'hospital' | 'disease' = 'hospital';
  selectedDisease = '';
  selectedHospital: Hospital | null = null;
  diseases: Disease[] = [];
  doctors: Doctor[] = [];
  hospitals: Hospital[] = [];

  constructor(
    private route: ActivatedRoute,
    private hospitalService: HospitalService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.location = params['location'];
      this.loadInitialData();
    });
  }

  loadInitialData() {
    this.hospitalService.getDiseases().subscribe(diseases => {
      this.diseases = diseases;
    });
    this.searchByHospital();
  }

  searchByDisease() {
    if (this.selectedDisease) {
      this.hospitalService.getDoctorsByDisease(this.selectedDisease, this.location)
        .subscribe(doctors => {
          this.doctors = doctors;
        });
    }
  }

  searchByHospital() {
    this.hospitalService.getHospitalsByLocation(this.location)
      .subscribe(hospitals => {
        this.hospitals = hospitals;
      });
  }

  toggleHospital(hospital: Hospital) {
    this.selectedHospital = this.selectedHospital === hospital ? null : hospital;
  }
}