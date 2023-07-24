import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { GoalComponent } from './goal/goal.component';
import { GoalsComponent } from './goals/goals.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'goals',
    canActivate: [AuthGuard],
    component: GoalsComponent,
  },
  {
    path: 'goals/:goalId',
    canActivate: [AuthGuard],
    component: GoalComponent,
  },
  {
    path: 'update-goal/:goalId',
    canActivate: [AuthGuard],
    component: GoalFormComponent,
  },
  {
    path: 'new-goal',
    canActivate: [AuthGuard],
    component: GoalFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
