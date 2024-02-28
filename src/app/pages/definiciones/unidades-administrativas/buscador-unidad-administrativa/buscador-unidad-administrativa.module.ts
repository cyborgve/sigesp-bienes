import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorUnidadAdministrativaComponent } from './buscador-unidad-administrativa.component';
import { TablaUnidadAdministrativaModule } from '../tabla-unidad-administrativa/tabla-unidad-administrativa.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorUnidadAdministrativaComponent],
  imports: [CommonModule, TablaUnidadAdministrativaModule, MatDialogModule],
  exports: [BuscadorUnidadAdministrativaComponent],
})
export class BuscadorUnidadAdministrativaModule {}
