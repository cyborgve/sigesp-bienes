import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularActivoRoutingModule } from './singular-activo-routing.module';
import { SingularActivoComponent } from './singular-activo.component';
import { BuscadorActivoModule } from '../buscador-activo/buscador-activo.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { ActivoDatosGeneralesComponent } from './activo-datos-generales/activo-datos-generales.component';
import { ActivoComponentesComponent } from './activo-componentes/activo-componentes.component';
import { ActivoDepreciacionComponent } from './activo-depreciacion/activo-depreciacion.component';
import { ActivoDocumentacionComponent } from './activo-documentacion/activo-documentacion.component';
import { ActivoSeguroComponent } from './activo-seguro/activo-seguro.component';
import { ActivoOrigenComponent } from './activo-origen/activo-origen.component';
import { ActivoResponsableComponent } from './activo-responsable/activo-responsable.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivoUbicacionComponent } from './activo-ubicacion/activo-ubicacion.component';

@NgModule({
  declarations: [
    SingularActivoComponent,
    ActivoDatosGeneralesComponent,
    ActivoComponentesComponent,
    ActivoDepreciacionComponent,
    ActivoDocumentacionComponent,
    ActivoSeguroComponent,
    ActivoOrigenComponent,
    ActivoResponsableComponent,
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
  ],
})
export class SingularActivoModule {}
