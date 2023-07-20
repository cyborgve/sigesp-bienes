import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Entidad } from '@core/models/auxiliares/entidad';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Id } from '@core/types/id';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponenteService } from '@core/services/componente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CorrelativoService } from '@core/services/correlativo.service';
import { BuscadorComponenteComponent } from '../buscador-componente/buscador-componente.component';
import { Componente } from '@core/models/definiciones/componente';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { Activo } from '@core/models/definiciones/activo';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { Modelo } from '@core/models/definiciones/modelo';

@Component({
  selector: 'app-singular-componente',
  templateUrl: './singular-componente.component.html',
  styleUrls: ['./singular-componente.component.scss'],
})
export class SingularComponenteComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = CORRELATIVOS[1].nombre;
  formulario: FormGroup;
  constructor(
    private _entidad: ComponenteService,
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
      codigo: ['autogenerado'],
      denominacion: ['', Validators.required],
      tipoComponenteId: [0],
      modeloId: [0],
      activoId: [0],
      especificaciones: [''],
      creado: [new Date()],
      modificado: [new Date()],
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
              tipoComponenteId: entidad.tipoComponenteId,
              modeloId: entidad.modeloId,
              activoId: entidad.activoId,
              especificaciones: entidad.especificaciones,
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
    let dialog = this._dialog.open(BuscadorComponenteComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: Componente) =>
            entidad
              ? this.formulario.patchValue({
                  denominacion: entidad.denominacion,
                  tipoComponenteId: entidad.tipoComponenteId,
                  modeloId: entidad.modeloId,
                  activoId: entidad.activoId,
                  especificaciones: entidad.especificaciones,
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: Componente = this.formulario.value;
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
    this.subscripciones.push(
      dialog
        .beforeClosed()
        .pipe(
          filter(todo => !!todo),
          switchMap(() => this._entidad.eliminar(this.formulario.value.id)),
          take(1)
        )
        .subscribe(() => this.irAtras())
    );
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
            tipoComponente
              ? this.formulario.patchValue({
                  tipoComponenteId: tipoComponente.id,
                })
              : undefined
          )
        )
        .subscribe()
    );
  }

  buscarActivo() {
    let dialog = this._dialog.open(BuscadorActivoComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((activo: Activo) =>
            activo
              ? this.formulario.patchValue({ activoId: activo.id })
              : undefined
          )
        )
        .subscribe()
    );
  }

  buscarModelo() {
    let dialog = this._dialog.open(BuscadorModeloComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((modelo: Modelo) =>
            modelo
              ? this.formulario.patchValue({ modeloId: modelo.id })
              : undefined
          )
        )
        .subscribe()
    );
  }
}
