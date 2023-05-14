import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorAseguradoraComponent } from './buscador-aseguradora.component';
import { TablaAseguradoraModule } from '../tabla-aseguradora/tabla-aseguradora.module';

@NgModule({
  declarations: [BuscadorAseguradoraComponent],
  imports: [CommonModule, TablaAseguradoraModule],
  exports: [BuscadorAseguradoraComponent],
})
export class BuscadorAseguradoraModule {}
