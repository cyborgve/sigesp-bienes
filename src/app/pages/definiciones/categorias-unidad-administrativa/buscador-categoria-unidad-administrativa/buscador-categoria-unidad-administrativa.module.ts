import { BuscadorCategoriaUnidadAdministrativaComponent } from './buscador-categoria-unidad-administrativa.component';
import { TablaCategoriaUnidadAdministrativaModule } from './../tabla-categoria-unidad-administrativa/tabla-categoria-unidad-administrativa.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BuscadorCategoriaUnidadAdministrativaComponent],
  imports: [CommonModule, TablaCategoriaUnidadAdministrativaModule],
})
export class BuscadorCategoriaUnidadAdministrativaModule {}
