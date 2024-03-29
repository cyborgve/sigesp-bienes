import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';

export const adaptarPlantillaIntegracion = () => pipe(map(adaptar));
export const adaptarPlantillasIntegracion = () =>
  pipe(map((plantillas: any[]) => plantillas.map(adaptar)));

const adaptar = (plantilla: any) =>
  <PlantillaIntegracion>{
    empresaId: Number(plantilla.empresaId),
    id: Number(plantilla.id),
    codigo: plantilla.codigo,
    denominacion: plantilla.denominacion,
    tipoPlantilla: plantilla.tipoPlantilla,
    metodoDepreciacion: plantilla.metodoDepreciacion,
    cuentaContableDebe: plantilla.cuentaContableDebe,
    cuentaContableHaber: plantilla.cuentaContableHaber,
    vidaUtil: Number(plantilla.vidaUtil),
    unidadVidaUtil: plantilla.unidadVidaUtil,
    creado: plantilla.creado,
    modificado: plantilla.modificado,
  };
