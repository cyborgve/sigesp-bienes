import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorAseguradoraComponent } from './buscador-aseguradora.component';
import { TablaAseguradoraModule } from '../tabla-aseguradora/tabla-aseguradora.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorAseguradoraComponent],
  imports: [CommonModule, TablaAseguradoraModule, MatDialogModule],
  exports: [BuscadorAseguradoraComponent],
})
export class BuscadorAseguradoraModule {}
