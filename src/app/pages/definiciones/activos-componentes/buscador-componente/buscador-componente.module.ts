import { TablaComponenteModule } from './../tabla-componente/tabla-componente.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponenteComponent } from './buscador-componente.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorComponenteComponent],
  imports: [CommonModule, TablaComponenteModule, MatDialogModule],
  exports: [BuscadorComponenteComponent],
})
export class BuscadorComponenteModule {}
