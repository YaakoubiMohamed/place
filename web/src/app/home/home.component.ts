import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../shared/services/categorie.service';
import { Categorie } from '../shared/classes/categorie';
import { Offre } from '../shared/classes/offre';
import { OffreService } from '../shared/services/offre.service';
import { FormControl } from '@angular/forms';
import { ProduitService } from '../shared/services/produit.service';
import { Produit } from '../shared/classes/produit';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Categorie[];
  offres : Offre[]
  produits: Produit[];
  constructor(private categorieservice: CategorieService,
    private produitservice: ProduitService,
    private offreservice: OffreService) { }

  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  ngOnInit(): void {
    this.categorieservice.getCategories().subscribe(admin => {
      this.categories = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Categorie;
      });      
      
      console.log(this.categories);           
    });

    this.offreservice.getOffres().subscribe(admin => {
      this.offres = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Offre;
      });      
      
      console.log(this.offres);           
    });

    this.produitservice.getProduits().subscribe(admin => {
      this.produits = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Produit;
      });      
      
      console.log(this.produits);           
    });
  }

}
