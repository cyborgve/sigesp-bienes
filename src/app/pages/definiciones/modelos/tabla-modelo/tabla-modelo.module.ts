import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaModeloComponent } from './tabla-modelo.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaModeloComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
  ],
  exports: [TablaModeloComponent],
})
export class TablaModeloModule {}
