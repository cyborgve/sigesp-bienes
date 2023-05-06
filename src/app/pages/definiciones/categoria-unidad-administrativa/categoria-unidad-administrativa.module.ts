import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaUnidadAdministrativaRoutingModule } from './categoria-unidad-administrativa-routing.module';
import { CategoriaUnidadAdministrativaComponent } from './categoria-unidad-administrativa.component';

@NgModule({
  declarations: [CategoriaUnidadAdministrativaComponent],
  imports: [CommonModule, CategoriaUnidadAdministrativaRoutingModule],
})
export class CategoriaUnidadAdministrativaModule {}
