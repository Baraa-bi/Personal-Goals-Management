import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticateUserService } from './authenticate-user.service';
import { IauthUser } from './user.interface';
export interface IGoal {
  _id: string;
  title: string;
  steps: IStep[];
  user_id: string;
  deadline: number;
  description: string;
}

export interface IStep {
  title: string;
  status: string;
  deadline: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoalService {
  accessToken!: string;
  constructor(
    private _http: HttpClient,
    private _authenticationService: AuthenticateUserService
  ) {
    this._authenticationService.state.subscribe((authUser: IauthUser) => {
      this.accessToken = authUser.tokens.access.token;
    });
  }

  get options() {
    return {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    };
  }

  getGoals(): Observable<IGoal[]> {
    const url = environment.goals_base_url;
    return this._http.get<IGoal[]>(url, this.options);
  }

  getGoal(goalId: string): Observable<IGoal> {
    const url = `${environment.goals_base_url}/${goalId}`;
    return this._http.get<IGoal>(url, this.options);
  }

  createGoal(data: String): Observable<string> {
    const url = environment.goals_base_url;
    return this._http.post<string>(url, data, this.options);
  }

  updateGoal(goalId: string, data: String): Observable<IGoal> {
    const url = `${environment.goals_base_url}/${goalId}`;
    return this._http.put<IGoal>(url, data, this.options);
  }

  deleteGoal(goalId: string): Observable<IGoal> {
    const url = `${environment.goals_base_url}/${goalId}`;
    return this._http.delete<IGoal>(url, this.options);
  }
}
