import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { IsoCurrencyPipe } from './pipes/iso-currency.pipe';
import { FormsModule } from '@angular/forms';
import { BotonesAccionesComponent } from './components/botones-acciones/botones-acciones.component';
import { MaterialModule } from '../material/material.module';
import { DialogoEliminarComponent } from './components/dialogo-eliminar/dialogo-eliminar.component';
import { EncabezadoDefinicionComponent } from './components/encabezado-definicion/encabezado-definicion.component';
import { BotonesDefinicionComponent } from './components/botones-definicion/botones-definicion.component';
import { BotonesDefinicionesComponent } from './components/botones-definiciones/botones-definiciones.component';
import { EncabezadoDefinicionesComponent } from './components/encabezado-definiciones/encabezado-definiciones.component';
import { BuscadorCuentaContableComponent } from './components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { NumeroSeriePipe } from './pipes/numero-serie.pipe';
import { NumeroCorrelativoPipe } from './pipes/numero-correlativo.pipe';
import { DenominacionCorrelativoPipe } from './pipes/denominacion-correlativo.pipe';

const sharedComponents = [
  LoadingScreenComponent,
  ToolbarComponent,
  BotonesAccionesComponent,
  DialogoEliminarComponent,
  EncabezadoDefinicionComponent,
  BotonesDefinicionComponent,
  BotonesDefinicionesComponent,
  EncabezadoDefinicionesComponent,
  BuscadorCuentaContableComponent,
];

const sharedPipes = [
  IsoCurrencyPipe,
  NumeroSeriePipe,
  NumeroCorrelativoPipe,
  DenominacionCorrelativoPipe,
];

@NgModule({
  declarations: [...sharedComponents, ...sharedPipes],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [...sharedComponents, ...sharedPipes],
})
export class SharedModule {}
