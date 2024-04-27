import { Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AllDoctorsComponent } from './pages/all-doctors/all-doctors.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { DoctorsListComponent } from './components/doctors-list/doctors-list.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './components/edit-doctor/edit-doctor.component';
import { CarouselListComponent } from './components/carousel-list/carousel-list.component';
import { EditCarouselComponent } from './components/edit-carousel/edit-carousel.component';
import { DepartmentsComponent } from './pages/departments/departments.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'appointment',
        component: DepartmentsComponent
      },
      {
        path: 'appointment/:department',
        component: DoctorsListComponent
      },
      {
        path: 'doctor/:id',
        component: DoctorComponent
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DoctorsListComponent },
      { path: 'doctors', component: DoctorsListComponent },
      { path: 'doctors/add-doctor', component: AddDoctorComponent },
      { path: 'doctors/edit-doctor/:id', component: EditDoctorComponent },
      { path: 'carousel', component: CarouselListComponent },
      { path: 'carousel/edit-carousel/:id', component: EditCarouselComponent },
    ],
  },
];
