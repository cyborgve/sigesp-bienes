import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingularCategoriaUnidadAdministrativaComponent } from '../singular-categoria-unidad-administrativa/singular-categoria-unidad-administrativa.component';
import { SingularCategoriaUnidadAdministrativaRoutingModule } from './singular-categoria-unidad-administrativa-routing.module';

@NgModule({
  declarations: [SingularCategoriaUnidadAdministrativaComponent],
  imports: [CommonModule, SingularCategoriaUnidadAdministrativaRoutingModule],
  exports: [SingularCategoriaUnidadAdministrativaComponent],
})
export class SingularCategoriaUnidadAdministrativaModule {}
