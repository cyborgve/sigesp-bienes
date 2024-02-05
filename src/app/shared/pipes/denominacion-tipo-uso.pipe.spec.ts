import { TipoUsoService } from '@core/services/definiciones/tipo-uso.service';
import { DenominacionTipoUsoPipe } from './denominacion-tipo-uso.pipe';

describe('DenominacionTipoUsoPipe', () => {
  it('create an instance', () => {
    let _tipoUso: TipoUsoService;
    const pipe = new DenominacionTipoUsoPipe(_tipoUso);
    expect(pipe).toBeTruthy();
  });
});
