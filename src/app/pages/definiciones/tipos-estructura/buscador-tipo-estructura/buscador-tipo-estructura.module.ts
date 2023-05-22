import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorTipoEstructuraComponent } from './buscador-tipo-estructura.component';
import { TablaTipoEstructuraModule } from '../tabla-tipo-estructura/tabla-tipo-estructura.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorTipoEstructuraComponent],
  imports: [CommonModule, TablaTipoEstructuraModule, MatDialogModule],
  exports: [BuscadorTipoEstructuraComponent],
})
export class BuscadorTipoEstructuraModule {}
