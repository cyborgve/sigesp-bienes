import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { IsoCurrencyPipe } from './pipes/iso-currency.pipe';
import { FormsModule } from '@angular/forms';
import { BotonesAccionesComponent } from './components/botones-acciones/botones-acciones.component';
import { MaterialModule } from '../material/material.module';
import { DialogoEliminarComponent } from './components/dialogo-eliminar/dialogo-eliminar.component';
import { EncabezadoDefinicionComponent } from './components/encabezado-definicion/encabezado-definicion.component';
import { BotonesDefinicionComponent } from './components/botones-definicion/botones-definicion.component';
import { BotonesDefinicionesComponent } from './components/botones-definiciones/botones-definiciones.component';
import { EncabezadoDefinicionesComponent } from './components/encabezado-definiciones/encabezado-definiciones.component';
import { TablaCuentaContableComponent } from './components/tabla-cuenta-contable/tabla-cuenta-contable.component';

const sharedComponents = [
  ToolbarComponent,
  LoadingScreenComponent,
  CurrencyInputComponent,
  BotonesAccionesComponent,
  DialogoEliminarComponent,
  EncabezadoDefinicionComponent,
  BotonesDefinicionComponent,
  BotonesDefinicionesComponent,
  EncabezadoDefinicionesComponent,
  TablaCuentaContableComponent,
];

const sharedPipes = [IsoCurrencyPipe];

@NgModule({
  declarations: [...sharedComponents, ...sharedPipes],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [...sharedComponents, ...sharedPipes],
})
export class SharedModule {}
