import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {MY_CONSTANT} from "../constantUrl";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public serviceName = 'jwt/signin.php';
  public url = MY_CONSTANT + this.serviceName;

  constructor(private httpClient: HttpClient) { }

  // Función para invocar el WS (servidor)
  getToken(correo: string, contra: string) : Observable<any> {

    const body = {
      "email": correo,
      "password": contra
    };

    return this.httpClient.post(this.url, body);
  }
}
