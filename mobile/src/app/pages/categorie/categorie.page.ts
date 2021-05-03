import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../shared/services/produit.service';
import { Produit } from '../../shared/classes/produit';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {
  id: any;
  produits: Produit[] = [];

  constructor(private produitservice: ProduitService,
    private actroute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
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

  produitDetail(s)
  {
    //alert(s);
    this.router.navigate(['/product-view'], {state: {data: s}});

  }

}
