import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateUserService } from './authenticate-user.service';
import { IauthUser } from './user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'personal-goals-app';
  state!: IauthUser;
  currentDate: number = Date.now();
  expirationDate!: number;
  constructor(
    private stateService: AuthenticateUserService,
    private router: Router
  ) {
    this.stateService.state.subscribe((state: IauthUser) => {
      this.state = state;
      this.expirationDate = new Date(state.tokens.access.expires).valueOf();
      if (state.tokens.access.token && this.expirationDate < this.currentDate) {
        this.router.navigate(['']);
      }
    });
  }
  logout() {
    this.stateService.state.next({
      tokens: {
        access: {
          token: '',
          expires: '',
        },
        refresh: {
          token: '',
          expires: '',
        },
      },
      user: {
        id: '',
        fullname: '',
        email: '',
      },
    });
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
