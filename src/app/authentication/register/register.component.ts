import { Component, Inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {

  signupForm?: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: [ '', [Validators.required] ],
      password: [ '', [Validators.required] ],
      email: [ '', [Validators.required, Validators.email] ],
    });
  }

  onSubmit() {
    this.signupForm?.value ? this.dialogRef.close(this.signupForm.value) : this.dialogRef.close();
  }

  login() {
    this.dialogRef.close();
    this.router.navigate(['/auth/login']);
  }
}
