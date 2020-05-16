import { Component } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";
import { storage } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  puntaje1 : number = 0;
  puntaje2 : number = 0;
  partidos: Observable<any[]>;
  listaPartidos: any[];
  jugadores: Observable<any[]>;
  listaJugadores: any[];

  jugador1 : string;
  jugador2: string;
  ganador: string;
  fecha: string;
  pathFoto: string;

  base64Image : string;

  constructor(public router : Router, public db : AngularFirestore, public camera : Camera) 
  {
    this.partidos = db.collection('partidos').valueChanges();
    this.partidos.subscribe(partidos => this.listaPartidos = partidos, error => console.log(error));
    this.jugadores = db.collection('jugadores').valueChanges();
    this.jugadores.subscribe(jugadores => this.listaJugadores = jugadores, error => console.log(error));
  }

  subirPartido()
  {
    if(this.isValidData())
    {
      this.db.collection('partidos').add({
        jugador1: this.jugador1,
        jugador2: this.jugador2,
        ganador: this.ganador,
        fecha: this.fecha,
        foto: this.pathFoto
      })
      this.subirJugadores();
      this.return();
    }
    else
    {
      this.errorMensaje();
    }
  }

  subirJugadores()
  {
    let existe1 : boolean = false;
    let existe2 : boolean = false;
    for(let auxJugador of this.listaJugadores)
    {
      if(auxJugador.nombre == this.jugador1)
      {
        existe1 = true;
        this.modificarJugador(auxJugador, this.jugador1);
        continue;
      }
      if(auxJugador.nombre == this.jugador2)
      {
        existe2 = true;
        this.modificarJugador(auxJugador, this.jugador2);
        continue;
      }
    }
    if(existe1 == false)
    {
      this.nuevoJugador(this.jugador1);
    }
    if(existe2 == false)
    {
      this.nuevoJugador(this.jugador2);
    }
  }

  modificarJugador(auxJugador : any, jugador : string)
  {
    if(this.ganador == jugador)
    {
      this.db.collection('jugadores').doc(jugador).set({
        nombre: jugador,
        partidosGanados: auxJugador.partidosGanados + 1
      })
    }
    else
    {
      this.db.collection('jugadores').doc(jugador).set({
        nombre: jugador,
        partidosGanados: auxJugador.partidosGanados
      })
    }
  }

  nuevoJugador(jugador : string)
  {
    if(this.ganador == jugador)
    {
      this.db.collection('jugadores').doc(jugador).set({
        nombre: jugador,
        partidosGanados: 1
      })
    }
    else
    {
      this.db.collection('jugadores').doc(jugador).set({
        nombre: jugador,
        partidosGanados: 0
      })
    }
  }

  isValidData() : boolean
  {
    let retorno : boolean = false; 
    this.jugador1 = $("#inputJugador1").val();
    this.jugador2 = $("#inputJugador2").val();  
    this.fecha = $("#fecha").val();
    this.puntaje1 = $("#puntos1").text();
    this.puntaje2 = $("#puntos2").text();
    if(this.puntaje1 > this.puntaje2)
    {
      this.ganador = this.jugador1;
    }
    else if(this.puntaje2 > this.puntaje1)
    {
      this.ganador = this.jugador2;
    }
    else
    {
      this.ganador = "empate";
    }
    if(this.jugador1 != "" && this.jugador2 != "" && this.jugador1 != this.jugador2 && this.fecha != "")
    {
      retorno = true;
    }
    return retorno;
  }

  /*
  async takePhoto()
  {
    try 
    {
      const options : CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : true,
      correctOrientation : true
      }
      const imageData = await this.camera.getPicture(options);
      this.base64Image = 'data:image/jpeg;base64' + imageData;

      this.pathFoto = this.getFecha();
      const pictures = storage().ref(`metegol/${this.pathFoto}`);
      pictures.putString(this.base64Image, 'data_url');
    }
    catch (error) 
    {
      alert(error);
    }
  }
  */

 async takePhoto()
 {
   try 
   {
     const options : CameraOptions = {
     quality: 50,
     targetHeight: 600,
     targetWidth: 600,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,
     saveToPhotoAlbum : true,
     correctOrientation : true
     }
      const result = await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      this.pathFoto = this.fecha;
      const pictures = storage().ref(`metegol/${this.pathFoto}`);
      pictures.putString(image, 'data_url');
      this.subirPartido();
    }
   catch (error) 
   {
     alert(error);
   }
 }

  return()
  {
    this.reiniciarPuntajes();
    $("#loadingContainer2").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer2").attr("hidden", true);
      this.router.navigate(['/administracion']);
    }, 2000);
  }

  reiniciarPuntajes()
  {
    this.puntaje1 = 0;
    this.puntaje2 = 0;
    this.actualizarPuntaje1();
    this.actualizarPuntaje2();
  }

  sumar1()
  {
    this.puntaje1++;
    if(this.puntaje1 > 10)
    {
      this.puntaje1 = 10;
    }
    this.actualizarPuntaje1();
  }

  restar1()
  {
    this.puntaje1--;
    if(this.puntaje1 < 0)
    {
      this.puntaje1 = 0;
    }
    this.actualizarPuntaje1();
  }

  sumar2()
  {
    this.puntaje2++;
    if(this.puntaje2 > 10)
    {
      this.puntaje2 = 10;
    }
    this.actualizarPuntaje2();
  }

  restar2()
  {
    this.puntaje2--;
    if(this.puntaje2 < 0)
    {
      this.puntaje2 = 0;
    }
    this.actualizarPuntaje2();
  }

  actualizarPuntaje1()
  {
    $("#puntos1").text(this.puntaje1);
  }

  actualizarPuntaje2()
  {
    $("#puntos2").text(this.puntaje2);
  }

  getFecha() : string
  {
    var fecha = new Date();
    let d,m,y;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();

    return y + "-" + m + "-" + d + "_" + fecha.toLocaleTimeString();
  }

  errorMensaje()
  {
    $("#errorDatos").attr("hidden", false);
    setTimeout(() => {
      $("#errorDatos").attr("hidden", true);
    }, 4000);
  }
}