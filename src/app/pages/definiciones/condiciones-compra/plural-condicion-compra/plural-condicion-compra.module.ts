import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PluralCondicionCompraRoutingModule } from './plural-condicion-compra-routing.module';
import { PluralCondicionCompraComponent } from './plural-condicion-compra.component';
import { TablaCondicionCompraModule } from '../tabla-condicion-compra/tabla-condicion-compra.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PluralCondicionCompraComponent],
  imports: [
    CommonModule,
    PluralCondicionCompraRoutingModule,
    TablaCondicionCompraModule,
    SharedModule,
  ],
})
export class PluralCondicionCompraModule {}
