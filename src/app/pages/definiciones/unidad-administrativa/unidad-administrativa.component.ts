import { UnidadAdministrativa } from '@core/new.models/unidad-administrative';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';
import { MUnidadAdministrativa } from '@core/models/MUnidadAdministrativa';
import { SigespService } from 'sigesp';
import { Observable } from 'rxjs';
import { CategoriaUnidadAdministrativeService } from '@core/new.services/categoria-unidad-administrative.service';
import { CategoriaUnidadAdministrativa } from '@core/new.models/categoria-unidad-administrativa';

@Component({
  selector: 'app-unidad-administrativa',
  templateUrl: './unidad-administrativa.component.html',
  styleUrls: ['./unidad-administrativa.component.scss'],
})
export class UnidadAdministrativaComponent implements OnInit {
  formUnidadAdministrativa: FormGroup;
  allCategory: UnidadAdministrativa[] = [];
  allUnit: UnidadAdministrativa[] = [];
  idUnit: number = 0;
  operacion: string = 'guardar';
  codeExists: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _sigesp: SigespService,
    private _unidadAdministrativa: UnidadAdministrativaService,
    private _definicionesBasicas: DefinicionesBasicasService,
    private _categoriaUnidadAdministrativa: CategoriaUnidadAdministrativeService
  ) {
    this.formUnidadAdministrativa = this._formBuilder.group({
      codigo: [
        '',
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(1),
      ],
      denominacion: [
        '',
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(1),
      ],
      categoria: [''],
      otraDenominacion: [
        '',
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(1),
      ],
      codUnidadAdscrita: [''],
    });
  }

  ngOnInit() {
    this.formUnidadAdministrativa.get('categoria').setValue(0);
    this.formUnidadAdministrativa.get('codUnidadAdscrita').setValue(0);
  }

  categoriasUnidadAdministrativa: Observable<CategoriaUnidadAdministrativa[]> =
    this._categoriaUnidadAdministrativa.buscarTodos();

  unidadesAdministrativas: Observable<UnidadAdministrativa[]> =
    this._unidadAdministrativa.buscarTodasUnidadesAdministrativas();

  inicializar() {
    this.formUnidadAdministrativa.reset();
    this.idUnit = 0;
    this.operacion = 'guardar';
    this.formUnidadAdministrativa.get('categoria').setValue(0);
    this.formUnidadAdministrativa.get('codUnidadAdscrita').setValue(0);
  }

  exit() {
    this._router.navigate(['']);
  }

  newUnit() {
    if (this.formUnidadAdministrativa.valid) {
      if (this.operacion == 'guardar') {
        this.saveUnit();
      } else if (this.operacion == 'actualizar') {
        this.updateUnit();
      }
    } else {
      this._sigesp.showToastSuccess(
        'Hay campos vacios o su formato es invalido'
      );
    }
  }

  validateCode(event, campo) {
    if (this.operacion == 'guardar') {
      let valorInput = (<HTMLInputElement>event.target).value;
      let i = this.allUnit.findIndex(e => {
        return e.coduniadmbien.trim() == valorInput.trim();
      });
      if (i >= 0) {
        this._sigesp.showToastError('El código ya esta registrado');
        this.formUnidadAdministrativa.get('codigo').reset();
        this.codeExists = false;
      } else {
        this.codeExists = true;
      }
    }
  }

  saveUnit() {
    this._unidadAdministrativa
      .saveAdministrativeUnit(this.formUnidadAdministrativa)
      .subscribe((resp: any) => {
        if (resp.data.length > 0) {
          this._sigesp.showToastSuccess(
            'Unidad Administrativa guardada con éxito'
          );
          this.inicializar();
        } else this._sigesp.showToastError(resp.message);
      });
  }

  updateUnit() {
    this._unidadAdministrativa
      .updateAdministrativeUnit(this.formUnidadAdministrativa, this.idUnit)
      .subscribe((resp: any) => {
        if (resp.data) {
          this._sigesp.showToastSuccess(
            'Unidad Administrativa actualizada con éxito'
          );
          this.inicializar();
        } else this._sigesp.showToastError(resp.message);
      });
  }

  deleteUnit() {
    this._sigesp
      .openDialogConfirm(
        'Eliminar La causa de movimiento',
        'Esta seguro de eliminar la Causa de Movimiento?'
      )
      .then(resp => {
        if (resp) {
          this._unidadAdministrativa
            .deleteAdministrativeUnit(this.idUnit)
            .subscribe((resp: any) => {
              if (resp.data) {
                this._sigesp.showToastSuccess(
                  'Unidad Administrativa eliminada con éxito'
                );
                this.inicializar();
              } else this._sigesp.showToastSuccess(resp.message);
            });
        }
      });
  }

  openCatalogo() {
    this.inicializar();
    let tittle = 'Catálogo de Causa de Movimiento';
    let nameColummnas = ['Código', 'Unidad Administrativa'];
    let columnas = [
      'codigoUnidadAdministrativa',
      'denominacionUnidadAdministrativaBien',
    ];
    if (this.allUnit.length > 0) {
      this._sigesp
        .openCatalogoGenerico(columnas, tittle, this.allUnit, nameColummnas)
        .then((resp: MUnidadAdministrativa) => {
          if (resp != null) {
            this.formUnidadAdministrativa
              .get('codigo')
              .setValue(resp.codigoUnidadAdministrativa);
            this.formUnidadAdministrativa
              .get('denominacion')
              .setValue(resp.denominacionUnidadAdministrativaBien);
            this.formUnidadAdministrativa
              .get('categoria')
              .setValue(resp.idCategoriaUnidad);
            this.formUnidadAdministrativa
              .get('otraDenominacion')
              .setValue(resp.denominacion);
            this.formUnidadAdministrativa
              .get('codUnidadAdscrita')
              .setValue(resp.idUnidadAdministrativa);
            this.idUnit = resp.idUnidadAdministrativaBien;
            this.operacion = 'actualizar';
          }
        });
    }
  }
}
