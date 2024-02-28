import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorTipoCoberturaComponent } from './buscador-tipo-cobertura.component';
import { TablaTipoCoberturaModule } from '../tabla-tipo-cobertura/tabla-tipo-cobertura.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorTipoCoberturaComponent],
  imports: [CommonModule, TablaTipoCoberturaModule, MatDialogModule],
  exports: [BuscadorTipoCoberturaComponent],
})
export class BuscadorTipoCoberturaModule {}
