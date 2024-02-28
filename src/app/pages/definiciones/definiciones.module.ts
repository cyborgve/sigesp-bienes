import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinicionesRoutingModule } from './definiciones-routing.module';
import { DefinicionesComponent } from './definiciones.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
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
