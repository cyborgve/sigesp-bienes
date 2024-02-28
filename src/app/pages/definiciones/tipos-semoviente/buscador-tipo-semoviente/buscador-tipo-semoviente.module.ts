import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorTipoSemovienteComponent } from './buscador-tipo-semoviente.component';
import { TablaTipoSemovienteModule } from '../tabla-tipo-semoviente/tabla-tipo-semoviente.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorTipoSemovienteComponent],
  imports: [CommonModule, TablaTipoSemovienteModule, MatDialogModule],
  exports: [BuscadorTipoSemovienteComponent],
})
export class BuscadorTipoSemovienteModule {}
