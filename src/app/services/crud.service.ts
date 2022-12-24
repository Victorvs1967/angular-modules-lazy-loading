import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { UsersDatasource } from '../data/users.datasource';
import { RegisterComponent } from '../authentication/register/register.component';
import { FirebaseService } from './firebase.service';
import { Database, DatabaseReference, ref as dbRef, get, push, remove, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  db: Database;
  usersListRef: DatabaseReference;

  dataSourse?: UsersDatasource;
  users: User[] = [];

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  }

  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
  ) {
    this.db = this.firebaseService.setDb();
    this.usersListRef = this.firebaseService.setUsersListRef();
    this.loadData();
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(): Observable<User[]> {
    return this.dialog
      .open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .pipe(
        map(user => {
          const userRef = push(this.usersListRef);
          user.id = userRef.key ?? '';
          set(userRef, user)
            .then(() => this.users.push(user))
            .then(() => console.log('new user add successfuly...'));

          return this.users;
        })
      );
  }

  editUser(id: string): Observable<User[]> {
    const index = this.users.findIndex(user => user.id === id);
    this.dialogConfig.data = this.users[index];
    
    return this.dialog
      .open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .pipe(
        map((user: User) => {
          user.id = id;
          set(dbRef(this.db, 'users-list/'.concat(id)), user)
            .then(() => console.log('edit successfuly...'));

          return this.users;
        })
      );
  }

  deleteUser(id: string): Observable<User[]> {
    remove(dbRef(this.db, 'users-list/'.concat(id)))
      .then(() => console.log('delete successfuly...'));

    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
    return of(this.users);
  }

  private loadData() {
    let users: User[] = [];
    get(this.usersListRef)
      .then((data: any) => data.toJSON())
      .then((data: User[]) => {
        for (let key in data) {
          users = [ ...users, data[key] ];
        }
        this.dataSourse = new UsersDatasource([ ...users ]);
        this.users = this.dataSourse.data.getValue();
      });
  }
}
