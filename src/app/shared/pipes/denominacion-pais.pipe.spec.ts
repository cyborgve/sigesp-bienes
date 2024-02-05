import { PaisService } from '@core/services/otros-modulos/pais.service';
import { DenominacionPaisPipe } from './denominacion-pais.pipe';

describe('DenominacionPaisPipe', () => {
  it('create an instance', () => {
    let _pais: PaisService;
    const pipe = new DenominacionPaisPipe(_pais);
    expect(pipe).toBeTruthy();
  });
});
