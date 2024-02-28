import { ActivoIntegracionService } from '@core/services/definiciones/activo-integracion.service';
import { tap, take, switchMap, first, filter, map } from 'rxjs/operators';
import { combineLatest, forkJoin, pipe } from 'rxjs';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorModificacionComponent } from '../buscador-modificacion/buscador-modificacion.component';
import { Basica } from '@core/models/auxiliares/basica';
import { Modificacion } from '@core/models/procesos/modificacion';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorCausaMovimientoComponent } from '@pages/definiciones/causas-movimiento/buscador-causa-movimiento/buscador-causa-movimiento.component';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { Activo } from '@core/models/definiciones/activo';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { BuscadorComponenteComponent } from '@pages/definiciones/activos-componentes/buscador-componente/buscador-componente.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';
import { convertirComponenteProceso } from '@core/utils/funciones/convertir-componente-proceso';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { comprobarActivoDepreciable } from '@core/utils/funciones/comprobar-activo-depreciable';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { filtrarComponentesNoSeleccionados } from '@core/utils/pipes-rxjs/operadores/filtrar-componentes-no-seleccionados';
import { CuentaContableService } from '@core/services/otros-modulos/cuenta-contable.service';
import { convertirCuentaProceso } from '@core/utils/funciones/convertir-cuenta-proceso';
import { ActivoComponenteService } from '@core/services/definiciones/activo-componente.service';
import { filtrarComponentesDisponibles } from '@core/utils/pipes-rxjs/operadores/filtrar-componentes-disponibles';
import { filtrarActivosModificables } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-modificables';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';

@Component({
  selector: 'app-singular-modificacion',
  templateUrl: './singular-modificacion.component.html',
  styleUrls: ['./singular-modificacion.component.scss'],
})
export class SingularModificacionComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[36].nombre;
  formulario: UntypedFormGroup;
  dataComponentes: MatTableDataSource<ComponenteProceso> =
    new MatTableDataSource();
  dataCuentasContables: MatTableDataSource<CuentaContableProceso> =
    new MatTableDataSource();
  private activoActual: Activo = <Activo>{};

  constructor(
    private _entidad: ModificacionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
    private _activoIntegracion: ActivoIntegracionService,
    private _activoDetalle: ActivoDetalleService,
    private _cuentaContable: CuentaContableService,
    private _activoComponente: ActivoComponenteService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      causaMovimiento: [undefined, Validators.required],
      activo: [undefined, Validators.required],
      identificador: [undefined],
      serial: [undefined],
      observaciones: [undefined],
      modificaciones: [undefined],
      cuentasContables: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  agregarComponentesDeshabilitado = () => {
    let comprobaciones = [
      this.formulario.value.activo === undefined,
      this.formulario.value.activo === 0,
      this.formulario.value.causaMovimiento === undefined,
      this.formulario.value.causaMovimiento === 0,
    ];
    return comprobaciones.some(comprobacion => comprobacion);
  };

  depreciarDeshabilitado = true;

  formularioActivo = () =>
    this.formulario.valid &&
    this.dataComponentes.data.length > 0 &&
    this.dataCuentasContables.data.length > 0;

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          tap(entidad =>
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              comprobante: entidad.comprobante,
              causaMovimiento: entidad.causaMovimiento,
              activo: entidad.activo,
              identificador: entidad.identificador,
              serial: entidad.serial,
              observaciones: entidad.observaciones,
              modificaciones: entidad.modificaciones
                ? entidad.modificaciones
                : [],
              cuentasContables: entidad.cuentasContables
                ? entidad.cuentasContables
                : [],
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          ),
          take(1)
        )
        .subscribe();
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          tap(correlativo => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let doc = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              comprobante: `${ser}-${doc}`,
              causaMovimiento: 0,
              activo: 0,
              identificador: '',
              serial: '',
              observaciones: '',
              modificaciones: [],
              cuentasContables: [],
              creado: new Date(),
              modificado: new Date(),
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorModificacionComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap((modificacion: Basica) =>
          this._entidad.buscarPorId(modificacion.id)
        ),
        tap(entidad =>
          this.formulario.patchValue({
            causaMovimiento: entidad.causaMovimiento,
            activo: entidad.activo,
            identificador: entidad.identificador,
            serial: entidad.serial,
            observaciones: entidad.observaciones,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Modificacion = this.formulario.value;
    entidad.modificaciones = this.dataComponentes.data;
    entidad.cuentasContables = this.dataCuentasContables.data;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo)
        .pipe(first())
        .subscribe(() => this.reiniciarFormulario());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.formulario.value.denominacion,
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(
            this.formulario.value.id,
            this.titulo.toUpperCase()
          )
        ),
        take(1)
      )
      .subscribe(() => this.irAtras());
  }

  buscar() {
    this._router.navigate(['/procesos/modificaciones']);
  }

  imprimir() {
    throw new Error('Method not implemented.');
  }

  irAtras() {
    this._location.back();
  }
  irAlInicio() {
    this._router.navigate(['/procesos']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }

  buscarCausaMovimiento() {
    const filtroCausas = () =>
      pipe(
        map((causas: CausaMovimiento[]) =>
          causas.filter(causa => causa.tipo === 'M')
        )
      );
    let dialog = this._dialog.open(BuscadorCausaMovimientoComponent, {
      height: '95%',
      width: '85%',
      data: { filtros: [filtroCausas()] },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.causaMovimiento),
        tap((causaMovimiento: CausaMovimiento) =>
          this.formulario.patchValue({ causaMovimiento: causaMovimiento.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [
          filtrarActivosModificables(
            this._activoDetalle,
            this._activoIntegracion
          ),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.activo),
        tap((activo: Activo) => {
          this.activoActual = activo;
          this.formulario.patchValue({
            activo: activo.id,
            identificador: activo.serialRotulacion,
            serial: activo.serialFabrica,
          });
        }),
        switchMap(activo => this._activo.buscarPorId(activo.id)),
        take(1)
      )
      .subscribe();
  }

  agregarComponente() {
    let dialog = this._dialog.open(BuscadorComponenteComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [
          filtrarComponentesNoSeleccionados(this.dataComponentes.data),
          filtrarComponentesDisponibles(),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((activoComponente: ActivoComponente) => {
          this.dataComponentes = new MatTableDataSource([
            ...this.dataComponentes.data,
            convertirComponenteProceso(activoComponente),
          ]);
          this.agregarCuentasContables(activoComponente);
        }),
        take(1)
      )
      .subscribe();
  }

  removerComponente(componente: ComponenteProceso) {
    let indice = this.dataComponentes.data.indexOf(componente);
    this.dataComponentes.data
      .splice(indice, 1)
      .forEach(componente => this.removerCuentasContables(componente));
    this.dataComponentes = new MatTableDataSource(this.dataComponentes.data);
  }

  agregarCuentasContables(componente: ActivoComponente) {
    this._activoIntegracion
      .buscarPorActivo(this.activoActual.id)
      .pipe(
        switchMap(cuentasIntegracion => {
          let transformarDebe = this._cuentaContable
            .buscarPorId(cuentasIntegracion.modCuentaContableDebe)
            .pipe(
              map(cuentaContable =>
                convertirCuentaProceso(cuentaContable, 'D', componente.costo)
              )
            );
          let transformarHaber = this._cuentaContable
            .buscarPorId(cuentasIntegracion.modCuentaContableHaber)
            .pipe(
              map(cuentaContable =>
                convertirCuentaProceso(cuentaContable, 'H', componente.costo)
              )
            );
          return forkJoin([transformarDebe, transformarHaber]).pipe(
            tap(cuentasContables => {
              let { data } = this.dataCuentasContables;
              cuentasContables.forEach(c => {
                if (
                  data.find(
                    dato =>
                      dato.cuentaContable === c.cuentaContable &&
                      dato.procedencia === c.procedencia
                  )
                ) {
                  let indice = data.findIndex(
                    d =>
                      d.cuentaContable === c.cuentaContable &&
                      d.procedencia === c.procedencia
                  );
                  data[indice].monto += c.monto;
                } else {
                  data.push(c);
                }
              });
              this.dataCuentasContables = new MatTableDataSource(data);
            })
          );
        }),
        tap(() => {
          let debe = 0;
          let haber = 0;
          this.dataCuentasContables.data
            .filter(cuentaProceso => cuentaProceso.procedencia === 'D')
            .map(cuentaProceso => cuentaProceso.monto)
            .forEach(monto => (debe += monto));
          this.dataCuentasContables.data
            .filter(cuentaProceso => cuentaProceso.procedencia === 'H')
            .map(cuentaProceso => cuentaProceso.monto)
            .forEach(monto => (haber += monto));
          let diferencia = debe - haber;
          this.formulario.patchValue({
            debe: debe,
            haber: haber,
            diferencia: diferencia,
          });
        }),
        take(1)
      )
      .subscribe();
  }

  removerCuentasContables = (componenteProceso: ComponenteProceso) => {
    let buscarIntegracion = this._activoIntegracion.buscarPorActivo(
      this.activoActual.id
    );
    let buscarComponente = this._activoComponente.buscarPorId(
      componenteProceso.componente
    );
    combineLatest([buscarIntegracion, buscarComponente])
      .pipe(
        tap(([integracion, activoComponente]) => {
          let { modCuentaContableDebe, modCuentaContableHaber } = integracion;
          let { costo } = activoComponente;
          let { data } = this.dataCuentasContables;
          let indiceDebe = data.findIndex(
            dato =>
              dato.cuentaContable === modCuentaContableDebe &&
              dato.procedencia === 'D'
          );
          data[indiceDebe]['monto'] -= costo;
          if (data[indiceDebe]['monto'] <= 0) data.splice(indiceDebe, 1);
          let indiceHaber = data.findIndex(
            dato =>
              dato.cuentaContable === modCuentaContableHaber &&
              dato.procedencia === 'H'
          );
          data[indiceHaber]['monto'] -= costo;
          if (data[indiceHaber]['monto'] <= 0) data.splice(indiceHaber, 1);
          this.dataCuentasContables = new MatTableDataSource(data);
        }),
        tap(() => {
          let debe = 0;
          let haber = 0;
          this.dataCuentasContables.data
            .filter(cuentaProceso => cuentaProceso.procedencia === 'D')
            .map(cuentaProceso => cuentaProceso.monto)
            .forEach(monto => (debe += monto));
          this.dataCuentasContables.data
            .filter(cuentaProceso => cuentaProceso.procedencia === 'H')
            .map(cuentaProceso => cuentaProceso.monto)
            .forEach(monto => (haber += monto));
          let diferencia = debe - haber;
          this.formulario.patchValue({
            debe: debe,
            haber: haber,
            diferencia: diferencia,
          });
        }),
        take(1)
      )
      .subscribe();
  };

  private reiniciarFormulario(): void {
    this.formulario.reset();
    this.dataComponentes = new MatTableDataSource();
    this.dataCuentasContables = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
