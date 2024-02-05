import { CiudadService } from '@core/services/otros-modulos/ciudad.service';
import { DenominacionCiudadPipe } from './denominacion-ciudad.pipe';

describe('DenominacionCiudadPipe', () => {
  it('create an instance', () => {
    let _ciudad: CiudadService;
    const pipe = new DenominacionCiudadPipe(_ciudad);
    expect(pipe).toBeTruthy();
  });
});
