import { tap, take, switchMap, first, filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoService } from '@core/services/activo.service';
import { CorrelativoService } from '@core/services/correlativo.service';
import { RetornoService } from '@core/services/procesos/retorno.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorRetornoComponent } from '../buscador-retorno/buscador-retorno.component';
import { Basica } from '@core/models/auxiliares/basica';
import { Retorno } from '@core/models/procesos/retorno';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { TIPOS_COMPROBANTE } from '@core/constants/tipos-comprobante';

@Component({
  selector: 'app-singular-retorno',
  templateUrl: './singular-retorno.component.html',
  styleUrls: ['./singular-retorno.component.scss'],
})
export class SingularRetornoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[37].nombre;
  formulario: FormGroup;
  dataActivos: MatTableDataSource<Activo> = new MatTableDataSource();
  tiposComprobante = TIPOS_COMPROBANTE;

  constructor(
    private _entidad: RetornoService,
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
      tipoComprobante: ['', Validators.required],
      beneficiario: ['', Validators.required],
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
              beneficiario: entidad.beneficiario,
              observaciones: entidad.observaciones,
              activos: entidad.activos,
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
    let dialog = this._dialog.open(BuscadorRetornoComponent, {
      width: '95%',
      height: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap((retorno: Basica) =>
          retorno ? this._entidad.buscarPorId(retorno.id) : undefined
        ),
        tap(entidad =>
          entidad
            ? this.formulario.patchValue({
                beneficiario: entidad.beneficiario,
                observaciones: entidad.observaciones,
                activos: entidad.activos,
              })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let entidad: Retorno = this.formulario.value;
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

  private recargarActivos() {
    this.dataActivos = new MatTableDataSource(this.formulario.value.activos);
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
          if (activo)
            this.formulario.patchValue({
              activos: [...this.formulario.value.activos, activo],
            });
        }),
        take(1)
      )
      .subscribe(() => this.recargarActivos());
  }

  removerActivo(event: any) {}

  buscarBeneficiario() {}
}
