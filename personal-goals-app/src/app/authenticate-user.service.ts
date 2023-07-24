import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin, Iregister, IauthUser } from './user.interface';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const INIT_STATE = {
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
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticateUserService {
  state: BehaviorSubject<IauthUser> = new BehaviorSubject(INIT_STATE);
  constructor(private http: HttpClient) {}
  loginUser(user: Ilogin) {
    return this.http.post(`${environment.auth_base_url}/login`, user);
  }
  registerUser(user: Iregister) {
    return this.http.post(`${environment.auth_base_url}/register`, user);
  }
}
