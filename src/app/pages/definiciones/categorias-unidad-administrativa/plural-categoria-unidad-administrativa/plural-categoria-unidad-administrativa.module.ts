import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluralCategoriaUnidadAdministrativaComponent } from '../plural-categoria-unidad-administrativa/plural-categoria-unidad-administrativa.component';
import { PluralCategoriaUnidadAdministrativaRoutingModule } from './plural-categoria-unidad-administrativa-routing.module';

@NgModule({
  declarations: [PluralCategoriaUnidadAdministrativaComponent],
  imports: [CommonModule, PluralCategoriaUnidadAdministrativaRoutingModule],
})
export class PluralCategoriaUnidadAdministrativaModule {}
