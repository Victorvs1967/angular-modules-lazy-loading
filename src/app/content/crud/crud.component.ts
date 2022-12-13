import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
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
  ) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.crud.getUsers().subscribe(data => this.users = of([ ...data ]));
  }

  delete(id: string) {
    this.crud.deleteUser(id).subscribe(_ => this.reloadData());
  }

  signup() {
    this.crud.addUser().subscribe(_ => this.reloadData());
  }

  edit(id: string) {
    this.crud.editUser(id).subscribe(_ => this.reloadData());
  }

}
