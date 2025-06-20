import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)

  const platFormId = inject(PLATFORM_ID)

  // PARAM 'route'
  // Si la route à des paramètres, on peut les récupéer avec 'route' passé en pramètre
  const id = route.params['id']; // ne fonctionne pas car nous n'avons pas d'id en paramètre usr la route

  // PARAM 'state', principalement utilisé pour récupérer l'url de la route sur laquelle on se trouve
  const url = state.url
  console.log("state, guard: ", state)

  if (isPlatformBrowser(platFormId)) {

    const token = sessionStorage.getItem("token") // -> On pourrait faire (via un service) un appel au back pour vérifier le token
    if (token) {
      return true
    }
    //else return false  // -> Bloquer la route
    else return router.createUrlTree([`/se-connecter`]) // Dans les guard, on DOIT utiliser 'router.createUrlTree' et pas 'navigate' !
  }

  return false // Pour le SSR

};

// Le guard doit retourner soit :
// - true : autorisation OK (route accessible)
// - false : autorisation refusée (route non accessible)
// - Un urlTree : rediriger l'utilisateur vers une autre route
