import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError, delay } from 'rxjs/operators'
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  validarToken(): Observable<boolean> {
    console.log('aqui')
    const token = localStorage.getItem('token') || '';
    return this.http.get(` ${ base_url }/login-movil/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
        tap( (resp: any) => {
          console.log('aqui')
          console.log('usuario:', resp)
          
          localStorage.setItem('token', resp.token )
        }),
        map( resp => true),
        catchError( error => of(false))
    )
  }

  login ( formData: LoginForm ) {
    console.log(formData)

    return this.http.post(` ${ base_url }/login-movil`, formData )
                    .pipe(
                      tap( (resp: any) => {
                        localStorage.setItem('token', resp.token)
                      })
                    )
  }
}
