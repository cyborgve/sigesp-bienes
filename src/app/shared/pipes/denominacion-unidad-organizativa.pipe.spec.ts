import { UnidadOrganizativaService } from '@core/services/otros-modulos/unidad-organizativa.service';
import { DenominacionUnidadOrganizativaPipe } from './denominacion-unidad-organizativa.pipe';

describe('DenominacionUnidadOrganizativaPipe', () => {
  it('create an instance', () => {
    let _unidadOrganizativa: UnidadOrganizativaService;
    const pipe = new DenominacionUnidadOrganizativaPipe(_unidadOrganizativa);
    expect(pipe).toBeTruthy();
  });
});
