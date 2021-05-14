import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-cmd',
  templateUrl: './detail-cmd.component.html',
  styleUrls: ['./detail-cmd.component.css']
})
export class DetailCmdComponent implements OnInit {
  commande: any;
  user: any;
  usr: any;

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.usr = JSON.parse(localStorage.getItem('user'));
    this.commande = JSON.parse(localStorage.getItem('commande'));
  }

}
