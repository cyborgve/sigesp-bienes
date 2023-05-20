import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorResponsableComponent } from './buscador-responsable.component';
import { TablaResponsableModule } from '../tabla-responsable/tabla-responsable.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorResponsableComponent],
  imports: [CommonModule, TablaResponsableModule, MatDialogModule],
  exports: [BuscadorResponsableComponent],
})
export class BuscadorResponsableModule {}
