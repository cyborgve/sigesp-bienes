import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorMarcaComponent } from './buscador-marca.component';
import { TablaMarcaModule } from '../tabla-marca/tabla-marca.module';

@NgModule({
  declarations: [BuscadorMarcaComponent],
  imports: [CommonModule, TablaMarcaModule],
  exports: [BuscadorMarcaComponent],
})
export class BuscadorMarcaModule {}
