import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { IsoCurrencyPipe } from './pipes/iso-currency.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BotonesAccionesComponent } from './components/botones-acciones/botones-acciones.component';
import { MaterialModule } from '../material/material.module';
import { DialogoEliminarComponent } from './components/dialogo-eliminar/dialogo-eliminar.component';
import { EncabezadoDefinicionComponent } from './components/encabezado-definicion/encabezado-definicion.component';
import { BotonesDefinicionComponent } from './components/botones-definicion/botones-definicion.component';
import { BotonesDefinicionesComponent } from './components/botones-definiciones/botones-definiciones.component';
import { EncabezadoDefinicionesComponent } from './components/encabezado-definiciones/encabezado-definiciones.component';
import { BuscadorCuentaContableComponent } from './components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { NumeroSeriePipe } from './pipes/numero-serie.pipe';
import { NumeroCorrelativoPipe } from './pipes/numero-correlativo.pipe';
import { DenominacionMarcaPipe } from './pipes/denominacion-marca.pipe';
import { DenominacionCorrelativoPipe } from './pipes/denominacion-correlativo.pipe';
import { DenominacionModeloPipe } from './pipes/denominacion-modelo.pipe';
import { DenominacionColorPipe } from './pipes/denominacion-color.pipe';
import { DenominacionRotulacionPipe } from './pipes/denominacion-rotulacion.pipe';
import { DenominacionCategoriaPipe } from './pipes/denominacion-categoria.pipe';
import { DenominacionOrigenPipe } from './pipes/denominacion-origen.pipe';
import { DenominacionSeguroPipe } from './pipes/denominacion-seguro.pipe';
import { DenominacionClasePipe } from './pipes/denominacion-clase.pipe';
import { DenominacionSedePipe } from './pipes/denominacion-sede.pipe';
import { DenominacionTipoSemovientePipe } from './pipes/denominacion-tipo-semoviente.pipe';
import { DenominacionPropositoSemovientePipe } from './pipes/denominacion-proposito-semoviente.pipe';
import { DenominacionTipoUsoPipe } from './pipes/denominacion-tipo-uso.pipe';
import { DenominacionTipoAnimalPipe } from './pipes/denominacion-tipo-animal.pipe';
import { DenominacionRazaPipe } from './pipes/denominacion-raza.pipe';
import { BuscadorMonedaComponent } from './components/buscador-moneda/buscador-moneda.component';
import { DenominacionMonedaPipe } from './pipes/denominacion-moneda.pipe';
import { CorregirSeleccionarPipe } from './pipes/corregir-seleccionar.pipe';
import { DenominacionCuentaContablePipe } from './pipes/denominacion-cuenta-contable.pipe';
import { BuscadorFuenteFinanciemientoComponent } from './components/buscador-fuente-financiemiento/buscador-fuente-financiemiento.component';
import { DenominacionFuenteFinanciamientoPipe } from './pipes/denominacion-fuente-financiamiento.pipe';
import { TipoCausaMovimientoPipe } from './pipes/tipo-causa-movimiento.pipe';
import { DenominacionTipoMarcaPipe } from './pipes/denominacion-tipo-marca.pipe';
import { DenominacionTipoSedePipe } from './pipes/denominacion-tipo-sede.pipe';
import { BuscadorPaisComponent } from './components/buscador-pais/buscador-pais.component';
import { DenominacionPaisPipe } from './pipes/denominacion-pais.pipe';
import { CorregirNingunoPipe } from './pipes/corregir-ninguno.pipe';
import { DenominacionEstadoPipe } from './pipes/denominacion-estado.pipe';
import { DenominacionMunicipioPipe } from './pipes/denominacion-municipio.pipe';
import { DenominacionCiudadPipe } from './pipes/denominacion-ciudad.pipe';
import { BuscadorEstadoComponent } from './components/buscador-estado/buscador-estado.component';
import { BuscadorMunicipioComponent } from './components/buscador-municipio/buscador-municipio.component';
import { BuscadorCiudadComponent } from './components/buscador-ciudad/buscador-ciudad.component';
import { DenominacionAseguradoraPipe } from './pipes/denominacion-aseguradora.pipe';
import { DenominacionTipoCoberturaPipe } from './pipes/denominacion-tipo-cobertura.pipe';
import { DenominacionTipoPolizaPipe } from './pipes/denominacion-tipo-poliza.pipe';
import { BuscadorCentroCostoComponent } from './components/buscador-centro-costo/buscador-centro-costo.component';
import { DenominacionMarcaModeloPipe } from './pipes/denominacion-marca-modelo.pipe';
import { DenominacionTipoComponentePipe } from './pipes/denominacion-tipo-componente.pipe';
import { DenominacionActivoPipe } from './pipes/denominacion-activo.pipe';
import { DenominacionProveedorPipe } from './pipes/denominacion-proveedor.pipe';
import { DenominacionCategoriaUnidadAdministrativaPipe } from './pipes/denominacion-categoria-unidad-administrativa.pipe';
import { BuscadorParroquiaComponent } from './components/buscador-parroquia/buscador-parroquia.component';
import { DenominacionParroquiaPipe } from './pipes/denominacion-parroquia.pipe';
import { CorregirPorDefectoPipe } from './pipes/corregir-por-defecto.pipe';
import { DenominacionUnidadAdministrativaPipe } from './pipes/denominacion-unidad-administrativa.pipe';
import { DenominacionEstadoUsoPipe } from './pipes/denominacion-estado-uso.pipe';
import { DenominacionEstadoConservacionPipe } from './pipes/denominacion-estado-conservacion.pipe';
import { BuscadorResponsableComponent } from './components/buscador-responsable/buscador-responsable.component';
import { DenominacionResponsablePipe } from './pipes/denominacion-responsable.pipe';
import { EncabezadoProcesosComponent } from './components/encabezado-procesos/encabezado-procesos.component';
import { CorregirCodigoPipe } from './pipes/corregir-codigo.pipe';
import { ActivosProcesoComponent } from './components/activos-proceso/activos-proceso.component';
import { DenominacionCausaMovimientoPipe } from './pipes/denominacion-causa-movimiento.pipe';
import { CuentasContablesProcesoComponent } from './components/cuentas-contables-proceso/cuentas-contables-proceso.component';
import { ComponentesProcesoComponent } from './components/componentes-proceso/componentes-proceso.component';
import { DenominacionRetornoPipe } from './pipes/denominacion-retorno.pipe';
import { DenominacionBeneficiarioPipe } from './pipes/denominacion-beneficiario.pipe';
import { CorregirNoAsignadoPipe } from './pipes/corregir-no-asignado.pipe';
import { DenominacionModoAdquisicionPipe } from './pipes/denominacion-modo-adquisicion.pipe';
import { DenominacionCentroCostosPipe } from './pipes/denominacion-centro-costos.pipe';
import { DenominacionTipoActivoPipe } from './pipes/denominacion-tipo-activo.pipe';
import { BuscadorProveedorComponent } from './components/buscador-proveedor/buscador-proveedor.component';
import { DenominacionCatalogoGeneralPipe } from './pipes/denominacion-catalogo-general.pipe';
import { CorregirMetodoDepreciacionPipe } from './pipes/corregir-metodo-depreciacion.pipe';
import { EncabezadoReportesComponent } from './components/encabezado-reportes/encabezado-reportes.component';
import { TipoOracionPipe } from './pipes/tipo-oracion.pipe';
import { RangoFechasComponent } from './components/rango-fechas/rango-fechas.component';
import { EstadoMovimientoCatalogoPipe } from './pipes/estado-movimiento-catalogo.pipe';

const sharedComponents = [
  LoadingScreenComponent,
  ToolbarComponent,
  BotonesAccionesComponent,
  BotonesDefinicionComponent,
  BotonesDefinicionesComponent,
  BuscadorCuentaContableComponent,
  BuscadorMonedaComponent,
  BuscadorFuenteFinanciemientoComponent,
  BuscadorPaisComponent,
  BuscadorEstadoComponent,
  BuscadorMunicipioComponent,
  BuscadorCiudadComponent,
  BuscadorCentroCostoComponent,
  BuscadorParroquiaComponent,
  BuscadorResponsableComponent,
  DialogoEliminarComponent,
  EncabezadoDefinicionComponent,
  EncabezadoDefinicionesComponent,
  EncabezadoProcesosComponent,
  ActivosProcesoComponent,
  RangoFechasComponent,
  BuscadorProveedorComponent,
  CuentasContablesProcesoComponent,
  EncabezadoReportesComponent,
  ComponentesProcesoComponent,
];

const sharedPipes = [
  IsoCurrencyPipe,
  CorregirSeleccionarPipe,
  CorregirNingunoPipe,
  CorregirCodigoPipe,
  CorregirPorDefectoPipe,
  NumeroSeriePipe,
  NumeroCorrelativoPipe,
  TipoCausaMovimientoPipe,
  DenominacionMarcaPipe,
  DenominacionCorrelativoPipe,
  DenominacionModeloPipe,
  DenominacionColorPipe,
  DenominacionRotulacionPipe,
  DenominacionCategoriaPipe,
  DenominacionOrigenPipe,
  DenominacionSeguroPipe,
  DenominacionClasePipe,
  DenominacionSedePipe,
  DenominacionTipoSemovientePipe,
  DenominacionPropositoSemovientePipe,
  DenominacionTipoUsoPipe,
  DenominacionTipoAnimalPipe,
  DenominacionRazaPipe,
  DenominacionMonedaPipe,
  DenominacionCuentaContablePipe,
  DenominacionFuenteFinanciamientoPipe,
  DenominacionTipoMarcaPipe,
  DenominacionTipoSedePipe,
  DenominacionPaisPipe,
  DenominacionEstadoPipe,
  DenominacionMunicipioPipe,
  DenominacionCiudadPipe,
  DenominacionAseguradoraPipe,
  DenominacionTipoCoberturaPipe,
  DenominacionTipoPolizaPipe,
  DenominacionMarcaModeloPipe,
  DenominacionTipoComponentePipe,
  DenominacionActivoPipe,
  DenominacionProveedorPipe,
  DenominacionCategoriaUnidadAdministrativaPipe,
  DenominacionParroquiaPipe,
  DenominacionUnidadAdministrativaPipe,
  DenominacionEstadoUsoPipe,
  DenominacionEstadoConservacionPipe,
  DenominacionResponsablePipe,
  DenominacionCausaMovimientoPipe,
  DenominacionRetornoPipe,
  DenominacionBeneficiarioPipe,
  CorregirNoAsignadoPipe,
  DenominacionModoAdquisicionPipe,
  DenominacionCentroCostosPipe,
  DenominacionTipoActivoPipe,
  DenominacionCatalogoGeneralPipe,
  CorregirMetodoDepreciacionPipe,
  TipoOracionPipe,
  EstadoMovimientoCatalogoPipe,
];

@NgModule({
  declarations: [...sharedComponents, ...sharedPipes],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  exports: [...sharedComponents, ...sharedPipes],
})
export class SharedModule {}
