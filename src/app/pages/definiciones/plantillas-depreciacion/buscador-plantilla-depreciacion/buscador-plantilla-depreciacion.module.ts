import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPlantillaDepreciacionComponent } from './buscador-plantilla-depreciacion.component';
import { TablaPlantillaDepreciacionModule } from '../tabla-plantilla-depreciacion/tabla-plantilla-depreciacion.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorPlantillaDepreciacionComponent],
  imports: [CommonModule, TablaPlantillaDepreciacionModule, MatDialogModule],
  exports: [BuscadorPlantillaDepreciacionComponent],
})
export class BuscadorPlantillaDepreciacionModule {}
