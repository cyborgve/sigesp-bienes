import { BuscadorComponenteActivoModule } from '@pages/definiciones/componentes-activo/buscador-componente-activo/buscador-componente-activo.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingularComponenteActivoRoutingModule } from './singular-componente-activo-routing.module';
import { SingularComponenteActivoComponent } from './singular-componente-activo.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BuscadorMarcaModule } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.module';
import { BuscadorModeloModule } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.module';

@NgModule({
  declarations: [SingularComponenteActivoComponent],
  imports: [
    CommonModule,
    SingularComponenteActivoRoutingModule,
    BuscadorComponenteActivoModule,
    BuscadorMarcaModule,
    BuscadorModeloModule,
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class SingularComponenteActivoModule {}
