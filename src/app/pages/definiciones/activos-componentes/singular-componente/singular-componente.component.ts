import { tap, first, filter, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { Entidad } from '@core/models/auxiliares/entidad';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Id } from '@core/types/id';
import { CORRELATIVOS } from '@core/constants/correlativos';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ComponenteService } from '@core/services/definiciones/componente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { BuscadorComponenteComponent } from '../buscador-componente/buscador-componente.component';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';
import { TipoComponente } from '@core/models/definiciones/tipo-componente';
import { BuscadorActivoComponent } from '@pages/definiciones/activos/buscador-activo/buscador-activo.component';
import { Activo } from '@core/models/definiciones/activo';
import { BuscadorModeloComponent } from '@pages/definiciones/modelos/buscador-modelo/buscador-modelo.component';
import { Modelo } from '@core/models/definiciones/modelo';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { BuscadorMonedaComponent } from '@shared/components/buscador-moneda/buscador-moneda.component';
import { Moneda } from '@core/models/otros-modulos/moneda';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

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
  formulario: UntypedFormGroup;
  constructor(
    private _entidad: ComponenteService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      denominacion: [undefined, Validators.required],
      tipoComponenteId: [undefined],
      modeloId: [undefined],
      activoId: [undefined],
      costo: [undefined],
      moneda: [undefined],
      especificaciones: [undefined],
      creado: [undefined],
      modificado: [undefined],
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
      this.subscripciones.push(
        this._entidad
          .buscarPorId(this.id)
          .pipe(
            tap(entidad => {
              this.formulario.patchValue({
                empresaId: entidad.empresaId,
                id: entidad.id,
                codigo: entidad.codigo,
                denominacion: entidad.denominacion,
                tipoComponenteId: entidad.tipoComponenteId,
                modeloId: entidad.modeloId,
                activoId: entidad.activoId,
                costo: entidad.costo,
                moneda: entidad.moneda,
                especificaciones: entidad.especificaciones,
                creado: entidad.creado,
                modificado: entidad.modificado,
              });
            })
          )
          .subscribe()
      );
    } else {
      this._correlativo
        .buscarPorId(CORRELATIVOS.find(c => c.nombre === this.titulo).id)
        .pipe(
          tap(correlativo => {
            let ser = correlativo.serie.toString().padStart(4, '0');
            let cor = correlativo.correlativo.toString().padStart(8, '0');
            return this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              denominacion: '',
              tipoComponenteId: 0,
              modeloId: 0,
              activoId: 0,
              costo: 0,
              moneda: '0',
              especificaciones: '',
              creado: new Date(),
              modificado: new Date(),
            });
          })
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
          filter(todo => !!todo),
          tap((entidad: ActivoComponente) =>
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              tipoComponenteId: entidad.tipoComponenteId,
              modeloId: entidad.modeloId,
              activoId: entidad.activoId,
              costo: entidad.costo,
              moneda: entidad.moneda,
              especificaciones: entidad.especificaciones,
            })
          )
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: ActivoComponente = this.formulario.value;
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
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
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
          switchMap(() =>
            this._entidad.eliminar(
              this.formulario.value.id,
              this.titulo.toUpperCase()
            )
          )
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
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.tipoComponenteId),
          tap((tipoComponente: TipoComponente) =>
            this.formulario.patchValue({
              tipoComponenteId: tipoComponente.id,
            })
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
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.activoId),
          tap((activo: Activo) =>
            this.formulario.patchValue({ activoId: activo.id })
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
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.modeloId),
          tap((modelo: Modelo) =>
            this.formulario.patchValue({ modeloId: modelo.id })
          )
        )
        .subscribe()
    );
  }

  buscarMoneda() {
    let dialog = this._dialog.open(BuscadorMonedaComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.moneda),
          tap((moneda: Moneda) =>
            this.formulario.patchValue({ moneda: moneda.id })
          )
        )
        .subscribe()
    );
  }
}
