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
import { TipoMarcaPipe } from './pipes/tipo-marca.pipe';
import { DenominacionMarcaPipe } from './pipes/denominacion-marca.pipe';
import { DenominacionCorrelativoPipe } from './pipes/denominacion-correlativo.pipe';
import { DenominacionModeloPipe } from './pipes/denominacion-modelo.pipe';
import { DenominacionColorPipe } from './pipes/denominacion-color.pipe';
import { DenominacionRotulacionPipe } from './pipes/denominacion-rotulacion.pipe';
import { DenominacionCategoriaPipe } from './pipes/denominacion-categoria.pipe';
import { DenominacionOrigenPipe } from './pipes/denominacion-origen.pipe';
import { DenominacionSeguroPipe } from './pipes/denominacion-seguro.pipe';
import { DenominacionClasePipe } from './pipes/denominacion-clase.pipe';
import { DenominacionSedePipe } from './pipes/denominacion-sede.pipe';
import { DenominacionTipoSemovientePipe } from './pipes/denominacion-tipo-semoviente.pipe';
import { DenominacionPropositoSemovientePipe } from './pipes/denominacion-proposito-semoviente.pipe';
import { DenominacionTipoUsoPipe } from './pipes/denominacion-tipo-uso.pipe';
import { DenominacionTipoAnimalPipe } from './pipes/denominacion-tipo-animal.pipe';
import { DenominacionRazaPipe } from './pipes/denominacion-raza.pipe';

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
  TipoMarcaPipe,
  DenominacionMarcaPipe,
  DenominacionCorrelativoPipe,
  DenominacionModeloPipe,
  DenominacionColorPipe,
  DenominacionRotulacionPipe,
  DenominacionCategoriaPipe,
  DenominacionOrigenPipe,
  DenominacionSeguroPipe,
  DenominacionClasePipe,
  DenominacionSedePipe,
];

@NgModule({
  declarations: [
    ...sharedComponents,
    ...sharedPipes,
    DenominacionTipoSemovientePipe,
    DenominacionPropositoSemovientePipe,
    DenominacionTipoUsoPipe,
    DenominacionTipoAnimalPipe,
    DenominacionRazaPipe,
  ],
  imports: [CommonModule, FormsModule, MaterialModule],
  exports: [
    ...sharedComponents,
    ...sharedPipes,
    DenominacionPropositoSemovientePipe,
    DenominacionTipoSemovientePipe,
    DenominacionTipoUsoPipe,
    DenominacionTipoAnimalPipe,
    DenominacionRazaPipe,
  ],
})
export class SharedModule {}
