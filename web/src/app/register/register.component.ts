import { register } from 'ts-node';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor(private fb: FormBuilder,
    private authservice: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      telephone: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      cite: ['', [Validators.required]],
      code_postal: ['', [Validators.required]],
      pays: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      cnf_password: ['', [Validators.required]],
      rule: ['', [Validators.required]],
    })
  }

  register(){
    console.log(this.registerForm.value);
    this.authservice.SignUp(this.registerForm.value);
  }


}
