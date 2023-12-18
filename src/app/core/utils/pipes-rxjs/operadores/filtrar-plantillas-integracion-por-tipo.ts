import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarPlantillasIntegracionPorTipo = (tipo: string) =>
  pipe(
    map((plantillas: PlantillaIntegracion[]) =>
      plantillas.filter(plantilla => plantilla.tipoPlantilla === tipo)
    )
  );
