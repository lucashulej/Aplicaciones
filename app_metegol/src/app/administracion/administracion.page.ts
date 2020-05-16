import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.page.html',
  styleUrls: ['./administracion.page.scss'],
})
export class AdministracionPage implements OnInit {

  constructor(public router : Router) { }

  ngOnInit() 
  {
  }

  returnAdministracion()
  {
    $("#loadingContainerAdministracion").attr("hidden", false);
    localStorage.setItem("usuario", "");
    setTimeout(() => {
      $("#loadingContainerAdministracion").attr("hidden", true);
      this.router.navigate(['/login']);
    }, 2000);
  }

  goToNuevoPartido()
  {
    if(localStorage.getItem("usuario") == "admin")
    {
      $("#loadingContainerAdministracion").attr("hidden", false);
      setTimeout(() => {
        $("#loadingContainerAdministracion").attr("hidden", true);
        this.router.navigate(['/home']); //home es administracion
      }, 2000);
    }
    else
    {
      this.errorSoloAdmin();
    }
  }
  
  goToVerPartidos()
  {
    $("#loadingContainerAdministracion").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainerAdministracion").attr("hidden", true);
      this.router.navigate(['/partidos']);
    }, 2000);
  }

  goToMejoresJugadores()
  {
    $("#loadingContainerAdministracion").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainerAdministracion").attr("hidden", true);
      this.router.navigate(['/jugadores']);
    }, 2000);
  }

  errorSoloAdmin()
  {
    $("#errorSoloAdmin").attr("hidden", false);
    setTimeout(() => {
      $("#errorSoloAdmin").attr("hidden", true);
    }, 4000);
  }
}
