import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasModelosRoutingModule } from './marcas-modelos-routing.module';
import { MarcasModelosComponent } from './marcas-modelos.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MarcasModelosComponent],
  imports: [
    CommonModule,
    MarcasModelosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class MarcasModelosModule {}
