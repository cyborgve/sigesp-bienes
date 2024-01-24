import { take, tap, first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Entidad } from '@core/models/auxiliares/entidad';
import { CorrelativoService } from '@core/services/definiciones/correlativo.service';
import { Id } from '@core/types/id';
import { ModoFormulario } from '@core/types/modo-formulario';
import { Correlativo } from '@core/models/definiciones/correlativo';
import { CORRELATIVOS } from '@core/constants/correlativos';
import { AdvertenciaCorrelativoComponent } from './advertencia-correlativo.component';

@Component({
  selector: 'app-singular-correlativo',
  templateUrl: './singular-correlativo.component.html',
  styleUrls: ['./singular-correlativo.component.scss'],
})
export class SingularCorrelativoComponent implements Entidad {
  modoFormulario: ModoFormulario = 'CREANDO';
  id: Id;
  titulo = 'correlativo';
  formulario: UntypedFormGroup;
  constructor(
    private _entidad: CorrelativoService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: UntypedFormBuilder,
    private _location: Location,
    private _correlativo: CorrelativoService,
    private _dialog: MatDialog
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.formulario = this._formBuilder.group({
      empresaId: [undefined],
      id: [undefined],
      denominacion: [undefined, Validators.required],
      serie: [undefined, Validators.required],
      correlativo: [undefined, Validators.required],
      creado: [undefined],
      modificado: [undefined],
    });
    this.actualizarFormulario();
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
              denominacion: entidad.denominacion,
              serie: entidad.serie,
              correlativo: entidad.correlativo,
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
    throw new Error('Method not implemented.');
  }

  guardar() {
    let dialog = this._dialog.open(AdvertenciaCorrelativoComponent, {
      width: '35%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((continuar: boolean) => {
          if (continuar) {
            let entidad: Correlativo = this.formulario.value;
            if (this.modoFormulario === 'CREANDO') {
              this._entidad
                .guardar(entidad, this.titulo, false)
                .pipe(first())
                .subscribe(() => this.irAtras());
            } else {
              this._entidad
                .actualizar(this.id, entidad, this.titulo, false)
                .pipe(first())
                .subscribe(() => this.irAtras());
            }
          }
        }),
        take(1)
      )
      .subscribe();
  }

  borrar() {
    throw new Error('Method not implemented.');
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
}
