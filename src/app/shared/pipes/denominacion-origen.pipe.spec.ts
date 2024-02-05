import { OrigenService } from '@core/services/definiciones/origen.service';
import { DenominacionOrigenPipe } from './denominacion-origen.pipe';

describe('DenominacionOrigenPipe', () => {
  it('create an instance', () => {
    let _origen: OrigenService;
    const pipe = new DenominacionOrigenPipe(_origen);
    expect(pipe).toBeTruthy();
  });
});
