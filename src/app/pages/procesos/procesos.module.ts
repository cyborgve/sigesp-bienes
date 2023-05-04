import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcesosComponent } from './procesos.component';
import { ProcesosRoutingModule } from './procesos-routing.module';

@NgModule({
  declarations: [ProcesosComponent],
  imports: [CommonModule, ProcesosRoutingModule],
})
export class ProcesosModule {}
