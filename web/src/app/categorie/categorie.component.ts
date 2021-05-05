import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produit } from '../shared/classes/produit';
import { ProduitService } from '../shared/services/produit.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  id: any;
  produits: Produit[] = [];

  constructor(private produitservice: ProduitService,
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
        return s.categorie == this.id;
      })
      console.log(this.produits);           
    });
  }

}
