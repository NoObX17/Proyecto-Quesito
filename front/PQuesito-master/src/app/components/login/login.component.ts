import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import { Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgOptimizedImage
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  /* Creamos una instancia (objeto) de la clase Service */
  constructor(private service:LoginService, private router: Router) {}

  email: string = "";
  password: string = "";


  onIniciarClick() {
    this.service.getToken(this.email, this.password).subscribe(
      response => {
        if (response.message == "Login failed"){
          window.alert("Usuario o contraseña incorrectos.")
        }else {
          // Almacenamos el token en una variable local
          localStorage.setItem('token', response.token);
          //Redireccionamos a la página de home
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  alert(){
    window.alert("Ponte en contacto con tu administrador para recuperar o cambiar la contraseña.")
  }


}
