import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ReportesComponent],
  imports: [CommonModule, ReportesRoutingModule, MatCardModule],
})
export class ReportesModule {}
