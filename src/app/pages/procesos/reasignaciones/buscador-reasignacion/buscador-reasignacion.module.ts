import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorReasignacionComponent } from './buscador-reasignacion.component';
import { TablaReasignacionModule } from '../tabla-reasignacion/tabla-reasignacion.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorReasignacionComponent],
  imports: [CommonModule, TablaReasignacionModule, MatDialogModule],
  exports: [BuscadorReasignacionComponent],
})
export class BuscadorReasignacionModule {}
