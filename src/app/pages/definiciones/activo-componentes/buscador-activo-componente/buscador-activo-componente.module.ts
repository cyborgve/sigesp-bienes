import { NgModule } from '@angular/core';
import { BuscadorActivoComponenteComponent } from './buscador-activo-componente.component';
import { TablaActivoComponenteModule } from '../tabla-activo-componente/tabla-activo-componente.module';
import { CommonModule } from '@angular/common';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@NgModule({
  declarations: [BuscadorActivoComponenteComponent],
  imports: [CommonModule, TablaActivoComponenteModule],
  exports: [BuscadorActivoComponenteComponent],
})
export class BuscadorActivoComponenteModule {
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ACTIVO_COMPONENTES.filter(
    str => str !== 'acciones'
  );
}
