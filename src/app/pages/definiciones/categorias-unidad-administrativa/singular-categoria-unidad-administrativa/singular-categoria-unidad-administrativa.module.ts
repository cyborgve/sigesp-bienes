import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingularCategoriaUnidadAdministrativaComponent } from '../singular-categoria-unidad-administrativa/singular-categoria-unidad-administrativa.component';
import { SingularCategoriaUnidadAdministrativaRoutingModule } from './singular-categoria-unidad-administrativa-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BuscadorCategoriaUnidadAdministrativaModule } from '../buscador-categoria-unidad-administrativa/buscador-categoria-unidad-administrativa.module';

@NgModule({
  declarations: [SingularCategoriaUnidadAdministrativaComponent],
  imports: [
    CommonModule,
    SingularCategoriaUnidadAdministrativaRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    BuscadorCategoriaUnidadAdministrativaModule,
  ],
  exports: [SingularCategoriaUnidadAdministrativaComponent],
})
export class SingularCategoriaUnidadAdministrativaModule {}
