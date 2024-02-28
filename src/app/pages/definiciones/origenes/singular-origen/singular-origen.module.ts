import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularOrigenRoutingModule } from './singular-origen-routing.module';
import { SingularOrigenComponent } from './singular-origen.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BuscadorOrigenModule } from '../buscador-origen/buscador-origen.module';

@NgModule({
  declarations: [SingularOrigenComponent],
  imports: [
    CommonModule,
    SingularOrigenRoutingModule,
    SharedModule,
    BuscadorOrigenModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
})
export class SingularOrigenModule {}
