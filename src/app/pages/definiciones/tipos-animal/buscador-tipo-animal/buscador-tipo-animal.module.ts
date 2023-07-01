import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorTipoAnimalComponent } from './buscador-tipo-animal.component';
import { TablaTipoAnimalModule } from '../tabla-tipo-animal/tabla-tipo-animal.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorTipoAnimalComponent],
  imports: [CommonModule, TablaTipoAnimalModule, MatDialogModule],
  exports: [BuscadorTipoAnimalComponent],
})
export class BuscadorTipoAnimalModule {}
