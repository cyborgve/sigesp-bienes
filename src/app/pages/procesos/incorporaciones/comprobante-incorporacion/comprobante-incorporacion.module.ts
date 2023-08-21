import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprobanteIncorporacionComponent } from './comprobante-incorporacion.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [ComprobanteIncorporacionComponent],
  imports: [CommonModule, MatCardModule, SharedModule, MatTableModule],
  exports: [ComprobanteIncorporacionComponent],
})
export class ComprobanteIncorporacionModule {}
