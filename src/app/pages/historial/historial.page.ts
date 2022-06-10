import { Component, OnInit } from '@angular/core';
import { Pagos } from 'src/app/models/pago.model';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public pago: Pagos[] = []

  constructor(private pagoService: PagoService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.cargarPagos()
  }

  cargarPagos (){   
    
    this.loginService.validarToken()
    this.pagoService.obtenerCobros( )
    .subscribe ( (cobros: any) => {
      console.log('resultado: ', cobros)
      this.pago = cobros
     
    })
  }

}
