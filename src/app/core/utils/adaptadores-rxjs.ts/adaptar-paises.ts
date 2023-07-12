import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { Pais } from '@core/models/otros-modulos/pais';

interface PaisIn {
  codpai: string;
  despai: string;
  monofi: number;
  monsec: number;
}

export const adaptarPaises = () =>
  pipe(
    map((paisesIn: any) => paisesIn.data as PaisIn[]),
    map(paisesIn =>
      paisesIn.map(
        paisIn =>
          <Pais>{
            empresaId: undefined,
            id: paisIn.codpai,
            codigo: String(paisIn.codpai),
            denominacion: paisIn.despai,
            creado: new Date(),
            modificado: new Date(),
          }
      )
    )
  );
