import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";
import { firestore, storage } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

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
  likesUser: [];
  //

  usuarios;
  lista: any[]
  nombredoc: string;
  nuevaVar: Observable<any[]>;

  constructor(public router : Router, firestore : AngularFirestore) 
  {
    this.usuarios = firestore.collection('usuarios');

    this.nuevaVar = this.usuarios.valueChanges();
    this.nuevaVar.subscribe(usuarios => this.lista = usuarios, error => console.log(error));
   
  }

  ngOnInit() {
    switch(localStorage.getItem("pagina"))
    {
      case "lindo":
        $("#divLindoGaleria").attr("hidden", false);
        $("#divFeoGaleria").attr("hidden", true);
        break;
      case "feo":
        $("#divLindoGaleria").attr("hidden", true);
        $("#divFeoGaleria").attr("hidden", false);
        break;
    }
    this.traerFotos();
  }

  volverGaleria()
  {
    $("#loadingContainerGaleria").attr("hidden", false);
    localStorage.setItem("tipoGaleria", "");
    setTimeout(() => {
      $("#loadingContainerGaleria").attr("hidden", true);
      this.router.navigate(['/upload']);
    }, 2000);
  }

  traerFotos() //queTraer
  {
    this.url = [];
    var aux;
    if(localStorage.getItem("pagina") == "lindo")
    {
      aux = storage().ref("cosas-lindas");
    }
    else
    {
      aux = storage().ref("cosas-feas");
    }
    const imagenes = aux;
    imagenes.listAll().then((imagenes) => {
    this.listadoImagenes = imagenes.items;

    for(let path of this.listadoImagenes)
    {
      //if(queTraer == "todas")
      if(localStorage.getItem("tipoGaleria") == "general")
      {
        this.mostrarSoloUsuarios = false;
      }
      else
      {
        this.mostrarSoloUsuarios = true;
      }
      


        let array = path.location.path.split("/");
        console.log(array);
        let arrayMuestra = array[1];
        arrayMuestra = array[1].split("@");
        console.log(arrayMuestra);

        var auxUsuario = localStorage.getItem("usuario");
        let validacion = path.location.path.includes(auxUsuario); 
        var auxLindoFeo = localStorage.getItem("pagina");
        let refStorage;
        if(auxLindoFeo == "lindo")
        {
          refStorage = storage().ref("cosas-lindas");
        }
        else
        {
          refStorage = storage().ref("cosas-feas");
        }
         

        if(validacion && this.mostrarSoloUsuarios)
        {
          refStorage.child(array[1]).getDownloadURL().then((dato) =>{
            this.datos = {foto: dato, fecha: arrayMuestra[1],usuario: arrayMuestra[0]}
            this.url.push(this.datos);
          });
        }
        else if(!this.mostrarSoloUsuarios)
        {
          refStorage.child(array[1]).getDownloadURL().then((dato) =>{
            this.datos = {foto: dato, fecha: arrayMuestra[1],usuario: arrayMuestra[0]}
            this.url.push(this.datos);
          });
        }

      }

      setTimeout(()=>{
        this.ordenar();
      },1000);
    });
  }

  ordenar()
  {
    this.url.sort((a,b) => {
      if(a.foto < b.foto)
        return 1
      else
        return -1
    })
    console.log(this.url);
    this.urlOrdenado = this.url;
  }

  like(foto) {
    for (const usuario of this.lista) {
      if(usuario.perfil == localStorage.getItem("usuario"))
      {
        switch(usuario.perfil)
        {
          case 'anonimo':
            this.nombredoc = 'sawoV4G71vsrtt1vi8C8'; 
            break;
    
          case 'admin':
            this.nombredoc = 'MYyBvdfl9Ge7Gt2Vp5qU'; 
            break;
    
          case 'usuario':
            this.nombredoc = 'r8Z0ocnVmiADnXX796HP'; 
            break;
    
          case 'invitado':
            this.nombredoc = 'ow4LWXkhpngE2pAgpKXN'; 
            break;
    
          case 'tester':
            this.nombredoc = 'zziZ1uBmxBEno8mxDWBs'; 
            break; 
        }
        $("#like").attr("hidden", true);
        $("#dislike").attr("hidden", false);
        usuario.likes.push(foto.foto);
        this.usuarios.doc(this.nombredoc).update(usuario);
      }
    }
  }

  dislike(foto) {
    for (const usuario of this.lista) 
    {
      if(usuario.perfil == localStorage.getItem("usuario"))
      {
        switch(usuario.perfil)
        {
          case 'anonimo':
            this.nombredoc = 'sawoV4G71vsrtt1vi8C8'; 
            break;
    
          case 'admin':
            this.nombredoc = 'MYyBvdfl9Ge7Gt2Vp5qU'; 
            break;
    
          case 'usuario':
            this.nombredoc = 'r8Z0ocnVmiADnXX796HP'; 
            break;
    
          case 'invitado':
            this.nombredoc = 'ow4LWXkhpngE2pAgpKXN'; 
            break;
    
          case 'tester':
            this.nombredoc = 'zziZ1uBmxBEno8mxDWBs'; 
            break; 
        }
        $("#like").attr("hidden", false);
        $("#dislike").attr("hidden", true);
        let index = usuario.likes.indexOf(foto.foto);
        usuario.likes.splice(index,1);
        this.usuarios.doc(this.nombredoc).update(usuario);
      }
    }
  }

  buscarLikes(foto)
  {
    for(const usuario of this.lista)
    {
      if(usuario.perfil == localStorage.getItem("usuario"))
      {
        var usuarioElegido = usuario;
      }
    }
    var flag = false;
    for(const likes of usuarioElegido.likes)
    {
      if(likes == foto) 
      {
        flag = true;
        break;    
      }
    }
    return flag;
  }
}
