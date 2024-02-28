import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingularTipoComponenteRoutingModule } from './singular-tipo-componente-routing.module';
import { SingularTipoComponenteComponent } from './singular-tipo-componente.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BuscadorTipoComponenteModule } from '../buscador-tipo-componente/buscador-tipo-componente.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SingularTipoComponenteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularTipoComponenteRoutingModule,
    BuscadorTipoComponenteModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class SingularTipoComponenteModule {}
