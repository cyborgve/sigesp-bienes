import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Marca } from '@core/models/definiciones/marca';

export const adaptarMarca = () => pipe(map(adaptar));
export const adaptarMarcas = () =>
  pipe(map((marcas: any[]) => marcas.map(adaptar)));

const adaptar = (marca: any) =>
  <Marca>{
    empresaId: Number(marca.empresaId),
    id: Number(marca.id),
    codigo: marca.codigo,
    denominacion: marca.denominacion,
    tipo: marca.tipo,
    creado: marca.creado,
    modificado: marca.modificado,
  };
