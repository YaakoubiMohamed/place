import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required]],
      password: ['',[Validators.required]],
    })
  }

  login()
  {
    this.authservice.SignIn(this.loginForm.value.email,this.loginForm.value.password);
  }

}
