import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
declare var angular: any;

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {

  public uploadTask: firebase.storage.UploadTask;
  editForm: FormGroup;
  existe: boolean;
  arr: any;
  photo: any;
  @ViewChild("img") img: ElementRef;


  constructor(
    public afs: AngularFirestore,
    private fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute ) { }
  ngOnInit() {
    this.editForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      marque: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      image: [''],
      prix: ['', [Validators.required, Validators.minLength(1)]],
      quantite: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
    this.arr = this.afs.collection('/produits');
   
  }
  
  add() {
    //this.existe = false;
   /*
    let record = {
      nom: nom.value,
      description: description.value,
      image: img.src,
      marque: marque.value,
      prix: prix.value,
      quantite: quantite.value,
    };
    */
   let photo = this.img.nativeElement.value;
   this.editForm.get("image").setValue(photo);

        this.arr.add(this.editForm.value);
        console.log(this.editForm.value);
        this.router.navigate(['/produits']);

    }
    
  upload(f, img) {

    const storageReference = firebase.storage().ref('/images/' + f.files[0].name);
    this.uploadTask = storageReference.put(f.files[0]);
    this.uploadTask.on('state_changed', function (snapshot) {

      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function (error) {
      // Handle unsuccessful uploads
    }, function () {

      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      storageReference.getDownloadURL().then(function (url) {
        // Insert url into an <img> tag to "download"
        //img.src = url;
        img.value = url;
       // this.photo = url;
        //this.img = url;
        console.log(img.value);
      });

    });
  }

}
