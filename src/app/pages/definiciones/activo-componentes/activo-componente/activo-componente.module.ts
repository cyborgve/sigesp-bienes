import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivoComponenteRoutingModule } from './activo-componente-routing.module';
import { ActivoComponenteComponent } from './activo-componente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ActivoComponenteComponent],
  imports: [
    CommonModule,
    ActivoComponenteRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    SharedModule,
  ],
})
export class ActivoComponenteModule {}
