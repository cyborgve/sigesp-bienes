import { AseguradoraService } from '@core/services/definiciones/aseguradora.service';
import { DenominacionAseguradoraPipe } from './denominacion-aseguradora.pipe';

describe('DenimonacionAseguradoraPipe', () => {
  it('create an instance', () => {
    let _aseguradora: AseguradoraService;
    const pipe = new DenominacionAseguradoraPipe(_aseguradora);
    expect(pipe).toBeTruthy();
  });
});
