import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LocationComponent } from './components/location/location.component';
import { SearchComponent } from './components/search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'location', component: LocationComponent },
  { path: 'search', component: SearchComponent },
];