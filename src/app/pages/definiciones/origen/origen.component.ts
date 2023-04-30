import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { SigespService, MProviderBeneficiary } from 'sigesp';
import { ModoOrigen, FormaAquisicion } from '@core/models/MOrigen';
import { OrigenService } from '@core/services/origen.service';
import { MOrigen } from '@core/models/MOrigen';
import *as moment from 'moment';


@Component({
  selector: 'app-origen',
  templateUrl: './origen.component.html',
  styleUrls: ['./origen.component.scss']
})
export class OrigenComponent implements OnInit {
  public formOrigen: FormGroup
  public definitionBasic:MDefinicionesBasicas[]=[]
  public modoOrigen=ModoOrigen
  public FormaAdquisicion=FormaAquisicion
  public formaAdquisicion=FormaAquisicion


  public denominacion: any;
  public valor: number;
  public idOrigin:number;
  public operacion:string="guardar"
  public allOrigin:MOrigen[]=[]
  public codeExists: boolean;
  public provider:MProviderBeneficiary[]=[]
  public idProveedor: number=0;


  constructor(private router:Router, 
              private sigesp: SigespService,
              private origenService: OrigenService) { 
   this.formOrigen= new FormGroup({   
    codigoOrigen: new FormControl ("",[Validators.required, Validators.maxLength(10), Validators.minLength(1)]),
    fechaOrigen: new FormControl(" ",[Validators.required]),
    fechaAdquisicion: new FormControl(" ",[Validators.required]),    
    modoAdquisicion: new FormControl(" ",[Validators.required]),
    formaAdquisicion: new FormControl(" ",[Validators.required]),
    fechaFormaAdquisicion: new FormControl(" ",[Validators.required]),
    numeroFormaAdquisicion: new FormControl("",[Validators.required, Validators.maxLength(30), Validators.minLength(1)]),
    nombreFormaAdquisicion: new FormControl("",[Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
    beneficiarioCedente: new FormControl("",[Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
    beneficiarioReceptor: new FormControl("",[Validators.required, Validators.maxLength(100), Validators.minLength(1)]),
    fechaFactura: new FormControl(),
    numeroFactura: new FormControl("",[Validators.maxLength(30), Validators.minLength(5)]),
    proveedor: new FormControl(),
    nombrePropietarioAnterior: new FormControl("",[Validators.required, Validators.maxLength(100), Validators.minLength(5)]), 
    tomo: new FormControl("",[Validators.maxLength(15), Validators.minLength(1)]),
    folio: new FormControl("",[Validators.maxLength(6), Validators.minLength(1)]),
    observacion: new FormControl("",[Validators.maxLength(250)])   

   })

  }

  ngOnInit() {
    this.getAllOrigin()
  }

  public inicializar(){
    this.formOrigen.reset()
    this.idOrigin=0
    this.operacion="guardar"
    this.idProveedor=0
    this.getAllOrigin()
  }

  public getAllOrigin(){
    this.origenService.getAllOrigin().subscribe(resp=>{
      this.allOrigin=resp.data
    })
  }

  public newOrigin(){
    if (this.formOrigen.valid) {
      if (this.operacion=="guardar"){
         this.saveOrige()
      } else if (this.operacion=="actualizar") {
          this.updateOrigen()
      }
    } else {this.sigesp.showToastSuccess("Hay campos vacios o su formato es invalido")}
  }




  public openCatProveedores(){
    let tittle= "Catálogo de Origen"
    let nameColummnas= ['Rif', 'Nombre']
    let columnas = ['rif','name']

    this.sigesp.getProvidersAndBeneficiaries().subscribe(resp=>{
      this.provider=resp.data.filter((e)=>e.status==1)
      this.sigesp.openCatalogoGenerico(columnas,tittle,this.provider,nameColummnas).then((resp:MProviderBeneficiary)=>{
        this.formOrigen.get('proveedor').setValue(resp.rif)
        this.idProveedor= resp.id
      })    
    })
    
  }

  public acquisitionform(event:any){
    this.formaAdquisicion = this.FormaAdquisicion.filter((e)=>e.tipo==parseInt(event.value))   
  }

  public selectAcquisition(event:any){
    this.valor=parseInt(event.value)
  }

 
 

  public saveOrige(){
    this.origenService.saveOrigin(this.formOrigen, this.idOrigin, this.idProveedor).subscribe((resp:any)=>{
      if (resp.data.length>0){
        this.sigesp.showToastSuccess("Origen guardada con éxito")
        this.inicializar()
      } else  this.sigesp.showToastError(resp.message)

    })
  }

  public updateOrigen(){
    this.origenService.updateOrigin(this.formOrigen, this.idOrigin, this.idProveedor).subscribe((resp:any)=>{
      if (resp.data){
        this.sigesp.showToastSuccess("Origen actualizada con éxito")
        this.inicializar()
      } else  this.sigesp.showToastError(resp.message)

    })
  }

  public deleteOrigen(){
    this.sigesp.openDialogConfirm("Eliminar La causa de movimiento","Esta seguro de eliminar la Causa de Movimiento?").then(resp=>{
      if (resp){
        this.origenService.deleteOrigin(this.idOrigin).subscribe((resp: any)=> {
          if (resp.data){
            this.sigesp.showToastSuccess("Origen eliminada con éxito")
            this.inicializar()
          } else  this.sigesp.showToastSuccess(resp.message)
        })     
      }
    })

  }

  public openCatalogo(){
    this.inicializar()
    let tittle= "Catálogo de Origen"
    let nameColummnas= ['Código', 'Fecha del Origen']
    let columnas = ['codigoOrigen','fechaOrigen']
   if (this.allOrigin.length>0){
      this.sigesp.openCatalogoGenerico(columnas,tittle,this.allOrigin,nameColummnas).then((resp:MOrigen)=>{
        if(resp !=null) {
          console.log(resp)
          this.formOrigen.get('codigoOrigen').setValue(resp.codigoOrigen)
          this.formOrigen.get('fechaOrigen').setValue(resp.fechaOrigen)
          this.formOrigen.get('fechaAdquisicion').setValue(resp.fechaAdquisicion)
          this.formOrigen.get('modoAdquisicion').setValue(resp.modoAquisicion)
          this.formOrigen.get('formaAdquisicion').setValue(resp.formaAdquisicion)
          this.formOrigen.get('fechaFormaAdquisicion').setValue(resp.fechaFormaAdquisicion)
          this.formOrigen.get('numeroFormaAdquisicion').setValue(resp.numeroFormaAdquisicion)
          this.formOrigen.get('nombreFormaAdquisicion').setValue(resp.nombreFormaAdquisicion)
          this.formOrigen.get('fechaFactura').setValue(resp.fechaFactura)
          this.formOrigen.get('numeroFactura').setValue(resp.numeroFactura)
          this.formOrigen.get('proveedor').setValue(resp.rifProveedor)
          this.formOrigen.get('tomo').setValue(resp.tomo)
          this.formOrigen.get('folio').setValue(resp.folio)
          this.formOrigen.get('nombrePropietarioAnterior').setValue(resp.nomprePropietarioAnterior)
          this.formOrigen.get('beneficiarioCedente').setValue(resp.nombreBeneficiarioCedente)
          this.formOrigen.get('beneficiarioReceptor').setValue(resp.nombreBeneficiarioReceptor)
          this.formOrigen.get('observacion').setValue(resp.observacion)
          this.idProveedor=resp.idProveedor
          if (resp.formaAdquisicion==3){
            this.valor=3
          }          
          if (resp.formaAdquisicion==16){
            this.valor=16
          }
          this.idOrigin=resp.idOrigen
          this.operacion="actualizar"         
        }
      }) 
    }  

  }

  public validarCodigo(event,campo){
    if (this.idOrigin==0){
      let valorInput = (<HTMLInputElement>event.target).value;
      let i = this.allOrigin .findIndex(e => {
        return (e.codigoOrigen.trim() == valorInput.trim())
      })
      if(i>=0){
        this.sigesp.showToastError("El código ya esta registrado")
        this.formOrigen.get('codigoOrigen').reset()
        this.codeExists=false;
      } else {this.codeExists=true;}
    }
    
  }


  public exit(){
    this.router.navigate([''])
  }



}
