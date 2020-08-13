import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, NavbarComponent, HomeComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, RouterModule],
})
export class CoreModule {}
