import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorTipoMarcaComponent } from './buscador-tipo-marca.component';
import { TablaTipoMarcaModule } from '../tabla-tipo-marca/tabla-tipo-marca.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [BuscadorTipoMarcaComponent],
  imports: [CommonModule, SharedModule, TablaTipoMarcaModule],
  exports: [BuscadorTipoMarcaComponent],
})
export class BuscadorTipoMarcaModule {}
