import { EstadoUsoService } from '@core/services/definiciones/estado-uso.service';
import { DenominacionEstadoUsoPipe } from './denominacion-estado-uso.pipe';

describe('DenominacionEstadoUsoPipe', () => {
  it('create an instance', () => {
    let _estadoUso: EstadoUsoService;
    const pipe = new DenominacionEstadoUsoPipe(_estadoUso);
    expect(pipe).toBeTruthy();
  });
});
