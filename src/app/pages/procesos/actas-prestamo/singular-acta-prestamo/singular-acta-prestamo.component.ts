import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorActaPrestamoComponent } from '../buscador-acta-prestamo/buscador-acta-prestamo.component';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorResponsableComponent } from '@shared/components/buscador-responsable/buscador-responsable.component';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoService } from '@core/services/activo.service';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Activo } from '@core/models/definiciones/activo';

@Component({
  selector: 'app-singular-acta-prestamo',
  templateUrl: './singular-acta-prestamo.component.html',
  styleUrls: ['./singular-acta-prestamo.component.scss'],
})
export class SingularActaPrestamoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[28].nombre;
  formulario: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'];

  constructor(
    private _entidad: ActaPrestamoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService,
    private _activo: ActivoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      comprobante: ['AUTOGENERADO'],
      unidadAdministrativaCedente: ['', Validators.required],
      unidadCedenteResponsable: ['', Validators.required],
      unidadAdministrativaReceptora: ['', Validators.required],
      unidadReceptoraResponsable: ['', Validators.required],
      testigo: ['', Validators.required],
      notas: [''],
      activos: [[]],
      creado: [new Date()],
      modificado: [new Date()],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          tap(entidad => {
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              comprobante: entidad.comprobante,
              unidadAdministrativaCedente: entidad.unidadAdministrativaCedente,
              unidadCedenteResponsable: entidad.unidadCedenteResponsable,
              unidadAdministrativaReceptora:
                entidad.unidadAdministrativaReceptora,
              unidadReceptoraResponsable: entidad.unidadReceptoraResponsable,
              testigo: entidad.testigo,
              notas: entidad.notas,
              creado: entidad.creado,
              modificado: entidad.modificado,
            });
          }),
          take(1)
        )
        .subscribe();
    }
    // else {
    //   this._correlativo
    //     .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
    //     .pipe(
    //       tap(correlativo => {
    //         let ser = correlativo.serie.toString().padStart(4, '0');
    //         let doc = correlativo.correlativo.toString().padStart(8, '0');
    //         this.formulario.patchValue({
    //           comprobante: `${ser}-${doc}`,
    //         });
    //       }),
    //       take(1)
    //     )
    //     .subscribe();
    // }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorActaPrestamoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: ActaPrestamo) => {
          this.formulario.patchValue({
            unidadAdministrativaCedente: entidad.unidadAdministrativaCedente,
            unidadCedenteResponsable: entidad.unidadCedenteResponsable,
            unidadAdministrativaReceptora:
              entidad.unidadAdministrativaReceptora,
            unidadReceptoraResponsable: entidad.unidadReceptoraResponsable,
            testigo: entidad.testigo,
            notas: entidad.notas,
          });
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: ActaPrestamo = this.formulario.value;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad)
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad)
        .pipe(first())
        .subscribe(() => this.irAtras());
    }
  }

  borrar() {
    let dialog = this._dialog.open(DialogoEliminarComponent, {
      data: {
        codigo: this.formulario.value.codigo,
        denominacion: this.formulario.value.denominacion,
      },
    });
    dialog
      .beforeClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(this.formulario.value.id)),
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
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            unidadAdministrativaCedente: entidad.id,
          })
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
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            unidadCedenteResponsable: entidad.id,
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
    });
    dialog
      .afterClosed()
      .pipe(
        tap((unidadAdministrativa: UnidadAdministrativa) =>
          this.formulario.patchValue({
            unidadAdministrativaReceptora: unidadAdministrativa.id,
          })
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
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            unidadReceptoraResponsable: entidad.id,
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
        tap((entidad: Basica) =>
          this.formulario.patchValue({
            testigo: entidad.id,
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
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap((basica: Basica) => this._activo.buscarPorId(basica.id)),
        tap(
          activo =>
            (this.dataSource = new MatTableDataSource([
              ...this.dataSource.data,
              activo,
            ]))
        ),
        take(1)
      )
      .subscribe();
  }

  eliminarActivo(row: any) {}
}
