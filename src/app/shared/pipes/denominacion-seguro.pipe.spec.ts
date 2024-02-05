import { SeguroService } from '@core/services/definiciones/seguro.service';
import { DenominacionSeguroPipe } from './denominacion-seguro.pipe';

describe('DenominacionSeguroPipe', () => {
  it('create an instance', () => {
    let _seguro: SeguroService;
    const pipe = new DenominacionSeguroPipe(_seguro);
    expect(pipe).toBeTruthy();
  });
});
