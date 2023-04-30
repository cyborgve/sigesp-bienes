import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iso'
})
export class IsoCurrencyPipe implements PipeTransform {

  transform(
    value: number, 
    args: Arguments = {decimal:',', thousands:'.'}
  ): string {
    if (!args.decimal || args.decimal.trim() == '') {
      args.decimal = ','
    }
    if (!args.thousands || args.thousands.trim() == '') {
      args.thousands = '.'
    }
    if (args.decimal != args.thousands) {
      if (!isNaN(value)) {
        let negative: boolean = value < 0;
        if (negative) value = value * -1
        let string = value.toString();
        if (!string || string.trim() == '') {
          string = '0'
        }
        let sections: string[] = string.split('.');
        let mainPart: string[] = this.splitStringFromEnd(sections[0], 3)
        sections[0] = mainPart.join(args.thousands);
        return `${negative ? '-' : ''}${sections.join(args.decimal)}`
      } else {
        return `-`;
      }
    } else {
      return '0';
    }
  }
  
  private splitStringFromEnd(customString, every): string[] {
    var result = [], counter = every;
    for (var i = counter; counter <= customString.length; counter += every) {
      result.unshift(customString.substr(customString.length - counter, every))
    }
    var diff = counter - customString.length;
    var remainder = every - diff;
    if(remainder > 0) { result.unshift(customString.substr(0, remainder)) }
    return result;
  }

}

interface Arguments{
  decimal?: string, thousands?: string
}
