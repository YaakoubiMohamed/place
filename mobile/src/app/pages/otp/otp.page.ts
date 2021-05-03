import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UtilService } from "src/app/util.service";

@Component({
  selector: "app-otp",
  templateUrl: "./otp.page.html",
  styleUrls: ["./otp.page.scss"],
})
export class OtpPage implements OnInit {
  otp = "";
  err: any;
  constructor(
    private navCtrl: NavController,
    private util: UtilService
  ) {}
  public image: any = "";
  ngOnInit() {}
  ionViewWillEnter() {
    this.util.startLoad();
   
  }

  otpVerify() {
    this.util.startLoad();
    if (localStorage.getItem("isFrom") == "verify") {
      let data = {
        otp: this.otp,
        user_id: localStorage.getItem("verifyId"),
      };
      
    } else {
      let data = {
        otp: this.otp,
        user_id: localStorage.getItem("verifyId"),
      };
     
    }
  }
}
