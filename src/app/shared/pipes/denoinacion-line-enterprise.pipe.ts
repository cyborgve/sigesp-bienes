import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'denoinacionLineEnterprise',
})
export class DenoinacionLineEnterprisePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
