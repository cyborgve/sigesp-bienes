import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Sede } from '@core/models/definiciones/sede';

export const adaptarSede = () => pipe(map(adaptar));
export const adaptarSedes = () =>
  pipe(map((sedes: any[]) => sedes.map(adaptar)));

const adaptar = (sede: any) =>
  <Sede>{
    empresaId: Number(sede.empresaId),
    id: Number(sede.id),
    codigo: sede.codigo,
    denominacion: sede.denominacion,
    tipoSedeId: Number(sede.tipoSedeId),
    localizacion: sede.localizacion,
    paisId: sede.paisId,
    estadoId: sede.estadoId,
    municipioId: sede.municipioId,
    parroquiaId: sede.parroquiaId,
    ciudadId: sede.ciudadId,
    urbanizacion: sede.urbanizacion,
    calleAvenida: sede.calleAvenida,
    casaEdificio: sede.casaEdificio,
    piso: Number(sede.piso),
    creado: sede.creado,
    modificado: sede.modificado,
  };
