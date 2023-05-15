import { TablaCausaMovimientoModule } from './../tabla-causa-movimiento/tabla-causa-movimiento.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorCausaMovimientoComponent } from './buscador-causa-movimiento.component';

@NgModule({
  declarations: [BuscadorCausaMovimientoComponent],
  imports: [CommonModule, TablaCausaMovimientoModule],
  exports: [BuscadorCausaMovimientoComponent],
})
export class BuscadorCausaMovimientoModule {}
