import { BuscadorCatalogoGeneralModule } from '@pages/definiciones/catalogos-generales/buscador-catalogo-general/buscador-catalogo-general.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroCatalogoGeneralComponent } from './filtro-catalogo-general/filtro-catalogo-general.component';
import { FiltroRangoFechasComponent } from './filtro-rango-fechas/filtro-rango-fechas.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltroTipoActivoComponent } from './filtro-tipo-activo/filtro-tipo-activo.component';
import { FiltroCategoriaComponent } from './filtro-categoria/filtro-categoria.component';
import { BuscadorCategoriaModule } from '@pages/definiciones/categorias/buscador-categoria/buscador-categoria.module';
import { FiltroRotulacionComponent } from './filtro-rotulacion/filtro-rotulacion.component';
import { BuscadorRotulacionModule } from '@pages/definiciones/rotulaciones/buscador-rotulacion/buscador-rotulacion.module';
import { FiltroColorComponent } from './filtro-color/filtro-color.component';
import { FiltroMarcaComponent } from './filtro-marca/filtro-marca.component';
import { FiltroModeloComponent } from './filtro-modelo/filtro-modelo.component';
import { FiltroClaseComponent } from './filtro-clase/filtro-clase.component';
import { FiltroEstadoUsoComponent } from './filtro-estado-uso/filtro-estado-uso.component';
import { FiltroEstadoConservacionComponent } from './filtro-estado-conservacion/filtro-estado-conservacion.component';
import { FiltroOrigenComponent } from './filtro-origen/filtro-origen.component';
import { FiltroPropositoSemovienteComponent } from './filtro-proposito-semoviente/filtro-proposito-semoviente.component';
import { FiltroRazaComponent } from './filtro-raza/filtro-raza.component';
import { FiltroSedeComponent } from './filtro-sede/filtro-sede.component';
import { FiltroAseguradoraComponent } from './filtro-aseguradora/filtro-aseguradora.component';
import { FiltroTipoAnimalComponent } from './filtro-tipo-animal/filtro-tipo-animal.component';
import { FiltroTipoCoberturaComponent } from './filtro-tipo-cobertura/filtro-tipo-cobertura.component';
import { FiltroTipoComponenteComponent } from './filtro-tipo-componente/filtro-tipo-componente.component';
import { FiltroTipoMarcaComponent } from './filtro-tipo-marca/filtro-tipo-marca.component';
import { FiltroTipoPolizaComponent } from './filtro-tipo-poliza/filtro-tipo-poliza.component';
import { FiltroTipoSedeComponent } from './filtro-tipo-sede/filtro-tipo-sede.component';
import { FiltroTipoSemovienteComponent } from './filtro-tipo-semoviente/filtro-tipo-semoviente.component';
import { FiltroTipoUsoComponent } from './filtro-tipo-uso/filtro-tipo-uso.component';
import { FiltroUnidadAdministrativaComponent } from './filtro-unidad-administrativa/filtro-unidad-administrativa.component';
import { FiltroMonedaComponent } from './filtro-moneda/filtro-moneda.component';
import { FiltroResponsableComponent } from './filtro-responsable/filtro-responsable.component';
import { FiltroCentroCostoComponent } from './filtro-centro-costo/filtro-centro-costo.component';
import { FiltroCiudadComponent } from './filtro-ciudad/filtro-ciudad.component';
import { FiltroCuentaContableComponent } from './filtro-cuenta-contable/filtro-cuenta-contable.component';
import { FiltroEstadoComponent } from './filtro-estado/filtro-estado.component';
import { FiltroFuenteFinanciamientoComponent } from './filtro-fuente-financiamiento/filtro-fuente-financiamiento.component';
import { FiltroMunicipioComponent } from './filtro-municipio/filtro-municipio.component';
import { FiltroPaisComponent } from './filtro-pais/filtro-pais.component';
import { FiltroParroquiaComponent } from './filtro-parroquia/filtro-parroquia.component';
import { FiltroProveedorComponent } from './filtro-proveedor/filtro-proveedor.component';
import { FiltroBeneficiarioComponent } from './filtro-beneficiario/filtro-beneficiario.component';
import { BuscadorCategoriaUnidadModule } from '@pages/definiciones/categorias-unidad-administrativa/buscador-categoria-unidad/buscador-categoria-unidad.module';
import { BuscadorClaseModule } from '@pages/definiciones/clases/buscador-clase/buscador-clase.module';
import { BuscadorColorModule } from '@pages/definiciones/colores/buscador-color/buscador-color.module';
import { BuscadorEstadoConservacionModule } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.module';
import { BuscadorEstadoUsoModule } from '@pages/definiciones/estados-uso/buscador-estado-uso/buscador-estado-uso.module';
import { BuscadorMarcaModule } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.module';
import { BuscadorModeloModule } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.module';
import { BuscadorOrigenModule } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.module';
import { BuscadorPropositoSemovienteModule } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.module';
import { BuscadorRazaModule } from '@pages/definiciones/razas/buscador-raza/buscador-raza.module';
import { BuscadorSedeModule } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.module';
import { BuscadorAseguradoraModule } from '@pages/definiciones/aseguradoras/buscador-aseguradora/buscador-aseguradora.module';
import { BuscadorTipoAnimalModule } from '@pages/definiciones/tipos-animal/buscador-tipo-animal/buscador-tipo-animal.module';
import { BuscadorTipoCoberturaModule } from '@pages/definiciones/tipos-cobertura/buscador-tipo-cobertura/buscador-tipo-cobertura.module';
import { BuscadorTipoComponenteModule } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.module';
import { BuscadorTipoMarcaModule } from '@pages/definiciones/tipos-marca/buscador-tipo-marca/buscador-tipo-marca.module';
import { BuscadorTipoPolizaModule } from '@pages/definiciones/tipos-poliza/buscador-tipo-poliza/buscador-tipo-poliza.module';
import { BuscadorTipoSedeModule } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.module';
import { BuscadorTipoSemovienteModule } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.module';
import { BuscadorTipoUsoModule } from '@pages/definiciones/tipos-uso/buscador-tipo-uso/buscador-tipo-uso.module';
import { BuscadorUnidadAdministrativaModule } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.module';
import { FiltroMetodoDepreciacionComponent } from './filtro-metodo-depreciacion/filtro-metodo-depreciacion.component';
import { FiltroPropiedadesComponent } from './filtro-propiedades/filtro-propiedades.component';
import { MatChipsModule } from '@angular/material/chips';
import { FiltroTipoResponsableComponent } from './filtro-tipo-responsable/filtro-tipo-responsable.component';
import { FiltroCategoriaUnidadAdministrativaComponent } from './filtro-categoria-unidad-administrativa/filtro-categoria-unidad-administrativa.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const sharedComponents = [
  FiltroCatalogoGeneralComponent,
  FiltroRangoFechasComponent,
  FiltroTipoActivoComponent,
  FiltroCategoriaComponent,
  FiltroRotulacionComponent,
  FiltroColorComponent,
  FiltroMarcaComponent,
  FiltroModeloComponent,
  FiltroClaseComponent,
  FiltroEstadoUsoComponent,
  FiltroEstadoConservacionComponent,
  FiltroOrigenComponent,
  FiltroPropositoSemovienteComponent,
  FiltroRazaComponent,
  FiltroSedeComponent,
  FiltroAseguradoraComponent,
  FiltroTipoAnimalComponent,
  FiltroTipoCoberturaComponent,
  FiltroTipoComponenteComponent,
  FiltroTipoMarcaComponent,
  FiltroTipoPolizaComponent,
  FiltroTipoSedeComponent,
  FiltroTipoSemovienteComponent,
  FiltroTipoUsoComponent,
  FiltroUnidadAdministrativaComponent,
  FiltroMonedaComponent,
  FiltroResponsableComponent,
  FiltroCentroCostoComponent,
  FiltroCiudadComponent,
  FiltroCuentaContableComponent,
  FiltroEstadoComponent,
  FiltroFuenteFinanciamientoComponent,
  FiltroMunicipioComponent,
  FiltroPaisComponent,
  FiltroParroquiaComponent,
  FiltroProveedorComponent,
  FiltroResponsableComponent,
  FiltroBeneficiarioComponent,
  FiltroMetodoDepreciacionComponent,
  FiltroPropiedadesComponent,
  FiltroTipoResponsableComponent,
  FiltroCategoriaUnidadAdministrativaComponent,
];

@NgModule({
  declarations: [...sharedComponents],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatChipsModule,
    DragDropModule,
    BuscadorCatalogoGeneralModule,
    BuscadorCategoriaModule,
    BuscadorCategoriaUnidadModule,
    BuscadorClaseModule,
    BuscadorColorModule,
    BuscadorEstadoConservacionModule,
    BuscadorEstadoUsoModule,
    BuscadorMarcaModule,
    BuscadorModeloModule,
    BuscadorOrigenModule,
    BuscadorPropositoSemovienteModule,
    BuscadorRazaModule,
    BuscadorRotulacionModule,
    BuscadorSedeModule,
    BuscadorAseguradoraModule,
    BuscadorTipoAnimalModule,
    BuscadorTipoCoberturaModule,
    BuscadorTipoComponenteModule,
    BuscadorTipoMarcaModule,
    BuscadorTipoPolizaModule,
    BuscadorTipoSedeModule,
    BuscadorTipoSemovienteModule,
    BuscadorTipoUsoModule,
    BuscadorUnidadAdministrativaModule,
  ],
  exports: [...sharedComponents],
})
export class FiltrosReportesModule {}
