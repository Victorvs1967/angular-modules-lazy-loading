import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HelpComponent } from './help/help.component';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialUiModule } from '../material-ui/material-ui.module';

const routes = [
  {
    path: '', component: AuthenticationComponent,
    children: [
      { path: 'login', component: AuthenticationComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'help', component: HelpComponent },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HelpComponent,
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MaterialUiModule,
  ],
})
export class AuthenticationModule { }
