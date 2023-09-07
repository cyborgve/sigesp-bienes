import { Pipe, PipeTransform } from '@angular/core';
import { Id } from '@core/types/id';

@Pipe({
  name: 'corregirCodigo',
})
export class CorregirCodigoPipe implements PipeTransform {
  transform(value: Id): string {
    return value?.toString().toUpperCase() !== 'AUTOGENERADO'
      ? corregirCodigo(value)
      : String(value);
  }
}

const corregirCodigo = (codigo: Id) => {
  let codigoEntrada = String(codigo);
  if (codigoEntrada.length < 8) return codigoEntrada.padStart(8, '0');
  else return codigoEntrada.substring(5);
};
