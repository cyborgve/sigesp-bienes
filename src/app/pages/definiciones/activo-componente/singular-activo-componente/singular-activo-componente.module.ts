import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularActivoComponenteRoutingModule } from './singular-activo-componente-routing.module';
import { SingularActivoComponenteComponent } from './singular-activo-componente.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BuscadorActivoComponenteModule } from '../buscador-activo-componente/buscador-activo-componente.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SingularActivoComponenteComponent],
  imports: [
    CommonModule,
    SingularActivoComponenteRoutingModule,
    BuscadorActivoComponenteModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class SingularActivoComponenteModule {}
