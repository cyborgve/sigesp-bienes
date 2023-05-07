import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { IsoCurrencyPipe } from './pipes/iso-currency.pipe';
import { FormsModule } from '@angular/forms';

const sharedComponents = [
  ToolbarComponent,
  LoadingScreenComponent,
  CurrencyInputComponent,
];

const sharedPipes = [IsoCurrencyPipe];

const sharedModules = [FormsModule];

@NgModule({
  declarations: [...sharedComponents, ...sharedPipes],
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedComponents, ...sharedModules, ...sharedPipes],
})
export class SharedModule {}
