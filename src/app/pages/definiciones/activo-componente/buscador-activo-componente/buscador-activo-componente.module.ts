import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorActivoComponenteComponent } from './buscador-activo-componente.component';
import { TablaActivoComponenteModule } from '../tabla-activo-componente/tabla-activo-componente.module';

@NgModule({
  declarations: [BuscadorActivoComponenteComponent],
  imports: [CommonModule, TablaActivoComponenteModule],
  exports: [BuscadorActivoComponenteComponent],
})
export class BuscadorActivoComponenteModule {}
