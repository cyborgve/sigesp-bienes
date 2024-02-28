import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCatalogoGeneralRoutingModule } from './singular-catalogo-general-routing.module';
import { SingularCatalogoGeneralComponent } from './singular-catalogo-general.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorCatalogoGeneralModule } from '../buscador-catalogo-general/buscador-catalogo-general.module';

@NgModule({
  declarations: [SingularCatalogoGeneralComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCatalogoGeneralRoutingModule,
    BuscadorCatalogoGeneralModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularCatalogoGeneralModule {}
