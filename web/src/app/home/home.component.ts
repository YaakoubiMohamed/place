import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../shared/services/categorie.service';
import { Categorie } from '../shared/classes/categorie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Categorie[];

  constructor(private categorieservice: CategorieService) { }

  ngOnInit(): void {
    this.categorieservice.getCategories().subscribe(admin => {
      this.categories = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Categorie;
      });      
      
      console.log(this.categories);           
    });
  }

}
