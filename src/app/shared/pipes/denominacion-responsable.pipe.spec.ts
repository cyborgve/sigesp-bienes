import { ResponsableService } from '@core/services/otros-modulos/responsable.service';
import { DenominacionResponsablePipe } from './denominacion-responsable.pipe';

describe('DenominacionResponsablePipe', () => {
  it('create an instance', () => {
    let _responsable: ResponsableService;
    const pipe = new DenominacionResponsablePipe(_responsable);
    expect(pipe).toBeTruthy();
  });
});
