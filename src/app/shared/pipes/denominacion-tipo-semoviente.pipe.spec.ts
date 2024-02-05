import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';
import { DenominacionTipoSemovientePipe } from './denominacion-tipo-semoviente.pipe';
import { TipoSemovienteService } from '@core/services/definiciones/tipo-semoviente.service';

describe('DenominacionTipoSemovientePipe', () => {
  it('create an instance', () => {
    let _tipoSemoviente: TipoSemovienteService;
    const pipe = new DenominacionTipoSemovientePipe(_tipoSemoviente);
    expect(pipe).toBeTruthy();
  });
});
