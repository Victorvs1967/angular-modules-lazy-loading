import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

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
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private crud: CrudService, 
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
    this.crud.addUser().subscribe(_ => this.dialogRef.close());
  }
}
