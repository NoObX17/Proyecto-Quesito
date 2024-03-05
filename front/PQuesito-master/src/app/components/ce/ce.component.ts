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
import { Router, ActivatedRoute } from "@angular/router";
import {Chart} from "chart.js/auto";
import {MatTableModule} from '@angular/material/table';
import {MatRippleModule} from '@angular/material/core';

export interface TableElement {
  criterios: string;
  porcentaje: string;
  nota: string;
}

@Component({
  selector: 'app-ce',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatSelectModule, MatIconModule, MatDividerModule, MatTableModule, MatRippleModule],
  templateUrl: './ce.component.html',
  styleUrl: './ce.component.css'
})

export class CeComponent {
  showFiller = false;
  chart: any = [];
  chartData: any = [];

  usuario = new Usuario("", "", "", "", "", "", "");

  modulo: string = "";


  constructor(private router: Router, private datos: DatosService, private activatedRoute: ActivatedRoute) {}

  displayedColumns: string[] = ['criterios', 'porcentaje', 'nota'];
  dataSource: any[] = [];
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

      this.activatedRoute.queryParams.subscribe(params => {
        this.modulo = params['modulo'];
        this.datos.getRas(this.modulo, this.usuario.curso, this.usuario.dni).subscribe(
          response => {
            //Almacenamos y asignamos los datos (clave,valor) en la array de la tabla
            this.dataSource = Object.keys(response.Notas).map(key => ({
              header: key,
              content1: (response.Notas[key].Nota.toFixed(2)).toString(),
              content2: (response.Notas[key].Porcentaje.toFixed(3) * 100).toString() + "%"
            }));
            console.log(this.dataSource);
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
      });

    }else {
      this.router.navigate(['/login']);
    }
  }

  onClickHome (){
    this.router.navigate(['/home']);
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
    //Eliminamos el token una vez hecho logout
    localStorage.removeItem('token');
  }
}

