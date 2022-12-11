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

  addUser(): Observable<User[]> {
    this.dialogConfig.data = {};
    const id = this.users.length + 1;
    return this.dialog.open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .pipe(map(data => this.users = data ? [ ...this.users, { 'id': id, ...data } ] : [ ...this.users ]));
  }

  editUser(id: number): Observable<User[]> {
    const index = this.users.findIndex(user => user.id === id);
    const user = this.users[index];
    this.dialogConfig.data = user;
    
    return this.dialog.open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .pipe(map(data => this.users[index] = data ? { 'id': id, ...data } : user));
  }

  deleteUser(id: number): Observable<User[]> {
    const index = this.users.findIndex(user => user.id === id);
    return of(this.users.splice(index, 1));
  }

}
