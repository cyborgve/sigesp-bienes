import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorRazaComponent } from './buscador-raza.component';
import { TablaRazaModule } from '../tabla-raza/tabla-raza.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorRazaComponent],
  imports: [CommonModule, TablaRazaModule, MatDialogModule],
  exports: [BuscadorRazaComponent],
})
export class BuscadorRazaModule {}
