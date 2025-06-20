import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';


// Pour que notre interceptor soit utilisé,
//
export const sessionInterceptor: HttpInterceptorFn = (req, next) => {

  console.log("Requête interceptée !");

  const platFormId = inject(PLATFORM_ID)

  let cloneReq = null
  let result = null

  if (isPlatformBrowser(platFormId)) {
    const token = sessionStorage.getItem("token")
    // Injection du token, nécessaire pour les requêtes sécurisées par bearer token
    if (token) {
      cloneReq = req.clone({
        headers: req.headers.set('Authorization', `bearer ${token}`)
      })
    }
  }

  if (cloneReq) {
    result = cloneReq
  } else result = req

  return next(result).pipe(
    catchError(e => {
      if (e.status === 401 || e.status === 403) {
        // Rediriger vers la page login
      }

      // Pour rendre l'erreur accessible depuis les composants qui s'abonneront à nos requêtes
      return throwError(() => e)
    })
  )
}
