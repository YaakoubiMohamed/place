import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private firestore: AngularFirestore) {
    
  }

  getCommandes() {
    return this.firestore.collection("commandes").snapshotChanges();
  }

  addCommande(record) {
    return this.firestore.collection("commandes").add(record);
  }
}
