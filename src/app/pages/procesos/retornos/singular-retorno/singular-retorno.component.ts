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
import { ActivoService } from '@core/services/definiciones/activo.service';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { RetornoService } from '@core/services/procesos/retorno.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorRetornoComponent } from '../buscador-retorno/buscador-retorno.component';
import { Basica } from '@core/models/auxiliares/basica';
import { Retorno } from '@core/models/procesos/retorno';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { BuscadorBeneficiarioComponent } from '@shared/components/buscador-beneficiario/buscador-beneficiario.component';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { convertirActivoProceso } from '@core/utils/funciones/convertir-activo-proceso';

@Component({
  selector: 'app-singular-retorno',
  templateUrl: './singular-retorno.component.html',
  styleUrls: ['./singular-retorno.component.scss'],
})
export class SingularRetornoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[38].nombre;
  formulario: FormGroup;
  dataSource: MatTableDataSource<ActivoProceso> = new MatTableDataSource();
  tiposProceso = TIPOS_PROCESO;

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
      empresaId: [undefined],
      id: [undefined],
      comprobante: [undefined],
      tipoComprobante: [undefined, Validators.required],
      beneficiario: [undefined, Validators.required],
      observaciones: [undefined],
      activos: [undefined],
      creado: [undefined],
      modificado: [undefined],
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
              empresaId: 0,
              id: 0,
              comprobante: `${ser}-${doc}`,
              tipoComprobante: '',
              beneficiario: '---',
              observaciones: '',
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
    entidad.activos = this.dataSource.data;
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

  buscar() {
    this._router.navigate(['/procesos/retornos']);
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
            this.dataSource = new MatTableDataSource([
              ...this.dataSource.data,
              convertirActivoProceso(activo),
            ]);
        }),
        take(1)
      )
      .subscribe();
  }

  removerActivo(activo: ActivoProceso) {
    this.dataSource.data.splice(this.dataSource.data.indexOf(activo), 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
  }

  buscarBeneficiario() {
    let dialog = this._dialog.open(BuscadorBeneficiarioComponent, {
      height: '95%',
      width: '85%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((beneficiario: Beneficiario) =>
          beneficiario
            ? this.formulario.patchValue({ beneficiario: beneficiario.id })
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
