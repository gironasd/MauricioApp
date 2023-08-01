import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cuentas } from 'src/app/models/cuentas.model';
import { Pagos } from 'src/app/models/pago.model';
import { CuentaService } from 'src/app/services/cuenta.service';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  public cuentaForm!: FormGroup;
  public cuenta: Cuentas[] = []
  public cuentaSeleccionada!: Cuentas;
  public cid: string
  public total = []
  public pago: Pagos[] = []

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private nav: NavController
  ) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe( ({id}) => {
      this.cargarCuenta(id)
      this.cargarPagos(id)
    })



    this.cuentaForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.required],
      ciudad: ['', Validators.required]
    })
  }

  cargarCuenta( id: string ){

    this.cid = id

    this.cuentaService.obtenerCuentaById( id )
      .subscribe ( cuentas =>{

        const { nombres, apellidos, email, ciudad } = cuentas
        console.log( '' )
        this.cuentaSeleccionada = cuentas
        this.cuentaForm.setValue({ nombres, apellidos, email, ciudad})
       
      })
  }

  cargarPagos( id: string ) {

    this.cuentaService.obtenerPagosporCuenta( id )
        .subscribe ( (pagocuentas: any) => {
          console.log('pagos ', pagocuentas)
          const bs = pagocuentas.map(p => p.montoBs)
          const cambio = pagocuentas.map(p => p.cambio)
         
          for(var i = 0; i < bs.length; i++){
            this.total[i] =bs[i]/cambio[i];
          }
          console.log('el resultado es: ', this.total)
          this.pago = pagocuentas
        })
  }

  goBackToCuentas() {
    this.nav.navigateBack('/cuentas');
  }
}
