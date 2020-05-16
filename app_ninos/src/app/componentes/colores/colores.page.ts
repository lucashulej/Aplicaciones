import { Component, OnInit, ɵSWITCH_VIEW_CONTAINER_REF_FACTORY__POST_R3__ } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";

@Component({
  selector: 'app-colores',
  templateUrl: './colores.page.html',
  styleUrls: ['./colores.page.scss'],
})
export class ColoresPage implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() 
  {
    $("#botonColoresColores").css("filter", "brightness(50%)");
    switch(localStorage.getItem("idioma"))
    {
      case 'espaniol':
        $("#botonColoresEspaniol").css("filter", "brightness(50%)");
        break;
      case 'ingles':
        $("#botonColoresIngles").css("filter", "brightness(50%)");
        break;
      case 'portugues':
        $("#botonColoresPortugues").css("filter", "brightness(50%)");
        break;
    }
  }

  volverColores()
  {
    localStorage.setItem("idioma", "");
    localStorage.setItem("tema", "");
    $("#loadingContainer3").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer3").attr("hidden", true);
      this.router.navigate(['/login']);
    }, 2000);
  }

  cambiarTemaColores(tema : string)
  {
    localStorage.setItem("tema", tema);
    switch(tema)
    {
      case "animales":
        $("#loadingContainer3").attr("hidden", false);
        setTimeout(() => {
         $("#loadingContainer3").attr("hidden", true);
          this.router.navigate(['/animales']);
        }, 2000);
        break;
      case "numeros":
        $("#loadingContainer3").attr("hidden", false);
        setTimeout(() => {
          $("#loadingContainer3").attr("hidden", true);
          this.router.navigate(['/numeros']);
        }, 2000);
        break;
      case 'colores':
        break;
    }
  }

  cambiarIdiomaColores(idioma : string)
  {
    localStorage.setItem("idioma", idioma);
    switch(localStorage.getItem("idioma"))
    {
      case 'espaniol':
        $("#botonColoresEspaniol").css("filter", "brightness(50%)");
        $("#botonColoresIngles").css("filter", "brightness(100%)");
        $("#botonColoresPortugues").css("filter", "brightness(100%)");
        break;
      case 'ingles':
        $("#botonColoresIngles").css("filter", "brightness(50%)");
        $("#botonColoresEspaniol").css("filter", "brightness(100%)");
        $("#botonColoresPortugues").css("filter", "brightness(100%)");
        break;
      case 'portugues':
        $("#botonColoresPortugues").css("filter", "brightness(50%)");
        $("#botonColoresIngles").css("filter", "brightness(100%)");
        $("#botonColoresEspaniol").css("filter", "brightness(100%)");
        break;
    }
  }

  clickColores(boton : string)
  {
    var aux = localStorage.getItem("idioma");
    let audio = new Audio();
    switch(boton)
    {
      case "rojo":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/colores/rojoEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/colores/rojoIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/colores/rojoPortugues.mp3";
            break;
        }
        break;

      case "gris":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/colores/grisEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/colores/grisIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/colores/grisPortugues.mp3";
              break;
        }
        break;

      case "verde":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/colores/verdeEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/colores/verdeIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/colores/verdePortugues.mp3";
              break;
        }
        break;

      case "naranja":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/colores/naranjaEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/colores/naranjaIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/colores/naranjaPortugues.mp3";
              break;
        }
        break;

      case "azul":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/colores/azulEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/colores/azulIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/colores/azulPortugues.mp3";
              break;
        }
        break;

      case "morado":
        switch(aux)
        {
          case "espaniol":
            audio.src = "../../../assets/audio/colores/moradoEspañol.mp3";
            break;
          case "ingles":
            audio.src = "../../../assets/audio/colores/moradoIngles.mp3";
            break;
          case "portugues":
            audio.src = "../../../assets/audio/colores/moradoPortugues.mp3";
              break;
        }
        break;
    }
    audio.load();
    audio.play();
  }
}
