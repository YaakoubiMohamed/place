import { Component, OnInit } from '@angular/core';
import { PanierService } from '../shared/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  items: any[];

  constructor(private panierservice: PanierService) { }

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('panier'));
    //this.panierservice.getItems();
    console.log(this.items);
  }

}
