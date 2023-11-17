import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';

export const adaptarCategoriaUnidadAdministrativa = () => pipe(map(adaptar));
export const adaptarCategoriasUnidadAdministrativas = () =>
  pipe(map((categorias: any[]) => categorias.map(adaptar)));

const adaptar = (categoria: any) =>
  <CategoriaUnidadAdministrativa>{
    empresaId: Number(categoria.empresaId),
    id: Number(categoria.id),
    codigo: categoria.codigo,
    denominacion: categoria.denominacion,
    creado: categoria.creado,
    modificado: categoria.modificado,
  };
