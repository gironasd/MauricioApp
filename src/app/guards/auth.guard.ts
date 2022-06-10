import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { tap, map } from 'rxjs/operators'
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private usuarioservice: LoginService,
                private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){

      
      return this.usuarioservice.validarToken()
        .pipe(
          tap( estaAutenticado => {
            if(!estaAutenticado) {
              this.router.navigateByUrl('/')
            }
          })
        );
  }
  
}
