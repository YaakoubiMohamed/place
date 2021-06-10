import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorie } from '../shared/classes/categorie';
import { Produit } from '../shared/classes/produit';
import { CategorieService } from '../shared/services/categorie.service';
import { ProduitService } from '../shared/services/produit.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  id: any;
  produits: Produit[] = [];
  categories: Categorie[];
  marques: string [] = [];

  constructor(private categorieservice: CategorieService,
    private produitservice: ProduitService,
    private actroute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.actroute.snapshot.params.id;
    //this.id = localStorage.getItem('id');
    console.log(this.id);
    this.categorieservice.getCategories().subscribe(admin => {
      this.categories = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Categorie;
      });      
      
      console.log(this.categories);           
    });
    //alert(this.id);

    this.produitservice.getProduits().subscribe(admin => {
      this.produits = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Produit;
      });
      let i = 0;
      this.produits.forEach(s=>{
        this.marques[i] = s.marque;
        i++;
        //console.log(s.marque);
      });
      this.marques = Array.from(new Set (this.marques));
      console.log(this.marques);
      this.produits = this.produits.filter(s => {
        return s.categorie == this.id;
      })
      console.log(this.produits);           
    });
  }

}
