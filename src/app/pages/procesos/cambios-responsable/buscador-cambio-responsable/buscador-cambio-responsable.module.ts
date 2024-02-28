import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorCambioResponsableComponent } from './buscador-cambio-responsable.component';
import { TablaCambioResponsableModule } from '../tabla-cambio-responsable/tabla-cambio-responsable.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorCambioResponsableComponent],
  imports: [CommonModule, TablaCambioResponsableModule, MatDialogModule],
  exports: [BuscadorCambioResponsableComponent],
})
export class BuscadorCambioResponsableModule {}
