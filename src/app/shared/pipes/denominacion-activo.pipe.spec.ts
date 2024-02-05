import { ActivoService } from '@core/services/definiciones/activo.service';
import { DenominacionActivoPipe } from './denominacion-activo.pipe';

describe('DenominacionActivoPipe', () => {
  it('create an instance', () => {
    let _activo: ActivoService;
    const pipe = new DenominacionActivoPipe(_activo);
    expect(pipe).toBeTruthy();
  });
});
