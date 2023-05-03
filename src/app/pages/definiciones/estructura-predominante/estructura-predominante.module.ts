import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstructuraPredominanteRoutingModule } from './estructura-predominante-routing.module';
import { EstructuraPredominanteComponent } from './estructura-predominante.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EstructuraPredominanteComponent],
  imports: [
    CommonModule,
    EstructuraPredominanteRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class EstructuraPredominanteModule {}
