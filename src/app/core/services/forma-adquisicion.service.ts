import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { SigespService } from 'sigesp';
import { MFormaAdquisicion } from '@core/models/MFormaAdquisicion';

@Injectable({
  providedIn: 'root'
})
export class FormaAdquisicionService {

  constructor(private http: HttpClient, private sigesp: SigespService) { }

  public getAcquisitionMethod(){    
    return this.http.get(`${this.sigesp.URL}/dao/sbn/forma_adquisicion_dao.php?`,
    {headers: this.sigesp.getHttpHeaders()})
    .pipe(
      map((res:any) => {
        if (res.success) {
          res.data = res.data.map(element => new MFormaAdquisicion(element));
        } else {
          res.data = [];
        }
        return res
      }) 
    )
  }
  


public saveAcquisitionMethod(formGroup: FormGroup){ 

    const body = {  
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      codforadq: formGroup.get('codigo').value, 
      denforadq:formGroup.get('denominacion').value, 
    }
    return this.http.post(`${this.sigesp.URL}/dao/sbn/forma_adquisicion_dao.php`, body, {
      headers: this.sigesp.getHttpHeaders()
    }).pipe(  
       map((res: any) => {
          if (res.success) {
            res.data = res.data.map(element => new MFormaAdquisicion(element));
          } else {
            res.data = [];
          }
          return res
       })
    )
  }

  public updateAcquisitionMethod(formGroup: FormGroup, id:number){ 

    const body = {  
      id_adquisicion:id,
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      codforadq: formGroup.get('codigo').value, 
      denforadq:formGroup.get('denominacion').value, 
    }
    return this.http.put(`${this.sigesp.URL}/dao/sbn/forma_adquisicion_dao.php`, body, {
      headers: this.sigesp.getHttpHeaders()
    }).pipe(  
       map((res: any) => {
          if (res.success) {
            res.data = res.data
          } else {
            res.data = [];
          }
          return res
       })
    )
  }

  public deleteAcquisitionMethod(codigo:number){ 
    return this.http.delete(`${this.sigesp.URL}/dao/sbn/forma_adquisicion_dao.php?codigo=${codigo}`, {
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
