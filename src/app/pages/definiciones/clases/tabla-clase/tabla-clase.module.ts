import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaClaseComponent } from './tabla-clase.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaClaseComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaClaseComponent],
})
export class TablaClaseModule {}
