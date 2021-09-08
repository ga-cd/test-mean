import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { JobDetailComponent } from "./job-detail/job-detail.component";
import {InvoicesResolver} from "./services/invoices.resolver";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'invoices/:jobId',
    component: JobDetailComponent,
    resolve: { Invoices: InvoicesResolver },
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
