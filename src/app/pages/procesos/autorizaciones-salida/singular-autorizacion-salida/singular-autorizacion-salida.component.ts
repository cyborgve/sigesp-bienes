import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoService } from '@core/services/activo.service';
import { CorrelativoService } from '@core/services/correlativo.service';
import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorAutorizacionSalidaComponent } from '../buscador-autorizacion-salida/buscador-autorizacion-salida.component';
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorUnidadAdministrativaComponent } from '@pages/definiciones/unidades-administrativas/buscador-unidad-administrativa/buscador-unidad-administrativa.component';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';

@Component({
  selector: 'app-singular-autorizacion-salida',
  templateUrl: './singular-autorizacion-salida.component.html',
  styleUrls: ['./singular-autorizacion-salida.component.scss'],
})
export class SingularAutorizacionSalidaComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[29].nombre;
  formulario: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.AUTORIZACIONES_SALIDA;

  constructor(
    private _entidad: AutorizacionSalidaService,
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
      empresaPersonaEntrega: ['', Validators.required],
      representanteEmpresa: ['', Validators.required],
      explicacion: [''],
      observaciones: [''],
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
          tap(entidad =>
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              comprobante: entidad.comprobante,
              unidadAdministrativaCedente: entidad.unidadAdministrativaCedente,
              empresaPresonaEntrega: entidad.empresaPersonaEntrega,
              representanteEmpresa: entidad.representanteEmpresa,
              explicacion: entidad.explicacion,
              observaciones: entidad.observaciones,
              activos: [],
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
              comprobante: `${ser}-${doc}`,
            });
          }),
          take(1)
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorAutorizacionSalidaComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: AutorizacionSalida) => {
          this.formulario.patchValue({
            unidadAdministrativaCedente: entidad.unidadAdministrativaCedente,
            empresaPresonalEntrega: entidad.empresaPersonaEntrega,
            representanteEmpresa: entidad.representanteEmpresa,
            explicacion: entidad.explicacion,
            observaciones: entidad.observaciones,
          });
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: AutorizacionSalida = this.formulario.value;
    if (this.modoFormulario === 'CREANDO') {
      this._entidad
        .guardar(entidad, this.titulo.toUpperCase())
        .pipe(first())
        .subscribe(() => this.irAtras());
    } else {
      this._entidad
        .actualizar(this.id, entidad, this.titulo.toUpperCase())
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

  agregarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((activo: Activo) => {
          if (activo) {
            this.dataSource = new MatTableDataSource([
              ...this.dataSource.data,
              activo,
            ]);
          }
        }),
        take(1)
      )
      .subscribe();
  }

  eliminarActivo(row: any) {}

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

  buscarEmpresaPersonaEntrega() {
    alert('TODO');
  }

  buscarRepresentanteEmpresa() {
    alert('TODO');
  }
}
