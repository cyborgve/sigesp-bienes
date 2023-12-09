import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { normalizarMetodoDepreciacion } from '@core/utils/funciones/normalizar-metodo-depreciacion';

export const adaptarPlantillaIntegracion = () => pipe(map(adaptar));
export const adaptarPlantillasIntegracion = () =>
  pipe(map((plantillas: any[]) => plantillas.map(adaptar)));

const adaptar = (plantilla: any) =>
  <PlantillaIntegracion>{
    empresaId: Number(plantilla.empresaId),
    id: Number(plantilla.id),
    codigo: plantilla.codigo,
    denominacion: plantilla.denominacion,
    metodoDepreciacion: plantilla.metodoDepreciacion,
    cuentaContableGasto: plantilla.cuentaContableGasto,
    cuentaContableDepreciacion: plantilla.cuentaContableDepreciacion,
    vidaUtil: Number(plantilla.vidaUtil),
    unidadVidaUtil: plantilla.unidadVidaUtil,
    creado: plantilla.creado,
    modificado: plantilla.modificado,
  };
