import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularClaseRoutingModule } from './singular-clase-routing.module';
import { SingularClaseComponent } from './singular-clase.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { BuscadorClaseModule } from '../buscador-clase/buscador-clase.module';

@NgModule({
  declarations: [SingularClaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SingularClaseRoutingModule,
    BuscadorClaseModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularClaseModule {}
