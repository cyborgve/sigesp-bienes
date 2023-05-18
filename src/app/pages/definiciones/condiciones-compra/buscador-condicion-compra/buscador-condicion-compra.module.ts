import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorCondicionCompraComponent } from './buscador-condicion-compra.component';
import { TablaCondicionCompraModule } from '../tabla-condicion-compra/tabla-condicion-compra.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorCondicionCompraComponent],
  imports: [CommonModule, TablaCondicionCompraModule, MatDialogModule],
  exports: [BuscadorCondicionCompraComponent],
})
export class BuscadorCondicionCompraModule {}
