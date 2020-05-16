import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore, storage } from 'firebase';

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.page.html',
  styleUrls: ['./partidos.page.scss'],
})
export class PartidosPage implements OnInit {

  listaPartidos: any[];
  partiCollection;
  parti;

   //
   dato : any;
   subs : any;
   mostrarError : boolean;
   mostrarSoloUsuarios : boolean = false;
   perfil : string;
   arrayPath : string[]= [];
   listadoImagenes : any;
   url = [];
   urlOrdenado = [];
   
   favoritas = [];
   datos;
   //
   mostrar;

  constructor(public router : Router, public db : AngularFirestore) 
  {
    this.partiCollection = this.db.collection('partidos',ref => { return ref.orderBy('fecha', 'desc')});
    this.parti = this.partiCollection.valueChanges();
    this.parti.subscribe(algo => this.listaPartidos = algo, error => console.log(error))
    this.traerFotos();
    setTimeout(() => {
      this.mostrar = this.listaPartidos
    }, 2000);
  }

  ngOnInit() {
  }

  returnPartidos()
  {
    $("#loadingContainerPartidos").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainerPartidos").attr("hidden", true);
      this.router.navigate(['/administracion']);
    }, 2000);
  }

  traerFotos()
  {
      const imagenes = storage().ref('metegol/');
      imagenes.listAll().then((imagenes) => {
      this.listadoImagenes = imagenes.items;

      for(let foto of this.listadoImagenes)
      {
        for(let item of this.listaPartidos)
        {
          if('metegol/' + item.foto == foto.location.path)
          {
            storage().ref().child(foto.location.path).getDownloadURL().then((dato) =>{
              item.foto = dato;
            });
          }
        }
      }


    })
  }
}
