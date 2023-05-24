import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaOrigenComponent } from './tabla-origen.component';
import { SharedModule } from '@shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TablaOrigenComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
  ],
  exports: [TablaOrigenComponent],
})
export class TablaOrigenModule {}
