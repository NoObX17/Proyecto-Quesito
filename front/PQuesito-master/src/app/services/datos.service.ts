import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MY_CONSTANT} from "../constantUrl";

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  // private url3 = 'http://cicloweb.cesurformacion.com/API/php-excel/ceexcel.php';

  public serviceName = 'php-excel/raexcel.php';
  public url = MY_CONSTANT + this.serviceName;

  public serviceName1 = 'php-excel/mediasexcel.php';
  public url1 = MY_CONSTANT + this.serviceName1;


  constructor(private httpClient: HttpClient) { }

  getMedias(ano: string, id: string):Observable<any>{

    const token = localStorage.getItem('token');

    // Configurar el header con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Definir el cuerpo de la solicitud
    const body = {
      "ano": ano,
      "id": id
    };

    // Enviar la solicitud POST con el header y el cuerpo
    return this.httpClient.post<any>(this.url1, body, { headers: headers });
  }

  getRas(modulo: string, ano: string, id: string):Observable<any>{

    const token = localStorage.getItem('token');

    // Configurar el header con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Definir el cuerpo de la solicitud
    const body = {
      "modul": modulo,
      "ano": ano,
      "id": id
    };

    // Enviar la solicitud POST con el header y el cuerpo
    return this.httpClient.post<any>(this.url, body, { headers: headers });
  }

  getCes(ra: string, modulo: string, ano: string, id: string):Observable<any>{

    const token = localStorage.getItem('token');

    // Configurar el header con el token de autorización
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Definir el cuerpo de la solicitud
    const body = {
      "ra": ra,
      "modul": modulo,
      "ano": ano,
      "id": id
    };

    // Enviar la solicitud POST con el header y el cuerpo
    return this.httpClient.post<any>(this.url1, body, { headers: headers });
  }

}
