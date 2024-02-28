import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorDepreciacionComponent } from './buscador-depreciacion.component';
import { TablaDepreciacionModule } from '../tabla-depreciacion/tabla-depreciacion.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorDepreciacionComponent],
  imports: [CommonModule, TablaDepreciacionModule, MatDialogModule],
  exports: [BuscadorDepreciacionComponent],
})
export class BuscadorDepreciacionModule {}
