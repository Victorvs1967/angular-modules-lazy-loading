import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { UsersDatasource } from '../data/users.datasource';

import data from 'src/app/data/users.json';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private dataSourse = (new UsersDatasource([ ...data ]));
  private users: User[];

  constructor() {
    this.users = this.dataSourse.data.getValue();
  }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  deleteUser(id: number): Observable<User[]> {
    const index = this.users.findIndex(user => user.id === id);
    return of(this.users.splice(index, 1));
  }

}
