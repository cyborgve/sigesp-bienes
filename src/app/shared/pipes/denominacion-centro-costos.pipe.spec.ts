import { CentroCostosService } from '@core/services/otros-modulos/centro-costos.service';
import { DenominacionCentroCostosPipe } from './denominacion-centro-costos.pipe';

describe('DenominacionCentroCostosPipe', () => {
  it('create an instance', () => {
    let _centroCostos: CentroCostosService;
    const pipe = new DenominacionCentroCostosPipe(_centroCostos);
    expect(pipe).toBeTruthy();
  });
});
