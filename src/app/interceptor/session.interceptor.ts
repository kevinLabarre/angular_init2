import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


// Pour que notre interceptor soit utilisé,
//
export const sessionInterceptor: HttpInterceptorFn = (req, next) => {

  const token = "MonToken"

  console.log("Requête interceptée !");

  const cloneReq = req.clone({
    headers: req.headers.set('Authorization', `bearer ${token}`)
  })

  return next(cloneReq).pipe(
    catchError(e => {
      if (e.status === 401 || e.status === 403) {
        // Rediriger vers la page login
      }

      // Pour rendre l'erreur accessible depuis les composants qui s'abonneront à nos requêtes
      return throwError(() => e)
    })
  )
};
