import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SedeRoutingModule } from './sede-routing.module';
import { SedeComponent } from './sede.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [SedeComponent],
  imports: [CommonModule, SedeRoutingModule, ReactiveFormsModule, SharedModule],
})
export class SedeModule {}
