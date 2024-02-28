import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorCatalogoGeneralComponent } from './buscador-catalogo-general.component';
import { TablaCatalogoGeneralModule } from '../tabla-catalogo-general/tabla-catalogo-general.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorCatalogoGeneralComponent],
  imports: [CommonModule, TablaCatalogoGeneralModule, MatDialogModule],
  exports: [BuscadorCatalogoGeneralComponent],
})
export class BuscadorCatalogoGeneralModule {}
