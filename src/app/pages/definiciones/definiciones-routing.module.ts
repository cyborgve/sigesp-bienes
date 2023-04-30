import { DefinicionesBasicasComponent } from './definiciones-basicas/definiciones-basicas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasModelosComponent } from './marcas-modelos/marcas-modelos.component';
import { ActivoComponent } from './activo/activo.component';
import { SedeComponent } from './sede/sede.component';
import { EstructuraPredominanteComponent } from './estructura-predominante/estructura-predominante.component';
import { CausaMovimientoComponent } from './causa-movimiento/causa-movimiento.component';
import { CatalogoGeneralComponent } from './catalogo-general/catalogo-general.component';
import { ConfiguracionBienesComponent } from './configuracion-bienes/configuracion-bienes.component';
import { DefinicionesComponent } from './definiciones.component';
import { Routes, RouterModule } from '@angular/router';
import { UnidadAdministrativaComponent } from './unidad-administrativa/unidad-administrativa.component';
import { OrigenComponent } from './origen/origen.component';
import { SegurosComponent } from './seguros/seguros.component';

const routes: Routes = [
  { path: '', component: DefinicionesComponent },  
  { path: 'configuracion-bienes', component: ConfiguracionBienesComponent },
  { path: 'catalogo-general', component: CatalogoGeneralComponent },
  { path: 'causa-movimiento', component: CausaMovimientoComponent },
  { path: 'estructura-predominante', component: EstructuraPredominanteComponent },
  { path: 'sede', component: SedeComponent },
  { path: 'origen', component: OrigenComponent },
  { path: 'activo', component: ActivoComponent },
  { path: 'marcas-modelos', component: MarcasModelosComponent },
  { path: 'unidad-administrativa', component: UnidadAdministrativaComponent },
  { path: 'definiciones-basicas', component: DefinicionesBasicasComponent },
  { path: 'seguros', component: SegurosComponent }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DefinicionesRoutingModule { }
