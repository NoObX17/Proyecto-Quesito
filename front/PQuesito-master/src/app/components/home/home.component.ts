import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Usuario} from "../../models/usuario";
import {DatosService} from "../../services/datos.service";
import {ComprobartokenService} from "../../services/comprobartoken.service";
import { jwtDecode } from "jwt-decode";
import {DecodedToken} from "../../interfaces/decoded-token";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FrasesService} from "../../services/frases.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title: string = 'home';

  usuario = new Usuario("", "", "", "", "", "", "");

  fraseAleatoria: string = '';

  constructor(private service: DatosService, private comprobar: ComprobartokenService, private router: Router, private frasesService: FrasesService) {}

  ngOnInit(){

      this.obtenerFraseAleatoria();

      // Recuperar el el token
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken: DecodedToken = jwtDecode(token);

        // Acceder a la información de data
        const data = decodedToken.data;

        // Asignar propiedades del usuario
        this.usuario.dni = data.dni;
        this.usuario.nombre = data.nombre;
        this.usuario.apellido1 = data.apellido1;
        this.usuario.apellido2 = data.apellido2;
        this.usuario.email = data.Email;

      }else {
        this.router.navigate(['/login']);
      }
    }

  onClick (){
    this.router.navigate(['/modulos']);
  }

  obtenerFraseAleatoria() {
        this.frasesService.obtenerFraseAleatoria().subscribe(
            data => {
                if (data.frase) {
                    this.fraseAleatoria = data.frase;
                } else {
                    console.error('Error al obtener la frase aleatoria.');
                }
            },
            error => {
                console.error('Error en la solicitud HTTP:', error);
            }
        );
    }

}

