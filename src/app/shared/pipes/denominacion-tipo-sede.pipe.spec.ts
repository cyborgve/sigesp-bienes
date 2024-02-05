import { TipoSedeService } from '@core/services/definiciones/tipo-sede.service';
import { DenominacionTipoSedePipe } from './denominacion-tipo-sede.pipe';

describe('DenominacionTipoSedePipe', () => {
  it('create an instance', () => {
    let _tipoSede: TipoSedeService;
    const pipe = new DenominacionTipoSedePipe(_tipoSede);
    expect(pipe).toBeTruthy();
  });
});
