import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCondicionCompraRoutingModule } from './singular-condicion-compra-routing.module';
import { SingularCondicionCompraComponent } from './singular-condicion-compra.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [SingularCondicionCompraComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SingularCondicionCompraRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SingularCondicionCompraModule {}
