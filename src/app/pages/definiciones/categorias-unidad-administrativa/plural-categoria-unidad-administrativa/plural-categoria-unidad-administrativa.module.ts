import { TablaCategoriaUnidadAdministrativaModule } from './../tabla-categoria-unidad-administrativa/tabla-categoria-unidad-administrativa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluralCategoriaUnidadAdministrativaComponent } from '../plural-categoria-unidad-administrativa/plural-categoria-unidad-administrativa.component';
import { PluralCategoriaUnidadAdministrativaRoutingModule } from './plural-categoria-unidad-administrativa-routing.module';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [PluralCategoriaUnidadAdministrativaComponent],
  imports: [
    CommonModule,
    PluralCategoriaUnidadAdministrativaRoutingModule,
    TablaCategoriaUnidadAdministrativaModule,
    SharedModule,
  ],
})
export class PluralCategoriaUnidadAdministrativaModule {}
