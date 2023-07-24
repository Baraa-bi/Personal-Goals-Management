import { FormBuilder, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateUserService } from '../authenticate-user.service';
import { Ilogin,IauthUser } from '../user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { DATE_PIPE_DEFAULT_TIMEZONE } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = inject(FormBuilder).nonNullable.group({
    email:['',Validators.email],
    password:['',Validators.minLength(6)]
  });
  errorMessage:string = '';

  constructor(private _router: Router, private stateService:AuthenticateUserService) {}

  ngOnInit(): void {}

  onLogin(): void {
    this.errorMessage = '';
    this.stateService.loginUser(this.loginForm.value as Ilogin).subscribe({
      next: data=>{
        this.stateService.state.next(data as IauthUser);
        localStorage.setItem('STATE',JSON.stringify(data))
        this._router.navigate(['']);
      },
      error:(error:HttpErrorResponse)=> {
        this.errorMessage = error.error.message;
      }
    }
    )
  }

  _login(token: string): void {}
}
