import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { UnidadOrganizativa } from '@core/models/otros-modulos/unidad-organizativa';

export const adaptarUnidadOrganizativa = () => pipe(map(adaptar));
export const adaptarUnidadesOrganizativas = () =>
  pipe(map((unidades: any[]) => unidades.map(adaptar)));

const adaptar = (unidad: any) =>
  <UnidadOrganizativa>{
    empresaId: unidad.id_empresa,
    id: unidad.id_uniadm,
    denominacion: unidad.denuniadm,
    codigo: unidad.coduniadm,
    creado: new Date(),
    modificado: new Date(),
  };
