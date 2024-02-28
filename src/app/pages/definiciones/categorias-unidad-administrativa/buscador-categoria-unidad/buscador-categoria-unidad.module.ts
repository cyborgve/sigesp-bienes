import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorCategoriaUnidadComponent } from './buscador-categoria-unidad.component';
import { TablaCategoriaUnidadModule } from '../tabla-categoria-unidad/tabla-categoria-unidad.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorCategoriaUnidadComponent],
  imports: [CommonModule, TablaCategoriaUnidadModule, MatDialogModule],
  exports: [BuscadorCategoriaUnidadComponent],
})
export class BuscadorCategoriaUnidadModule {}
