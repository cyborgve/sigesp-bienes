import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorPropositoSemovienteComponent } from './buscador-proposito-semoviente.component';
import { TablaPropositoSemovienteModule } from '../tabla-proposito-semoviente/tabla-proposito-semoviente.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorPropositoSemovienteComponent],
  imports: [CommonModule, TablaPropositoSemovienteModule, MatDialogModule],
  exports: [BuscadorPropositoSemovienteComponent],
})
export class BuscadorPropositoSemovienteModule {}
