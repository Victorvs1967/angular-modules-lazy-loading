import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { Database, DatabaseReference, getDatabase, ref as dbRef } from "firebase/database";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  app = initializeApp({
    databaseURL: environment.firebase.databaseURL,
    storageBucket: environment.firebase.storageBucket,
  });

  setStorage(): FirebaseStorage {
    return getStorage(this.app);
  }

  setDb(): Database {
    return getDatabase(this.app);
  }
  setUsersListRef(): DatabaseReference {
    return dbRef(this.setDb(), 'users-list');
  }

}
