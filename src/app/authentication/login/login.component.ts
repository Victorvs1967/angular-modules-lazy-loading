import { Component, Inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginInfo } from 'src/app/models/login-info.model';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  }

  loginForm?: UntypedFormGroup;
  isLoggedIn?: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginInfo,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ],
    });
    this.isLoggedIn = this.auth.isLoggedIn;
  }

  onSubmit() {
    this.loginForm?.value ? this.dialogRef.close(this.loginForm.value) : this.dialogRef.close();
  }

  signup() {
    this.dialog.open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .subscribe(data => {
        this.auth.signup(data)
          .subscribe(data => {
            this.dialogRef.close(true);
            console.log(data);
            console.log(this.isLoggedIn);
            this.router.navigate(['/hello']);
          }
        ) 
      }
    );
  }
}
