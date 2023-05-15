import { NgModule } from '@angular/core';
import { BuscadorActivoComponenteComponent } from './buscador-activo-componente.component';
import { CommonModule } from '@angular/common';
import { TablaActivoComponenteModule } from '../tabla-activo-componente/tabla-activo-componente.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BuscadorActivoComponenteComponent],
  imports: [CommonModule, TablaActivoComponenteModule, MatDialogModule],
  exports: [BuscadorActivoComponenteComponent],
})
export class BuscadorActivoComponenteModule {}
