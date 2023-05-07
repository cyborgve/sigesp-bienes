import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivoComponenteService } from '@core/services/activo-componente.service';
import { take, tap } from 'rxjs/operators';
import { TipoComponenteService } from '@core/services/tipo-componente.service';
import { MarcaService } from '@core/services/marca.service';
import { ModeloService } from '@core/services/modelo.service';

@Component({
  selector: 'app-activo-componente',
  templateUrl: './activo-componente.component.html',
  styleUrls: ['./activo-componente.component.scss'],
})
export class ActivoComponenteComponent {
  titulo = 'activo componente';
  activoComponenteForm: FormGroup;
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
    private _formBuilder: FormBuilder
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
            this.activoComponenteForm = this._formBuilder.group({
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
      this.activoComponenteForm = this._formBuilder.group({
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

  nuevo = () => this._router.navigate(['activo-componente']);
}
