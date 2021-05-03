import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/util.service";

@Component({
  selector: "app-newpassword",
  templateUrl: "./newpassword.page.html",
  styleUrls: ["./newpassword.page.scss"],
})
export class NewpasswordPage implements OnInit {
  password: string = "";
  confirm_password: string = "";
  constructor( private util: UtilService) {}
  public image: any = "";
  ngOnInit() {}

  ionViewWillEnter() {
    this.util.startLoad();
    
  }

  changePassword() {
    this.util.startLoad();
    let data = {
      password: this.password,
      confirm_password: this.confirm_password,
      user_id: localStorage.getItem("verifyId"),
    };
    
  }
}
