import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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

  isLoggedIn?: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
  ) {} 

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn;
    this.dialog.open(LoginComponent, this.dialogConfig)
      .afterClosed()
      .subscribe(data => {
        this.auth.login(data)
          .subscribe(data => {
            this.isLoggedIn?.subscribe(status => console.log(data, status));
            this.router.navigate(['/content']);
          }
        )
      }
    );
  }
}
