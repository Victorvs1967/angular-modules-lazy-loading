import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "src/app/models/user.model";

export class UsersDatasource extends DataSource<User> {

  data: BehaviorSubject<User[]>;

  constructor(
    data: User[],
  ) {
    super();
    this.data = new BehaviorSubject<User[]>(data);
  }
  
  connect(): Observable<User[]> {
    return this.data;
  }
  
  disconnect(): void { }
  
}