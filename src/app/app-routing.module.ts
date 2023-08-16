import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DynamicLandingComponent } from './engine/dynamic-landing/dynamic-landing.component';

const routes: Routes = [
  // to create a home page with the path of '' and the component of HomeComponent
  { path: '', component: DynamicLandingComponent },
  // create a path of home that redirects to the home page
  { path: 'home', component: DynamicLandingComponent },
  { path: 'about', component: DynamicLandingComponent },
  // creta a default path that redirects to the home page
  // { path: '**', redirectTo: 'home' },
  { path: 'dashboard', component: DashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
