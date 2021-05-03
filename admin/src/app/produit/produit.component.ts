import { User } from '../shared/classes/user';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProduitService } from '../shared/services/produit.service';
import {DataTableDirective, DataTablesModule} from 'angular-datatables';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from '../shared/classes/produit';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {


  dtElement: DataTableDirective;

  isDtInitialized:boolean = false;
  dtOptions: DataTables.Settings = {};
  produits: Produit[] = [];
  produitForm: FormGroup;
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  submitted: boolean;

  constructor(private produitservice: ProduitService,
    private router: Router) { }

  ngOnInit(): void {
    
  
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.produitservice.getProduits().subscribe(admin => {
      this.produits = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Produit;
      });
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
       
      console.log(this.produits);           
    });
    
  } 

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  supp(uid){
    this.produitservice.deleteProduit(uid);
    this.router.navigate(['/produits']);
  }
  edit(record){
    localStorage.setItem('product',JSON.stringify(record));
    this.router.navigate(['/edit-produit']);
  }

}
