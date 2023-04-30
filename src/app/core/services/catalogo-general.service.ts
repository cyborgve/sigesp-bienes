import { MCausaMovimiento } from '@core/models/MCausaMovimiento';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { MCatalogoGeneral } from '@core/models/MCatalogoGeneral';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CatalogoGeneralService {

  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getAllGeneralCatalog(){    
    return this.http.get(`${this.sigesp.URL}/dao/sbn/catalogo_general_dao.php?`,
    {headers: this.sigesp.getHttpHeaders()})
    .pipe(
      map((res:any) => {
        if (res.success) {
          res.data = res.data.map(element => new MCatalogoGeneral(element));
        } else {
          res.data = [];
        }
        return res
      }) 
    )
  }

  public saveGeneralCatalog(formGroup: FormGroup, cuenta:string){ 
    let estatus=formGroup.get('estatus').value;
    if (estatus==0){estatus="S"}else{estatus="C"}      
   
     const body = {    
      id_empresa:this.sigesp.usuarioActivo.empresa.id, 
      catcta:formGroup.get('codigo').value, 
      dencat:formGroup.get('denominacion').value, 
      ctaref:cuenta,
      estmov:estatus
     }
     return this.http.post(`${this.sigesp.URL}/dao/sbn/catalogo_general_dao.php`, body, {
       headers: this.sigesp.getHttpHeaders()
     }).pipe(  
        map((res: any) => {
           if (res.success) {
             if (res.data != null){
               res.data = res.data.map(element => new MCatalogoGeneral(element));
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

   public updateGeneralCatalog(formGroup: FormGroup, cuenta:string){ 
    let estatus=formGroup.get('estatus').value;
    if (estatus==0){estatus="S"}else{estatus="C"}  
    
   
     const body = {    
      id_empresa:this.sigesp.usuarioActivo.empresa.id, 
      catcta:formGroup.get('codigo').value, 
      dencat:formGroup.get('denominacion').value, 
      ctaref:cuenta,
      estmov:estatus
     }
     return this.http.put(`${this.sigesp.URL}/dao/sbn/catalogo_general_dao.php`, body, {
       headers: this.sigesp.getHttpHeaders()
     }).pipe(  
        map((res: any) => {
           if (res.success) {
             if (res.data != null){
               res.data = res.data;
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

   public deleteGeneralCatalog(codigo:string){ 
    return this.http.delete(`${this.sigesp.URL}/dao/sbn/catalogo_general_dao.php?codigo=${codigo}`, {
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



}
