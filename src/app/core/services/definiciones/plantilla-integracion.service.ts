import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { END_POINTS } from '@core/constants/end-points';
import { GenericService } from '../auxiliares/generic.service';
import { Id } from '@core/types/id';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { adaptarPlantillaIntegracion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-plantilla-integracion';
import { adaptarPlantillasDepreciacion } from '@core/utils/pipes-rxjs/adaptadores/adaptar-plantilla-depreciacion';

@Injectable({
  providedIn: 'root',
})
export class PlantillaIntegracionService extends GenericService<PlantillaIntegracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'plantillaDepreciacion').valor;
  }

  buscarTodos(): Observable<PlantillaIntegracion[]> {
    return super.buscarTodos().pipe(adaptarPlantillasDepreciacion());
  }

  buscarPorId(id: Id): Observable<PlantillaIntegracion> {
    return super.buscarPorId(id).pipe(adaptarPlantillaIntegracion());
  }

  guardar(
    entidad: PlantillaIntegracion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<PlantillaIntegracion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarPlantillaIntegracion());
  }
}
