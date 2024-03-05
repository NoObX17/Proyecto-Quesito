import {Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {ModulosComponent} from "./components/modulos/modulos.component";
import {AuthGuard} from "./auth.guard";
import {ModuleGuard} from "./module.guard";
import {RaComponent} from "./components/ra/ra.component";
import {CeComponent} from "./components/ce/ce.component";


export const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  { path: 'modulos', component: ModulosComponent, canActivate: [ModuleGuard] },
  { path: 'ra', component: RaComponent, canActivate: [ModuleGuard] },
  { path: 'ce', component: CeComponent, canActivate: [ModuleGuard] },
  {path:'**', component:PageNotFoundComponent}
];
