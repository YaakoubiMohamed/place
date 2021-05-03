import { Component, OnInit } from "@angular/core";
import { UtilService } from "src/app/util.service";

@Component({
  selector: "app-terms",
  templateUrl: "./terms.page.html",
  styleUrls: ["./terms.page.scss"],
})
export class TermsPage implements OnInit {
  terms: any;

  constructor( private util: UtilService) {}

  ngOnInit() {
    this.util.startLoad();
   
  }
}
