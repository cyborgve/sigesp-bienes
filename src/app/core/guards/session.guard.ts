import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard  {
  constructor(private router: Router, private sigesp: SigespService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return from(this.sigesp.isLogged()).pipe(
      map(isLogged => {
        if (!isLogged) {
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }),
      catchError(error => {
        console.error('Error verificando la sesión:', error);
        // Redirigir a página de error o manejar de otra manera
        return of(false);
      })
    );
  }
}
