import { EstadoConservacionService } from '@core/services/definiciones/estado-conservacion.service';
import { DenominacionEstadoConservacionPipe } from './denominacion-estado-conservacion.pipe';

describe('DenominacionEstadoConservacionPipe', () => {
  it('create an instance', () => {
    let _estadoConservacion: EstadoConservacionService;
    const pipe = new DenominacionEstadoConservacionPipe(_estadoConservacion);
    expect(pipe).toBeTruthy();
  });
});
