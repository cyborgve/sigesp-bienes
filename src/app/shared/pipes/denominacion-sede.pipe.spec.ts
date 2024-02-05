import { SedeService } from '@core/services/definiciones/sede.service';
import { DenominacionSedePipe } from './denominacion-sede.pipe';

describe('DenominacionSedePipe', () => {
  it('create an instance', () => {
    let _sede: SedeService;
    const pipe = new DenominacionSedePipe(_sede);
    expect(pipe).toBeTruthy();
  });
});
