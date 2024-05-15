import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  /**
   * le guard renvoie true si les infos sont extactes et laisse passer la connexion
   * Et false sinon. Pour cela, on redirige le user vers la connexion
   * ## le guard c'est pour proteger les routes qu'on ne veut pas que le user
   * ## accede sans etre authentifié.
   * ## Ici, nous protegeons la route home, donc c'est là que nous mettrons
   * ## notre guard
   */
  if (sessionStorage.getItem('email')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
