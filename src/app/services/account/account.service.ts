import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // constructor(private http: HttpClient) { }

  // Sur les dernières version d'angular, je peux injecter des dépendances avec 'inject()'
  // Ce qui revient au mm que les injections via le constuctor
  http = inject(HttpClient);

  baseUrl = "http://localhost:3000/accounts"

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl)
  }

  deleteAccount(id: number): Observable<Account> {
    return this.http.delete<Account>(`${this.baseUrl}/${id}`)
  }

  addAccount(account: Account): Observable<Account> {
    // Le .post de http client prend 2 paramètres : l'url (type string) et le body de la requete (type: Object Javascript)
    return this.http.post<Account>(this.baseUrl, account)
  }

  updateAccount(account: Account): Observable<Account> {
    if (account.id) {
      return this.http.put<Account>(`${this.baseUrl}/${account.id}`, account)
    } else throw new Error("Le compte à mettre à jour doit avoir un id")
  }


}
