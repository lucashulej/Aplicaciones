import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'login', loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)},
  { path: 'splash', loadChildren: () => import('./app.component').then( m => m.AppComponent)},
  { path: 'administracion', loadChildren: () => import('./administracion/administracion.module').then( m => m.AdministracionPageModule)},
  { path: 'jugadores', loadChildren: () => import('./jugadores/jugadores.module').then( m => m.JugadoresPageModule)},
  { path: 'partidos', loadChildren: () => import('./partidos/partidos.module').then( m => m.PartidosPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }