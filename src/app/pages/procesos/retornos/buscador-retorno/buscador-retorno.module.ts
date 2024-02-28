import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorRetornoComponent } from './buscador-retorno.component';
import { TablaRetornoModule } from '../tabla-retorno/tabla-retorno.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorRetornoComponent],
  imports: [CommonModule, TablaRetornoModule, MatDialogModule],
  exports: [BuscadorRetornoComponent],
})
export class BuscadorRetornoModule {}
