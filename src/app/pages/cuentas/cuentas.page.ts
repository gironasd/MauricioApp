import { Component, OnInit } from '@angular/core';
import { Cuentas } from 'src/app/models/cuentas.model';
import { CuentaService } from 'src/app/services/cuenta.service';
//import { BusquedasService } from 'src/app/services/busquedas.service';


@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
})
export class CuentasPage implements OnInit {

  public cuenta: Cuentas[] = []
  public cuentaTemp: Cuentas[] = []
  public cargando: boolean = true

  constructor(
    private cuentaService: CuentaService
  ) { }

  ngOnInit() {

    this.cargarCuentas();
  }

  cargarCuentas(){
    this.cargando = true;

    this.cuentaService.cargarCuentas()
    .subscribe( ({cuentas}) => {
      this.cuenta = cuentas
      this.cargando = false;
      this.cuentaTemp = cuentas
    })
  }

}
