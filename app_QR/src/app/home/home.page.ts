import { Component } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";
import {QRScanner, QRScannerStatus} from "@ionic-native/qr-scanner/ngx";
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  qrScan: any;
  codigos: Observable<any[]>;
  lista: any[];
  puntaje: number = 0;
  contador1: number = 0;
  contador2: number = 0;
  contador3: number = 0;

  constructor(public router : Router, public qr : QRScanner, public platform : Platform, db : AngularFirestore, public vibration : Vibration)
  {
    this.codigos = db.collection('codigosQr').valueChanges();
    this.codigos.subscribe(codigos => this.lista = codigos, error => console.log(error));

    this.platform.backButton.subscribeWithPriority(0, ()=>{
      document.getElementsByTagName("body")[0].style.opacity = "1";
      this.qrScan.unsubscribe();
    })
  }

  returnToLogin()
  {
    localStorage.setItem("usuario", "");
    let audio = new Audio();
    audio.src ="../../assets/audio/logout.mp3";
    audio.load();
    audio.play();
    $("#loadingContainer2").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer2").attr("hidden", true);
      this.router.navigate(['/login']);
    }, 2000);
  }

  startScanning()
  {
    this.qr.prepare().then((status:QRScannerStatus)=>{
      if(status.authorized)
      {
        this.qr.show();
        document.getElementsByTagName("body")[0].style.opacity = "0";
        this.qrScan = this.qr.scan().subscribe((textFound)=>
        {
          document.getElementsByTagName("body")[0].style.opacity = "1";
          this.qrScan.unsubscribe();
          switch(textFound)
          {
            case this.lista[0].codigo:
              if(this.contador1 < 1)
              {
                this.contador1++;
                this.puntaje = this.puntaje + this.lista[0].valor;
                this.sonidoExito();
              }
              else 
              {
                if(localStorage.getItem("usuario") == "admin")
                {
                  if(this.contador1 < 2)
                  {
                    this.contador1++;
                    this.puntaje = this.puntaje + this.lista[0].valor;
                    this.sonidoExito();
                  }
                  else
                  {
                    this.errorAdmin();
                  }
                }
                else
                {
                  this.errorComun();
                } 
              }
              break;

            case this.lista[1].codigo:
              if(this.contador2 < 1)
              {
                this.contador2++;
                this.puntaje = this.puntaje + this.lista[1].valor;
                this.sonidoExito();
              }
              else 
              {
                if(localStorage.getItem("usuario") == "admin")
                {
                  if(this.contador2 < 2)
                  {
                    this.contador2++;
                    this.puntaje = this.puntaje + this.lista[1].valor;
                    this.sonidoExito();
                  }
                  else
                  {
                    this.errorAdmin();
                  }
                }
                else
                {
                  this.errorComun();
                } 
              }
              break;

            case this.lista[2].codigo:
              if(this.contador3 < 1)
              {
                this.contador3++;
                this.puntaje = this.puntaje + this.lista[2].valor;
                this.sonidoExito();
              }
              else 
              {
                if(localStorage.getItem("usuario") == "admin")
                {
                  if(this.contador3 < 2)
                  {
                    this.contador3++;
                    this.puntaje = this.puntaje + this.lista[2].valor;
                    this.sonidoExito();
                  }
                  else
                  {
                    this.errorAdmin();
                  }
                }
                else
                {
                  this.errorComun();
                } 
              }
              break;

            default:
              this.errorCodigoMostrar();
              break;
          }
          this.mostrarPuntaje();
        },(err)=>{
          alert(err);
        })
      }
      else if(status.denied)
      {

      }
      else
      {

      }
    })
  }

  limpiar()
  {
    this.puntaje=0;
    this.contador1=0;
    this.contador2=0;
    this.contador3=0;
    let audio = new Audio();
    audio.src ="../../assets/audio/limpiar.mp3";
    audio.load();
    audio.play();
    this.mostrarPuntaje();
  }

  mostrarPuntaje()
  {
    $("#visorCodigos").text("Total =  " +  this.puntaje);
  }

  errorComun()
  {
    $("#errorComun").attr("hidden", false);
    this.sonidoError();
    this.vibrar();
    setTimeout(() => {
      $("#errorComun").attr("hidden", true);
    }, 3000);
  }
  
  errorAdmin()
  {
    $("#errorAdmin").attr("hidden", false);
    this.sonidoError();
    this.vibrar();
    setTimeout(() => {
      $("#errorAdmin").attr("hidden", true);
    }, 3000);
  }

  errorCodigoMostrar()
  {
    $("#errorCodigo").attr("hidden", false);
    this.sonidoError();
    this.vibrar();
    setTimeout(() => {
      $("#errorCodigo").attr("hidden", true);
    }, 3000);
  }

  sonidoExito()
  {
    let audio = new Audio();
    audio.src ="../../assets/audio/exito.mp3";
    audio.load();
    audio.play();
  }

  sonidoError()
  {
    let audio = new Audio();
    audio.src ="../../assets/audio/error.mp3";
    audio.load();
    audio.play();
  }

  vibrar()
  {
    this.vibration.vibrate(500);
  }
}