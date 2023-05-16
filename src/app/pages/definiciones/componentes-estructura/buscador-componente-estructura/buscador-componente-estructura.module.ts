import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponenteEstructuraComponent } from './buscador-componente-estructura.component';
import { TablaComponenteEstructuraModule } from '../tabla-componente-estructura/tabla-componente-estructura.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorComponenteEstructuraComponent],
  imports: [CommonModule, TablaComponenteEstructuraModule, MatDialogModule],
})
export class BuscadorComponenteEstructuraModule {}
