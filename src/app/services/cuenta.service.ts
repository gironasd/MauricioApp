import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CargarCuentas } from '../interfaces/cargar-cuentas.interface';
import { Cuentas } from '../models/cuentas.model';
import { map } from 'rxjs/operators'
import { Pagos } from '../models/pago.model';

const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(
    private http: HttpClient,
  ) { }

  cargarCuentas() {
    const url = `${ base_url }/cuentas`
    return this.http.get<CargarCuentas>( url )
  }

  obtenerCuentaById( id: string ){ 
    const url = `${ base_url }/cuentas/${ id }`
    return this.http.get( url )
                    .pipe(
                      map( (resp: { ok: boolean, cuentas: Cuentas}) => resp.cuentas)
                    );
  }

  obtenerPagosporCuenta(id: string){
    const url = `${ base_url }/pagos/${ id }`
    return this.http.get( url )
                    .pipe(
                      map( (resp: { ok: boolean, pagocuentas: Pagos}) => resp.pagocuentas)
                    );
  }
  

  
}
