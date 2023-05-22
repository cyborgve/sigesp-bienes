import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTipoComponenteComponent } from './tabla-tipo-componente.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaTipoComponenteComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
  ],
  exports: [TablaTipoComponenteComponent],
})
export class TablaTipoComponenteModule {}
