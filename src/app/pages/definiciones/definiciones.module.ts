import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefinicionesRoutingModule } from './definiciones-routing.module';
import { DefinicionesComponent } from './definiciones.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [DefinicionesComponent],
  imports: [CommonModule, DefinicionesRoutingModule, MatCardModule],
})
export class DefinicionesModule {}
