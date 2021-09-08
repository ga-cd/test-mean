import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shims/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { JobDetailComponent } from './job-detail/job-detail.component';
import {InvoicesResolver} from "./services/invoices.resolver";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    JobDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // material modules
    MaterialModule,
    NgxMatFileInputModule
  ],
  providers: [AuthGuardService,AuthService,InvoicesResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
