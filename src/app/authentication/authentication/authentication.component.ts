import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent {

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  }

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) {} 

  ngOnInit() {
    this.dialog.open(LoginComponent, this.dialogConfig)
      .afterClosed()
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/content']);
      }
    );
  }
}
