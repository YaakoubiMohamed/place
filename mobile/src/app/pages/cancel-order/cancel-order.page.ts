import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-cancel-order',
  templateUrl: './cancel-order.page.html',
  styleUrls: ['./cancel-order.page.scss'],
})
export class CancelOrderPage implements OnInit {

  constructor(private modal:ModalController,private util:UtilService) { }
  @Input() id:any;
  
  ngOnInit() {
  }

  dismis(){
    this.modal.dismiss();
  }

  remove(){
    this.util.startLoad();
    
  } 

}
