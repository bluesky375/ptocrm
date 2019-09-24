import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AdminSigninComponent } from './admin/admin-signin/admin-signin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

import { AdminProspectComponent } from './admin/admin-prospect/admin-prospect.component';
import { AdminCvComponent } from './admin/admin-cv/admin-cv.component';
import { AdminClientComponent } from './admin/admin-client/admin-client.component';
import { AdminClientsComponent } from './admin/admin-clients/admin-clients.component';
import { AdminProspectsComponent } from './admin/admin-prospects/admin-prospects.component';
import { AdminEmployeComponent } from './admin/admin-employe/admin-employe.component';
import { AdminEmployesComponent } from './admin/admin-employes/admin-employes.component';
import { AdminProjectsComponent } from './admin/admin-projects/admin-projects.component';
import { AdminProjectComponent } from './admin/admin-project/admin-project.component';
import { AdminConcurrentComponent } from './admin/admin-concurrent/admin-concurrent.component';
import { AdminConcurrentsComponent } from './admin/admin-concurrents/admin-concurrents.component';
import { AdminPlanningComponent } from './admin/admin-planning/admin-planning.component';
import { AdminStockageComponent } from './admin/admin-stockage/admin-stockage.component';
import { SingleEmployeComponent } from './single-employe/single-employe.component';
import { SingleClientComponent } from './single-client/single-client.component';
import { SingleProspectComponent } from './single-prospect/single-prospect.component';
import { SingleConcurrentComponent } from './single-concurrent/single-concurrent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminSigninComponent,
    AdminDashboardComponent,
 
    AdminProspectComponent,
    AdminCvComponent,
    AdminClientComponent,
    AdminClientsComponent,
    AdminProspectsComponent,
    AdminEmployeComponent,
    AdminEmployesComponent,
    AdminProjectsComponent,
    AdminProjectComponent,
    AdminConcurrentComponent,
    AdminConcurrentsComponent,
    AdminPlanningComponent,
    AdminStockageComponent,
    SingleEmployeComponent,
    SingleClientComponent,
    SingleProspectComponent,
    SingleConcurrentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
