import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCategoriaRoutingModule } from './singular-categoria-routing.module';
import { SingularCategoriaComponent } from './singular-categoria.component';
import { SharedModule } from '@shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [SingularCategoriaComponent],
  imports: [
    CommonModule,
    SingularCategoriaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class SingularCategoriaModule {}
