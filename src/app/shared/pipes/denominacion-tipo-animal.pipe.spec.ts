import { TipoAnimalService } from '@core/services/definiciones/tipo-animal.service';
import { DenominacionTipoAnimalPipe } from './denominacion-tipo-animal.pipe';

describe('DenominacionTipoAnimalPipe', () => {
  it('create an instance', () => {
    let _tipoAnimal: TipoAnimalService;
    const pipe = new DenominacionTipoAnimalPipe(_tipoAnimal);
    expect(pipe).toBeTruthy();
  });
});
