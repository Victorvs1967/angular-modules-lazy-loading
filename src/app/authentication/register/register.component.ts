import { Component, Inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  signupForm?: UntypedFormGroup;
  isLoggedIn?: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: [ this.data.username, [Validators.required] ],
      password: [ this.data.password, [Validators.required] ],
      email: [ this.data.email, [Validators.required, Validators.email] ],
      gender: [ this.data.gender, ],
    });
    this.isLoggedIn = this.auth.isLoggedIn;
  }

  onSubmit() {
    this.signupForm?.value ? this.dialogRef.close(this.signupForm.value) : this.dialogRef.close();
  }

  login() {
    this.dialogRef.close();
    this.router.navigate(['/auth/login']);
  }
}
