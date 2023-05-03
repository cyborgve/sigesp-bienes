import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { SigespService } from 'sigesp';
//import { MConfigSBN } from "@core/models/MconfigSBN";

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionBienesService {
  constructor(private http: HttpClient, private sigesp: SigespService) {}

  public getConfigSbn() {
    // return this.http.get(`${this.sigesp.URL}/dao/sbn/configuracion_bienes_dao.php?`,
    // {headers: this.sigesp.getHttpHeaders()})
    // .pipe(
    //   map((res:any) => {
    //     if (res.success) {
    //       res.data = res.data.map(element => new MConfigSBN(element));
    //     } else {
    //       res.data = [];
    //     }
    //     return res
    //   })
    // )
    return undefined;
  }

  public saveConfigSbn(formGroup: FormGroup, logGen: number, logInt: number) {
    let fecincaut = formGroup.get('incorporacionAuto').value;
    if (fecincaut) {
      fecincaut = 1;
    } else {
      fecincaut = 0;
    }
    let estgenasiconsbn = formGroup.get('generarAsiento').value;
    if (estgenasiconsbn) {
      estgenasiconsbn = 1;
    } else {
      estgenasiconsbn = 0;
    }
    let estsepmascodact = formGroup.get('mostrarSeperadores').value;
    if (estsepmascodact) {
      estsepmascodact = 1;
    } else {
      estsepmascodact = 0;
    }

    const body = {
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      afedep: formGroup.get('afectacion').value,
      fecincaut: fecincaut,
      estgenasiconsbn: estgenasiconsbn,
      noract: formGroup.get('normativa').value,
      estsepmascodact: estsepmascodact,
      lonmaxcatctagral: logGen,
      lonmaxcodinsact: logInt,
      formcatctagral: formGroup.get('formatoCuentaGeneral').value,
      formcodinsact: formGroup.get('formatoCuentaInstitucional').value,
    };
    console.log('body: ', body);
    return undefined;
    // this.http
    //   .post(`${this.sigesp.URL}/dao/sbn/configuracion_bienes_dao.php`, body, {
    //     headers: this.sigesp.getHttpHeaders(),
    //   })
    //   .pipe(
    //     map((res: any) => {
    //       if (res.success) {
    //         res.data = res.data.map((element) => new MConfigSBN(element));
    //       } else {
    //         res.data = [];
    //       }
    //       return res;
    //     })
    //   );
  }

  public updateConfigSbn(
    formGroup: FormGroup,
    id: number,
    logGen: number,
    logInt: number
  ) {
    let fecincaut = formGroup.get('incorporacionAuto').value;
    if (fecincaut) {
      fecincaut = 1;
    } else {
      fecincaut = 0;
    }
    let estgenasiconsbn = formGroup.get('generarAsiento').value;
    if (estgenasiconsbn) {
      estgenasiconsbn = 1;
    } else {
      estgenasiconsbn = 0;
    }
    let estsepmascodact = formGroup.get('mostrarSeperadores').value;
    if (estsepmascodact) {
      estsepmascodact = 1;
    } else {
      estsepmascodact = 0;
    }

    const body = {
      id_empresa: this.sigesp.usuarioActivo.empresa.id,
      id_sbn: id,
      afedep: formGroup.get('afectacion').value,
      fecincaut: fecincaut,
      estgenasiconsbn: estgenasiconsbn,
      noract: formGroup.get('normativa').value,
      estsepmascodact: estsepmascodact,
      lonmaxcatctagral: logGen,
      lonmaxcodinsact: logInt,
      formcatctagral: formGroup.get('formatoCuentaGeneral').value,
      formcodinsact: formGroup.get('formatoCuentaInstitucional').value,
    };
    return this.http
      .put(`${this.sigesp.URL}/dao/sbn/configuracion_bienes_dao.php`, body, {
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

  public deleteConfigSbn(codigo: number) {
    return this.http
      .delete(
        `${this.sigesp.URL}/dao/sbn/configuracion_bienes_dao.php?codigo=${codigo}`,
        {
          headers: this.sigesp.getHttpHeaders(),
        }
      )
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
