import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorModificacionComponent } from './buscador-modificacion.component';
import { TablaModificacionModule } from '../tabla-modificacion/tabla-modificacion.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorModificacionComponent],
  imports: [CommonModule, TablaModificacionModule, MatDialogModule],
  exports: [BuscadorModificacionComponent],
})
export class BuscadorModificacionModule {}
