import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroAprobadosComponent } from './filtro-aprobados/filtro-aprobados.component';
import { FiltroIntegradosComponent } from './filtro-integrados/filtro-integrados.component';
import { FiltroTipoProcesoComponent } from './filtro-tipo-proceso/filtro-tipo-proceso.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltroRegistradosComponent } from './filtro-registrados/filtro-registrados.component';

@NgModule({
  declarations: [
    FiltroAprobadosComponent,
    FiltroIntegradosComponent,
    FiltroTipoProcesoComponent,
    FiltroRegistradosComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatCardModule],
  exports: [
    FiltroAprobadosComponent,
    FiltroIntegradosComponent,
    FiltroTipoProcesoComponent,
    FiltroRegistradosComponent,
  ],
})
export class FiltrosIntegracionesModule {}
