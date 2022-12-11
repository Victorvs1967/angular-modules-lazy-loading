import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RegisterComponent } from 'src/app/authentication/register/register.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.sass']
})
export class CrudComponent {

  columnsToDisplay = [ 'id', 'username', 'password', 'email', 'gender', 'actions' ];
  users?: Observable<User[]>;

  constructor(
    private crud: CrudService, 
    private router: Router,
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.crud.getUsers().subscribe(data => this.users = of([ ...data ]));
  }

  delete(id: number) {
    this.crud.deleteUser(id).subscribe(_ => this.reloadData());
  }

  signup() {
    this.crud.addUser().subscribe(_ => this.reloadData());
  }

  edit(id: number) {
    this.crud.editUser(id).subscribe(_ => this.reloadData());
  }

}
