import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public pago: Pagos[] = []

  constructor(
    private fb: FormBuilder,
    private cuentaService: CuentaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
        console.log( ciudad )
        this.cuentaSeleccionada = cuentas
        this.cuentaForm.setValue({ nombres, apellidos, email, ciudad})
       
      })
  }

  cargarPagos( id: string ) {

    this.cuentaService.obtenerPagosporCuenta( id )
        .subscribe ( (pagocuentas: any) => {
          console.log(pagocuentas)
          this.pago = pagocuentas
        })
  }
}
