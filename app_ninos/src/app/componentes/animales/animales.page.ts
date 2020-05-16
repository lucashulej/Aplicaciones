import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";

@Component({
  selector: 'app-animales',
  templateUrl: './animales.page.html',
  styleUrls: ['./animales.page.scss'],
})
export class AnimalesPage implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() 
  {
    $("#botonAnimalesAnimales").css("filter", "brightness(50%)");
    switch(localStorage.getItem("idioma"))
    {
      case 'espaniol':
        $("#botonAnimalesEspaniol").css("filter", "brightness(50%)");
        break;
      case 'ingles':
        $("#botonAnimalesIngles").css("filter", "brightness(50%)");
        break;
      case 'portugues':
        $("#botonAnimalesPortugues").css("filter", "brightness(50%)");
        break;
    }
  }

  volverAnimales()
  {
    localStorage.setItem("idioma", "");
    localStorage.setItem("tema", "");
    $("#loadingContainer4").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer4").attr("hidden", true);
      this.router.navigate(['/login']);
    }, 2000);
  }

  cambiarTemaAnimales(tema : string)
  {
    localStorage.setItem("tema", tema);
    switch(tema)
    {
      case "colores":
        $("#loadingContainer4").attr("hidden", false);
        setTimeout(() => {
         $("#loadingContainer4").attr("hidden", true);
          this.router.navigate(['/colores']);
        }, 2000);
        break;
       case "numeros":
        $("#loadingContainer4").attr("hidden", false);
        setTimeout(() => {
          $("#loadingContainer4").attr("hidden", true);
          this.router.navigate(['/numeros']);
        }, 2000);
        break;
        case "animales":
          break;
    }
  }

  cambiarIdiomaAnimales(idioma : string)
  {
    localStorage.setItem("idioma", idioma);
    switch(localStorage.getItem("idioma"))
    {
      case 'espaniol':
        $("#botonAnimalesEspaniol").css("filter", "brightness(50%)");
        $("#botonAnimalesIngles").css("filter", "brightness(100%)");
        $("#botonAnimalesPortugues").css("filter", "brightness(100%)");
        break;
      case 'ingles':
        $("#botonAnimalesIngles").css("filter", "brightness(50%)");
        $("#botonAnimalesEspaniol").css("filter", "brightness(100%)");
        $("#botonAnimalesPortugues").css("filter", "brightness(100%)");
        break;
      case 'portugues':
        $("#botonAnimalesPortugues").css("filter", "brightness(50%)");
        $("#botonAnimalesIngles").css("filter", "brightness(100%)");
        $("#botonAnimalesEspaniol").css("filter", "brightness(100%)");
        break;
    }
  }

  clickAnimales(boton : string)
  {
    var aux = localStorage.getItem("idioma");
    let audio = new Audio();
    switch(boton)
    {
      case "burro":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/animales/burroEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/animales/burroIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/animales/burroPortugues.mp3";
            break;
        }
        break;

      case "cerdo":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/animales/cerdoEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/animales/cerdoIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/animales/cerdoPortugues.mp3";
              break;
        }
        break;

      case "conejo":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/animales/conejoEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/animales/conejoIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/animales/conejoPortugues.mp3";
              break;
        }
        break;

      case "gallo":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/animales/galloEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/animales/galloIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/animales/galloPortugues.mp3";
              break;
        }
        break;

      case "pato":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/animales/patoEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/animales/patoIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/animales/patoPortugues.mp3";
              break;
        }
        break;

      case "vaca":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/animales/vacaEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/animales/vacaIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/animales/vacaPortugues.mp3";
              break;
        }
        break;
    }
    audio.load();
    audio.play();
  }
}