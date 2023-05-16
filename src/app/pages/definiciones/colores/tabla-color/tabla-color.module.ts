import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaColorComponent } from './tabla-color.component';
import { SharedModule } from '@shared/shared.module';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TablaColorComponent],
  imports: [CommonModule, SharedModule, MatCardModule, MatTableModule],
  exports: [TablaColorComponent],
})
export class TablaColorModule {}
