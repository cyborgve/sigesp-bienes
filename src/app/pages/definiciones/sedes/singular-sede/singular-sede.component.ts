import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Entidad } from '@core/models/auxiliares/entidad';
import { Pais } from '@core/models/otros-modulos/pais';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { SedeService } from '@core/services/definiciones/sede.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Subscription } from 'rxjs';
import { BuscadorSedeComponent } from '../buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/definiciones/sede';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { BuscadorPaisComponent } from '@shared/components/buscador-pais/buscador-pais.component';
import { BuscadorEstadoComponent } from '@shared/components/buscador-estado/buscador-estado.component';
import { Estado } from '@core/models/otros-modulos/estado';
import { BuscadorMunicipioComponent } from '@shared/components/buscador-municipio/buscador-municipio.component';
import { Municipio } from '@core/models/otros-modulos/municipio';
import { BuscadorCiudadComponent } from '@shared/components/buscador-ciudad/buscador-ciudad.component';
import { Ciudad } from '@core/models/otros-modulos/ciudad';
import { BuscadorTipoSedeComponent } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.component';
import { TipoSede } from '@core/models/definiciones/tipo-sede';
import { BuscadorParroquiaComponent } from '@shared/components/buscador-parroquia/buscador-parroquia.component';
import { Parroquia } from '@core/models/otros-modulos/parroquia';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-singular-sede',
  templateUrl: './singular-sede.component.html',
  styleUrls: ['./singular-sede.component.scss'],
})
export class SingularSedeComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';

  id: Id;
  titulo = CORRELATIVOS[18].nombre;
  formulario: FormGroup;
  tipos = ['Tipo 1', 'Tipo 2', 'Tipo 3'];
  localizaciones = ['Nacional', 'Internacional'];
  paises: Pais[] = [];

  constructor(
    private _entidad: SedeService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog,
    private _correlativo: CorrelativoService
  ) {
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      codigo: [undefined],
      denominacion: [undefined, Validators.required],
      tipoSedeId: [undefined],
      localizacion: [undefined, Validators.required],
      paisId: [undefined],
      estadoId: [undefined],
      municipioId: [undefined],
      parroquiaId: [undefined],
      ciudadId: [undefined],
      urbanizacion: [undefined],
      calleAvenida: [undefined],
      casaEdificio: [undefined],
      piso: [undefined],
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
              tipoSedeId: entidad.tipoSedeId,
              localizacion: entidad.localizacion,
              paisId: entidad.paisId,
              estadoId: entidad.estadoId,
              municipioId: entidad.municipioId,
              parroquiaId: entidad.parroquiaId,
              ciudadId: entidad.ciudadId,
              urbanizacion: entidad.urbanizacion,
              calleAvenida: entidad.calleAvenida,
              casaEdificio: entidad.casaEdificio,
              piso: entidad.piso,
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
            let cor = correlativo.correlativo.toString().padStart(8, '0');
            this.formulario.patchValue({
              empresaId: 0,
              id: 0,
              codigo: `${ser}-${cor}`,
              denominacion: '',
              tipoSedeId: 0,
              localizacion: 'S',
              paisId: '---',
              estadoId: '---',
              municipioId: '---',
              parroquiaId: '---',
              ciudadId: '---',
              urbanizacion: '',
              calleAvenida: '',
              casaEdificio: '',
              piso: '',
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
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          tap((entidad: Sede) =>
            this.formulario.patchValue({
              denominacion: entidad.denominacion,
              tipoSedeId: entidad.tipoSedeId,
              localizacion: entidad.localizacion,
              paisId: entidad.paisId,
              estadoId: entidad.estadoId,
              municipioId: entidad.municipioId,
              parroquiaId: entidad.parroquiaId,
              ciudadId: entidad.ciudadId,
              urbanizacion: entidad.urbanizacion,
              calleAvenida: entidad.calleAvenida,
              casaEdificio: entidad.casaEdificio,
              piso: entidad.piso,
            })
          )
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: Sede = this.formulario.value;
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
    this._router.navigate(['/definiciones']);
  }

  salir() {
    throw new Error('Method not implemented.');
  }

  buscarPais() {
    let dialog = this._dialog.open(BuscadorPaisComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.paisId),
          tap((pais: Pais) => this.formulario.patchValue({ paisId: pais.id }))
        )
        .subscribe()
    );
  }

  buscarEstado() {
    let dialog = this._dialog.open(BuscadorEstadoComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.estadoId),
          tap((estado: Estado) =>
            this.formulario.patchValue({ estadoId: estado.id })
          )
        )
        .subscribe()
    );
  }

  buscarMunicipio() {
    let dialog = this._dialog.open(BuscadorMunicipioComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.municipioId),
          tap((municipio: Municipio) =>
            this.formulario.patchValue({ municipioId: municipio.id })
          )
        )
        .subscribe()
    );
  }

  buscarParroquia() {
    let dialog = this._dialog.open(BuscadorParroquiaComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.parroquiaId),
          tap((parroquia: Parroquia) =>
            this.formulario.patchValue({ parroquiaId: parroquia.id })
          )
        )
        .subscribe()
    );
  }

  buscarCiudad() {
    let dialog = this._dialog.open(BuscadorCiudadComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.ciudadId),
          tap((ciudad: Ciudad) =>
            this.formulario.patchValue({ ciudadId: ciudad.id })
          )
        )
        .subscribe()
    );
  }

  buscarTipoSede() {
    let dialog = this._dialog.open(BuscadorTipoSedeComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          filter(todo => !!todo),
          puedeActualizarFormulario(this.formulario.value.tipoSedeId),
          tap((entidad: TipoSede) =>
            this.formulario.patchValue({ tipoSedeId: entidad.id })
          )
        )
        .subscribe()
    );
  }
}
