import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularActivoComponenteRoutingModule } from './singular-activo-componente-routing.module';
import { SingularActivoComponenteComponent } from './singular-activo-componente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ActivoComponentesModule } from '../activo-componentes.module';

@NgModule({
  declarations: [SingularActivoComponenteComponent],
  imports: [
    CommonModule,
    ActivoComponentesModule,
    SingularActivoComponenteRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class SingularActivoComponenteModule {}
