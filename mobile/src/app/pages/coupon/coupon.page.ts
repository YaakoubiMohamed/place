import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/util.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.page.html',
  styleUrls: ['./coupon.page.scss'],
})
export class CouponPage implements OnInit {
  coupons:any = [];
  code:any;
  codeCheck: any;
  discountt: any;
  coupomId: any;
  currency: string;
  constructor(private util:UtilService) { }
  
  ngOnInit() {
    this.currency = localStorage.getItem('currency_symbol');
    this.util.startLoad();
  
  }

  checkId(item){
    localStorage.setItem('discount_type',item.type);
    this.discountt =  item.discount;
    this.codeCheck = item.code;
    this.coupomId = item.id;
  }

  checkCoupon(){
    this.util.startLoad();
    let data = {
      code:this.code
    }
    
  }
  discount(arg0: string, discount: any) {
    throw new Error('Method not implemented.');
  }
}
