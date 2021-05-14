import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from '../shared/services/commande.service';
import { PanierService } from '../shared/services/panier.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {
  items: any[];
  user: any;

  constructor(private panierservice: PanierService, private cmdService:CommandeService, private router: Router) { }

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('panier'));
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.items,this.user);
  }

  valider(){
      this.items.forEach(x => {
        let record ={};
        record['date'] = new Date();
        record['user'] = this.user.uid;
        record['etat'] = 'en attente';
        //x = x.concat(record);
        let tab = Object.assign(record,x);
        console.log(tab);
          this.cmdService.addCommande(tab);
      })
      localStorage.setItem('panier', null);
      this.router.navigate(['/home'])
  }

}
