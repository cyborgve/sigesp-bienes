import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularAseguradoraRoutingModule } from './singular-aseguradora-routing.module';
import { SingularAseguradoraComponent } from './singular-aseguradora.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
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
