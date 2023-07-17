import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorAutorizacionSalidaComponent } from './buscador-autorizacion-salida.component';
import { TablaAutorizacionSalidaModule } from '../tabla-autorizacion-salida/tabla-autorizacion-salida.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorAutorizacionSalidaComponent],
  imports: [CommonModule, TablaAutorizacionSalidaModule, MatDialogModule],
  exports: [BuscadorAutorizacionSalidaComponent],
})
export class BuscadorAutorizacionSalidaModule {}
