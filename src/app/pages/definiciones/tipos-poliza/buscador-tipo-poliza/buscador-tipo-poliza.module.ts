import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorTipoPolizaComponent } from './buscador-tipo-poliza.component';
import { TablaTipoPolizaModule } from '../tabla-tipo-poliza/tabla-tipo-poliza.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorTipoPolizaComponent],
  imports: [CommonModule, TablaTipoPolizaModule, MatDialogModule],
  exports: [BuscadorTipoPolizaComponent],
})
export class BuscadorTipoPolizaModule {}
