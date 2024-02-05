import { MarcaService } from '@core/services/definiciones/marca.service';
import { DenominacionMarcaModeloPipe } from './denominacion-marca-modelo.pipe';
import { ModeloService } from '@core/services/definiciones/modelo.service';

describe('DenominacionMarcaModeloPipe', () => {
  it('create an instance', () => {
    let _marca: MarcaService;
    let _modelo: ModeloService;
    const pipe = new DenominacionMarcaModeloPipe(_modelo, _marca);
    expect(pipe).toBeTruthy();
  });
});
