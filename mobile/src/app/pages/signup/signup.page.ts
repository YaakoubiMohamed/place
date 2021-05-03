import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController, ModalController } from "@ionic/angular";
import { AuthService } from "src/app/shared/services/auth.service";
import { UtilService } from "src/app/util.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  errr: any;
  RegisterForm: FormGroup;
  public message = "Warning";

  constructor(
    private fb: FormBuilder,
    private authservice: AuthService
  ) {}
  
  ngOnInit() {
    this.RegisterForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      prenom: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.minLength(2)]],
      adresse: [''],
      password: ['', [Validators.required, Validators.minLength(1)]],
      confirm_password: ['', [Validators.required, Validators.minLength(1)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      type: ['', [Validators.required, Validators.minLength(2)]],
    });
  }
  add(){
    console.log('show');
  }

  ionViewWillEnter() {
    
  }
  tryRegister(value) {
    console.log('ok');
  }

  signUp() {
    console.log('ok');
    //alert(this.message);
    this.authservice.SignUp(this.RegisterForm.value);
   console.log(this.RegisterForm.value);
  }
  test(){
    console.log('ok');
  }
}
