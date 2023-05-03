import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';

@Injectable({
  providedIn: 'root',
})
export class DefinicionesBasicasService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getDefinition(tipo: string) {
    return this.http
      .get(
        `${this.sigesp.URL}/dao/sbn/definiciones_basicas_dao.php?tipo=${tipo}`,
        { headers: this.sigesp.getHttpHeaders() }
      )
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(
                element => new MDefinicionesBasicas(element)
              );
            } else {
              res.data = [];
            }
          }
          return res;
        })
      );
  }

  public saveDefinition(tipo: string, deficiones: MDefinicionesBasicas[]) {
    let body = deficiones;
    return this.http
      .post(
        `${this.sigesp.URL}/dao/sbn/definiciones_basicas_dao.php?tipo=${tipo}`,
        body,
        {
          headers: this.sigesp.getHttpHeaders(),
        }
      )
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data.map(
              element => new MDefinicionesBasicas(element)
            );
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public deleteDefinition(delComponetes: MDefinicionesBasicas[], tipo: string) {
    let ids: string = '';
    delComponetes.forEach(e => {
      if (e.id.toString() == '') {
        ids = e.id.toString();
      } else {
        ids = ids + `,${e.id}`;
      }
    });
    return this.http
      .delete(
        `${this.sigesp.URL}/dao/sbn/definiciones_basicas_dao.php?ids=${ids}&tipo=${tipo}`,
        {
          headers: this.sigesp.getHttpHeaders(),
        }
      )
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          } else res.data = [];
          return res;
        })
      );
  }
}
