import { Injectable } from '@angular/core';
import { GenericService } from '@core/services/auxiliares/generic.service';
import { PlantillaDepreciacion } from '@core/models/definiciones/plantilla-depreciacion';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarPlantillaDepreciacion,
  adaptarPlantillasDepreciacion,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-plantilla-depreciacion';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class PlantillaDepreciacionService extends GenericService<PlantillaDepreciacion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'plantillaDepreciacion').valor;
  }

  buscarTodos(): Observable<PlantillaDepreciacion[]> {
    return super.buscarTodos().pipe(adaptarPlantillasDepreciacion());
  }

  buscarPorId(id: Id): Observable<PlantillaDepreciacion> {
    return super.buscarPorId(id).pipe(adaptarPlantillaDepreciacion());
  }

  guardar(
    entidad: PlantillaDepreciacion,
    tipoDato: string,
    notificar?: boolean
  ): Observable<PlantillaDepreciacion> {
    return super
      .guardar(entidad, tipoDato, notificar)
      .pipe(adaptarPlantillaDepreciacion());
  }
}
