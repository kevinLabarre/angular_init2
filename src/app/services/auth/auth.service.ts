import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = environment.login

  login({ login, password }: { login: string; password: string }): Observable<{ login: string, password: string, token: string }> {
    return this.http.get<{ login: string, password: string, token: string }>(`${this.url}/${1}`).pipe(

      // Opérateur tap -> Nous permet de déclencher une erreur SANS MODIFIER ( grâce à l'opérateur tap) le flux de données
      // reçu
      tap(resp => {
        if (!(resp.password === password && resp.login === login))
          throw new Error("Identifiant ou mot de passe incorrect")
      }
      )
    )
  }
}
