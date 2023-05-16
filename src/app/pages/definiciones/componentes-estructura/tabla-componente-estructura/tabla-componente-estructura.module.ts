import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponenteEstructuraComponent } from './tabla-componente-estructura.component';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [TablaComponenteEstructuraComponent],
  imports: [CommonModule, SharedModule, MatTableModule, MatCardModule],
  exports: [TablaComponenteEstructuraComponent],
})
export class TablaComponenteEstructuraModule {}
