import { take, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivoComponenteService } from '@core/services/activo-componente.service';
import { MarcaService } from '@core/services/marca.service';
import { ModeloService } from '@core/services/modelo.service';
import { TipoComponenteService } from '@core/services/tipo-componente.service';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorActivoComponenteComponent } from '../buscador-activo-componente/buscador-activo-componente.component';
import { ActivoComponente } from '@core/models/activo-componente';

@Component({
  selector: 'app-singular-activo-componente',
  templateUrl: './singular-activo-componente.component.html',
  styleUrls: ['./singular-activo-componente.component.scss'],
})
export class SingularActivoComponenteComponent {
  titulo = 'activo componente';
  singularForm: FormGroup;
  id: number;

  tiposComponente = () => this._tipoComponente.buscarTodos();
  marcas = () => this._marca.buscarTodos();
  modelos = () => this._modelo.buscarTodos();

  constructor(
    private _activoComponente: ActivoComponenteService,
    private _tipoComponente: TipoComponenteService,
    private _marca: MarcaService,
    private _modelo: ModeloService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _dialog: MatDialog
  ) {
    this.id = this._activatedRoute.snapshot.params['id'];
    this.updateForm();
  }

  private updateForm(): void {
    if (this.id) {
      this._activoComponente
        .buscarPorId(this.id)
        .pipe(
          take(1),
          tap(ac => {
            this.singularForm = this._formBuilder.group({
              empresaId: [ac.empresaId],
              id: [ac.id],
              tipo: [ac.tipo, Validators.required],
              codigo: [ac.codigo, Validators.required],
              denominacion: [ac.denominacion, Validators.required],
              marcaId: [ac.marcaId],
              modeloId: [ac.modeloId],
              creado: [ac.creado],
              modificado: [ac.modificado],
            });
          })
        )
        .subscribe();
    } else {
      this.singularForm = this._formBuilder.group({
        empresaId: [''],
        id: [''],
        tipo: ['', Validators.required],
        codigo: ['', Validators.required],
        denominacion: ['', Validators.required],
        marcaId: [''],
        modeloId: [''],
        creado: [new Date()],
        modificado: [new Date()],
      });
    }
  }

  buscarActivoComponente() {
    let dialog = this._dialog.open(BuscadorActivoComponenteComponent, {
      width: '95%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((ac: ActivoComponente) => {
          this._router.navigate([
            '/definiciones/activo-componentes/activo-componente/' + ac.id,
          ]);
        })
      )
      .subscribe();
  }

  importar = () => {
    let dialog = this._dialog.open(BuscadorActivoComponenteComponent, {
      width: '95%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((ac: ActivoComponente) => {
          this.singularForm.patchValue({
            tipo: ac.tipo,
            denominacion: ac.denominacion,
            marcaId: ac.marcaId,
            modeloId: ac.modeloId,
          });
        })
      )
      .subscribe();
  };

  eliminar = () => {};

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/']);

  guardar = () => {};
}
