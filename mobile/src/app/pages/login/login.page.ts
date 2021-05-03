import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { UtilService } from "src/app/util.service";
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  err: any;
  passErr: any;
  deviceToken: any;
  constructor(
    private navCtrl: NavController,
    private util: UtilService,
    private modal: ModalController,
    public authService: AuthService
  ) {}

  ngOnInit() {}
  public image: string = "";
  signup() {
    this.navCtrl.navigateForward("/signup");
    this.modal.dismiss();
  }
  ionViewWillEnter() {
    this.email = "";
    this.password = "";

    this.util.startLoad();
    
  }

  goForgot() {
    this.util.navCtrl.navigateForward("forgot");
  }

  login() {
    this.navCtrl.navigateRoot("tabs/home");
    
    this.util.startLoad();
    let data = {
      device_token: this.deviceToken ? this.deviceToken : "No Token Found",
      email: this.email,
      password: this.password,
    };
    
    
  }
}
