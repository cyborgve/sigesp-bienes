import { Marca } from '@core/models/marca';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponenteActivoService } from '@core/services/componente-activo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { BuscadorComponenteActivoComponent } from '../buscador-componente-activo/buscador-componente-activo.component';
import { ComponenteActivo } from '@core/models/componente-activo';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorMarcaComponent } from '@pages/definiciones/marcas/buscador-marca/buscador-marca.component';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { Entidad } from '@core/models/entidad';
import { Modelo } from '@core/models/modelo';
import { TipoComponenteService } from '@core/services/tipo-componente.service';
import { Subscription } from 'rxjs';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';
import { TipoComponente } from '@core/models/tipo-componente';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';

@Component({
  selector: 'app-singular-componente-activo',
  templateUrl: './singular-componente-activo.component.html',
  styleUrls: ['./singular-componente-activo.component.scss'],
})
export class SingularComponenteActivoComponent implements Entidad, OnDestroy {
  subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'componente de activo';
  formulario: FormGroup;
  tiposComponenteActivo = () => this._tipoComponenteActivo.buscarTodos();

  constructor(
    private _entidad: ComponenteActivoService,
    private _tipoComponenteActivo: TipoComponenteService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [''],
      id: [''],
      codigo: ['', Validators.required],
      denominacion: ['', Validators.required],
      tipo: ['', Validators.required],
      marcaId: ['', Validators.required],
      modeloId: ['', Validators.required],
      creado: [''],
      modificado: [''],
    });
    this.id = this._activatedRoute.snapshot.params['id'];
    this.actualizarFormulario();
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  private actualizarFormulario() {
    if (this.id) {
      this.modoFormulario = 'EDITANDO';
      this._entidad
        .buscarPorId(this.id)
        .pipe(
          take(1),
          tap(entidad => {
            this.formulario.patchValue({
              empresaId: entidad.empresaId,
              id: entidad.id,
              codigo: entidad.codigo,
              denominacion: entidad.denominacion,
              tipo: entidad.tipo,
              marcaId: entidad.marcaId,
              modeloId: entidad.modeloId,
              creado: entidad.creado,
              modificado: entidad.modificado,
            });
          })
        )
        .subscribe();
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          take(1),
          tap(categoria =>
            this.formulario.patchValue({
              codigo:
                categoria.serie.toString().padStart(4, '0') +
                '-' +
                categoria.correlativo.toString().padStart(8, '0'),
            })
          )
        )
        .subscribe();
    }
  }

  importar() {
    let dialog = this._dialog.open(BuscadorComponenteActivoComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: ComponenteActivo) => {
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              marcaId: entidad.marcaId,
              modeloId: entidad.modeloId,
            });
          })
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: ComponenteActivo = this.formulario.value;
    entidad.modificado = new Date();
    if (this.modoFormulario === 'CREANDO') {
      entidad.creado = new Date();
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
    this._router.navigate(['/definiciones']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }

  buscarMarca() {
    let dialog = this._dialog.open(BuscadorMarcaComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .beforeClosed()
        .pipe(
          tap((marca: Marca) =>
            this.formulario.patchValue({ marcaId: marca.id })
          )
        )
        .subscribe()
    );
  }

  buscarModelo() {
    let dialog = this._dialog.open(BuscadorModeloComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .beforeClosed()
        .pipe(
          tap((modelo: Modelo) =>
            this.formulario.patchValue({ modeloId: modelo.id })
          )
        )
        .subscribe()
    );
  }

  buscarTipoComponente() {
    let dialog = this._dialog.open(BuscadorTipoComponenteComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((tipoComponente: TipoComponente) =>
            this.formulario.patchValue({ tipo: tipoComponente.id })
          )
        )
        .subscribe()
    );
  }
}
