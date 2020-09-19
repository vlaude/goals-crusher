import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent, HomeComponent],
  exports: [],
  imports: [CommonModule, BrowserAnimationsModule, RouterModule, MaterialModule, ReactiveFormsModule, FormsModule],
})
export class CoreModule {}
