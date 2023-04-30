import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SigespService } from 'sigesp';
import { CausaMovimientoService } from '@core/services/causa-movimiento.service';
import { MCausaMovimiento } from '@core/models/MCausaMovimiento';


@Component({
  selector: 'app-causa-movimiento',
  templateUrl: './causa-movimiento.component.html',
  styleUrls: ['./causa-movimiento.component.scss']
})
export class CausaMovimientoComponent implements OnInit {
  public formCausaMovimiento: FormGroup;
  public idCausa: number;
  public operacion: string="guardar";
  public AllCause: MCausaMovimiento[]=[];
  public codeExists:boolean;

  constructor(private router: Router, private sigesp:SigespService, private causaMovimientoService:CausaMovimientoService) {
      this.formCausaMovimiento= new FormGroup({
        denominacion: new FormControl("",[Validators.required, Validators.maxLength(250), Validators.minLength(3)]),
        codigo: new FormControl ("",[Validators.required, Validators.maxLength(3), Validators.minLength(1)]),
        tipoCausa: new FormControl(),
        estatusContabilidad: new FormControl(),
        estatusPresupuesto: new FormControl()  
      })
   }

  ngOnInit() {
    this.getAllCauseMovement()
  }

  public inicializar(){
    this.formCausaMovimiento.reset()
    this.idCausa=0
    this.operacion="guardar"   
    this.getAllCauseMovement()
  }
  
  public exit(){
    this.router.navigate([''])
  }

  public getAllCauseMovement(){
    this.causaMovimientoService.getAllCauseMovement().subscribe(resp=>{
      this.AllCause=resp.data
    })
  }

  public newCauseMovement(){
    if (this.formCausaMovimiento.valid) {
      if (this.operacion=="guardar"){
        this.saveCauseMovement ()
      } else if (this.operacion=="actualizar") this.updateCauseMovement()
    } else {this.sigesp.showToastSuccess("Hay campos vacios o su formato es invalido")}
  }



  public validarCodigo(event,campo){
    if (this.idCausa==0){
      let valorInput = (<HTMLInputElement>event.target).value;
      let i = this.AllCause .findIndex(e => {
        return (e.codigoCausa.trim() == valorInput.trim())
      })
      if(i>=0){
        this.sigesp.showToastError("El código ya esta registrado")
        this.formCausaMovimiento.get('codigo').reset()
        this.codeExists=false;
      } else {this.codeExists=true;}
    }
    
  }

  public saveCauseMovement(){
    this.causaMovimientoService.saveCauseMovement(this.formCausaMovimiento).subscribe((resp:any)=>{
      if (resp.data.length>0){
        this.sigesp.showToastSuccess("Causa de movimiento guardada con éxito")
        this.inicializar()
      } else  this.sigesp.showToastError(resp.message)

    })
  }

  public updateCauseMovement(){
    this.causaMovimientoService.updateCauseMovement(this.formCausaMovimiento, this.idCausa).subscribe((resp:any)=>{
      if (resp.data){
        this.sigesp.showToastSuccess("Causa de movimiento actualizada con éxito")
        this.inicializar()
      } else  this.sigesp.showToastError(resp.message)

    })
  }


  public deleteCauseMovement(){
    this.sigesp.openDialogConfirm("Eliminar La causa de movimiento","Esta seguro de eliminar la Causa de Movimiento?").then(resp=>{
      if (resp){
        this.causaMovimientoService.deleteCauseMovement(this.idCausa).subscribe((resp: any)=> {
          if (resp.data){
            this.sigesp.showToastSuccess("Causa de movimiento eliminada con éxito")
            this.inicializar()
          } else  this.sigesp.showToastSuccess(resp.message)
        })     
      }
    })
  }

  public openCatalogo (){
    this.inicializar()
    let tittle= "Catálogo de Causa de Movimiento"
    let nameColummnas= ['Código', 'Causa de Movimiento']
    let columnas = ['codigoCausa','denominacionCausa']
   if (this.AllCause.length>0){
      this.sigesp.openCatalogoGenerico(columnas,tittle,this.AllCause,nameColummnas).then((resp:MCausaMovimiento)=>{
        if(resp !=null) {
          this.formCausaMovimiento.get('codigo').setValue(resp.codigoCausa)
          this.formCausaMovimiento.get('denominacion').setValue(resp.denominacionCausa)  
          this.formCausaMovimiento.get('tipoCausa').setValue(resp.tipoCausa)
          if(resp.estatusAfectacionContable==1){
            this.formCausaMovimiento.get('estatusContabilidad').setValue(true)
          } else  this.formCausaMovimiento.get('estatusContabilidad').setValue(false)
          if(resp.estatusAfectacionPresupuestaria==1){
            this.formCausaMovimiento.get('estatusPresupuesto').setValue(true)
          } else  this.formCausaMovimiento.get('estatusPresupuesto').setValue(false)
          this.idCausa=resp.idCausa
          this.operacion="actualizar"
        }
      }) 
    }  
  }
}
