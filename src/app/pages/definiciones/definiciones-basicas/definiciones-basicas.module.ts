import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefinicionesBasicasRoutingModule } from './definiciones-basicas-routing.module';
import { DefinicionesBasicasComponent } from './definiciones-basicas.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DefinicionesBasicasComponent],
  imports: [
    CommonModule,
    DefinicionesBasicasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class DefinicionesBasicasModule {}
