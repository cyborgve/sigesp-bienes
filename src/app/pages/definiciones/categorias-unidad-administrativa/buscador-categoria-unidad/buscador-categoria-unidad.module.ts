import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorCategoriaUnidadComponent } from './buscador-categoria-unidad.component';
import { TablaCategoriaUnidadModule } from '../tabla-categoria-unidad/tabla-categoria-unidad.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorCategoriaUnidadComponent],
  imports: [CommonModule, TablaCategoriaUnidadModule, MatDialogModule],
  exports: [BuscadorCategoriaUnidadComponent],
})
export class BuscadorCategoriaUnidadModule {}
