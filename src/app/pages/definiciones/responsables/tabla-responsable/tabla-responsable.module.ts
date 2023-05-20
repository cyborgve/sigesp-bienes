import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaResponsableComponent } from './tabla-responsable.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaResponsableComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaResponsableComponent],
})
export class TablaResponsableModule {}
