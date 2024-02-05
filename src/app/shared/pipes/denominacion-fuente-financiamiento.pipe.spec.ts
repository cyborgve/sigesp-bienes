import { FuenteFinanciamientoService } from '@core/services/otros-modulos/fuente-financiamiento.service';
import { DenominacionFuenteFinanciamientoPipe } from './denominacion-fuente-financiamiento.pipe';

describe('DenominacionFuenteFinanciamientoPipe', () => {
  it('create an instance', () => {
    let _fuenteFinanciamiento: FuenteFinanciamientoService;
    const pipe = new DenominacionFuenteFinanciamientoPipe(
      _fuenteFinanciamiento
    );
    expect(pipe).toBeTruthy();
  });
});
