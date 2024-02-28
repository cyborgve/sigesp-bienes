import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularSeguroRoutingModule } from './singular-seguro-routing.module';
import { SingularSeguroComponent } from './singular-seguro.component';
import { BuscadorSeguroModule } from '../buscador-seguro/buscador-seguro.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
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
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
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
