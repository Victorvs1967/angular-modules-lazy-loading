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

  dataSourse?: UsersDatasource;
  users: User[];

  dialogConfig: MatDialogConfig = {
    width: '50rem',
    data: {},
  }

  constructor(
    public dialog: MatDialog,
  ) {
    this.users = [];
    this.loadData();
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(): Observable<User[]> {
    return this.dialog.open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .pipe(map(user => {
        const userRef = push(this.usersListRef);
        user.id = userRef.key ?? '';
        set(userRef, user)
          .then(() => this.users.push(user))
          .then(() => console.log('new user add successfuly...'));

        return this.users;
      }));
  }

  editUser(id: string): Observable<User[]> {
    const index = this.users.findIndex(user => user.id === id);
    this.dialogConfig.data = this.users[index];
    
    return this.dialog.open(RegisterComponent, this.dialogConfig)
      .afterClosed()
      .pipe(map(user => {
        user.id = id;
        set(dbRef(this.db, 'users-list/'.concat(id)), user)
          .then(() => console.log('edit successfuly...'));

        return this.users;
    }));
  }

  deleteUser(id: string): Observable<User[]> {
    remove(dbRef(this.db, 'users-list/'.concat(id)))
      .then(() => console.log('delete successfuly...'));

    const index = this.users.findIndex(user => user.id === id);
    this.users.splice(index, 1);
    return of(this.users);
  }

  private loadData() {
    get(this.usersListRef).then((data: any) => data.toJSON())
      .then(data => {
        for (let i in data) {
          this.users = [ ...this.users, data[i] ];
        }
      });
  }
}
