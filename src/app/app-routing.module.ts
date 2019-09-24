import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSigninComponent} from './admin/admin-signin/admin-signin.component'
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { AdminProspectComponent } from './admin/admin-prospect/admin-prospect.component';
import { AdminCvComponent } from './admin/admin-cv/admin-cv.component';
import { AdminClientComponent } from './admin/admin-client/admin-client.component';
import { AdminEmployeComponent } from './admin/admin-employe/admin-employe.component';
import { AdminConcurrentComponent } from './admin/admin-concurrent/admin-concurrent.component';
import { AdminPlanningComponent } from './admin/admin-planning/admin-planning.component';
import { AdminProjectComponent } from './admin/admin-project/admin-project.component';
import { AdminStockageComponent } from './admin/admin-stockage/admin-stockage.component';
import { SingleEmployeComponent } from './single-employe/single-employe.component';
import { SingleClientComponent } from './single-client/single-client.component';
import { SingleProspectComponent } from './single-prospect/single-prospect.component';

const routes: Routes = [
  {path:'admin/login',component: AdminSigninComponent},
  {path:'admin/dashboard' , component:AdminDashboardComponent},
  {path:'admin/client', component:AdminClientComponent},
  {path:'admin/prospect', component:AdminProspectComponent},
  {path:'admin/cv' , component:AdminCvComponent},
  {path:'admin/employe' , component:AdminEmployeComponent},
  {path:'admin/concurrent', component:AdminConcurrentComponent},
  {path:'admin/planning' , component:AdminPlanningComponent},
  {path:'admin/project', component:AdminProjectComponent},
  {path:'employe/:id', component: SingleEmployeComponent} ,
  {path:'client/:id' ,component: SingleClientComponent} ,
  {path:'prospect/:id' , component: SingleProspectComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
