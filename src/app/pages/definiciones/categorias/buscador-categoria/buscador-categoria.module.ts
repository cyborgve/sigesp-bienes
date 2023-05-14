import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorCategoriaComponent } from './buscador-categoria.component';
import { TablaCategoriaModule } from '../tabla-categoria/tabla-categoria.module';

@NgModule({
  declarations: [BuscadorCategoriaComponent],
  imports: [CommonModule, TablaCategoriaModule],
  exports: [BuscadorCategoriaComponent],
})
export class BuscadorCategoriaModule {}
