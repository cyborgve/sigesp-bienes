import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponenteActivoComponent } from './tabla-componente-activo.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaComponenteActivoComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaComponenteActivoComponent],
})
export class TablaComponenteActivoModule {}
