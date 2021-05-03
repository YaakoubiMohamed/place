import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/util.service';
import { CancelOrderPage } from '../cancel-order/cancel-order.page';

@Component({
  selector: 'app-billing-detail',
  templateUrl: './billing-detail.page.html',
  styleUrls: ['./billing-detail.page.scss'],
})
export class BillingDetailPage implements OnInit {
  id: any;
  data:any ={};
  currency: string;
  constructor(private modal:ModalController,private util:UtilService) { }

  ngOnInit() {
    this.currency = localStorage.getItem('currency_symbol')
  }
  ionViewWillEnter(){
    this.util.startLoad();
    this.id = localStorage.getItem('order-id');
    
  }

 

}
