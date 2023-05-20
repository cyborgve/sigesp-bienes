import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorOrigenComponent } from './buscador-origen.component';
import { TablaOrigenModule } from '../tabla-origen/tabla-origen.module';

@NgModule({
  declarations: [BuscadorOrigenComponent],
  imports: [CommonModule, TablaOrigenModule],
  exports: [BuscadorOrigenComponent],
})
export class BuscadorOrigenModule {}
