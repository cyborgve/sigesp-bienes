import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorClaseComponent } from './buscador-clase.component';
import { TablaClaseModule } from '../tabla-clase/tabla-clase.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorClaseComponent],
  imports: [CommonModule, TablaClaseModule, MatDialogModule],
  exports: [BuscadorClaseComponent],
})
export class BuscadorClaseModule {}
