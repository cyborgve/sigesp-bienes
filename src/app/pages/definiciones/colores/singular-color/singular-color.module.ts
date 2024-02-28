import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularColorRoutingModule } from './singular-color-routing.module';
import { SingularColorComponent } from './singular-color.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorColorModule } from '../buscador-color/buscador-color.module';
@NgModule({
  declarations: [SingularColorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularColorRoutingModule,
    BuscadorColorModule,
    SharedModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularColorModule {}
