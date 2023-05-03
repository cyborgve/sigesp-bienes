import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { MSede } from '@core/models/MSede';

@Injectable({
  providedIn: 'root',
})
export class SedesService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getAllSeat() {
    return this.http
      .get(`${this.sigesp.URL}/dao/sbn/sedes_dao.php`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(element => new MSede(element));
            } else {
              res.data = [];
            }
          }
          return res;
        })
      );
  }

  public getCiudad() {
    return this.http
      .get(`${this.sigesp.URL}/dao/sigesp/ciudad_dao.php`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(map((res: any) => res.data));
  }

  public saveSeat(formGroup: FormGroup) {
    const body = {
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      id_sede: 0,
      id_tipsede: formGroup.get('tipoSede').value,
      codsede: formGroup.get('codigo').value,
      densede: formGroup.get('denominacion').value,
      localizacion: formGroup.get('localizacion').value,
      codpai: formGroup.get('pais').value,
      codest: formGroup.get('estado').value,
      codmun: formGroup.get('municipio').value,
      codpar: formGroup.get('parroquia').value,
      codciu: formGroup.get('ciudad').value,
      urbanizacion: formGroup.get('urbanizacion').value,
      calleav: formGroup.get('calle').value,
      casaedif: formGroup.get('casa').value,
      piso: formGroup.get('piso').value,
    };
    return this.http
      .post(`${this.sigesp.URL}/dao/sbn/sedes_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            if (res.data != null) {
              res.data = res.data.map(element => new MSede(element));
            } else {
              res.data = [];
            }
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public updateSeat(formGroup: FormGroup, id: number) {
    const body = {
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      id_sede: id,
      id_tipsede: formGroup.get('tipoSede').value,
      codsede: formGroup.get('codigo').value,
      densede: formGroup.get('denominacion').value,
      localizacion: formGroup.get('localizacion').value,
      codpai: formGroup.get('pais').value,
      codest: formGroup.get('estado').value,
      codmun: formGroup.get('municipio').value,
      codpar: formGroup.get('parroquia').value,
      codciu: formGroup.get('ciudad').value,
      urbanizacion: formGroup.get('urbanizacion').value,
      calleav: formGroup.get('calle').value,
      casaedif: formGroup.get('casa').value,
      piso: formGroup.get('piso').value,
    };
    return this.http
      .put(`${this.sigesp.URL}/dao/sbn/sedes_dao.php`, body, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          } else {
            res.data = [];
          }
          return res;
        })
      );
  }

  public deleteSeat(codigo: number) {
    return this.http
      .delete(`${this.sigesp.URL}/dao/sbn/sedes_dao.php?codigo=${codigo}`, {
        headers: this.sigesp.getHttpHeaders(),
      })
      .pipe(
        map((res: any) => {
          if (res.success) {
            res.data = res.data;
          }
          return res;
        })
      );
  }
}
