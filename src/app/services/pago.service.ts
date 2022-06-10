import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators'
import { Pagos } from '../models/pago.model';
import { UsuarioMovil } from '../models/usuario-movil.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  public usuario: UsuarioMovil;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario._id || ''
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarPagos() {
    const url = `${ base_url }/pagos`
    return this.http.get( url, this.headers )
              .pipe(
                map( (resp: {ok: boolean, pagos: Pagos[]}) => resp.pagos)
              )
           
  }

  crearPago( pago: { montoBs: string, montoSus: string, cuenta:string, usuarioM:string } ) {
    const url = `${ base_url }/pagos`
    return this.http.post( url, pago, this.headers )
  }

  obtenerCobros(){
    console.log('el id: ', this.headers)
    const url = `${ base_url }/pagos/usuarios`
    return this.http.get( url, this.headers )
                    .pipe(
                      map( (resp: { ok: boolean, cobros: Pagos[], cid: string}) => resp.cobros)
                    );
  }
}
