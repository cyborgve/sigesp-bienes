import { ProveedorService } from '@core/services/otros-modulos/proveedor.service';
import { DenominacionProveedorPipe } from './denominacion-proveedor.pipe';

describe('DenominacionProveedorPipe', () => {
  it('create an instance', () => {
    let _proveedor: ProveedorService;
    const pipe = new DenominacionProveedorPipe(_proveedor);
    expect(pipe).toBeTruthy();
  });
});
