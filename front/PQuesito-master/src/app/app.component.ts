import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CommonModule} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {ModulosComponent} from "./components/modulos/modulos.component";
import {RouterLink} from "@angular/router";
import {RaComponent} from "./components/ra/ra.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, HomeComponent, ModulosComponent, RouterLink, RaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PQuesito';
}
