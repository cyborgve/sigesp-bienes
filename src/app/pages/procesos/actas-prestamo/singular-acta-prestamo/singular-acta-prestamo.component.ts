import { Activo } from '@core/models/definiciones/activo';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap, map } from 'rxjs/operators';
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
  formulario: FormGroup;
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
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService,
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
            this.unidadConActivos(unidadAdministrativa).pipe(
              map(tieneActivos =>
                !tieneActivos && unidadAdministrativa !== 0
                  ? this._snackBar.open(
                      'La Unidad Administrativa seleccionada no tiene Bienes asignados',
                      undefined,
                      { duration: 6000 }
                    )
                  : undefined
              )
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
              unidadCedenteResponsable: '---',
              unidadAdministrativaReceptora: 0,
              unidadReceptoraResponsable: '---',
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
        tap((actaPrestamo: ActaPrestamo) =>
          actaPrestamo
            ? this.formulario.patchValue({
                unidadAdministrativaCedente:
                  actaPrestamo.unidadAdministrativaCedente,
                unidadCedenteResponsable: actaPrestamo.unidadCedenteResponsable,
                unidadAdministrativaReceptora:
                  actaPrestamo.unidadAdministrativaReceptora,
                unidadReceptoraResponsable:
                  actaPrestamo.unidadReceptoraResponsable,
                testigo: actaPrestamo.testigo,
              })
            : undefined
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
          this._actaPrestamo.eliminar(
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

  buscarUnidadAdministrativaCedente() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(unidadAdministrativa =>
          unidadAdministrativa
            ? this.formulario.patchValue({
                unidadAdministrativaCedente: unidadAdministrativa.id,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsableUnidadCedente() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(responsable =>
          responsable
            ? this.formulario.patchValue({
                unidadCedenteResponsable: responsable.id,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  buscarUnidadAdministrativaReceptora() {
    let dialog = this._dialog.open(BuscadorUnidadAdministrativaComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(unidadAdministrativa =>
          unidadAdministrativa
            ? this.formulario.patchValue({
                unidadAdministrativaReceptora: unidadAdministrativa.id,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  buscarResponsableUnidadReceptora() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap(responsable =>
          responsable
            ? this.formulario.patchValue({
                unidadReceptoraResponsable: responsable.id,
              })
            : undefined
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
        tap(responsable =>
          responsable
            ? this.formulario.patchValue({
                testigo: responsable.id,
              })
            : undefined
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
          this._activo.filtrarIncorporados(),
          this._activo.filtrarPorUnidadAdministrativa(
            this.formulario.value.unidadAdministrativaCedente
          ),
        ],
      },
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap(activo =>
          activo ? this._activo.buscarPorId(activo.id) : activo
        ),
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

  unidadConActivos = (unidadAdministrativa: Id) =>
    this._activo.buscarTodos().pipe(
      this._activo.filtrarPorUnidadAdministrativa(unidadAdministrativa),
      map(activos => activos.length > 0)
    );
}
