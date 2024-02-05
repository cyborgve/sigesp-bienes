import { ParroquiaService } from '@core/services/otros-modulos/parroquia.service';
import { DenominacionParroquiaPipe } from './denominacion-parroquia.pipe';

describe('DenominacionParroquiaPipe', () => {
  it('create an instance', () => {
    let _parroquia: ParroquiaService;
    const pipe = new DenominacionParroquiaPipe(_parroquia);
    expect(pipe).toBeTruthy();
  });
});
