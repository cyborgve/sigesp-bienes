import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosComponent } from './procesos.component';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';

@NgModule({
  declarations: [ProcesosComponent],
  imports: [CommonModule, ProcesosRoutingModule, MatCardModule],
})
export class ProcesosModule {}
