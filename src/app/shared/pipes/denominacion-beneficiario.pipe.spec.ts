import { BeneficiarioService } from '@core/services/otros-modulos/beneficiario.service';
import { DenominacionBeneficiarioPipe } from './denominacion-beneficiario.pipe';

describe('DenominacionBeneficiarioPipe', () => {
  it('create an instance', () => {
    let _beneficiario: BeneficiarioService;
    const pipe = new DenominacionBeneficiarioPipe(_beneficiario);
    expect(pipe).toBeTruthy();
  });
});
