import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularCondicionCompraRoutingModule } from './singular-condicion-compra-routing.module';
import { SingularCondicionCompraComponent } from './singular-condicion-compra.component';

@NgModule({
  declarations: [SingularCondicionCompraComponent],
  imports: [CommonModule, SingularCondicionCompraRoutingModule],
})
export class SingularCondicionCompraModule {}
