import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularResponsableRoutingModule } from './singular-responsable-routing.module';
import { SingularResponsableComponent } from './singular-responsable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorResponsableModule } from '../buscador-responsable/buscador-responsable.module';

@NgModule({
  declarations: [SingularResponsableComponent],
  imports: [
    CommonModule,
    SingularResponsableRoutingModule,
    BuscadorResponsableModule,
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
  ],
})
export class SingularResponsableModule {}
