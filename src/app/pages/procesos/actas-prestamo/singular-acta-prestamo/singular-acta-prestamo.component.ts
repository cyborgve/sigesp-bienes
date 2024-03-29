import { Activo } from '@core/models/definiciones/activo';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorActaPrestamoComponent } from '../buscador-acta-prestamo/buscador-acta-prestamo.component';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { prepararActaPrestamo } from '@core/utils/funciones/preparar-acta-prestamo';
import { Entidad } from '@core/models/auxiliares/entidad';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { chequearUnidadConActivos } from '@core/utils/funciones/chequear-unidad-con-activos';
import { filtrarActivosIncorporados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-incoporados';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { filtrarActivosReferenciaEstadoDisponible } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-referencia-estado-disponible.ts';
import { filtrarUnidadesAdministrativasNoSeleccionadas } from '@core/utils/pipes-rxjs/operadores/filtrar-unidades-administrativas-no-seleccionadas';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { filtrarActivosNoSeleccionados } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-no-seleccionados';

@Component({
  selector: 'app-singular-acta-prestamo',
  templateUrl: './singular-acta-prestamo.component.html',
  styleUrls: ['./singular-acta-prestamo.component.scss'],
})
export class SingularActaPrestamoComponent
  implements OnInit, OnDestroy, Entidad
{
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[29].nombre;
  formulario: UntypedFormGroup;
  dataSource: MatTableDataSource<ActivoProceso> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'];
  private subscripciones: Subscription[] = [];

  agregarActivoDeshabilitado = () =>
    this.formulario.value.unidadAdministrativaCedente === 0 ||
    this.formulario.value.unidadCedenteResponsable === '---' ||
    this.formulario.value.unidadAdministrativaReceptora === 0 ||
    this.formulario.value.unidadReceptoraResponsable === '---' ||
    this.formulario.value.testigo === '---';

  constructor(
    private _actaPrestamo: ActaPrestamoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
    private _activoUbicacion: ActivoUbicacionService,
    private _snackBar: MatSnackBar
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      unidadAdministrativaCedente: [undefined, Validators.required],
      unidadCedenteResponsable: [undefined, Validators.required],
      unidadAdministrativaReceptora: [undefined, Validators.required],
      unidadReceptoraResponsable: [undefined, Validators.required],
      testigo: [undefined, Validators.required],
      notas: [undefined],
      activos: [undefined],
      creado: [undefined],
      modificado: [undefined],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngOnInit(): void {
    this.subscripciones.push(
      this.formulario.controls.unidadAdministrativaCedente.valueChanges
        .pipe(
          switchMap((unidadAdministrativa: Id) =>
            chequearUnidadConActivos(
              unidadAdministrativa,
              this._activo,
              this._activoUbicacion,
              this._snackBar
            )
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._actaPrestamo
        .buscarPorId(this.id)
        .pipe(
          tap(actaPrestamo => {
            this.formulario.patchValue({
              empresaId: actaPrestamo.empresaId,
              id: actaPrestamo.id,
              comprobante: actaPrestamo.comprobante,
              unidadAdministrativaCedente:
                actaPrestamo.unidadAdministrativaCedente,
              unidadCedenteResponsable: actaPrestamo.unidadCedenteResponsable,
              unidadAdministrativaReceptora:
                actaPrestamo.unidadAdministrativaReceptora,
              unidadReceptoraResponsable:
                actaPrestamo.unidadReceptoraResponsable,
              testigo: actaPrestamo.testigo,
              creado: actaPrestamo.creado,
              modificado: actaPrestamo.modificado,
            });
          }),
          tap(
            actaPrestamo =>
              (this.dataSource = new MatTableDataSource(actaPrestamo.activos))
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
              unidadAdministrativaCedente: 0,
              unidadCedenteResponsable: '',
              unidadAdministrativaReceptora: 0,
              unidadReceptoraResponsable: '',
              testigo: '---',
              notas: '',
              activos: [],
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
    let dialog = this._dialog.open(BuscadorActaPrestamoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((actaPrestamo: ActaPrestamo) =>
          this.formulario.patchValue({
            unidadAdministrativaCedente:
              actaPrestamo.unidadAdministrativaCedente,
            unidadCedenteResponsable: actaPrestamo.unidadCedenteResponsable,
            unidadAdministrativaReceptora:
              actaPrestamo.unidadAdministrativaReceptora,
            unidadReceptoraResponsable: actaPrestamo.unidadReceptoraResponsable,
            testigo: actaPrestamo.testigo,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let actaPrestamo = prepararActaPrestamo(this.formulario.value);
    actaPrestamo.activos = this.dataSource.data;
    if (this.modoFormulario === 'CREANDO') {
      this._actaPrestamo
        .guardar(actaPrestamo, this.titulo)
        .pipe(first())
        .subscribe(actaPrestamo =>
          actaPrestamo ? this.reiniciarFormulario() : undefined
        );
    } else {
      this._actaPrestamo
        .actualizar(this.id, actaPrestamo, this.titulo)
        .pipe(first())
        .subscribe(actaPrestamo =>
          actaPrestamo ? this.reiniciarFormulario() : undefined
        );
    }
  }

  buscar() {
    this._router.navigate(['/procesos/actas-prestamo']);
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
          this._actaPrestamo.eliminar(this.formulario.value.id, this.titulo)
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

  buscarUnidadAdministrativaCedente() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
      data: {
        filtros: [
          filtrarUnidadesAdministrativasNoSeleccionadas([
            this.formulario.value.unidadAdministrativaReceptora,
          ]),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(
          this.formulario.value.unidadAdministrativaCedente
        ),
        tap(unidadAdministrativa =>
          this.formulario.patchValue({
            unidadAdministrativaCedente: unidadAdministrativa.id,
            unidadCedenteResponsable: unidadAdministrativa.responsable,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarUnidadAdministrativaReceptora() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
      data: {
        filtros: [
          filtrarUnidadesAdministrativasNoSeleccionadas([
            this.formulario.value.unidadAdministrativaCedente,
          ]),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(
          this.formulario.value.unidadAdministrativaReceptora
        ),
        tap(unidadAdministrativa =>
          this.formulario.patchValue({
            unidadAdministrativaReceptora: unidadAdministrativa.id,
            unidadReceptoraResponsable: unidadAdministrativa.responsable,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  buscarTestigo() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.testigo),
        tap(responsable =>
          this.formulario.patchValue({
            testigo: responsable.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }

  agregarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
      data: {
        filtros: [
          filtrarActivosNoSeleccionados(this.dataSource.data),
          filtrarActivosIncorporados(this._activoUbicacion),
          filtrarActivosReferenciaEstadoDisponible(this._activoUbicacion),
          filtrarActivosPorUnidadAdministrativa(
            this.formulario.value.unidadAdministrativaCedente,
            this._activoUbicacion
          ),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(activo => this._activo.buscarPorId(activo.id)),
        tap((activo: Activo) =>
          activo
            ? (this.dataSource = new MatTableDataSource([
                ...this.dataSource.data,
                convertirActivoProceso(activo),
              ]))
            : undefined
        ),
        tap(activo =>
          this.formulario.patchValue({
            activos: [
              ...this.formulario.value.activos,
              <ActivoProceso>{
                empresaId: activo.id,
                id: undefined,
                proceso: undefined,
                activo: activo.id,
                codigo: activo.codigo,
                tipoActivo: activo.tipoActivo,
                denominacion: activo.denominacion,
                creado: new Date(),
                modificado: new Date(),
              },
            ],
          })
        ),
        take(1)
      )
      .subscribe();
  }

  eliminarActivo(activo: Activo) {
    let activos = this.formulario.value.activos as ActivoProceso[];
    activos.splice(activos.findIndex(a => a.activo === activo.id));
    this.dataSource = new MatTableDataSource(activos);
  }

  formularioInvalido() {
    return (
      this.dataSource.data.length === 0 || this.agregarActivoDeshabilitado()
    );
  }

  reiniciarFormulario() {
    this.formulario.reset();
    this.dataSource = new MatTableDataSource();
    this.actualizarFormulario();
  }
}
