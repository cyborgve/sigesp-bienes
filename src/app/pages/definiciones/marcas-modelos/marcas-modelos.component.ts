import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { MarcaModeloService } from '@core/services/marca-modelo.service';
import { Router } from '@angular/router';
import { SigespService } from 'sigesp';
import { MMarcas, MModelo } from '@core/models/MMarcaModelo';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';
import { ThrowStmt } from '@angular/compiler';




@Component({
  selector: 'app-marcas-modelos',
  templateUrl: './marcas-modelos.component.html',
  styleUrls: ['./marcas-modelos.component.scss']
})
export class MarcasModelosComponent implements OnInit {
  public formMarca:FormGroup
  public operacion:string="guardar"
  public allBrand:MMarcas[]=[]  
  public idMarca:number=-1;
  public allModels:MModelo[]=[]
  public allModelBrand:MModelo[]=[]
  public delModels:MModelo[]=[]
  public codeExits:boolean=false
  public codeDuplicate:boolean=false 
  public brandType:MDefinicionesBasicas[]=[]

  public displayedColumns: string[]=['select','codigo', 'denominacion']
  public modelsBrand = new MatTableDataSource<MModelo>(this.allModelBrand)
  public selection = new SelectionModel<MModelo>(true,[])
  dataNullModels: boolean;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private router: Router, private sigesp:SigespService,
              private marcaModelService: MarcaModeloService,
              private definicionesBasicasService: DefinicionesBasicasService) {

    this.formMarca= new FormGroup ({
      denominacion: new FormControl ('',[Validators.maxLength(60), Validators.minLength(3), Validators.required]),
      codigo: new FormControl ('',[Validators.maxLength(3), Validators.minLength(1),Validators.required]),
      tipoMarca: new FormControl("",[Validators.required])
    })


   
  }

  ngOnInit() {
    this.getAllBrand()
    this.formMarca.get('tipoMarca').setValue(0)
    this.getBrandType()
  }

  public inicializar(){
    this.formMarca.reset()    
    this.allModelBrand=[]
    this.modelsBrand.data=[]
    this.selection['_selected']=[]
    this.idMarca=-1
    this.operacion="guardar"
    this.getAllBrand()   
    this.formMarca.get('tipoMarca').setValue(0)
    this.getAllBrand()
 
  }

  public exit(){
    this.router.navigate([''])    
  }

  public newBrand(){
   
    if (this.formMarca.valid){
      if (this.modelsBrand.data.length>0){
        this.validateDuplicates();
        this.validateNullModels()
        if (!this.codeDuplicate && !this.dataNullModels ){
          if (this.operacion=="guardar"){
            this.saveBrand()  
          } else if (this.operacion=="actualizar"){
            this.updateBrand()
          } 
             
       } else if (this.dataNullModels==true){
          this.sigesp.showToastError('Hay modelos con campos vacios')       
       } else if (this.codeDuplicate){
           this.sigesp.showToastError('Existen codigos de modelos duplicados')
       }

      } else {
        if (this.operacion=="guardar"){
          this.saveBrand ()  
        } else if (this.operacion=="actualizar"){
          this.updateBrand()
        } 
    }
    
  } else this.sigesp.showToastSuccess("Hay campos vacios o su formato es invalido") 
}

  public getAllBrand(){
    this.marcaModelService.getAllBrand().subscribe(resp=>{
      this.allBrand=resp.data
    })
  }

  public getBrandType(){
    let tipo="20"
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp=>{
      this.brandType=resp.data
    })
  }

  public saveBrand(){
    this.marcaModelService.saveBrand(this.formMarca, this.modelsBrand.data).subscribe((resp:any)=>{
      if (resp.success){
        if (resp.data.length>0){
          this.sigesp.showToastSuccess("Marca registrada con éxito")
          this.inicializar()
        } else if (resp.data.length==0) {
          this.sigesp.showToastError(resp.message)
        }      
      } else this.sigesp.showToastError(resp.message)     
    })
  }

  public updateBrand(){
    if (this.idMarca==0){
      this.sigesp.showToastError("La data por defecto no puede ser Modificada")       
    } else if (this.idMarca>0) {
      this.marcaModelService.updateBrand(this.formMarca, this.idMarca, this.modelsBrand.data).subscribe((resp:any)=>{
        if (resp.success){
          if (resp.data){
            this.sigesp.showToastSuccess("Marca ractualizada con éxito")
            this.inicializar()
          } else  {
            this.sigesp.showToastError(resp.message)
          }      
        } else this.sigesp.showToastError(resp.message)     
      })
  
    }
  }

  public deleteBrand(){
    if (this.idMarca==0){
      this.sigesp.showToastError("La data por defecto no puede ser Eliminada") 
    } else if (this.idMarca>0){
      this.sigesp.openDialogConfirm("Eliminar la marca","Esta seguro de eliminar marca?").then(resp=>{
        if (resp){
          this.marcaModelService.deleteBrand(this.idMarca).subscribe((resp: any)=> {
            if (resp.data){
              this.sigesp.showToastSuccess("Marca eliminada con éxito")
              this.inicializar()
            } else  this.sigesp.showToastError("La marca no puede ser eliminada")
          })     
        }
      })
  
    }
  }



  public validateCodeBrand(event:any){

   if (this.idMarca==-1){ 
      let valorInput = (<HTMLInputElement>event.target).value;  
      let valido:boolean
      if (valorInput.length>0){
        for (let j=0; j<valorInput.length; j++){
          if (valorInput[j]>='0' && valorInput[j]<="9" ){
            valido= true
          } else {
            valido=false;
            this.sigesp.showToastError('Formato invalido del código')
            break  
          }
        } 
      }
        let i = this.allBrand.findIndex(e=>{
          return (e.codigoMarca)== valorInput.trim()
        })
        if (i>=0){
          this.sigesp.showToastError("El código ya esta registrado")
          this.formMarca.get('codigo').reset()
          this.codeExits=false
        } else this.codeExits= true
    }
  }


  public openCatalog(){
    this.inicializar()
    let tittle= "Catálogo Marcas"
    let nameColummnas= ['Código', 'Denominación']
    let columnas = ['codigoMarca','denominacionMarca']
   if (this.allBrand.length>0){
      this.sigesp.openCatalogoGenerico(columnas,tittle,this.allBrand,nameColummnas).then((resp:MMarcas)=>{
        if(resp !=null) {
          this.formMarca.get('codigo').setValue(resp.codigoMarca)
          this.formMarca.get('denominacion').setValue(resp.denominacionMarca) 
          this.formMarca.get('tipoMarca').setValue(resp.tipoMarca) 
          this.idMarca=resp.idMarca          
          this.operacion="actualizar"
          this.getModels();
        }
      }) 
    }  
  }

  public getModels(){
    this.marcaModelService.getBrandModels(this.idMarca).subscribe(resp=>{
      this.allModelBrand=resp.data
      this.modelsBrand.data=this.allModelBrand
    })
  }

  public aplicarFiltro(valor: string) {
    this.modelsBrand.filter = valor.toLowerCase();
    if (this.modelsBrand.paginator) {
      this.modelsBrand.paginator.firstPage();
    }
  }


  public addModels(){
    let codmodelo= this.getNexCode()  
    let model =new MModelo({
      id_modelo: '-1',
      id_marca:this.idMarca.toString(),
      codmodelo,
      denmodelo:""
    })
    this.allModelBrand.unshift(model)
    this.modelsBrand.data=this.allModelBrand

  }


     //Metodo para obtener el proximo codigo de fuente de financiamiento
     public getNexCode()  {
      let ultimonum:number;
      let codigoSiguiente: string
      let cerosDerecha="0"
      let ultimo:MModelo
      if(this.modelsBrand.data.length==0){
        codigoSiguiente="001"
      } else if(this.modelsBrand.data.length>0){
        this.modelsBrand.data= this.modelsBrand.data.sort((a,b)=>{
          if (a.codigoModelo>b.codigoModelo){return 1}
          if (b.codigoModelo>a.codigoModelo){return-1}
          return 0
        })
        let orden=this.modelsBrand.data.length-1
        ultimo=this.modelsBrand.data[orden];
        ultimonum=parseInt(ultimo.codigoModelo);
        ultimonum=ultimonum+1
        let valor=ultimonum.toString()
        let fin =3-valor.length
        for (let i=1; i<fin; i++){
          cerosDerecha=cerosDerecha+"0"
        }
        codigoSiguiente=cerosDerecha+ultimonum
      }
      return codigoSiguiente   
    }
  


  public delModel(){
    let seguir:boolean=false
    if (this.selection.selected.length>0){
      this.sigesp.openDialogConfirm("Eliminar Modelos", "¿Esta seguro de eliminar los modelos?").then(resp=>{
          if (resp){
            for (let i=0; i<this.selection.selected.length; i++){
              let j= this.modelsBrand.data.findIndex(e=>{
                return (e.codigoModelo.trim()== this.selection.selected[i].codigoModelo.trim())
              })        
              
              if (j>=0){
                let model=this.modelsBrand.data[j]
                if (model.idModelo>0){
                  this.allModelBrand.splice(j,1)
                  this.delModels.push(model)
                  seguir=true
                } else  if (model.idModelo>0){
                    this.allModelBrand.splice(j,1)
                    this.modelsBrand.data=this.allModelBrand
                } else  if (model.idModelo==0){
                  this.sigesp.showToastError("La data por defecto no puede ser Eliminada")
                }
                
              } 

            }
          }

          if (this.delModels.length>0 && seguir){
            this.marcaModelService.deleteModels(this.delModels).subscribe(resp=>{
              if(resp.data) {
                this.sigesp.showToastSuccess("Marca eliminado con éxito")  
                this.modelsBrand.data=this.allModelBrand 
              } 
              else {
                this.sigesp.showToastError(resp.message)
              }
            })
          }
      })
    } 
  }

  public modifyModels(event:any, indice:number, campo:string){
    let valorInput:any;  
    if (campo=="denominacionModelo"){     
        valorInput = (<HTMLInputElement>event.target).value;  
        this.allModelBrand[indice][campo]=valorInput;     
        this.modelsBrand.data=this.allModelBrand  
    }
    if (campo=="codigoModelo" ){
        if (this.modelsBrand.data[indice].idModelo==-1){
          valorInput = (<HTMLInputElement>event.target).value;  
          let j=this.validateCodeModel(valorInput);
          if (j>=0){
            this.sigesp.showToastError("El código ya fue asignado")
          } else {
            this.allModelBrand[indice][campo]=valorInput;     
            this.modelsBrand.data=this.allModelBrand  
          }        
        }      
    }
  }


  public validateDuplicates(){   
    this.codeDuplicate=false
    for (let i=0; i<this.modelsBrand.data.length; i++){
      let code=this.modelsBrand.data[i].codigoModelo
      let codigoDoble = this.modelsBrand.data.filter(e => e.codigoModelo == code);
      if (codigoDoble.length >=2){
        this.codeDuplicate=true
        break;
      } else this.codeDuplicate=false    
    }
  }



  public validateNullModels(){ 
    let i = this.modelsBrand.data.findIndex(e=>{
      return (e.codigoModelo == "") || (e.denominacionModelo=="")
    })       
    if (i >= 1){
        this.dataNullModels=true
    } else this.dataNullModels= false     
  }


  public validateCodeModel(valorInput:any){
    let i = this.modelsBrand.data.findIndex(e => {
      return (e.codigoModelo == valorInput.trim())
     })
     return(i);  
  }


  TodasSeleccionadas() {
    const NumeroFilasSeleccionadas = this.selection.selected.length
    const NumeroFilasExistentes = this.modelsBrand.data.length;
    return NumeroFilasSeleccionadas === NumeroFilasExistentes;
  }
  
  SeleccionTodo() {
    this.TodasSeleccionadas() ? this.selection.clear() : 
    this.modelsBrand.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: MModelo): string {
    if (!row) {
      return `${this.TodasSeleccionadas() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.codigoModelo + 1}`;
  } 



}
