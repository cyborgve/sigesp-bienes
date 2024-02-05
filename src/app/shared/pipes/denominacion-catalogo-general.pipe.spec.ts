import { CatalogoGeneralService } from '@core/services/definiciones/catalogo-general.service';
import { DenominacionCatalogoGeneralPipe } from './denominacion-catalogo-general.pipe';

describe('DenominacionCatalogoGeneralPipe', () => {
  it('create an instance', () => {
    let _catalogoGeneral: CatalogoGeneralService;
    const pipe = new DenominacionCatalogoGeneralPipe(_catalogoGeneral);
    expect(pipe).toBeTruthy();
  });
});
