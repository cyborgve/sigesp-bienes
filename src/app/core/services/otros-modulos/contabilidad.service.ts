import { ComprobanteContable } from '@core/models/auxiliares/comprobante-contable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SigespService } from 'sigesp';
import { Observable } from 'rxjs';
import { ResultadoContabilidad } from '@core/models/auxiliares/resultado-contabilidad';

type TipoProceso = 'contabilizar' | 'reversarContabilizar';

interface ProcesoContable {
  tipo: TipoProceso;
  comprobantes: ComprobanteContable[];
}

@Injectable({
  providedIn: 'root',
})
export class ContabilizacionService {
  private apiUrl = this._sigesp.URL + '/dao/sbn/integrar-bienes-dao.php';

  constructor(private _http: HttpClient, private _sigesp: SigespService) {}

  contabilizar(
    comprobantesContables: ComprobanteContable[]
  ): Observable<ResultadoContabilidad> {
    let procesoContabilizar: ProcesoContable = {
      tipo: 'contabilizar',
      comprobantes: comprobantesContables,
    };
    return this._http.post<ResultadoContabilidad>(
      this.apiUrl,
      procesoContabilizar
    );
  }

  reversarContabilizar(
    comprobantesContables: ComprobanteContable[]
  ): Observable<ResultadoContabilidad> {
    let procesoReversar: ProcesoContable = {
      tipo: 'reversarContabilizar',
      comprobantes: comprobantesContables,
    };
    return this._http.post<ResultadoContabilidad>(this.apiUrl, procesoReversar);
  }
}
