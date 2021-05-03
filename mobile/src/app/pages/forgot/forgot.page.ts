import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
  email:string = '';
  err: any;
  constructor(private util:UtilService) { }

  ngOnInit() {
  }

  public image:any = '';

  ionViewWillEnter(){
    this.util.startLoad();
    
  }

  verify(){
    this.util.startLoad();
    let data = {
      email:this.email
    }
    
  }

}
