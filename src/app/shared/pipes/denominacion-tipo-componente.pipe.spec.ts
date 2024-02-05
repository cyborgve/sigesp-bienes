import { TipoComponenteService } from '@core/services/definiciones/tipo-componente.service';
import { DenominacionTipoComponentePipe } from './denominacion-tipo-componente.pipe';

describe('DenominacionTipoComponentePipe', () => {
  it('create an instance', () => {
    let _tipoComponente: TipoComponenteService;
    const pipe = new DenominacionTipoComponentePipe(_tipoComponente);
    expect(pipe).toBeTruthy();
  });
});
