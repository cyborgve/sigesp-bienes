import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { Aseguradora } from '@core/models/definiciones/aseguradora';
import { END_POINTS } from '@core/constants/end-points';
import { adaptarAseguradoras } from '@core/utils/pipes-rxjs/adaptadores/adaptar-aseguradora';
import { Id } from '@core/types/id';
import { adaptarAseguradora } from '@core/utils/pipes-rxjs/adaptadores/adaptar-aseguradora';

@Injectable({
  providedIn: 'root',
})
export class AseguradoraService extends GenericService<Aseguradora> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'aseguradoras').valor;
  }

  buscarTodos() {
    return super.buscarTodos().pipe(adaptarAseguradoras());
  }

  buscarPorId(aseguradora: Id) {
    return super.buscarPorId(aseguradora).pipe(adaptarAseguradora());
  }

  guardar(aseguradora: Aseguradora, tipoDato: string, notificar?: boolean) {
    return super
      .guardar(aseguradora, tipoDato, notificar)
      .pipe(adaptarAseguradora());
  }
}
