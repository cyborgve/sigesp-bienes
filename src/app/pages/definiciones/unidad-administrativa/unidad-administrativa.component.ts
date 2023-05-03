import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';
import { MUnidadAdministrativa } from '@core/models/MUnidadAdministrativa';
import { SigespService } from 'sigesp';

@Component({
  selector: 'app-unidad-administrativa',
  templateUrl: './unidad-administrativa.component.html',
  styleUrls: ['./unidad-administrativa.component.scss'],
})
export class UnidadAdministrativaComponent implements OnInit {
  public formUnidadAdministrativa: FormGroup;
  public allCategory: MDefinicionesBasicas[] = [];
  public allUnit: MUnidadAdministrativa[] = [];
  public idUnit: number = 0;
  public operacion: string = 'guardar';
  public codeExists: boolean;

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private unidadAdministrativaService: UnidadAdministrativaService,
    private definicionesBasicasService: DefinicionesBasicasService
  ) {
    this.formUnidadAdministrativa = new FormGroup({
      codigo: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(1),
      ]),
      denominacion: new FormControl('', [
        Validators.required,
        Validators.maxLength(200),
        Validators.minLength(3),
      ]),
      categoria: new FormControl(),
      otraDenominacion: new FormControl('', [
        Validators.maxLength(200),
        Validators.minLength(3),
      ]),
      codUnidadAdscrita: new FormControl(),
    });
  }

  ngOnInit() {
    this.getAllCategory();
    this.getAllAdministrativeUnit();
    this.formUnidadAdministrativa.get('categoria').setValue(0);
    this.formUnidadAdministrativa.get('codUnidadAdscrita').setValue(0);
  }

  public getAllCategory() {
    const tipo = '1';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.allCategory = resp.data;
    });
  }

  public getAllAdministrativeUnit() {
    this.unidadAdministrativaService
      .getAllAdministrativeUnit()
      .subscribe(resp => {
        this.allUnit = resp.data;
      });
  }

  public inicializar() {
    this.formUnidadAdministrativa.reset();
    this.idUnit = 0;
    this.operacion = 'guardar';
    this.getAllCategory();
    this.getAllAdministrativeUnit();
    this.formUnidadAdministrativa.get('categoria').setValue(0);
    this.formUnidadAdministrativa.get('codUnidadAdscrita').setValue(0);
  }

  public exit() {
    this.router.navigate(['']);
  }

  public newUnit() {
    if (this.formUnidadAdministrativa.valid) {
      if (this.operacion == 'guardar') {
        this.saveUnit();
      } else if (this.operacion == 'actualizar') {
        this.updateUnit();
      }
    } else {
      this.sigesp.showToastSuccess(
        'Hay campos vacios o su formato es invalido'
      );
    }
  }

  public validateCode(event, campo) {
    if (this.operacion == 'guardar') {
      let valorInput = (<HTMLInputElement>event.target).value;
      let i = this.allUnit.findIndex(e => {
        return e.codigoUnidadAdministrativa.trim() == valorInput.trim();
      });
      if (i >= 0) {
        this.sigesp.showToastError('El código ya esta registrado');
        this.formUnidadAdministrativa.get('codigo').reset();
        this.codeExists = false;
      } else {
        this.codeExists = true;
      }
    }
  }

  public saveUnit() {
    this.unidadAdministrativaService
      .saveAdministrativeUnit(this.formUnidadAdministrativa)
      .subscribe((resp: any) => {
        if (resp.data.length > 0) {
          this.sigesp.showToastSuccess(
            'Unidad Administrativa guardada con éxito'
          );
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public updateUnit() {
    this.unidadAdministrativaService
      .updateAdministrativeUnit(this.formUnidadAdministrativa, this.idUnit)
      .subscribe((resp: any) => {
        if (resp.data) {
          this.sigesp.showToastSuccess(
            'Unidad Administrativa actualizada con éxito'
          );
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public deleteUnit() {
    this.sigesp
      .openDialogConfirm(
        'Eliminar La causa de movimiento',
        'Esta seguro de eliminar la Causa de Movimiento?'
      )
      .then(resp => {
        if (resp) {
          this.unidadAdministrativaService
            .deleteAdministrativeUnit(this.idUnit)
            .subscribe((resp: any) => {
              if (resp.data) {
                this.sigesp.showToastSuccess(
                  'Unidad Administrativa eliminada con éxito'
                );
                this.inicializar();
              } else this.sigesp.showToastSuccess(resp.message);
            });
        }
      });
  }

  public openCatalogo() {
    this.inicializar();
    let tittle = 'Catálogo de Causa de Movimiento';
    let nameColummnas = ['Código', 'Unidad Administrativa'];
    let columnas = [
      'codigoUnidadAdministrativa',
      'denominacionUnidadAdministrativaBien',
    ];
    if (this.allUnit.length > 0) {
      this.sigesp
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
