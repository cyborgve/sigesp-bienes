import { Injectable } from '@angular/core';
import { GenericService } from '../auxiliares/generic.service';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { END_POINTS } from '@core/constants/end-points';
import { Observable } from 'rxjs';
import {
  adaptarPlantillaIntegracion,
  adaptarPlantillasIntegracion,
} from '@core/utils/pipes-rxjs/adaptadores/adaptar-plantilla-integracion';
import { Id } from '@core/types/id';

@Injectable({
  providedIn: 'root',
})
export class PlantillaIntegracionService extends GenericService<PlantillaIntegracion> {
  protected getEntidadUrl(): string {
    return END_POINTS.find(ep => ep.clave === 'plantillaItegracion').valor;
  }

  buscarTodos(): Observable<PlantillaIntegracion[]> {
    return super.buscarTodos().pipe(adaptarPlantillasIntegracion());
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
