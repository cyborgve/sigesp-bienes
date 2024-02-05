import { TipoMarcaService } from '@core/services/definiciones/tipo-marca.service';
import { DenominacionTipoMarcaPipe } from './denominacion-tipo-marca.pipe';

describe('DenominacionTipoMarcaPipe', () => {
  it('create an instance', () => {
    let _tipoMarca: TipoMarcaService;
    const pipe = new DenominacionTipoMarcaPipe(_tipoMarca);
    expect(pipe).toBeTruthy();
  });
});
