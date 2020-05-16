import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.page.html',
  styleUrls: ['./jugadores.page.scss'],
})
export class JugadoresPage implements OnInit {

  listaJugadores: any[];
  partiCollection;
  parti;

  constructor(public router : Router, public db : AngularFirestore) 
  {
    this.partiCollection = this.db.collection('jugadores',ref => { return ref.orderBy('partidosGanados', 'desc').limit(5)});
    this.parti = this.partiCollection.valueChanges();
    this.parti.subscribe(algo => this.listaJugadores = algo, error => console.log(error))
  }

  ngOnInit() 
  {
   
  }

  returnJugadores()
  {
    $("#loadingContainerJugadores").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainerJugadores").attr("hidden", true);
      this.router.navigate(['/administracion']);
    }, 2000);
  }

}
