import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPlantillaIntegracionComponent } from './buscador-plantilla-integracion.component';
import { TablaPlantillaIntegracionModule } from '../tabla-plantilla-integracion/tabla-plantilla-integracion.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorPlantillaIntegracionComponent],
  imports: [CommonModule, TablaPlantillaIntegracionModule, MatDialogModule],
  exports: [BuscadorPlantillaIntegracionComponent],
})
export class BuscadorPlantillaIntegracionModule {}
