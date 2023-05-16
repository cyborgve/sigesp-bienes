import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaCondicionCompraComponent } from './tabla-condicion-compra.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaCondicionCompraComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaCondicionCompraComponent],
})
export class TablaCondicionCompraModule {}
