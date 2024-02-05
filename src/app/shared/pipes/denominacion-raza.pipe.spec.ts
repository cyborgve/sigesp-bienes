import { RazaService } from '@core/services/definiciones/raza.service';
import { DenominacionRazaPipe } from './denominacion-raza.pipe';

describe('DenominacionRazaPipe', () => {
  it('create an instance', () => {
    let _raza: RazaService;
    const pipe = new DenominacionRazaPipe(_raza);
    expect(pipe).toBeTruthy();
  });
});
