import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinicionesComponent } from './definiciones.component';
import { ConfiguracionBienesComponent } from './configuracion-bienes/configuracion-bienes.component';
import { DefinicionesRoutingModule } from './definiciones-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CausaMovimientoComponent } from './causa-movimiento/causa-movimiento.component';
import { SedeComponent } from './sede/sede.component';
import { EstructuraPredominanteComponent } from './estructura-predominante/estructura-predominante.component';
import { CatalogoGeneralComponent } from './catalogo-general/catalogo-general.component';
import { ActivoComponent } from './activo/activo.component';
import { MarcasModelosComponent } from './marcas-modelos/marcas-modelos.component';
import { UnidadAdministrativaComponent } from './unidad-administrativa/unidad-administrativa.component';
import { DefinicionesBasicasComponent } from './definiciones-basicas/definiciones-basicas.component';
import { MAT_DATE_LOCALE} from '@angular/material/core';
import { DateAdapter} from '@angular/material/core';
import { MAT_DATE_FORMATS} from '@angular/material/core';
import { OrigenComponent } from './origen/origen.component';
import { DatosGeneralesComponent } from './activo/datos-generales/datos-generales.component';
import { OrigenActivoComponent } from './activo/origen-activo/origen-activo.component';
import { SegurosComponent } from './seguros/seguros.component';
import { SeguroActivosComponent } from './activo/seguro-activos/seguro-activos.component';
import { DepreciacionComponent } from './activo/depreciacion/depreciacion.component';
import { UbicacionActivoComponent } from './activo/ubicacion-activo/ubicacion-activo.component';
import { ResponsableActivoComponent } from './activo/responsable-activo/responsable-activo.component';
import { MatMomentDateModule, MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ComponentesActivoComponent } from './activo/componentes-activo/componentes-activo.component';

@NgModule({
  declarations: [
    DefinicionesComponent, 
    ConfiguracionBienesComponent, 
    CausaMovimientoComponent, 
    SedeComponent, 
    EstructuraPredominanteComponent, 
    CatalogoGeneralComponent, 
    ActivoComponent, 
    MarcasModelosComponent, 
    UnidadAdministrativaComponent, 
    DefinicionesBasicasComponent, 
    OrigenComponent,
    DatosGeneralesComponent,
    OrigenActivoComponent,
    SegurosComponent,
    SeguroActivosComponent,
    DepreciacionComponent,
    UbicacionActivoComponent,
    ResponsableActivoComponent,
    ComponentesActivoComponent
  ],
  imports: [
    CommonModule,
    DefinicionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [ { provide: MAT_DATE_LOCALE, useValue: 'es-Ve' },
  {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
  {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}]
})
export class DefinicionesModule { }
