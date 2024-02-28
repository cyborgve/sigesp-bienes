import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorIncorporacionComponent } from './buscador-incorporacion.component';
import { TablaIncorporacionModule } from '../tabla-incorporacion/tabla-incorporacion.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorIncorporacionComponent],
  imports: [CommonModule, TablaIncorporacionModule, MatDialogModule],
  exports: [BuscadorIncorporacionComponent],
})
export class BuscadorIncorporacionModule {}
