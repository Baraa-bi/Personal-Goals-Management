import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateUserService } from '../authenticate-user.service';
import { IauthUser } from '../user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor() {}
}
