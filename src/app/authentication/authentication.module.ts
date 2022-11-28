import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HelpComponent } from './help/help.component';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: LoginComponent, },
  { path: 'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path: 'help', component: HelpComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HelpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    HelpComponent,
  ],
})
export class AuthenticationModule { }
