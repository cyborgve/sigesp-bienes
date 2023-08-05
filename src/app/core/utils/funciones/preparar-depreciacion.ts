import { Activo } from '@core/models/definiciones/activo';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

export const prepararDepreciacion = () =>
  pipe(
    map((activo: Activo) => {
      let depreciacion: Depreciacion = {
        empresaId: 0,
        id: 0,
        comprobante: '',
        activo: activo.id,
        serial: activo.serialFabrica,
        identificador: activo.serialRotulacion,
        fechaCompra: activo.fechaAdquisicion,
        fechaIncorporacion: activo.fechaRegistro,
        metodo: activo.depreciacion.metodoDepreciacion,
        costo: activo.valorAdquisicion,
        valorRescate: activo.depreciacion.valorRescate,
        montoDepreciar: 0,
        vidaUtil: activo.depreciacion.vidaUtil,
        depreciacionMensual: 0,
        depreciacionAnual: 0,
        observaciones: '',
        detalles: [],
        creado: new Date(),
        modificado: new Date(),
      };
    })
  );
