import { Component, Inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginInfo } from 'src/app/models/login-info.model';
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

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LoginInfo,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ],
    });
  }

  onSubmit() {
    this.loginForm?.value ? this.dialogRef.close(this.loginForm.value) : this.dialogRef.close();
  }

  signup() {
    this.dialog.open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .subscribe(data => {
        console.log(data);
        this.dialogRef.close(true);
        this.router.navigate(['/content']);
      }
    );
  }
}
