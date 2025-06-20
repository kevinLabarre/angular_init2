import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = new BehaviorSubject<boolean>(false)
  isAuthenticated$ = this.isAuthenticated.asObservable()

  constructor(private http: HttpClient, private route: Router) { }

  url = environment.login

  updateIsAuthenticated(boolean: boolean) {
    this.isAuthenticated.next(boolean)
  }

  logout() {
    console.log("logout !!")
    this.updateIsAuthenticated(false)
    sessionStorage.removeItem("token")
  }

  // Fake login (pour simuler une réponse d'un backEnd)
  fakeLogin({ login, password }: { login: string; password: string }): Observable<{ login: string, password: string, token: string }> {
    return this.http.get<{ login: string, password: string, token: string }>(`${this.url}/${1}`).pipe(
      // Opérateur tap -> Nous permet de déclencher une erreur SANS MODIFIER ( grâce à l'opérateur tap) le flux de données
      // reçu
      tap(resp => {
        if (!(resp.password === password && resp.login === login))
          throw new Error("Identifiant ou mot de passe incorrect")
        else {
          this.updateIsAuthenticated(true)
          sessionStorage.setItem("token", resp.token)
          this.route.navigate(['/admin'])
        }
      }
      )
    )
  }

  // Pour un backend réel, on aurait un méthode 'classique'
  // C'est le backend qui a la responsabilité de faire la vérif du login/password de l'utilisateur
  login({ login, password }: { login: string; password: string }): Observable<{ token: string }> {
    return this.http.get<{ token: string }>(`${this.url}`).pipe(
      tap(resp => {
        sessionStorage.setItem("token", resp.token)
        this.route.navigate(['/admin'])
      })
    )
  }

}
