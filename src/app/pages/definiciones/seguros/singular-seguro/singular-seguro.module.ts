import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularSeguroRoutingModule } from './singular-seguro-routing.module';
import { SingularSeguroComponent } from './singular-seguro.component';
import { BuscadorSeguroModule } from '../buscador-seguro/buscador-seguro.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BuscadorAseguradoraModule } from '@pages/definiciones/aseguradoras/buscador-aseguradora/buscador-aseguradora.module';
import { BuscadorTipoPolizaModule } from '@pages/definiciones/tipos-poliza/buscador-tipo-poliza/buscador-tipo-poliza.module';
import { BuscadorTipoCoberturaModule } from '@pages/definiciones/tipos-cobertura/buscador-tipo-cobertura/buscador-tipo-cobertura.module';

@NgModule({
  declarations: [SingularSeguroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SingularSeguroRoutingModule,
    BuscadorSeguroModule,
    BuscadorAseguradoraModule,
    BuscadorTipoPolizaModule,
    BuscadorTipoCoberturaModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-Ve' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class SingularSeguroModule {}
