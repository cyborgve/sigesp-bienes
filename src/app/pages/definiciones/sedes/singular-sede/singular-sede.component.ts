import { take, tap, first, filter, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SedeService } from '@core/services/sede.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { BuscadorSedeComponent } from '../buscador-sede/buscador-sede.component';
import { Sede } from '@core/models/sede';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { BuscadorTipoSedeComponent } from '@pages/definiciones/tipos-sede/buscador-tipo-sede/buscador-tipo-sede.component';
import { Entidad } from '@core/models/entidad';
import { CorrelativoService } from '@core/services/correlativo.service';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { Basica } from '@core/models/auxiliares/basica';
import { Subscription } from 'rxjs';
import { BuscadorPaisComponent } from '@shared/components/buscador-pais/buscador-pais.component';
import { BuscadorEstadoComponent } from '@shared/components/buscador-estado/buscador-estado.component';
import { Estado } from '@core/models/estado';
import { BuscadorMunicipioComponent } from '@shared/components/buscador-municipio/buscador-municipio.component';
import { Municipio } from '@core/models/municipio';
import { BuscadorCiudadComponent } from '@shared/components/buscador-ciudad/buscador-ciudad.component';
import { Ciudad } from '@core/models/ciudad';
import { Pais } from '@core/models/pais';
import { TipoSede } from '@core/models/tipo-sede';

@Component({
  selector: 'app-singular-sede',
  templateUrl: './singular-sede.component.html',
  styleUrls: ['./singular-sede.component.scss'],
})
export class SingularSedeComponent implements Entidad, OnDestroy {
  private subscripciones: Subscription[] = [];
  modoFormulario: ModoFormulario = 'CREANDO';

  id: Id;
  titulo = CORRELATIVOS[17].nombre;
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
      empresaId: [''],
      id: [''],
      codigo: ['autogenerado'],
      denominacion: ['', Validators.required],
      tipoSedeId: [0, Validators.required],
      localizacion: [''],
      paisId: ['---'],
      estadoId: ['---'],
      municipioId: ['---'],
      parroquiaId: ['---'],
      ciudadId: ['---'],
      urbanizacion: [''],
      calleAvenida: [''],
      casaEdificio: [''],
      piso: [''],
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
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '95%',
      height: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          tap((entidad: Sede) => {
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
            });
          })
        )
        .subscribe()
    );
  }

  guardar() {
    let entidad: Sede = this.formulario.value;
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
          tap((municipio: Municipio) =>
            this.formulario.patchValue({ municipioId: municipio.id })
          )
        )
        .subscribe()
    );
  }

  buscarParroquia() {
    throw new Error('Method not implemented.');
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
    dialog
      .afterClosed()
      .pipe(
        tap((entidad: TipoSede) =>
          this.formulario.patchValue({ tipoSedeId: entidad.id })
        )
      )
      .subscribe();
  }
}
