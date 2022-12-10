import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { UsersDatasource } from '../data/users.datasource';
import { RegisterComponent } from '../authentication/register/register.component';
import data from 'src/app/data/users.json';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private dataSourse = (new UsersDatasource([ ...data ]));
  private users: User[];

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  }

  constructor(
    public dialog: MatDialog,
  ) {
    this.users = this.dataSourse.data.getValue();
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  deleteUser(id: number): Observable<User[]> {
    const index = this.users.findIndex(user => user.id === id);
    return of(this.users.splice(index, 1));
  }

  addUser(): Observable<User[]> {
    return this.dialog.open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .pipe(map(data => data ? this.users = [ ...this.users, { 'id': this.users.length + 1, ...data } ] : [ ...this.users ]));
  }

}
