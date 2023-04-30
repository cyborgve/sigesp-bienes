import { MActivo } from '@core/models/MActivo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { MMoneda, SigespService } from 'sigesp';
import { MSeguros } from '@core/models/MSeguros';

@Component({
  selector: 'app-seguro-activos',
  templateUrl: './seguro-activos.component.html',
  styleUrls: ['./seguro-activos.component.scss']
})
export class SeguroActivosComponent implements OnInit {
  public formSeguro: FormGroup
  @Input() money: MMoneda[]=[]
  @Input() allInsurance:MSeguros[]=[]
  @Input() dataGeneral:MActivo
  @Input() typePolicy:MDefinicionesBasicas[]=[]
  @Input() insuranceCompany:MDefinicionesBasicas[]=[]
  @Input() typeCoverage:MDefinicionesBasicas[]=[] 
  @Input() dataInicilizar:boolean=false
  @Output() activoSeguro = new EventEmitter<any>();
  public status: boolean=false;

  constructor(private router:Router, private sigesp: SigespService) {

    this.formSeguro= new FormGroup({
      estatusAsegurado: new FormControl(),
      codigo: new FormControl(),
      denominacion: new FormControl(),
      companniaAseguradora: new FormControl(),     
      numeroPoliza: new FormControl(),
      tipoPoliza: new FormControl(),
      montoPoliza: new FormControl(),
      fechaInicio: new FormControl(),
      fechaFin: new FormControl(),
      monedaPoliza: new FormControl(),
      monedaSecundaria: new FormControl(),
      coberturaAdicional: new FormControl(),
      tipoCobertura: new FormControl(),
      descripcion: new FormControl(),      
      responsabilidadCivil: new FormControl()
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
    this.formSeguro.reset()
    this.status=false
  }


  public showData(){
    if (this.dataGeneral != undefined){
      if (this.dataGeneral.estatusAsegurado==1){
        this.status=true
        this.formSeguro.get('estatusAsegurado').setValue(true)
        let idSeguro=this.dataGeneral.idSeguro
        let dataSeguro= this.allInsurance.filter((e)=>(e.idSeguro==idSeguro))
        this.assignData(dataSeguro[0]) 
      } else  this.formSeguro.get('estatusAsegurado').setValue(false)
     
    }
  }


  public getStatusSlide(event:any, campo:string){
    let valor:number;
    this.status=event.checked
    if (this.status) { valor=1} else {valor=0}
    this.modifyValue(valor,campo)
  }

  public modifyValue(valor: any, campo: string){
    let valorInput = valor;
    let datos = {valorInput, campo};
    this.activoSeguro.emit(datos);
  }


  public openSeguros(){
    let tittle= "Catálogo Seguros"
    let nameColummnas= ['Código', 'Denominación']
    let columnas = ['codigoSeguro','denominacionSeguro']
    if (this.allInsurance.length>0 && this.status){
      this.sigesp.openCatalogoGenerico(columnas,tittle,this.allInsurance,nameColummnas).then((res:MSeguros)=>{
        if(res !=null) {
         this.assignData(res)
       }
     }) 
    }
  }  

  public assignData(data){
    this.formSeguro.get('codigo').setValue(data.codigoSeguro)
    this.modifyValue(data.idSeguro,'idSeguro')
    this.formSeguro.get('denominacion').setValue(data.denominacionSeguro) 
    this.formSeguro.get('companniaAseguradora').setValue(data.idAseguradora)
    this.formSeguro.get('numeroPoliza').setValue(data.poliza)
    this.formSeguro.get('tipoPoliza').setValue(data.idTipoPoliza)
    this.formSeguro.get('montoPoliza').setValue(data.montoAsegurado)
    this.formSeguro.get('monedaPoliza').setValue(data.codigoMoneda.toString())
    let moneda=data.monedaSecundaria.toString()
    if(moneda=="NaN"){this.formSeguro.get('monedaSecundaria').setValue("0")
    } else {this.formSeguro.get('monedaSecundaria').setValue(moneda)}
    this.formSeguro.get('fechaInicio').setValue(data.fechaInicioPoliza)
    this.formSeguro.get('fechaFin').setValue(data.fechaFinPoliza)
    this.formSeguro.get('dataponsabilidadCivil').setValue(data.estatusdataposabilidadCivil)
    this.formSeguro.get('tipoCobertura').setValue(data.idTipCobertura)
    this.formSeguro.get('descripcion').setValue(data.descripcionCobertura)
    let valor=data.coberturaAdicional.toString()
    if(valor=="NaN" || valor=="0"){this.formSeguro.get('coberturaAdicional').reset
    } else {this.formSeguro.get('coberturaAdicional').setValue(data.coberturaAdicional)}
  }

}
