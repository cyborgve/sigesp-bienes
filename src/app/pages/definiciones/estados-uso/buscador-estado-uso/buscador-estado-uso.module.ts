import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorEstadoUsoComponent } from './buscador-estado-uso.component';
import { TablaEstadoUsoModule } from '../tabla-estado-uso/tabla-estado-uso.module';

@NgModule({
  declarations: [BuscadorEstadoUsoComponent],
  imports: [CommonModule, TablaEstadoUsoModule],
  exports: [BuscadorEstadoUsoComponent],
})
export class BuscadorEstadoUsoModule {}
