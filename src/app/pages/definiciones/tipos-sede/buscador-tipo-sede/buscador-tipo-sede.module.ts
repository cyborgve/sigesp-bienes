import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorTipoSedeComponent } from './buscador-tipo-sede.component';
import { TablaTipoSedeModule } from '../tabla-tipo-sede/tabla-tipo-sede.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorTipoSedeComponent],
  imports: [CommonModule, TablaTipoSedeModule, MatDialogModule],
  exports: [BuscadorTipoSedeComponent],
})
export class BuscadorTipoSedeModule {}
