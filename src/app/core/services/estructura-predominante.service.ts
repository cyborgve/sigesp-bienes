import { MEstructuraPredominante, MComponenteEstructura } from './../models/MestructuraPredominante';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SigespService } from 'sigesp';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EstructuraPredominanteService {

  constructor(private http: HttpClient, private sigesp: SigespService) { }

  public getAllPredominantStructure(){    
    return this.http.get(`${this.sigesp.URL}/dao/sbn/estructura_predominante_dao.php?`,
    {headers: this.sigesp.getHttpHeaders()})
    .pipe(
      map((res:any) => {
        if (res.success) {
          res.data = res.data.map(element => new MEstructuraPredominante(element));
        } else {
          res.data = [];
        }
        return res
      }) 
    )
  }

  public getStructureComponent(id:number){    
    return this.http.get(`${this.sigesp.URL}/dao/sbn/componente_estructura_dao.php?idTipo=${id}`,
    {headers: this.sigesp.getHttpHeaders()})
    .pipe(
      map((res:any) => {
        if (res.success) {
          res.data = res.data.map(element => new MComponenteEstructura(element));
        } else {
          res.data = [];
        }
        return res
      }) 
    )
  }

  public savePredominantStructure(formGroup: FormGroup){       
     const body = {    
       codtipest: formGroup.get('codigo').value, 
       dentipest:formGroup.get('denominacion').value,      
     }

     return this.http.post(`${this.sigesp.URL}/dao/sbn/estructura_predominante_dao.php`, body, {
       headers: this.sigesp.getHttpHeaders()
     }).pipe(  
        map((res: any) => {
           if (res.success) {
             if (res.data != null){
               res.data = res.data.map(element => new MEstructuraPredominante(element));               
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


   


   public updatePredominantStructure(denominacion:string, id: number, componente:MComponenteEstructura[] ){ 
    let componentes=[]
    componente.forEach(e => {
      componentes.push({
        id_empresa:this.sigesp.usuarioActivo.empresa.id, 
        id_tipest:id, 
        id_comest:e.idComponenteEstructura, 
        codcomest:e.codigoComponenteEstructura, 
        dencomest:e.denominacionComponenteEstructura
      })
    });      
     const body = {   
       id_tipest:id,
       dentipest:denominacion,
       componentes     
     }
    return this.http.put(`${this.sigesp.URL}/dao/sbn/estructura_predominante_dao.php`, body, {
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

  public deletePredominantStructure(codigo:number){ 
    return this.http.delete(`${this.sigesp.URL}/dao/sbn/estructura_predominante_dao.php?codigo=${codigo}`, {
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

public deleteComponet(delComponetes:MComponenteEstructura[]){ 
  let ids: string = '';
  delComponetes.forEach(e => {
  if ( e.idComponenteEstructura.toString() == "" ) {
    ids = e.idComponenteEstructura.toString();
  } else {
    ids = ids + `,${e.idComponenteEstructura}`
  }
});
  return this.http.delete(`${this.sigesp.URL}/dao/sbn/componente_estructura_dao.php?ids=${ids}`, {
  headers: this.sigesp.getHttpHeaders() 
})
.pipe(
  map((res:any) => {
    if (res.success) {
      res.data = res.data;
    } else res.data=[]
    return res
  })
)
}



}
