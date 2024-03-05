import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {MY_CONSTANT} from "../constantUrl";

@Injectable({
  providedIn: 'root'
})
export class FrasesService {

  public serviceName = 'frases.php';
  public url = MY_CONSTANT + this.serviceName;

  constructor(private http: HttpClient) { }

    obtenerFraseAleatoria(): Observable<any> {
        return this.http.get<any>(this.url);
    }


}
