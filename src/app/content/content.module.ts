import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialUiModule } from '../material-ui/material-ui.module';
import { HelloComponent } from './hello/hello.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    // path: '', component: ContentComponent, canActivate: [AuthGuard],
    path: '', 
    component: ContentComponent, 
    canActivate: [AuthGuard], 
    canActivateChild: [AuthGuard],
    children: [ { path: 'hello', component: HelloComponent }, ],
  },
];

@NgModule({
  declarations: [
    ContentComponent,
    HelloComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialUiModule,
  ]
})
export class ContentModule { }
