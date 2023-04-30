import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { MSeguros } from '@core/models/MSeguros';

@Injectable({
  providedIn: 'root'
})
export class SegurosService {

  constructor(private http:HttpClient, private sigesp:SigespService) {  }

  public getAllInsurance(){
    return this.http.get(`${this.sigesp.URL}/dao/sbn/seguros_dao.php`,
    {headers: this.sigesp.getHttpHeaders()})
    .pipe(
      map((res:any)=>{
        if(res.success){
          if (res.data != null) {
            res.data=res.data.map(element=> new MSeguros(element));
          } else {
            res.data=[]
          }
      }
        return res
      })
    )
  }

 

  public saveInsurance(formGroup:FormGroup, id:number){
   const body= this.getBody(formGroup,id)   
    return this.http.post(`${this.sigesp.URL}/dao/sbn/seguros_dao.php`, body, {
      headers: this.sigesp.getHttpHeaders()
    }).pipe(  
       map((res: any) => {
          if (res.success) {
            if (res.data != null){
              res.data = res.data.map(element => new MSeguros(element));               
            } else {
              res.data = [];
            }           
          } else {
            res.data = [];
          }
          return res
       })
    )
  }

  public updateInsurance(formGroup:FormGroup, id:number){
    const body= this.getBody(formGroup,id) 
    return this.http.put(`${this.sigesp.URL}/dao/sbn/seguros_dao.php`, body, {
      headers: this.sigesp.getHttpHeaders()
    }).pipe(  
       map((res: any) => {
          if (res.success) {
              res.data = res.data;               
          } else {
            res.data = [];
          }
          return res
       })
    )
  }

  public deleteInsurance(codigo:number){ 
    return this.http.delete(`${this.sigesp.URL}/dao/sbn/seguros_dao.php?codigo=${codigo}`, {
     headers: this.sigesp.getHttpHeaders() 
    })
    .pipe(
      map((res:any) => {
        if (res.success) {
          res.data = res.data;
        } 
        return res
      })
    )
  } 

  public getBody(formGroup:FormGroup,id:number){
    
    let estrescivil=formGroup.get('responsabilidadCivil').value
    let monsec=formGroup.get('monedaSecundaria').value  
    if (estrescivil){estrescivil=1}else{estrescivil=0}
    if (monsec==null){monsec=0}
    
    const body ={
      id_seguro:id,
      codseg:formGroup.get('codigo').value,
      denseg:formGroup.get('denominacion').value,
      id_aseguradora:formGroup.get('companniaAseguradora').value,
      id_tipopoliza:formGroup.get('tipoPoliza').value,
      id_tipcob:formGroup.get('tipoCobertura').value,
      poliza:formGroup.get('numeroPoliza').value,
      monaseg:formGroup.get('montoPoliza').value,
      fecinipol:formGroup.get('fechaInicio').value,
      fecfinpol:formGroup.get('fechaFin').value,
      codmon:parseInt(formGroup.get('monedaPoliza').value),
      monsec,
      estrescivil,
      descob:formGroup.get('descripcion').value,
      cobadi:formGroup.get('coberturaAdicional').value
      
    }

    return body
  }



}
