import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  userinfo:any;
  constructor(private AuthService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.userinfo = localStorage.getItem('user')!;
    if (this.userinfo === null) {
      this.router.navigate(['login']);
    }
  }
  logout(){
    this.AuthService.SignOut();
  }
}
