import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticateUserService } from '../authenticate-user.service';
import { Iregister } from '../user.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm = inject(FormBuilder).nonNullable.group({
    email:['',Validators.email],
    fullname:['',Validators.required],
    password:['',Validators.minLength(6)]
  });
  errorMessage:string = '';
  constructor(private _router: Router,private stateService:AuthenticateUserService) {}

  ngOnInit(): void {}

  onRegister(): void {
    this.stateService.registerUser(this.registerForm.value as Iregister).subscribe(
      response=>{
        console.log(response)
        this._router.navigate(['login']);
      },
      (error:HttpErrorResponse)=>{
        this.errorMessage = error.error.message;
      }
    )
    console.log(this.registerForm.value)
  }
}
