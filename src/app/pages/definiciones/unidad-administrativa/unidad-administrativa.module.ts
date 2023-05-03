import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadAdministrativaRoutingModule } from './unidad-administrativa-routing.module';
import { UnidadAdministrativaComponent } from './unidad-administrativa.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UnidadAdministrativaComponent],
  imports: [
    CommonModule,
    UnidadAdministrativaRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UnidadAdministrativaModule {}
