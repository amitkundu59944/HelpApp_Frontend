export interface User {
  id: string;
  username: string;
  role: 'client' | 'admin';
}

export interface Hospital {
  id: string;
  name: string;
  location: string;
  distance: number;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  doctors: Doctor[];
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  isAvailable: boolean;
  distance: number;
  hospital: string;
}

export interface Disease {
  id: string;
  name: string;
}