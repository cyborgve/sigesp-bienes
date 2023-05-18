import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaEstadoConservacionComponent } from './tabla-estado-conservacion.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaEstadoConservacionComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaEstadoConservacionComponent],
})
export class TablaEstadoConservacionModule {}
