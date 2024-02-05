import { LineEnterpriseService } from '@core/services/otros-modulos/line-enterprise.service';
import { DenominacionLineEnterprisePipe } from './denominacion-line-enterprise.pipe';

describe('DenominacionLineEnterprisePipe', () => {
  it('create an instance', () => {
    let _lineEnterprise: LineEnterpriseService;
    const pipe = new DenominacionLineEnterprisePipe(_lineEnterprise);
    expect(pipe).toBeTruthy();
  });
});
