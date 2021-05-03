import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { AddAddressPage } from "src/app/modals/add-address/add-address.page";
import { UtilService } from "src/app/util.service";

@Component({
  selector: "app-manage-address",
  templateUrl: "./manage-address.page.html",
  styleUrls: ["./manage-address.page.scss"],
})
export class ManageAddressPage implements OnInit {
  addressDiv: any = [];
  selectAddresss: any;
  isFrom: string;
  constructor(
    private modal: ModalController,
    private util: UtilService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {

    this.util.startLoad();
    this.isFrom = localStorage.getItem('isFrom');
   

    this.selectAddresss = localStorage.getItem("SelectAddress");
  }
  async address() {
    const modal = await this.modal.create({
      component: AddAddressPage,
      cssClass: "manage-address",
    });
    modal.onDidDismiss().then((res) => {
      this.ionViewWillEnter();
      localStorage.removeItem('marketLat')
      localStorage.removeItem('marketLng')
    });
    return await modal.present();
  }

  close() {
    this.modal.dismiss();
  }

  selectAddress(item) {
    localStorage.setItem("SelectAddress", item.addr1);
    this.modal.dismiss(item);
  }

  isDelete: boolean = true;

  deleteAddress(id) {
    this.util.startLoad();
   
  }
}
