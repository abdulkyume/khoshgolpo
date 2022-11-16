import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService:AuthService) { }

  ngOnInit(): void {
  }
  loginwithgoogle(){
    this.AuthService.GoogleAuth();
  }

}
