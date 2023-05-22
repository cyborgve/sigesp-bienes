import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoEstructuraComponent } from './tabla-tipo-estructura.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TablaTipoEstructuraComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatTableModule,
    MatCardModule,
  ],
  exports: [TablaTipoEstructuraComponent],
})
export class TablaTipoEstructuraModule {}
