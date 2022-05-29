import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagos } from 'src/app/models/pago.model';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  public pagoForm: FormGroup;
  public pago: Pagos[] = []
  public cid: string

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.cid = this.activatedRoute.snapshot.params.id
    const fecha = new Date()

    this.pagoForm = this.fb.group({
      montoBs: ['', Validators.required],
      montoSus: ['', Validators.required],
      fecha: [fecha, Validators.required],
      cuenta: [ this.cid, Validators.required]
    })
  }

  crearPago() {

    console.log(this.pagoForm.value)
    this.pagoService.crearPago( this.pagoForm.value)
    .subscribe( resp =>{
       console.log(resp)
       //this.router.navigateByUrl(`/dashboard/cuenta/${ resp.cuenta._id}`)
     })
  }

}
