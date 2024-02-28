import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorAseguradoraComponent } from './buscador-aseguradora.component';
import { TablaAseguradoraModule } from '../tabla-aseguradora/tabla-aseguradora.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorAseguradoraComponent],
  imports: [CommonModule, TablaAseguradoraModule, MatDialogModule],
  exports: [BuscadorAseguradoraComponent],
})
export class BuscadorAseguradoraModule {}
