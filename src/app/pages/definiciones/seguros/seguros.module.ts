import { SegurosComponent } from './seguros.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurosRoutingModule } from './seguros-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SegurosComponent],
  imports: [
    CommonModule,
    SegurosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SegurosModule {}
