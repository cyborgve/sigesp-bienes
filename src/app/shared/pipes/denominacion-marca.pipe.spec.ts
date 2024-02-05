import { MarcaService } from '@core/services/definiciones/marca.service';
import { DenominacionMarcaPipe } from './denominacion-marca.pipe';

describe('DenominacionMarcaPipe', () => {
  it('create an instance', () => {
    let _marca: MarcaService;
    const pipe = new DenominacionMarcaPipe(_marca);
    expect(pipe).toBeTruthy();
  });
});
