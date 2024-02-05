import { MonedaService } from '@core/services/otros-modulos/moneda.service';
import { DenominacionMonedaPipe } from './denominacion-moneda.pipe';

describe('DenominacionMonedaPipe', () => {
  it('create an instance', () => {
    let _moneda: MonedaService;
    const pipe = new DenominacionMonedaPipe(_moneda);
    expect(pipe).toBeTruthy();
  });
});
