import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DecodedToken } from "../../interfaces/decoded-token";
import { jwtDecode } from "jwt-decode";
import { Usuario } from "../../models/usuario";
import { DatosService } from "../../services/datos.service";
import { Router } from "@angular/router";
import {Chart} from "chart.js/auto";
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from "@angular/material/core";


@Component({
  selector: 'app-modulos',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatSelectModule, MatIconModule, MatDividerModule, MatTableModule, MatRippleModule],
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css'
})

export class ModulosComponent {
  showFiller = false;
  chart: any = [];
  chartData: any = [];

  usuario = new Usuario("", "", "", "", "", "", "");

  constructor(private router: Router, private datos: DatosService) {}

  displayedColumns: string[] = ['header', 'content1'];
  dataSource: { content1: string; header: string }[] = [];


  ngOnInit(){

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
      this.usuario.curso = "2324";
      this.usuario.ciclo = data.ciclo;

      this.datos.getMedias(this.usuario.curso, this.usuario.dni).subscribe(
        response => {
          //Almacenamos y asignamos los datos (clave,valor) en la array de la tabla
          this.dataSource =  Object.keys(response).map(key => ({header: key, content1: response[key].Media.toFixed(2)}));

          this.chartData = {
            labels: this.dataSource.map(item => item.header),
            datasets: [{
              data: this.dataSource.map(item => item.content1),
              showLine: false,
            }],
          };

          this.chart = new Chart('canvas', {
            type: 'polarArea',
            data: this.chartData,
            options: {
              scales: {
                r: {
                  max: 10,
                },
              },
              aspectRatio: 1.5,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    font: {
                      family: 'Montserrat',
                      weight: 800,
                    }
                  }
                }
              },
            },
          });
        },
        error => {
          console.log(error);
        }
      );

    }else {
      this.router.navigate(['/login']);
    }


  }

  onClickModulo(modulo: string){
    this.router.navigate(['/ra'], { queryParams: { modulo: modulo } });
  }

  onClickHome(){
    this.router.navigate(['/home']);
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
    //Eliminamos el token una vez hecho logout
    localStorage.removeItem('token');
  }

  redirectToPage() {
    // Aquí especifica la ruta a la que quieres redirigir
    this.router.navigate(['/home']);
  }
}

