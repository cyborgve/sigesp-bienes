import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorDepreciacionComponent } from './buscador-depreciacion.component';
import { TablaDepreciacionModule } from '../tabla-depreciacion/tabla-depreciacion.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorDepreciacionComponent],
  imports: [CommonModule, TablaDepreciacionModule, MatDialogModule],
  exports: [BuscadorDepreciacionComponent],
})
export class BuscadorDepreciacionModule {}
