import { CategoriaUnidadAdministrativaService } from '@core/services/definiciones/categoria-unidad-administrativa.service';
import { DenominacionCategoriaUnidadAdministrativaPipe } from './denominacion-categoria-unidad-administrativa.pipe';

describe('DenominacionCategoriaUnidadAdministrativaPipe', () => {
  it('create an instance', () => {
    let _categoriaUnidadAdministrativa: CategoriaUnidadAdministrativaService;
    const pipe = new DenominacionCategoriaUnidadAdministrativaPipe(
      _categoriaUnidadAdministrativa
    );
    expect(pipe).toBeTruthy();
  });
});
