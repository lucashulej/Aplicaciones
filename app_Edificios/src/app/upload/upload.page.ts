import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import * as $ from "jquery";
import { firestore, storage } from 'firebase';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.page.html',
  styleUrls: ['./upload.page.scss'],
})
export class UploadPage implements OnInit {

  foto : any;

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
  //

  constructor(public router : Router, public camera : Camera) {}

  ngOnInit() {
    switch(localStorage.getItem("pagina"))
    {
      case "lindo":
        $("#divLindo").attr("hidden", false);
        $("#divFeo").attr("hidden", true);
        break;
      case "feo":
        $("#divLindo").attr("hidden", true);
        $("#divFeo").attr("hidden", false);
        break;
    }
  }

  volverUpload()
  {
    localStorage.setItem("pagina", "");
    $("#loadingContainerUpload").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainerUpload").attr("hidden", true);
      this.router.navigate(['/home']);
    }, 2000);
  }

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
      //const pictures = storage().ref('relevamientoVisual/1');
      //pictures.putString(image, 'data_url');
    }
    catch (error) 
    {
      alert(error);
    }
  }

  async subirFoto()
  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true,
      saveToPhotoAlbum : true
    }

    await this.camera.getPicture(options).then((imageData) => {

      this.foto = 'data:image/jpeg;base64,' + imageData;

     }, (err) => {

     });

    var auxUsuario = localStorage.getItem("usuario");
    var aux;
    if(localStorage.getItem("pagina") == "lindo")
    {
      aux = storage().ref(`cosas-lindas/${this.getFecha()}@${auxUsuario}`);
    }
    else
    {
      aux = storage().ref(`cosas-feas/${this.getFecha()}@${auxUsuario}`);

    }    
    const subirString = aux;
    subirString.putString(this.foto, 'data_url');
  }

  getFecha() : string
  {
    var fecha = new Date();
    let d,m,y,h,min,s;
    d = fecha.getDate();
    m = fecha.getUTCMonth();
    y = fecha.getFullYear();
    h = fecha.getHours().toString();
    min = fecha.getMinutes().toString();
    s = fecha.getSeconds().toString();

    return y + "-" + m + "-" + d + "_" + h + "-" + min + "-" + s;
  }

  galeriaPropia()
  {
    $("#loadingContainerUpload").attr("hidden", false);
    localStorage.setItem("tipoGaleria", "propia");
    setTimeout(() => {
      $("#loadingContainerUpload").attr("hidden", true);
      this.router.navigate(['/galeria']);
    }, 2000);
  }

  galeriaGeneral()
  {
    $("#loadingContainerUpload").attr("hidden", false);
    localStorage.setItem("tipoGaleria", "general");
    setTimeout(() => {
      $("#loadingContainerUpload").attr("hidden", true);
      this.router.navigate(['/galeria']);
    }, 2000);
  }
}
