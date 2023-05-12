import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaAseguradoraComponent } from './tabla-aseguradora.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TablaAseguradoraComponent],
  imports: [CommonModule, MatCardModule, MatTableModule, SharedModule],
  exports: [TablaAseguradoraComponent],
})
export class TablaAseguradoraModule {}
