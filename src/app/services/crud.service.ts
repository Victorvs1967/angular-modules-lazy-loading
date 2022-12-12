import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../models/user.model';
import { UsersDatasource } from '../data/users.datasource';
import { RegisterComponent } from '../authentication/register/register.component';

// firebase
import { initializeApp } from "firebase/app";
import { Database, DatabaseReference, get, getDatabase, push, ref as dbRef, remove, set } from "firebase/database";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";
import { environment } from 'src/environments/environment';
// 

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // firebase
  app = initializeApp({
    databaseURL: environment.firebase.databaseURL,
    storageBucket: environment.firebase.storageBucket,
  });

  storage: FirebaseStorage = getStorage(this.app);
  db: Database = getDatabase(this.app);
  usersListRef: DatabaseReference  = dbRef(this.db, 'users-list');

  // 

  // private dataSourse: UsersDatasource;
  private users: User[];

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  }

  constructor(
    public dialog: MatDialog,
  ) {
    this.users = [];
    get(this.usersListRef).then((data: any) => data.toJSON())
      .then(data => {
        for (let i in data) {
          this.users.push(data[i]);
        }
      });
    // this.dataSourse = new UsersDatasource([ ...data ]);
    // this.users = this.dataSourse.data.getValue();
  }

  getUsers(): Observable<User[]> {
    return this.users ? of(this.users) : of([]);
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
