import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosComponent } from './procesos.component';
import { ProcesosRoutingModule } from './procesos-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [ProcesosComponent],
  imports: [CommonModule, ProcesosRoutingModule, MatCardModule],
})
export class ProcesosModule {}
