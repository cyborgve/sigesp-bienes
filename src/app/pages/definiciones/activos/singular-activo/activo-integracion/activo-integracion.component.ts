import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivoDetalle } from '@core/models/definiciones/activo-detalle';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { activoCentroCostosAsignado } from '@core/utils/funciones/activo-centro-costos-asignado';
import { filtrarPlantillasIntegracionPorTipo } from '@core/utils/pipes-rxjs/operadores/filtrar-plantillas-integracion-por-tipo';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorPlantillaIntegracionComponent } from '@pages/definiciones/plantillas-integracion/buscador-plantilla-integracion/buscador-plantilla-integracion.component';
import { BuscadorCuentaContableComponent } from '@shared/components/buscador-cuenta-contable/buscador-cuenta-contable.component';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-activo-integracion',
  templateUrl: './activo-integracion.component.html',
  styleUrls: ['./activo-integracion.component.scss'],
})
export class ActivoIntegracionComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() formularioDetalles: UntypedFormGroup;

  constructor(private _dialog: MatDialog) {}

  buscarModCuentaContableDebe = () => {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.modCuentaContableDebe),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            modCuentaContableDebe: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  };

  buscarModCuentaContableHaber = () => {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.modCuentaContableHaber),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            modCuentaContableHaber: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  };

  buscarDesCuentaContableDebe = () => {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.desCuentaContableDebe),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            desCuentaContableDebe: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  };

  buscarDesCuentaContableHaber = () => {
    let dialog = this._dialog.open(BuscadorCuentaContableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.desCuentaContableHaber),
        tap((cuentaContable: CuentaContable) =>
          this.formulario.patchValue({
            desCuentaContableHaber: cuentaContable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  };

  aplicarPlantillaModificacion = () => {
    let dialog = this._dialog.open(BuscadorPlantillaIntegracionComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtrarPlantillasIntegracionPorTipo('MOD')] },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((plantillaIntegracion: PlantillaIntegracion) =>
          this.formulario.patchValue({
            modCuentaContableDebe: plantillaIntegracion.cuentaContableDebe,
            modCuentaContableHaber: plantillaIntegracion.cuentaContableHaber,
          })
        ),
        take(1)
      )
      .subscribe();
  };

  aplicarPlantillaDesincorporacion = () => {
    let dialog = this._dialog.open(BuscadorPlantillaIntegracionComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [filtrarPlantillasIntegracionPorTipo('DES')],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((plantillaIntegracion: PlantillaIntegracion) =>
          this.formulario.patchValue({
            desCuentaContableDebe: plantillaIntegracion.cuentaContableDebe,
            desCuentaContableHaber: plantillaIntegracion.cuentaContableHaber,
          })
        ),
        take(1)
      )
      .subscribe();
  };

  centroCostosAsignado = () =>
    activoCentroCostosAsignado(this.formularioDetalles.value);
}
