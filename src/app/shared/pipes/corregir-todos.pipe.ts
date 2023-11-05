import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'corregirTodos',
})
export class CorregirTodosPipe implements PipeTransform {
  transform(value: string): string {
    if (value == 'Seleccionar' || value === '---') return 'Todos';
    return value;
  }
}
