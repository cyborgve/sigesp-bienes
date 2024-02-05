import { ColorService } from '@core/services/definiciones/color.service';
import { DenominacionColorPipe } from './denominacion-color.pipe';

describe('DenominacionColorPipe', () => {
  it('create an instance', () => {
    let _color: ColorService;
    const pipe = new DenominacionColorPipe(_color);
    expect(pipe).toBeTruthy();
  });
});
