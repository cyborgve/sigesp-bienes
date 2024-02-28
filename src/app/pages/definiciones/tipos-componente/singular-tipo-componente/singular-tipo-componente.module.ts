import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingularTipoComponenteRoutingModule } from './singular-tipo-componente-routing.module';
import { SingularTipoComponenteComponent } from './singular-tipo-componente.component';
import { SharedModule } from '@shared/shared.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
