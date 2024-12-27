import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private locations = [
    'Nabadwip',
    'Kalinagar',
    'Parulia',
    'Mayapur'
  ];

  getLocations(): Observable<string[]> {
    return of(this.locations);
  }
}