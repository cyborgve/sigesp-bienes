import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularResponsableRoutingModule } from './singular-responsable-routing.module';
import { SingularResponsableComponent } from './singular-responsable.component';

@NgModule({
  declarations: [SingularResponsableComponent],
  imports: [CommonModule, SingularResponsableRoutingModule],
})
export class SingularResponsableModule {}
