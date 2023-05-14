import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCategoriaComponent } from './tabla-categoria.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaCategoriaComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaCategoriaComponent],
})
export class TablaCategoriaModule {}
