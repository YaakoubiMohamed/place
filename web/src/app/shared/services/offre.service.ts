import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private firestore: AngularFirestore) {
    
  }

  addOffres(record) {
    return this.firestore.collection("offres").add(record);
  }
  
  getOffres() {
    return this.firestore.collection("offres").snapshotChanges();
  }

  deleteOffre(uid) {
    return this.firestore.collection('offres').doc(uid).delete();
  }

  modifierOffre(record) {
    return this.firestore.collection('offres').doc(record.id).set(record);
  }
}
