import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaColorComponent } from './tabla-color.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TablaColorComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports: [TablaColorComponent],
})
export class TablaColorModule {}
