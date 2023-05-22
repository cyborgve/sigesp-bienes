import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorUsoComponent } from './buscador-uso.component';
import { TablaUsoModule } from '../tabla-uso/tabla-uso.module';

@NgModule({
  declarations: [BuscadorUsoComponent],
  imports: [CommonModule, TablaUsoModule],
  exports: [BuscadorUsoComponent],
})
export class BuscadorUsoModule {}
