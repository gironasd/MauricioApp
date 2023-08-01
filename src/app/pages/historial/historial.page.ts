import { Component, OnInit } from '@angular/core';
import { Pagos } from 'src/app/models/pago.model';
import { UsuarioMovil } from 'src/app/models/usuario-movil.model';
import { LoginService } from 'src/app/services/login.service';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  public pago: Pagos[] = []
  public id: any
  public usuario: UsuarioMovil

  constructor(private pagoService: PagoService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.usuarioActual()
    this.cargarPagos()
    console.log('por fin ', this.loginService.usuario)
  }

  usuarioActual() {
    this.loginService.validarToken()
        .subscribe(resp => {
          this.id = this.loginService.usuario._id          
        })
  }

  cargarPagos (){     
    
    this.pagoService.obtenerCobros( )
    .subscribe ( (cobros: any) => {
      console.log('resultado: ', cobros)
      this.pago = cobros
      
    })
  }

}
