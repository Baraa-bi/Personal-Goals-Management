import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GoalsComponent } from './goals/goals.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoalComponent } from './goal/goal.component';
import { RegisterComponent } from './register/register.component';
import { GoalProgressDirective } from './goal-progress.directive';
import { AuthenticateUserService } from './authenticate-user.service';
import { IauthUser } from './user.interface';
import { CheckDateDirective } from './check-date.directive';
import { DateDirective } from './date.directive';
import { GoalStatusDirective } from './goal-status.directive';

const refreshToken = (stateService: AuthenticateUserService) => {
  return () => {
    const stored_state = localStorage.getItem('STATE');
    if (stored_state) {
      const sStateValue: IauthUser = JSON.parse(stored_state);
      const expiration: number = new Date(
        sStateValue.tokens.access.expires
      ).valueOf();
      if (expiration > Date.now()) {
        stateService.state.next(sStateValue);
      }
    }
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GoalsComponent,
    GoalFormComponent,
    GoalComponent,
    GoalProgressDirective,
    RegisterComponent,
    CheckDateDirective,
    DateDirective,
    GoalStatusDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: refreshToken,
      deps: [AuthenticateUserService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
