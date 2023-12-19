import { Integracion } from '@core/models/procesos/integracion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const filtrarIntegracionesPorEstadoRegistro = (estadoRegistro: string) =>
  pipe(
    map((integraciones: Integracion[]) => {
      if (estadoRegistro === 'REGISTRADOS')
        return integraciones.filter(integracion => integracion.registrado == 1);
      if (estadoRegistro === 'NO REGISTRADOS')
        return integraciones.filter(integracion => integracion.registrado == 0);
      return integraciones;
    })
  );
