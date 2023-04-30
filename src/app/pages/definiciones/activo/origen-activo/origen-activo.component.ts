import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';
import { SigespService } from 'sigesp';
import { FormGroup, FormControl } from '@angular/forms';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { MActivo } from '@core/models/MActivo';
import { MOrigen, FormaAquisicion, ModoOrigen } from '@core/models/MOrigen';


@Component({
  selector: 'app-origen-activo',
  templateUrl: './origen-activo.component.html',
  styleUrls: ['./origen-activo.component.scss']
})
export class OrigenActivoComponent implements OnInit {
  public formOrigen: FormGroup
  public definitionBasic:MDefinicionesBasicas[]=[]
  public FormaAdquisicion=FormaAquisicion
  public formaAdquisicion=FormaAquisicion
  public valor: number;
  public modoOrigen=ModoOrigen


  @Output() activoOrigen = new EventEmitter<any>();
  @Input()  origin:MOrigen[]=[]
  @Input()  dataGeneral:MActivo
  @Input() public dataInicilizar:boolean=false



  constructor(private router:Router, 
              private deficiones:DefinicionesBasicasService,
              private sigesp: SigespService) {

   this.formOrigen= new FormGroup({
      idOrigen: new FormControl(),
      fechaOrigen: new FormControl(),
      fechaAdquisicion: new FormControl(),    
      modoAdquisicion: new FormControl(),
      formaAdquisicion: new FormControl(),
      fechaFormaAdquisicion: new FormControl(),
      numeroFormaAdquisicion: new FormControl(),
      nombreFormaAdquisicion: new FormControl(),
      beneficiarioCedente: new FormControl(),
      beneficiarioReceptor: new FormControl(),
      fechaFactura: new FormControl(),
      numeroFactura: new FormControl(),
      proveedor: new FormControl(),
      nombrePropietarioAnterior: new FormControl(), 
      tomo: new FormControl(),
      folio: new FormControl(),
      observacion: new FormControl() 
   })

  }

  ngOnInit() {
    this.showData()
    this.inicializar()

  }

  ngOnChanges(){
    this.dataGeneral
    this.dataInicilizar
    this.showData()
    if (this.dataInicilizar){
      this.inicializar()
    }
  }

  public inicializar(){
    this.formOrigen.reset()
  }


  public showData(){
    if (this.dataGeneral != undefined){     
      let idOrigin=this.dataGeneral.idOrigen
      let dataOrigin= this.origin.filter((e)=>(e.idOrigen==idOrigin))
      this.assignData(dataOrigin[0]) 
    }
  }
  
  public modifyValue(event: any, campo: string){
    let valorInput = event
    let datos = {valorInput, campo};
    this.activoOrigen.emit(datos);
  }


 
  public openCatalogoOrigin(){
    this.valor=0
    let tittle= "Catálogo de Origen"
    let nameColummnas= ['Código', 'Fecha del Origen']
    let columnas = ['codigoOrigen','fechaOrigen']
   if (this.origin.length>0){
      this.sigesp.openCatalogoGenerico(columnas,tittle,this.origin,nameColummnas).then((resp:MOrigen)=>{
        if(resp !=null) {
            this.assignData(resp)          
          if (resp.formaAdquisicion==3){
            this.valor=3
          }          
          if (resp.formaAdquisicion==16){
            this.valor=16
          }
        }
      }) 
    }  

  }

  public acquisitionform(event:any){
    this.formaAdquisicion = this.FormaAdquisicion.filter((e)=>e.tipo==parseInt(event.value))   
  }

  public assignData(data:any){
    this.formOrigen.get('idOrigen').setValue(data.codigoOrigen)
    this.modifyValue(data.idOrigen,'idOrigen')
    this.formOrigen.get('fechaOrigen').setValue(data.fechaOrigen)
    this.formOrigen.get('fechaAdquisicion').setValue(data.fechaAdquisicion)
    this.formOrigen.get('modoAdquisicion').setValue(data.modoAquisicion)
    this.formOrigen.get('formaAdquisicion').setValue(data.formaAdquisicion)
    this.formOrigen.get('fechaFormaAdquisicion').setValue(data.fechaFormaAdquisicion)
    this.formOrigen.get('numeroFormaAdquisicion').setValue(data.numeroFormaAdquisicion)
    this.formOrigen.get('nombreFormaAdquisicion').setValue(data.nombreFormaAdquisicion)
    this.formOrigen.get('fechaFactura').setValue(data.fechaFactura)
    this.formOrigen.get('numeroFactura').setValue(data.numeroFactura)
    this.formOrigen.get('proveedor').setValue(data.rifProveedor)
    this.formOrigen.get('tomo').setValue(data.tomo)
    this.formOrigen.get('folio').setValue(data.folio)
    this.formOrigen.get('nombrePropietarioAnterior').setValue(data.nomprePropietarioAnterior)
    this.formOrigen.get('beneficiarioCedente').setValue(data.nombreBeneficiarioCedente)
    this.formOrigen.get('beneficiarioReceptor').setValue(data.nombreBeneficiarioReceptor)
    this.formOrigen.get('observacion').setValue(data.observacion) 
  }

  
}
