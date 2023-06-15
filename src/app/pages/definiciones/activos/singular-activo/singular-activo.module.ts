import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SingularActivoRoutingModule } from './singular-activo-routing.module';
import { BuscadorActivoModule } from '../buscador-activo/buscador-activo.module';

import { SharedModule } from '@shared/shared.module';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SingularActivoComponent } from './singular-activo.component';
import { ActivoDatosGeneralesComponent } from './activo-datos-generales/activo-datos-generales.component';
import { ActivoComponentesComponent } from './activo-componentes/activo-componentes.component';
import { ActivoDepreciacionComponent } from './activo-depreciacion/activo-depreciacion.component';
import { ActivoDetallesComponent } from './activo-detalles/activo-detalles.component';
import { ActivoUbicacionComponent } from './activo-ubicacion/activo-ubicacion.component';
import { BuscadorOrigenModule } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.module';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { BuscadorSedeModule } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.module';
import { BuscadorResponsableModule } from '@pages/definiciones/responsables/buscador-responsable/buscador-responsable.module';
import { BuscadorEstadoUsoModule } from '@pages/definiciones/estados-uso/buscador-estado-uso/buscador-estado-uso.module';
import { BuscadorEstadoConservacionModule } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.module';
import { BuscadorMarcaModule } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.module';
import { BuscadorModeloModule } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.module';
import { BuscadorColorModule } from '@pages/definiciones/colores/buscador-color/buscador-color.module';
import { BuscadorClaseModule } from '@pages/definiciones/clases/buscador-clase/buscador-clase.module';
import { BuscadorUsoModule } from '@pages/definiciones/usos/buscador-uso/buscador-uso.module';
import { BuscadorTipoSemovienteModule } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.module';
import { BuscadorPropositoSemovienteModule } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.module';
import { BuscadorCategoriaModule } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.module';
import { BuscadorSeguroModule } from '@pages/definiciones/seguros/buscador-seguro/buscador-seguro.module';
import { BuscadorRazaModule } from '@pages/definiciones/razas/buscador-raza/buscador-raza.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BuscadorComponenteActivoModule } from '@pages/definiciones/componentes-activo/buscador-componente-activo/buscador-componente-activo.module';
import { BuscadorRotulacionModule } from '@pages/definiciones/rotulaciones/buscador-rotulacion/buscador-rotulacion.module';

@NgModule({
  declarations: [
    SingularActivoComponent,
    ActivoDatosGeneralesComponent,
    ActivoComponentesComponent,
    ActivoDepreciacionComponent,
    ActivoDetallesComponent,
    ActivoUbicacionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularActivoRoutingModule,
    BuscadorActivoModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BuscadorOrigenModule,
    BuscadorUnidadAdministrativaModule,
    BuscadorSedeModule,
    BuscadorResponsableModule,
    BuscadorEstadoUsoModule,
    BuscadorEstadoConservacionModule,
    BuscadorMarcaModule,
    BuscadorModeloModule,
    BuscadorColorModule,
    BuscadorClaseModule,
    BuscadorUsoModule,
    BuscadorTipoSemovienteModule,
    BuscadorPropositoSemovienteModule,
    BuscadorCategoriaModule,
    BuscadorComponenteActivoModule,
    BuscadorSeguroModule,
    BuscadorRazaModule,
    BuscadorRotulacionModule,
  ],
})
export class SingularActivoModule {}
