import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ActionSheetController, AlertController, ModalController, Platform } from '@ionic/angular';
import { Pagos } from 'src/app/models/pago.model';
import { PagoService } from 'src/app/services/pago.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  public pagoForm: FormGroup;
  public pago: Pagos[] = []
  public cid: string
  public total: number
  presentingElement = undefined;

  reciboForm: FormGroup
  pdfObj = null
  base64Image = null
  photoPreview = null
  logodata = null

  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private pit: Platform,
    private http: HttpClient,
    private alert: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
    //private fileOpener: FileOpener
  ) { }

  ngOnInit() {

    this.cid = this.activatedRoute.snapshot.params.id
    const fecha = new Date()

    
    

    this.pagoForm = this.fb.group({
      montoBs: [0],
      montoSus: [0],
      cambio: [0],
      total: [this.total],
      fecha: [fecha, Validators.required],
      cuenta: [ this.cid, Validators.required]
    })

    this.presentingElement = document.querySelector('.ion-page');

    this.reciboForm = this.fb.group({
      showLogo: true,
      from: 'Daniel',
      to: 'Max',
      text: 'Test'
    })
  }

  crearPago() {
    

    this.pagoService.crearPago( this.pagoForm.value)
    .subscribe( resp =>{
      this.router.navigateByUrl(`/cuenta/${ this.cid }`)
     })
     //const formValue = this.pagoForm.value
     //this.createPDF()
     
     
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  cancel() {
    return this.modalCtrl.dismiss(null, 'Cerrar');
  }

  loadLocalAssetToBase64(){

  }

  crearPDF(docDefinition){
   
    
    console.log(docDefinition)
  }

  createPDF(){
    
    console.log(this.pagoForm.value.montoBs)
    const pdfDefinition: any = {
      pageSize: 'RA3',
      content: [
        {
          text: this.pagoForm.value.montoBs,
        }
      ]
    }
 
    const pdf = pdfMake.createPdf(pdfDefinition);
    console.log(pdf)
    pdf.open();
 
  }

 

}
