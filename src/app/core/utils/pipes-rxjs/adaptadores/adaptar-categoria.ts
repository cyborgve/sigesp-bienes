import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Categoria } from '@core/models/definiciones/categoria';

export const adaptarCategoria = () => pipe(map(adaptar));
export const adaptarCategorias = () =>
  pipe(map((categorias: any[]) => categorias.map(adaptar)));

const adaptar = (categoria: any) =>
  <Categoria>{
    empresaId: Number(categoria.empresaId),
    id: Number(categoria.id),
    codigo: categoria.codigo,
    denominacion: categoria.denominacion,
    creado: categoria.creado,
    modificado: categoria.modificado,
  };
