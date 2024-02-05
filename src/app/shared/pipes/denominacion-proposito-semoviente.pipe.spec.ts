import { PropositoSemovienteService } from '@core/services/definiciones/proposito-semoviente.service';
import { DenominacionPropositoSemovientePipe } from './denominacion-proposito-semoviente.pipe';

describe('DenominacionPropositoSemovientePipe', () => {
  it('create an instance', () => {
    let _propositoSemoviente: PropositoSemovienteService;
    const pipe = new DenominacionPropositoSemovientePipe(_propositoSemoviente);
    expect(pipe).toBeTruthy();
  });
});
