import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MOrigen } from '@core/models/MOrigen';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import *as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class OrigenService {

  constructor(private http: HttpClient, private sigesp: SigespService) { }

  public getAllOrigin(){    
    return this.http.get(`${this.sigesp.URL}/dao/sbn/origen_dao.php?`,
    {headers: this.sigesp.getHttpHeaders()})
    .pipe(
      map((res:any) => {
        if (res.success) {
          res.data = res.data.map(element => new MOrigen(element));
        } else {
          res.data = [];
        }
        return res
      }) 
    )
  }


  public saveOrigin(formGroup: FormGroup, id:number, idProvvedor:number){    
    const body= this.getBody(formGroup,id,idProvvedor)   
     return this.http.post(`${this.sigesp.URL}/dao/sbn/origen_dao.php`, body, {
       headers: this.sigesp.getHttpHeaders()
     }).pipe(  
        map((res: any) => {
           if (res.success) {
             if (res.data != null){
               res.data = res.data.map(element => new MOrigen(element));
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



   public updateOrigin(formGroup: FormGroup, id:number,idProvvedor:number){    
    const body= this.getBody(formGroup,id, idProvvedor) 
    return this.http.put(`${this.sigesp.URL}/dao/sbn/origen_dao.php`, body, {
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

  public deleteOrigin(codigo:number){ 
    return this.http.delete(`${this.sigesp.URL}/dao/sbn/origen_dao.php?codigo=${codigo}`, {
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
 

public getBody(formGroup:FormGroup,id:number, idProveedor:number){
  let numfac=formGroup.get('numeroFactura').value
  let id_proveedor=formGroup.get('proveedor').value
  let tomo=formGroup.get('tomo').value
  let folio=formGroup.get('folio').value
  let observacion=formGroup.get('observacion').value
  let fecfac=formGroup.get('fechaFactura').value
   if (numfac==null){numfac=" "}
   if (tomo==null){tomo=" "}
   if (folio==null){folio=" "} 
   if (observacion==null){observacion=" "}
   if (fecfac==null || fecfac==""){fecfac="1999-01-01"} else {fecfac=moment(fecfac).format("YYYY-MM-DD")}
  

  const body ={
    id_origen:id, 
    codori:formGroup.get('codigoOrigen').value, 
    fecori:moment(formGroup.get('fechaOrigen').value).format("YYYY-MM-DD"),
    fecadq:moment(formGroup.get('fechaAdquisicion').value).format("YYYY-MM-DD"),
    modadq:formGroup.get('modoAdquisicion').value,
    fecforadq:moment(formGroup.get('fechaFormaAdquisicion').value).format("YYYY-MM-DD"),
    numforadq:formGroup.get('numeroFormaAdquisicion').value,
    nomformadq:formGroup.get('nombreFormaAdquisicion').value,
    fecfac:fecfac,
    numfac: numfac,
    id_proveedor:idProveedor,
    tomo:tomo,
    folio:folio,
    nompropant:formGroup.get('nombrePropietarioAnterior').value,
    nombenced:formGroup.get('beneficiarioCedente').value,
    nombenrec:formGroup.get('beneficiarioReceptor').value,
    formadqui: parseInt(formGroup.get('formaAdquisicion').value),
    observacion,     
  }

  console.log('body', body)

  return body
}





}
