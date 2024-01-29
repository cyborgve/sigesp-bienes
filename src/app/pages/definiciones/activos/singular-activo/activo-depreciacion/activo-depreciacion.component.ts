import { ModoFormulario } from '@core/types/modo-formulario';
import { tap, filter, take } from 'rxjs/operators';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { Subscription } from 'rxjs';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { BuscadorMonedaComponent } from '@shared/components/buscador-moneda/buscador-moneda.component';
import { Basica } from '@core/models/auxiliares/basica';
import { UNIDADES_MEDIDA } from '@core/constants/unidades-medida';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { comprobarActivoDepreciable } from '@core/utils/funciones/comprobar-activo-depreciable';
import { BuscadorPlantillaIntegracionComponent } from '@pages/definiciones/plantillas-integracion/buscador-plantilla-integracion/buscador-plantilla-integracion.component';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { filtrarPlantillasIntegracionPorTipo } from '@core/utils/pipes-rxjs/operadores/filtrar-plantillas-integracion-por-tipo';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { activoCentroCostosAsignado } from '@core/utils/funciones/activo-centro-costos-asignado';
import { activoCostoAsignado } from '@core/utils/funciones/activo-costo-asignado';
import { activoMonedaAsignada } from '@core/utils/funciones/activo-moneda-asignada';

@Component({
  selector: 'app-activo-depreciacion',
  templateUrl: './activo-depreciacion.component.html',
  styleUrls: ['./activo-depreciacion.component.scss'],
})
export class ActivoDepreciacionComponent implements OnDestroy {
  private subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup;
  @Input() formularioEspecial: FormGroup;
  @Input() formularioDatosGenerales: FormGroup;
  @Input() formularioDetalles: FormGroup;
  @Input() modoFormulario: ModoFormulario;

  metodosDepreciacion = METODOS_DEPRECIACION;
  unidadesTiempo = UNIDADES_MEDIDA['TIEMPO'];

  constructor(private _dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  buscarCuentaContableDebe() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.cuentaContableDebe),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            cuentaContableDebe: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarCuentaContableHaber() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.cuentaContableHaber),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            cuentaContableHaber: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarMoneda() {
    let dialog = this._dialog.open(BuscadorMonedaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.monedaValorRescate),
        tap((entidad: Basica) =>
          this.formulario.patchValue({ monedaValorRescate: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  mostrarGenerarDepreciacion = () => {
    return this.modoFormulario === 'CREANDO';
  };

  activoDepreciable = () => {
    let activoDepreciar = this.formularioDatosGenerales.value as Activo;
    activoDepreciar.depreciacion = this.formulario.value as ActivoDepreciacion;
    return comprobarActivoDepreciable(activoDepreciar);
  };

  costoMonedaAsignados = () =>
    activoCostoAsignado(this.formularioDatosGenerales.value) &&
    activoMonedaAsignada(this.formularioDatosGenerales.value);

  centroCostosAsignado = () =>
    activoCentroCostosAsignado(this.formularioDetalles.value);

  buscarPlantillaIntegracion() {
    let dialog = this._dialog.open(BuscadorPlantillaIntegracionComponent, {
      width: '85%',
      height: '95%',
      data: { filtros: [filtrarPlantillasIntegracionPorTipo('DEP')] },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: PlantillaIntegracion) => {
          this.formulario.patchValue({
            metodoDepreciacion: entidad.metodoDepreciacion,
            vidaUtil: entidad.vidaUtil,
            unidadVidaUtil: entidad.unidadVidaUtil,
            cuentaContableDebe: entidad.cuentaContableDebe,
            cuentaContableHaber: entidad.cuentaContableHaber,
          });
        }),
        take(1)
      )
      .subscribe();
  }
}
