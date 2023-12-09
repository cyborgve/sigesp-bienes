import { ModoFormulario } from '@core/types/modo-formulario';
import { PlantillaDepreciacion } from '@core/models/definiciones/plantilla-depreciacion';
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
import { BuscadorPlantillaIntegracionComponent } from '@pages/definiciones/plantillas-integracion/buscador-plantilla-integracion/buscador-plantilla-integracion.component';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoDepreciacion } from '@core/models/definiciones/activo-depreciacion';
import { comprobarActivoDepreciable } from '@core/utils/funciones/comprobar-activo-depreciable';

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
  @Input() modoFormulario: ModoFormulario;

  metodosDepreciacion = METODOS_DEPRECIACION;
  unidadesTiempo = UNIDADES_MEDIDA['TIEMPO'];

  constructor(private _dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  buscarCuentaContableGasto() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            cuentaContableGasto: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarCuentaContableDepreciacion() {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            cuentaContableDepreciacion: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarPlantillaDepreciacion() {
    let dialog = this._dialog.open(BuscadorPlantillaIntegracionComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((entidad: PlantillaDepreciacion) =>
          this.formulario.patchValue({
            metodoDepreciacion: entidad.metodoDepreciacion,
            cuentaContableGasto: entidad.cuentaContableGasto,
            cuentaContableDepreciacion: entidad.cuentaContableDepreciacion,
            vidaUtil: entidad.vidaUtil,
            unidadVidaUtil: entidad.unidadVidaUtil,
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

  valorMonedaAsignados = () => {
    let { valorAdquisicion, monedaId } = this.formularioDatosGenerales
      .value as Activo;
    let comprobaciones = [
      valorAdquisicion > 0,
      monedaId !== null,
      monedaId !== '0',
    ];
    return comprobaciones.every(todo => !!todo);
  };
}
