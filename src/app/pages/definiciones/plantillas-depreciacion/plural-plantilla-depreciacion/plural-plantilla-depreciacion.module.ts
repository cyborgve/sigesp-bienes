import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralPlantillaDepreciacionRoutingModule } from './plural-plantilla-depreciacion-routing.module';
import { PluralPlantillaDepreciacionComponent } from './plural-plantilla-depreciacion.component';
import { SharedModule } from '@shared/shared.module';
import { TablaPlantillaDepreciacionModule } from '../tabla-plantilla-depreciacion/tabla-plantilla-depreciacion.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PluralPlantillaDepreciacionComponent],
  imports: [
    CommonModule,
    PluralPlantillaDepreciacionRoutingModule,
    SharedModule,
    TablaPlantillaDepreciacionModule,
    MatDialogModule,
  ],
})
export class PluralPlantillaDepreciacionModule {}
