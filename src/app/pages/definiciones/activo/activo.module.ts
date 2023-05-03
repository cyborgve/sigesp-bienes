import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivoRoutingModule } from './activo-routing.module';
import { ActivoComponent } from './activo.component';
import { ComponentesActivoComponent } from './componentes-activo/componentes-activo.component';
import { DatosGeneralesComponent } from './datos-generales/datos-generales.component';
import { DepreciacionComponent } from './depreciacion/depreciacion.component';
import { OrigenActivoComponent } from './origen-activo/origen-activo.component';
import { ResponsableActivoComponent } from './responsable-activo/responsable-activo.component';
import { SeguroActivosComponent } from './seguro-activos/seguro-activos.component';
import { UbicacionActivoComponent } from './ubicacion-activo/ubicacion-activo.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ActivoComponent,
    ComponentesActivoComponent,
    DatosGeneralesComponent,
    DepreciacionComponent,
    OrigenActivoComponent,
    ResponsableActivoComponent,
    SeguroActivosComponent,
    UbicacionActivoComponent,
  ],
  imports: [
    CommonModule,
    ActivoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ActivoModule {}
