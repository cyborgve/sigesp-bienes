import { TablaEstadoConservacionModule } from './../tabla-estado-conservacion/tabla-estado-conservacion.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorEstadoConservacionComponent } from './buscador-estado-conservacion.component';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorEstadoConservacionComponent],
  imports: [CommonModule, TablaEstadoConservacionModule, MatDialogModule],
  exports: [BuscadorEstadoConservacionComponent],
})
export class BuscadorEstadoConservacionModule {}
