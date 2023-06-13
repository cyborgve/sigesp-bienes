import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaPlantillaDepreciacionRoutingModule } from './tabla-plantilla-depreciacion-routing.module';
import { TablaPlantillaDepreciacionComponent } from './tabla-plantilla-depreciacion.component';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaPlantillaDepreciacionComponent],
  imports: [
    CommonModule,
    RouterModule,
    TablaPlantillaDepreciacionRoutingModule,
    SharedModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
  ],
  exports: [TablaPlantillaDepreciacionComponent],
})
export class TablaPlantillaDepreciacionModule {}
