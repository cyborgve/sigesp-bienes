import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorDesincorporacionComponent } from './buscador-desincorporacion.component';
import { TablaDesincorporacionModule } from '../tabla-desincorporacion/tabla-desincorporacion.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorDesincorporacionComponent],
  imports: [CommonModule, TablaDesincorporacionModule, MatDialogModule],
  exports: [BuscadorDesincorporacionComponent],
})
export class BuscadorDesincorporacionModule {}
