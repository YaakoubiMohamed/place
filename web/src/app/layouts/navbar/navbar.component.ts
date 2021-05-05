import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  is_logged_in: boolean;
  user: any;

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.is_logged_in = this.authservice.isLoggedIn;
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    console.log(this.is_logged_in,this.user);
  }

}
