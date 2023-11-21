import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';

export const adaptarPropositoSemoviente = () => pipe(map(adaptar));
export const adaptarPropositosSemoviente = () =>
  pipe(map((propositosSemoviente: any[]) => propositosSemoviente.map(adaptar)));

const adaptar = (propositoSemoviente: any) =>
  <PropositoSemoviente>{
    empresaId: Number(propositoSemoviente.empresaId),
    id: Number(propositoSemoviente.id),
    codigo: propositoSemoviente.codigo,
    denominacion: propositoSemoviente.denominacion,
    creado: propositoSemoviente.creado,
    modificado: propositoSemoviente.modificado,
  };
