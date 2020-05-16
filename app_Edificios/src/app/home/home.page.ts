import { Component } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router : Router) {}
  returnToLogin()
  {
    $("#loadingContainer2").attr("hidden", false);
    localStorage.setItem("usuario", "");
    setTimeout(() => {
      $("#loadingContainer2").attr("hidden", true);
      this.router.navigate(['/login']);
    }, 2000);
  }

  moveToFeo()
  {
    localStorage.setItem("pagina", "feo")
    this.move();
  }

  moveToLindo()
  {
    localStorage.setItem("pagina", "lindo");
    this.move();  
  }

  move()
  {
    $("#loadingContainer2").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainer2").attr("hidden", true);
      this.router.navigate(['/upload']);
    }, 2000);
  }
}
