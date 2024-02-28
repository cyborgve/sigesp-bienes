import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorTipoComponenteComponent } from './buscador-tipo-componente.component';
import { TablaTipoComponenteModule } from '../tabla-tipo-componente/tabla-tipo-componente.module';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';

@NgModule({
  declarations: [BuscadorTipoComponenteComponent],
  imports: [CommonModule, TablaTipoComponenteModule, MatDialogModule],
  exports: [BuscadorTipoComponenteComponent],
})
export class BuscadorTipoComponenteModule {}
