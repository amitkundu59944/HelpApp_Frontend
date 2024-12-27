import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hospital, Doctor, Disease } from '../models/types';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private mockDiseases: Disease[] = [
    { id: '1', name: 'Cardiology' },
    { id: '2', name: 'Orthopedics' },
    { id: '3', name: 'Dermatology' },
    { id: '4', name: 'Urology' }
  ];

  private mockHospitals: Hospital[] = [
    {
      id: '1',
      name: 'Apollo Hospital',
      location: 'Nabadwip',
      distance: 2.5,
      departments: [
        {
          id: '1',
          name: 'Cardiology',
          doctors: [
            {
              id: '1',
              name: 'Dr. Smith',
              specialization: 'Cardiology',
              isAvailable: true,
              distance: 2.5,
              hospital: 'Apollo Hospital'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Fortis Hospital',
      location: 'Nabadwip',
      distance: 3.2,
      departments: [
        {
          id: '1',
          name: 'Orthopedics',
          doctors: [
            {
              id: '2',
              name: 'Dr. Johnson',
              specialization: 'Orthopedics',
              isAvailable: true,
              distance: 3.2,
              hospital: 'Fortis Hospital'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Manipal Hospital',
      location: 'Nabadwip',
      distance: 4.0,
      departments: [
        {
          id: '1',
          name: 'Dermatology',
          doctors: [
            {
              id: '3',
              name: 'Dr. Davis',
              specialization: 'Dermatology',
              isAvailable: false,
              distance: 4.0,
              hospital: 'Manipal Hospital'
            }
          ]
        }
      ]
    },
    {
      id: '4',
      name: 'Nabadwip State General Hospital',
      location: 'Nabadwip',
      distance: 1.5,
      departments: [
        {
          id: '1',
          name: 'Cardiology',
          doctors: [
            {
              id: '4',
              name: 'Dr. Banerjee',
              specialization: 'Cardiology',
              isAvailable: true,
              distance: 1.5,
              hospital: 'Nabadwip State General Hospital'
            }
          ]
        },
        {
          id: '2',
          name: 'Orthopedics',
          doctors: [
            {
              id: '5',
              name: 'Dr. Chatterjee',
              specialization: 'Orthopedics',
              isAvailable: true,
              distance: 1.5,
              hospital: 'Nabadwip State General Hospital'
            }
          ]
        },
        {
          id: '3',
          name: 'Dermatology',
          doctors: [
            {
              id: '6',
              name: 'Dr. Sen',
              specialization: 'Dermatology',
              isAvailable: false,
              distance: 1.5,
              hospital: 'Nabadwip State General Hospital'
            }
          ]
        },
        {
          id: '4',
          name: 'Urology',
          doctors: [
            {
              id: '7',
              name: 'Dr. Roy',
              specialization: 'Urology',
              isAvailable: true,
              distance: 1.5,
              hospital: 'Nabadwip State General Hospital'
            }
          ]
        },
        {
          id: '5',
          name: 'ENT',
          doctors: [
            {
              id: '4',
              name: 'Dr. Aditi Pramanik',
              specialization: 'ENT',
              isAvailable: true,
              distance: 1.5,
              hospital: 'Nabadwip State General Hospital'
            }
          ]
        }
      ]
    }
  ];

  getDiseases(): Observable<Disease[]> {
    return of(this.mockDiseases);
  }

  getHospitalsByLocation(location: string): Observable<Hospital[]> {
    return of(this.mockHospitals.filter(h => h.location.toLowerCase() === location.toLowerCase())
      .sort((a, b) => a.distance - b.distance));
  }

  getDoctorsByDisease(disease: string, location: string): Observable<Doctor[]> {
    const doctors: Doctor[] = [];
    this.mockHospitals.forEach(hospital => {
      hospital.departments.forEach(dept => {
        doctors.push(...dept.doctors.filter(d => d.specialization === disease));
      });
    });
    return of(doctors.sort((a, b) => a.distance - b.distance));
  }
}