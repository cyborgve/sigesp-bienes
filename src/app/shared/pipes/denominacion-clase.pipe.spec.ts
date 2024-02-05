import { ClaseService } from '@core/services/definiciones/clase.service';
import { DenominacionClasePipe } from './denominacion-clase.pipe';

describe('DenominacionClasePipe', () => {
  it('create an instance', () => {
    let _clase: ClaseService;
    const pipe = new DenominacionClasePipe(_clase);
    expect(pipe).toBeTruthy();
  });
});
