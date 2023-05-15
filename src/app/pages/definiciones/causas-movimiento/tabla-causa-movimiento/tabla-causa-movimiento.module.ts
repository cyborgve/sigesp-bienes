import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCausaMovimientoComponent } from './tabla-causa-movimiento.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaCausaMovimientoComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaCausaMovimientoComponent],
})
export class TablaCausaMovimientoModule {}
