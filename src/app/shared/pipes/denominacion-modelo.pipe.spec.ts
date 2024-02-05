import { ModeloService } from '@core/services/definiciones/modelo.service';
import { DenominacionModeloPipe } from './denominacion-modelo.pipe';

describe('DenominacionModeloPipe', () => {
  it('create an instance', () => {
    let _modelo: ModeloService;
    const pipe = new DenominacionModeloPipe(_modelo);
    expect(pipe).toBeTruthy();
  });
});
