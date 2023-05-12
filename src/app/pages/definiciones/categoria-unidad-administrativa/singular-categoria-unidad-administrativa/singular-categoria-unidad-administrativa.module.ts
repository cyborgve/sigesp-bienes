import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCategoriaUnidadAdministrativaRoutingModule } from './singular-categoria-unidad-administrativa-routing.module';
import { SingularCategoriaUnidadAdministrativaComponent } from './singular-categoria-unidad-administrativa.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [SingularCategoriaUnidadAdministrativaComponent],
  imports: [
    CommonModule,
    SingularCategoriaUnidadAdministrativaRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
  ],
})
export class SingularCategoriaUnidadAdministrativaModule {}
