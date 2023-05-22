import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoCoberturaComponent } from './tabla-tipo-cobertura.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaTipoCoberturaComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
  ],
  exports: [TablaTipoCoberturaComponent],
})
export class TablaTipoCoberturaModule {}
