import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import {
  MDefinicionesBasicas,
  DefinicionesSelect,
} from '@core/models/MDefinicionesBasicas';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { SigespService } from 'sigesp';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';

@Component({
  selector: 'app-definiciones-basicas',
  templateUrl: './definiciones-basicas.component.html',
  styleUrls: ['./definiciones-basicas.component.scss'],
})
export class DefinicionesBasicasComponent implements OnInit {
  public operacion = 'guardar';
  public formDefinicionesBasicas: FormGroup;
  public delDeficiones: MDefinicionesBasicas[] = [];
  public definiciones: MDefinicionesBasicas[] = [];
  public basicDefinitions = new MatTableDataSource<MDefinicionesBasicas>(
    this.definiciones
  );
  public selection = new SelectionModel<MDefinicionesBasicas>(true, []);
  public codeExists: boolean;
  public codigoDuplicado: boolean = false;
  public definicionSelect = DefinicionesSelect;
  public seleccionado: any = '0';
  public displayedColumns: string[] = ['select', 'codigo', 'denominacion'];
  public invalido: boolean;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private definicionesBasicasService: DefinicionesBasicasService
  ) {
    this.formDefinicionesBasicas = new FormGroup({
      denominacion: new FormControl(),
    });
  }

  ngOnInit() {
    this.newForm();
  }

  public exit() {
    this.router.navigate(['']);
  }

  public newForm() {
    this.inicializar();
    this.seleccionado = 0;
    this.formDefinicionesBasicas.reset();
    this.basicDefinitions.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Itéms por página';
    this.paginator._intl.firstPageLabel = 'Página inicial';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.nextPageLabel = 'Página siguiente';
    this.paginator._intl.lastPageLabel = 'Página final';
  }
  public inicializar() {
    this.selection['_selected'] = [];
    this.delDeficiones = [];
    this.definiciones = [];
    this.basicDefinitions.data = [];
  }

  public newStructure() {
    if (this.formDefinicionesBasicas.valid) {
      if (this.basicDefinitions.data.length > 0) {
        this.validateDuplicates();
        this.validateArrayElements();
        if (!this.codigoDuplicado && !this.invalido) {
          this.saveDefinition();
        } else if (this.codigoDuplicado == true) {
          this.sigesp.showToastError('Existen registros duplicados');
        } else if (this.invalido == true) {
          this.sigesp.showToastError('Hay registros con campos vacios');
        }
      } else this.sigesp.showToastError('No ha creado una definicion');
    }
  }

  public addDenifinition() {
    let codigo = this.getNexCode();
    let def = new MDefinicionesBasicas({
      id: '-1',
      codigo,
      denominacion: '',
    });
    this.definiciones.unshift(def);
    this.basicDefinitions.data = this.definiciones;
  }

  //Metodo para obtener el proximo codigo de fuente de financiamiento
  public getNexCode() {
    let codigo = 0;
    let ultimonum: number;
    let codigoSiguiente: string;
    let cerosDerecha = '0';
    let ultimo: MDefinicionesBasicas;
    if (this.basicDefinitions.data.length == 1) {
      codigoSiguiente = '0000000001';
    } else if (this.basicDefinitions.data.length > 1) {
      this.basicDefinitions.data = this.basicDefinitions.data.sort((a, b) => {
        if (a.codigo > b.codigo) {
          return 1;
        }
        if (b.codigo > a.codigo) {
          return -1;
        }
        return 0;
      });
      let orden = this.basicDefinitions.data.length - 1;
      ultimo = this.basicDefinitions.data[orden];
      ultimonum = parseInt(ultimo.codigo);
      ultimonum = ultimonum + 1;
      let valor = ultimonum.toString();
      let fin = 10 - valor.length;
      for (let i = 1; i < fin; i++) {
        cerosDerecha = cerosDerecha + '0';
      }
      codigoSiguiente = cerosDerecha + ultimonum;
    }
    return codigoSiguiente;
  }

  public aplicarFiltro(valor: string) {
    this.basicDefinitions.filter = valor.toLowerCase();
    if (this.basicDefinitions.paginator) {
      this.basicDefinitions.paginator.firstPage();
    }
  }

  public saveDefinition() {
    this.definicionesBasicasService
      .saveDefinition(this.seleccionado, this.basicDefinitions.data)
      .subscribe((resp: any) => {
        if (resp.data.length > 0) {
          if (resp.data) {
            this.inicializar();
            this.sigesp.showToastSuccess('Registro guardado con éxito');
            this.definiciones = resp.data;
            this.basicDefinitions.data = resp.data;
          }
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public delDenifinition() {
    let seguir: boolean = false;
    this.delDeficiones = [];
    if (this.selection.selected.length > 0) {
      this.sigesp
        .openDialogConfirm(
          'Eliminar Registro',
          'Esta seguro de eliminar los registro?'
        )
        .then(resp => {
          if (resp) {
            for (let i = 0; i < this.selection.selected.length; i++) {
              let j = this.basicDefinitions.data.findIndex(e => {
                return (
                  e.codigo.trim() == this.selection.selected[i].codigo.trim()
                );
              });
              if (j >= 0) {
                let comp = this.definiciones[j];
                if (comp.id > 0) {
                  this.definiciones.splice(j, 1);
                  this.delDeficiones.push(comp);
                  seguir = true;
                }
                if (comp.id < 0) {
                  this.definiciones.splice(j, 1);
                  this.basicDefinitions.data = this.definiciones;
                }
                if (comp.id == 0) {
                  this.sigesp.showToastError(
                    'La data por defecto no puede ser Eliminada'
                  );
                }
              }
            }
          }

          if (this.delDeficiones.length > 0 && seguir) {
            this.definicionesBasicasService
              .deleteDefinition(this.delDeficiones, this.seleccionado)
              .subscribe(resp => {
                if (resp.data == true) {
                  this.sigesp.showToastSuccess('Registro eliminado con éxito');
                  this.basicDefinitions.data = this.definiciones;
                } else if (resp.data == false) {
                  this.sigesp.showToastError(resp.messaje);
                }
              });
          }
        });
    }
  }

  public selectedDefinition() {
    this.seleccionado = this.formDefinicionesBasicas.get('denominacion').value;
    this.inicializar();
    this.definicionesBasicasService
      .getDefinition(this.seleccionado)
      .subscribe(resp => {
        this.definiciones = resp.data;
        this.basicDefinitions.data = this.definiciones;
      });
  }

  public modifyDefinition(event: any, indice: number, campo: string) {
    let valorInput = (<HTMLInputElement>event.target).value;

    if (this.definiciones[indice].id == -1) {
      if (campo == 'codigo') {
        let valor = this.validateCode(event);
        if (valor >= 0) {
          this.sigesp.showToastError('El código ya esta registrado');
        } else {
          this.definiciones[indice][campo] = valorInput;
          this.basicDefinitions.data = this.definiciones;
        }
      }
    }

    if (campo == 'denominacion') {
      this.definiciones[indice][campo] = valorInput;
      this.basicDefinitions.data = this.definiciones;
    }
  }

  public validateCode(event) {
    let valorInput = (<HTMLInputElement>event.target).value;
    let i = this.basicDefinitions.data.findIndex(e => {
      return e.codigo == valorInput.trim();
    });
    return i;
  }

  public validateArrayElements() {
    let i = this.basicDefinitions.data.findIndex(e => {
      return e.codigo == '' || e.denominacion == '' || e.codigo == '0';
    });
    if (i >= 1) {
      this.invalido = true;
    } else this.invalido = false;
  }

  public validateDuplicates() {
    this.codigoDuplicado = false;
    for (let i = 0; i < this.basicDefinitions.data.length; i++) {
      let code = this.basicDefinitions.data[i].codigo;
      let codigoDoble = this.basicDefinitions.data.filter(
        e => e.codigo == code
      );
      if (codigoDoble.length >= 2) {
        this.codigoDuplicado = true;
        break;
      } else this.codigoDuplicado = false;
    }
  }

  TodasSeleccionadas() {
    const NumeroFilasSeleccionadas = this.selection.selected.length;
    const NumeroFilasExistentes = this.basicDefinitions.data.length;
    return NumeroFilasSeleccionadas === NumeroFilasExistentes;
  }

  SeleccionTodo() {
    this.TodasSeleccionadas()
      ? this.selection.clear()
      : this.basicDefinitions.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: MDefinicionesBasicas): string {
    if (!row) {
      return `${this.TodasSeleccionadas() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigo + 1
    }`;
  }
}
