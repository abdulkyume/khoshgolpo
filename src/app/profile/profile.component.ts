import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private AuthService:AuthService) { }
  userinfo:any;

  ngOnInit(): void {
    this.userinfo = JSON.parse(localStorage.getItem("user")!);
    document.getElementById('userpic')!.setAttribute("src",this.userinfo.photoURL);
  }
}
