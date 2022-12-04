import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.sass']
})
export class ContentComponent {

  isLoggedIn?: Observable<boolean>;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth']);
  }

}
