import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinicionesRoutingModule } from './definiciones-routing.module';
import { DefinicionesComponent } from './definiciones.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DefinicionesComponent],
  imports: [
    CommonModule,
    DefinicionesRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DefinicionesModule {}
