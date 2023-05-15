import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCondicionCompraRoutingModule } from './plural-condicion-compra-routing.module';
import { PluralCondicionCompraComponent } from './plural-condicion-compra.component';

@NgModule({
  declarations: [PluralCondicionCompraComponent],
  imports: [CommonModule, PluralCondicionCompraRoutingModule],
})
export class PluralCondicionCompraModule {}
