import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Aseguradora } from '@core/models/definiciones/aseguradora';

export const adaptarAseguradora = () => pipe(map(adaptar));
export const adaptarAseguradoras = () =>
  pipe(map((aseguradoras: any[]) => aseguradoras.map(adaptar)));

const adaptar = (aseguradora: any) =>
  <Aseguradora>{
    empresaId: Number(aseguradora.empresaId),
    id: Number(aseguradora.id),
    codigo: aseguradora.codigo,
    denominacion: aseguradora.denominacion,
    creado: aseguradora.creado,
    modificado: aseguradora.modificado,
  };
