import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MMonedaConfig, CurrencyService } from 'sigesp';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
})
export class CurrencyInputComponent implements OnInit {
  constructor(public validation: CurrencyService) {}

  @Input() public value: number = 0;
  @Input() public currency: MMonedaConfig = null;
  @Input() public disabled: boolean = false;
  @Input() public placeholer: string = '';

  @Output() public isReturn: EventEmitter<number> = new EventEmitter<number>();
  @Output() public isBlur: EventEmitter<number> = new EventEmitter<number>();

  public stringValue: string = null;

  ngOnInit() {
    this.stringValue = this.validation.transformString(
      this.value,
      this.currency.separadorDecimal,
      this.currency.separadorMiles
    );
  }

  public valueChange(string: string) {
    this.stringValue = string;
    this.value = this.validation.transformNumber(
      this.stringValue,
      this.currency
    );
    this.isReturn.emit(this.value);
  }

  public validate(e: KeyboardEvent): boolean {
    if (e.key == '-') {
      return true;
    }
    return this.validation.checkCurrency(e, this.stringValue, this.currency);
  }
}
