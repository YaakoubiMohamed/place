import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  privacy: any;

  constructor(private util:UtilService) { }

  ngOnInit() {
    this.util.startLoad();
   
  }

}
