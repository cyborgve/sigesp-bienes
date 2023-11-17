import { PlantillaDepreciacion } from '@core/models/definiciones/plantilla-depreciacion';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const adaptarPlantillaDepreciacion = () => pipe(map(adaptar));
export const adaptarPlantillasDepreciacion = () =>
  pipe(map((plantillas: any[]) => plantillas.map(adaptar)));

const adaptar = (plantilla: any) =>
  <PlantillaDepreciacion>{
    empresaId: Number(plantilla.empresaId),
    id: Number(plantilla.id),
    codigo: plantilla.codigo,
    denominacion: plantilla.denominacion,
    metodoDepreciacion: normalizarMetodoDepreciacion(
      plantilla.metodoDepreciacion
    ),
    cuentaContableGasto: plantilla.cuentaContableGasto,
    cuentaContableDepreciacion: plantilla.cuentaContableDepreciacion,
    vidaUtil: Number(plantilla.vidaUtil),
    unidadVidaUtil: plantilla.unidadVidaUtil,
    creado: plantilla.creado,
    modificado: plantilla.modificado,
  };
