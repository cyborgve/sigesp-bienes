import { TipoPolizaService } from '@core/services/definiciones/tipo-poliza.service';
import { DenominacionTipoPolizaPipe } from './denominacion-tipo-poliza.pipe';

describe('DenominacionTipoPolizaPipe', () => {
  it('create an instance', () => {
    let _tipoPoliza: TipoPolizaService;
    const pipe = new DenominacionTipoPolizaPipe(_tipoPoliza);
    expect(pipe).toBeTruthy();
  });
});
