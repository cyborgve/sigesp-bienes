import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { DenominacionUnidadAdministrativaPipe } from './denominacion-unidad-administrativa.pipe';

describe('DenominacionUnidadAdministrativaPipe', () => {
  it('create an instance', () => {
    let _unidadAdministrativa: UnidadAdministrativaService;
    const pipe = new DenominacionUnidadAdministrativaPipe(
      _unidadAdministrativa
    );
    expect(pipe).toBeTruthy();
  });
});
