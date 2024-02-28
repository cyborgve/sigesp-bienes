import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoPolizaRoutingModule } from './singular-tipo-poliza-routing.module';
import { SingularTipoPolizaComponent } from './singular-tipo-poliza.component';
import { BuscadorTipoPolizaModule } from '../buscador-tipo-poliza/buscador-tipo-poliza.module';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingularTipoPolizaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoPolizaRoutingModule,
    BuscadorTipoPolizaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoPolizaModule {}
