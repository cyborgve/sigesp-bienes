import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrigenRoutingModule } from './origen-routing.module';
import { OrigenComponent } from './origen.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [OrigenComponent],
  imports: [
    CommonModule,
    OrigenRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class OrigenModule {}
