import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularAseguradoraRoutingModule } from './singular-aseguradora-routing.module';
import { SingularAseguradoraComponent } from './singular-aseguradora.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorAseguradoraModule } from '../buscador-aseguradora/buscador-aseguradora.module';

@NgModule({
  declarations: [SingularAseguradoraComponent],
  imports: [
    CommonModule,
    SingularAseguradoraRoutingModule,
    SharedModule,
    BuscadorAseguradoraModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularAseguradoraModule {}
