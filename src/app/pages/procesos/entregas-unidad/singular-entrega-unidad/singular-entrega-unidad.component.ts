import { tap, take, switchMap, first, filter, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { EntregaUnidadService } from '@core/services/procesos/entrega-unidad.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorEntregaUnidadComponent } from '../buscador-entrega-unidad/buscador-entrega-unidad.component';
import { Basica } from '@core/models/auxiliares/basica';
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/definiciones/sede';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { Subscription } from 'rxjs';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { filtrarActivosPorSede } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-sede';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-singular-entrega-unidad',
  templateUrl: './singular-entrega-unidad.component.html',
  styleUrls: ['./singular-entrega-unidad.component.scss'],
})
export class SingularEntregaUnidadComponent
  implements Entidad, OnInit, OnDestroy
{
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[34].nombre;
  formulario: UntypedFormGroup;
  dataSource: MatTableDataSource<ActivoProceso> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.ACTIVOS.filter(cv => cv !== 'acciones');

  constructor(
    private _entidad: EntregaUnidadService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      unidadAdministrativa: [undefined, Validators.required],
      sede: [undefined, Validators.required],
      responsableAnterior: [undefined, Validators.required],
      nuevoResponsable: [undefined, Validators.required],
      observaciones: [undefined],
      activos: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.reiniciarFormulario();
  }

  ngOnInit(): void {
    this.subscripciones.push(
      this.formulario.valueChanges
        .pipe(
          tap(valoresFormulario => {
            let { unidadAdministrativa, sede } = valoresFormulario;
            if (unidadAdministrativa !== 0 && sede !== 0) {
              this._activo
                .buscarTodos()
                .pipe(
                  filtrarActivosPorUnidadAdministrativa(
                    unidadAdministrativa,
                    this._activoUbicacion
                  ),
                  filtrarActivosPorSede(sede, this._activoUbicacion),
                  map(activos => activos.map(convertirActivoProceso)),
                  tap(activos => {
                    this.dataSource = new MatTableDataSource(activos);
                  }),
                  take(1)
                )
                .subscribe();
            } else {
              this.dataSource = new MatTableDataSource();
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  formularioValido = () =>
    this.formulario.valid &&
    this.formulario.value.unidadAdministrativa !== 0 &&
    this.formulario.value.sede !== 0 &&
    this.formulario.value.responsableAnterior !== '' &&
    this.formulario.value.nuevoResponsable !== '---';

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
              unidadAdministrativa: entidad.unidadAdministrativa,
              sede: entidad.sede,
              responsableAnterior: entidad.responsableAnterior,
              nuevoResponsable: entidad.nuevoResponsable,
              observaciones: entidad.observaciones,
              activos: entidad.activos,
              creado: entidad.creado,
              modificado: entidad.modificado,
            })
          ),
          tap(
            entidad =>
              (this.dataSource = new MatTableDataSource(entidad.activos))
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
              unidadAdministrativa: 0,
              sede: 0,
              responsableAnterior: '',
              nuevoResponsable: '---',
              observaciones: '',
              activos: [],
              creado: new Date(),
              modificado: new Date(),
            });
            this.dataSource = new MatTableDataSource();
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorEntregaUnidadComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap((depreciacion: Basica) =>
          depreciacion ? this._entidad.buscarPorId(depreciacion.id) : undefined
        ),
        tap(entidad =>
          this.formulario.patchValue({
            sede: entidad.sede,
            responsableAnterior: entidad.responsableAnterior,
            nuevoResponsable: entidad.nuevoResponsable,
            observaciones: entidad.observaciones,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: EntregaUnidad = this.formulario.value;
    entidad.activos = this.dataSource.data;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo)
        .pipe(first())
        .subscribe(entregaUnidad =>
          entregaUnidad ? this.reiniciarFormulario() : undefined
        );
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  buscar() {
    this._router.navigate(['/procesos/entregas-unidad']);
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

  buscarSede() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.sede),
        tap((entidad: Sede) =>
          this.formulario.patchValue({ sede: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarUnidadAdministrativa() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.unidadAdministrativa),
        tap((unidadAdministrativa: UnidadAdministrativa) =>
          this.formulario.patchValue({
            unidadAdministrativa: unidadAdministrativa.id,
            responsableAnterior: unidadAdministrativa.responsable,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarNuevoResponsable() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.nuevoResponsable),
        tap((entidad: Responsable) =>
          this.formulario.patchValue({ nuevoResponsable: entidad.id })
        ),
        take(1)
      )
      .subscribe();
  }

  private reiniciarFormulario() {
    this.formulario.reset();
    this.actualizarFormulario();
  }
}
