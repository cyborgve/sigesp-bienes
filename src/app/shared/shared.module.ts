import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { IsoCurrencyPipe } from './pipes/iso-currency.pipe';
import { FormsModule } from '@angular/forms';
import { BotonesAccionesComponent } from './components/botones-acciones/botones-acciones.component';
import { MaterialModule } from '../material/material.module';

const sharedComponents = [
  ToolbarComponent,
  LoadingScreenComponent,
  CurrencyInputComponent,
  BotonesAccionesComponent,
];

const sharedPipes = [IsoCurrencyPipe];

const sharedModules = [FormsModule];

@NgModule({
  declarations: [...sharedComponents, ...sharedPipes],
  imports: [CommonModule, MaterialModule, ...sharedModules],
  exports: [...sharedComponents, ...sharedModules, ...sharedPipes],
})
export class SharedModule {}
