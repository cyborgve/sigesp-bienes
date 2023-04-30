import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { Router } from '@angular/router';
import { SigespService, MMoneda, MMonedaConfig } from 'sigesp';
import { MSeguros } from '@core/models/MSeguros';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';
import { SegurosService } from '@core/services/seguros.service';



@Component({
  selector: 'app-seguros',
  templateUrl: './seguros.component.html',
  styleUrls: ['./seguros.component.scss']
})
export class SegurosComponent implements OnInit {
  public formSeguro: FormGroup
  public company: MDefinicionesBasicas[]=[];
  public typePolicy:MDefinicionesBasicas[]=[]
  public typeCoverage:MDefinicionesBasicas[]=[]
  public money:MMoneda[]=[]
  public idSeguro:number=0
  public allInsurance:MSeguros[]=[]
  public operacion: string="guardar";
  public codeExits:boolean
  public currency:MMonedaConfig=null
  public montoPoliza:number




  constructor(private router:Router, private sigesp: SigespService,
              private definicionesBasicasService: DefinicionesBasicasService,
              public segurosService: SegurosService) {

    this.formSeguro= new FormGroup({
      codigo: new FormControl("",[Validators.required, Validators.maxLength(10)]),
      denominacion: new FormControl("",[Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
      companniaAseguradora: new FormControl("",[Validators.required]),
      numeroPoliza: new FormControl("",[Validators.required, Validators.maxLength(30),Validators.minLength(3)]),
      tipoPoliza: new FormControl("",[Validators.required]),
      montoPoliza: new FormControl(),
      coberturaAdicional: new FormControl(),
      monedaPoliza: new FormControl("",[Validators.required]),
      monedaSecundaria: new FormControl(),
      fechaInicio: new FormControl("",[Validators.required]),
      fechaFin: new FormControl("",[Validators.required]),
      tipoCobertura: new FormControl("",[Validators.required]),
      descripcion: new FormControl("",[Validators.required, Validators.maxLength(200),Validators.minLength(3)]),
      responsabilidadCivil: new FormControl(),
    })
   }

  ngOnInit() {
    this.getCurrency();
    this.getBasicDefinition()
    this.getMoney()
    this.getAllInsurance()
    this.formSeguro.get('companniaAseguradora').setValue(0)
    this.formSeguro.get('tipoPoliza').setValue(0)
    this.formSeguro.get('monedaPoliza').setValue('0')
    this.formSeguro.get('monedaSecundaria').setValue('0')
    this.formSeguro.get('tipoCobertura').setValue(0)
  }

  public getBasicDefinition(){
    var tipo:string="5"
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp=>{
        this.company=resp.data
    })

    tipo="14"
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp=>{
        this.typeCoverage=resp.data
    })  
    tipo="22"
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp=>{
        this.typePolicy=resp.data
    })   

  }

  public getMoney(){
    this.sigesp.getMonedas().subscribe(resp=>{
      this.money=resp
    })
  }

  public exit(){
    this.router.navigate([''])
  }

  public getCurrency(){
    this.sigesp.getCurrentCurrency().subscribe((res) => {
      this.currency = res.data;
    })
  }


  public inicializar(){
    this.formSeguro.reset()
    this.idSeguro=0
    this.operacion="guardar" 
    this.getAllInsurance()
    this.formSeguro.get('companniaAseguradora').setValue(0)
    this.formSeguro.get('tipoPoliza').setValue(0)
    this.formSeguro.get('monedaPoliza').setValue('0')
    this.formSeguro.get('monedaSecundaria').setValue('0')
    this.formSeguro.get('tipoCobertura').setValue(0)

  }

  public newInsurance(){
    if (this.formSeguro.valid) {
      if (this.operacion=="guardar"){
          this.saveInsurance ()
      } else if (this.operacion=="actualizar"){ 
          this.updateInsurance()
      }
    } else {this.sigesp.showToastSuccess("Hay campos vacios o su formato es invalido")}
  }

  public getAllInsurance(){
    this.segurosService.getAllInsurance().subscribe(resp=>{
      this.allInsurance=resp.data
    })
  }


  public validateCode(event:any){
    if (this.idSeguro==0){
      let valorInput =(<HTMLInputElement>event.target).value
      let i = this.allInsurance.findIndex(e=>{
        return (e.codigoSeguro.trim())== valorInput.trim()
      })
      if (i>=0){
        this.sigesp.showToastError("El código ya esta registrado")
        this.formSeguro.get('codigo').reset()
        this.codeExits=false
      } else this.codeExits= true
    }
  }

  public saveInsurance(){
    this.segurosService.saveInsurance(this.formSeguro,this.idSeguro).subscribe((resp:any)=>{
      if (resp.success){
        if (resp.data.length>0){
          this.sigesp.showToastSuccess("Seguro registrada con éxito")
          this.inicializar()
        } else if (resp.data.length==0) {
          this.sigesp.showToastError(resp.message)
        }      
      } else this.sigesp.showToastError(resp.message)     
    })
  }


  public updateInsurance(){
    this.segurosService.updateInsurance(this.formSeguro, this.idSeguro).subscribe((resp:any)=>{
      if (resp.success){
        if (resp.data){
          this.sigesp.showToastSuccess("Seguro ractualizada con éxito")
          this.inicializar()
        } else  {
          this.sigesp.showToastError(resp.message)
        }      
      } else this.sigesp.showToastError(resp.message)     
    })
  }

  public deleteInsurance(){ 
    this.sigesp.openDialogConfirm("Eliminar el Seguro","Esta seguro de eliminar el seguro?").then(resp=>{
      if (resp){
        this.segurosService.deleteInsurance(this.idSeguro).subscribe((resp: any)=> {
          if (resp.data){
            this.sigesp.showToastSuccess("Seguro eliminada con éxito")
            this.inicializar()
          } else  this.sigesp.showToastError("La marca no puede ser eliminada")
        })     
      }
    })
  }



  public openCatSeguros(){
    this.inicializar()
    let tittle= "Catálogo Seguros"
    let nameColummnas= ['Código', 'Denominación']
    let columnas = ['codigoSeguro','denominacionSeguro']
    if (this.allInsurance.length>0){
      this.sigesp.openCatalogoGenerico(columnas,tittle,this.allInsurance,nameColummnas).then((res:MSeguros)=>{
        if(res !=null) {
          this.formSeguro.get('codigo').setValue(res.codigoSeguro)
          this.formSeguro.get('denominacion').setValue(res.denominacionSeguro) 
          this.formSeguro.get('companniaAseguradora').setValue(res.idAseguradora)
          this.formSeguro.get('numeroPoliza').setValue(res.poliza)
          this.formSeguro.get('tipoPoliza').setValue(res.idTipoPoliza)
          this.montoPoliza= res.montoAsegurado
          this.formSeguro.get('montoPoliza').setValue(res.montoAsegurado)
          this.formSeguro.get('monedaPoliza').setValue(res.codigoMoneda.toString())
          let moneda=res.monedaSecundaria.toString()
          if(moneda=="NaN"){this.formSeguro.get('monedaSecundaria').setValue("0")
          } else {this.formSeguro.get('monedaSecundaria').setValue(moneda)}
          this.formSeguro.get('fechaInicio').setValue(res.fechaInicioPoliza)
          this.formSeguro.get('fechaFin').setValue(res.fechaFinPoliza)
          this.formSeguro.get('responsabilidadCivil').setValue(res.estatusResposabilidadCivil)
          this.formSeguro.get('tipoCobertura').setValue(res.idTipCobertura)
          this.formSeguro.get('descripcion').setValue(res.descripcionCobertura)
          let valor=res.coberturaAdicional.toString()
          if(valor=="NaN" || valor=="0"){this.formSeguro.get('coberturaAdicional').reset
          } else {this.formSeguro.get('coberturaAdicional').setValue(res.coberturaAdicional)}
          this.idSeguro=res.idSeguro          
          this.operacion="actualizar"
        }
      }) 
    }  

  }
}
