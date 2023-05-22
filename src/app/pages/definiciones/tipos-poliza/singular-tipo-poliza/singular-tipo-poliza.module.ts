import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularTipoPolizaRoutingModule } from './singular-tipo-poliza-routing.module';
import { SingularTipoPolizaComponent } from './singular-tipo-poliza.component';
import { BuscadorTipoPolizaModule } from '../buscador-tipo-poliza/buscador-tipo-poliza.module';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingularTipoPolizaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoPolizaRoutingModule,
    BuscadorTipoPolizaModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoPolizaModule {}
