import { CategoriaService } from '@core/services/definiciones/categoria.service';
import { DenominacionCategoriaPipe } from './denominacion-categoria.pipe';

describe('DenominacionCategoriaPipe', () => {
  it('create an instance', () => {
    let _categoria: CategoriaService;
    const pipe = new DenominacionCategoriaPipe(_categoria);
    expect(pipe).toBeTruthy();
  });
});
