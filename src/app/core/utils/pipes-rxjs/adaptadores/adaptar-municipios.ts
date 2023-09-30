import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Municipio } from '@core/models/otros-modulos/municipio';

interface MunicipioIn {
  codpai: string;
  codest: string;
  codmun: string;
  desmun: string;
  capmun: string;
}

export const adaptarMunicipios = () =>
  pipe(
    map((res: any) => res.data as MunicipioIn[]),
    map(municipiosIn =>
      municipiosIn.map(
        municipioIn =>
          <Municipio>{
            empresaId: undefined,
            id:
              municipioIn.codmun === '---'
                ? municipioIn.codmun
                : municipioIn.codpai +
                  '-' +
                  municipioIn.codest +
                  '-' +
                  municipioIn.codmun,
            codigo: String(municipioIn.codmun),
            paisId: municipioIn.codpai,
            estadoId: municipioIn.codpai + '-' + municipioIn.codest,
            denominacion: municipioIn.desmun,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
