import { MunicipioService } from '@core/services/otros-modulos/municipio.service';
import { DenominacionMunicipioPipe } from './denominacion-municipio.pipe';

describe('DenominacionMunicipioPipe', () => {
  it('create an instance', () => {
    let _municipio: MunicipioService;
    const pipe = new DenominacionMunicipioPipe(_municipio);
    expect(pipe).toBeTruthy();
  });
});
