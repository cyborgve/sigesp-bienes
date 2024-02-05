import { EstadoService } from '@core/services/otros-modulos/estado.service';
import { DenominacionEstadoPipe } from './denominacion-estado.pipe';

describe('DenominacionEstadoPipe', () => {
  it('create an instance', () => {
    let _estado: EstadoService;
    const pipe = new DenominacionEstadoPipe(_estado);
    expect(pipe).toBeTruthy();
  });
});
