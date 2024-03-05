import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComprobartokenService {
  private url = 'https://m4.xaviersastre.cat/apitest/jwt/tokens-api/comprobartoken.php';
  constructor(private httpClient: HttpClient) { }

  comprobar(token: string) : Observable<any> {
    const header = new Headers({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.post(this.url, header);
  }
}
