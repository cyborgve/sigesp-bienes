import { TablaCausaMovimientoModule } from './../tabla-causa-movimiento/tabla-causa-movimiento.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorCausaMovimientoComponent } from './buscador-causa-movimiento.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorCausaMovimientoComponent],
  imports: [CommonModule, TablaCausaMovimientoModule, MatDialogModule],
  exports: [BuscadorCausaMovimientoComponent],
})
export class BuscadorCausaMovimientoModule {}
