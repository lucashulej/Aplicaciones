import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";

@Component({
  selector: 'app-numeros',
  templateUrl: './numeros.page.html',
  styleUrls: ['./numeros.page.scss'],
})
export class NumerosPage implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() 
  {
    $("#botonNumerosNumeros").css("filter", "brightness(50%)");
    switch(localStorage.getItem("idioma"))
    {
      case 'espaniol':
        $("#botonNumerosEspaniol").css("filter", "brightness(50%)");
        break;
      case 'ingles':
        $("#botonNumerosIngles").css("filter", "brightness(50%)");
        break;
      case 'portugues':
        $("#botonNumerosPortugues").css("filter", "brightness(50%)");
        break;
    }
  }

  volverNumeros()
  {
    localStorage.setItem("idioma", "");
    localStorage.setItem("tema", "");
    $("#loadingContainer5").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer5").attr("hidden", true);
      this.router.navigate(['/login']);
    }, 2000);
  }

  cambiarTemaNumeros(tema : string)
  {
    localStorage.setItem("tema", tema);
    switch(tema)
    {
      case "animales":
        $("#loadingContainer5").attr("hidden", false);
        setTimeout(() => {
         $("#loadingContainer5").attr("hidden", true);
          this.router.navigate(['/animales']);
        }, 2000);
        break;
      case "colores":
        $("#loadingContainer5").attr("hidden", false);
        setTimeout(() => {
          $("#loadingContainer5").attr("hidden", true);
          this.router.navigate(['/colores']);
        }, 2000);
        break;
      case 'numeros':
        break;
    }
  }

  cambiarIdiomaNumeros(idioma : string)
  {
    localStorage.setItem("idioma", idioma);
    switch(localStorage.getItem("idioma"))
    {
      case 'espaniol':
        $("#botonNumerosEspaniol").css("filter", "brightness(50%)");
        $("#botonNumerosIngles").css("filter", "brightness(100%)");
        $("#botonNumerosPortugues").css("filter", "brightness(100%)");
        break;
      case 'ingles':
        $("#botonNumerosIngles").css("filter", "brightness(50%)");
        $("#botonNumerosEspaniol").css("filter", "brightness(100%)");
        $("#botonNumerosPortugues").css("filter", "brightness(100%)");
        break;
      case 'portugues':
        $("#botonNumerosPortugues").css("filter", "brightness(50%)");
        $("#botonNumerosEspaniol").css("filter", "brightness(100%)");
        $("#botonNumerosIngles").css("filter", "brightness(100%)");
        break;
    }
  }

  clickNumeros(boton : string)
  {
    var aux = localStorage.getItem("idioma");
    let audio = new Audio();
    switch(boton)
    {
      case "uno":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/numeros/unoEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/numeros/unoIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/numeros/unoPortugues.mp3";
            break;
        }
        break;

      case "dos":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/numeros/dosEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/numeros/dosIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/numeros/dosPortugues.mp3";
              break;
        }
        break;

      case "tres":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/numeros/tresEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/numeros/tresIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/numeros/tresPortugues.mp3";
              break;
        }
        break;

      case "cuatro":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/numeros/cuatroEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/numeros/cuatroIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/numeros/cuatroPortugues.mp3";
              break;
        }
        break;

      case "cinco":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/numeros/cincoEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/numeros/cincoIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/numeros/cincoPortugues.mp3";
              break;
        }
        break;

      case "seis":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/numeros/seisEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/numeros/seisIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/numeros/seisPortugues.mp3";
              break;
        }
        break;
    }
    audio.load();
    audio.play();
  }
}
