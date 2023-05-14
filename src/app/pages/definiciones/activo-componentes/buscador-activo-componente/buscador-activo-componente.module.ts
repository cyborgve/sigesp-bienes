import { NgModule } from '@angular/core';
import { BuscadorActivoComponenteComponent } from './buscador-activo-componente.component';
import { TablaActivoComponenteModule } from '../tabla-activo-componente/tabla-activo-componente.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BuscadorActivoComponenteComponent],
  imports: [CommonModule, TablaActivoComponenteModule],
  exports: [BuscadorActivoComponenteComponent],
})
export class BuscadorActivoComponenteModule {}
