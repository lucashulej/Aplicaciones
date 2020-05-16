import { Component } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router : Router) 
  {
    localStorage.setItem("idioma", "");
    localStorage.setItem("tema", "");
  }
  auxStringTema = "";

  returnToLogin()
  {
    $("#loadingContainer2").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer2").attr("hidden", true);
      this.router.navigate(['/login']);
    }, 2000);
  }

  clickIngles()
  {
    localStorage.setItem("idioma", "ingles");
    this.habilitarContinue();
  }

  clickEspaniol()
  {
    localStorage.setItem("idioma", "espaniol");
    this.habilitarContinue();
  }

  clickPortugues()
  {
    localStorage.setItem("idioma", "portugues");
    this.habilitarContinue();
  }

  clickAnimales()
  {
    localStorage.setItem("tema", "animales");
    this.habilitarContinue();
  }

  clickNumeros()
  {
    localStorage.setItem("tema", "numeros");
    this.habilitarContinue();
  }

  clickColores()
  {
    localStorage.setItem("tema", "colores");
    this.habilitarContinue();
  }

  habilitarContinue()
  {
    if(localStorage.getItem("idioma") != "" && localStorage.getItem("tema") != "")
    {
      $("#botonContinuar").attr("disabled", false);
    }
  }

  continue()
  {
    $("#loadingContainer2").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer2").attr("hidden", true);
      switch(localStorage.getItem("tema"))
      {
        case "animales":
          this.router.navigate(['/animales']);
          break;
        case "numeros":
          this.router.navigate(['/numeros']);
          break;
        case "colores":
          this.router.navigate(['/colores']);
          break;
      }
    }, 2000);
    
  }
}