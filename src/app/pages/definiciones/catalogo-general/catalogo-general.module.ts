import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogoGeneralRoutingModule } from './catalogo-general-routing.module';
import { CatalogoGeneralComponent } from './catalogo-general.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CatalogoGeneralComponent],
  imports: [
    CommonModule,
    CatalogoGeneralRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CatalogoGeneralModule {}
