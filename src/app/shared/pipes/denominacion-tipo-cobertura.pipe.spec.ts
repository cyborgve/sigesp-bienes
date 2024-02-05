import { TipoCoberturaService } from '@core/services/definiciones/tipo-cobertura.service';
import { DenominacionTipoCoberturaPipe } from './denominacion-tipo-cobertura.pipe';

describe('DenominacionTipoCoberturaPipe', () => {
  it('create an instance', () => {
    let _tipoCobertura: TipoCoberturaService;
    const pipe = new DenominacionTipoCoberturaPipe(_tipoCobertura);
    expect(pipe).toBeTruthy();
  });
});
