import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularRotulacionRoutingModule } from './singular-rotulacion-routing.module';
import { SingularRotulacionComponent } from './singular-rotulacion.component';
import { BuscadorRotulacionModule } from '../buscador-rotulacion/buscador-rotulacion.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

@NgModule({
  declarations: [SingularRotulacionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularRotulacionRoutingModule,
    BuscadorRotulacionModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularRotulacionModule {}
