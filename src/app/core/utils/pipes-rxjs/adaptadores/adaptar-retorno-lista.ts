import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { RetornoLista } from '@core/models/auxiliares/retorno-lista';

export const adaptarRetornoLista = () => pipe(map(adaptar));
export const adaptarRetornosLista = () =>
  pipe(map((retornos: any[]) => retornos.map(adaptar)));

const adaptar = (retorno: any) =>
  <RetornoLista>{
    empresaId: Number(retorno.empresaId),
    id: Number(retorno.id),
    comprobante: retorno.comprobante,
    tipoRetorno: retorno.tipoRetorno,
    beneficiario: retorno.beneficiario,
    observaciones: retorno.observaciones,
    creado: retorno.creado,
    modificado: retorno.modificado,
  };
