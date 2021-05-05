import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../shared/classes/produit';
import { PanierService } from '../shared/services/panier.service';
import { ProduitService } from '../shared/services/produit.service';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  id: any;
  produits: Produit[] = [];
  produit: Produit;

  constructor(private produitservice: ProduitService,
    private panierservice: PanierService,
    private actroute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.actroute.snapshot.params.id;
    //this.id = localStorage.getItem('id');
    console.log(this.id);
    //alert(this.id);

    this.produitservice.getProduits().subscribe(admin => {
      this.produits = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Produit;
      });      
      this.produits = this.produits.filter(s => {
        return s.uid == this.id;
      })
      this.produit = this.produits[0];
      console.log(this.produit);           
    });
  }

  cart(produit){
    console.log(produit);
    this.panierservice.AddToCart(produit);
    this.router.navigate(['/panier']);
  }
}
