import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorCategoriaComponent } from './buscador-categoria.component';
import { TablaCategoriaModule } from '../tabla-categoria/tabla-categoria.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorCategoriaComponent],
  imports: [CommonModule, TablaCategoriaModule, MatDialogModule],
  exports: [BuscadorCategoriaComponent],
})
export class BuscadorCategoriaModule {}
