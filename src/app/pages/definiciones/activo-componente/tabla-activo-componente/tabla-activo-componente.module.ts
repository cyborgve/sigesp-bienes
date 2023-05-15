import { SharedModule } from '@shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaActivoComponenteComponent } from './tabla-activo-componente.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaActivoComponenteComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaActivoComponenteComponent],
})
export class TablaActivoComponenteModule {}
