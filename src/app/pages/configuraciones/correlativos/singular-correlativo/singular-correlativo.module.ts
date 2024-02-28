import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCorrelativoRoutingModule } from './singular-correlativo-routing.module';
import { SingularCorrelativoComponent } from './singular-correlativo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { SharedModule } from '@shared/shared.module';
import { BuscadorCorrelativoModule } from '../buscador-correlativo/buscador-correlativo.module';
import { AdvertenciaCorrelativoComponent } from './advertencia-correlativo.component';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  declarations: [SingularCorrelativoComponent, AdvertenciaCorrelativoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    SingularCorrelativoRoutingModule,
    BuscadorCorrelativoModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class SingularCorrelativoModule {}
