import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularAutorizacionSalidaRoutingModule } from './singular-autorizacion-salida-routing.module';
import { SingularAutorizacionSalidaComponent } from './singular-autorizacion-salida.component';
import { BuscadorAutorizacionSalidaModule } from '../buscador-autorizacion-salida/buscador-autorizacion-salida.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { BuscadorActivoModule } from '@pages/definiciones/activos/buscador-activo/buscador-activo.module';

@NgModule({
  declarations: [SingularAutorizacionSalidaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularAutorizacionSalidaRoutingModule,
    BuscadorAutorizacionSalidaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BuscadorActivoModule,
  ],
})
export class SingularAutorizacionSalidaModule {}
