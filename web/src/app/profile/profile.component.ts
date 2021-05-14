import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from '../shared/classes/commande';
import { CommandeService } from '../shared/services/commande.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  usr: any;
  commandes: any;

  constructor(private commandeservice: CommandeService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.usr = JSON.parse(localStorage.getItem('user'));

    
    this.commandeservice.getCommandes().subscribe(admin => {
      this.commandes = admin.map(item => {
        let uid = item.payload.doc.id;
        let data = item.payload.doc.data();
        return { uid, ...(data as {}) } as Commande;
      });      
      this.commandes = this.commandes.filter(s => {
        return s.user == this.usr.uid;
      })
      console.log(this.commandes);   
              
    });
  }

  detail(commande){
    localStorage.setItem('commande', JSON.stringify(commande));
    this.router.navigate(['detail-cmd']);
  }

}
