import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { UtilService } from "src/app/util.service";

@Component({
  selector: "app-verify",
  templateUrl: "./verify.page.html",
  styleUrls: ["./verify.page.scss"],
})
export class VerifyPage implements OnInit {
  email: string = "";
  err: any;
  constructor( private util: UtilService) {}
  public image: any = "";
  ngOnInit() {}

  ionViewWillEnter() {
    this.util.startLoad();
    
  }

  verify() {
    this.util.startLoad();
    let data = {
      email: this.email,
    };
   
  }
}
