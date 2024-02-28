import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorTipoUsoComponent } from './buscador-tipo-uso.component';
import { TablaTipoUsoModule } from '../tabla-tipo-uso/tabla-tipo-uso.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorTipoUsoComponent],
  imports: [CommonModule, TablaTipoUsoModule, MatDialogModule],
  exports: [BuscadorTipoUsoComponent],
})
export class BuscadorTipoUsoModule {}
