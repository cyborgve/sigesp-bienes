import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorPlantillaIntegracionComponent } from './buscador-plantilla-integracion.component';
import { TablaPlantillaIntegracionModule } from '../tabla-plantilla-integracion/tabla-plantilla-integracion.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorPlantillaIntegracionComponent],
  imports: [CommonModule, TablaPlantillaIntegracionModule, MatDialogModule],
  exports: [BuscadorPlantillaIntegracionComponent],
})
export class BuscadorPlantillaIntegracionModule {}
