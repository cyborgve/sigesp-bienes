import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MEstructuraPredominante } from '@core/models/MestructuraPredominante';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { SigespService } from 'sigesp';
import { EstructuraPredominanteService } from '@core/services/estructura-predominante.service';
import { MComponenteEstructura } from '@core/models/MestructuraPredominante';

@Component({
  selector: 'app-estructura-predominante',
  templateUrl: './estructura-predominante.component.html',
  styleUrls: ['./estructura-predominante.component.scss'],
})
export class EstructuraPredominanteComponent implements OnInit {
  public operacion = 'guardar';
  public formEstructura: FormGroup;
  public allPredominantStructure: MEstructuraPredominante[] = [];
  public idEstructura: number;
  public delComponetes: MComponenteEstructura[] = [];
  public displayedColumns: string[] = ['select', 'codigo', 'denominacion'];
  public componentes: MComponenteEstructura[] = [];
  public componentesEstructura = new MatTableDataSource<MComponenteEstructura>(
    this.componentes
  );
  public selection = new SelectionModel<MComponenteEstructura>(true, []);
  public codeExists: boolean;
  public codigoDuplicado: boolean = false;
  public invalido: boolean;
  public codeDoble: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private estructuraPredominanteService: EstructuraPredominanteService
  ) {
    this.formEstructura = new FormGroup({
      denominacion: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(3),
      ]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(1),
      ]),
    });
  }

  ngOnInit() {
    this.getAllEstructure();
  }

  public exit() {
    this.router.navigate(['']);
  }

  public inicializar() {
    this.formEstructura.reset();
    this.componentes = [];
    this.componentesEstructura.data = [];
    this.selection['_selected'] = [];
    this.idEstructura = -1;
    this.operacion = 'guardar';
    this.getAllEstructure();
  }

  public getAllEstructure() {
    this.estructuraPredominanteService
      .getAllPredominantStructure()
      .subscribe(resp => {
        this.allPredominantStructure = resp.data;
      });
  }

  public aplicarFiltro(valor: string) {
    this.componentesEstructura.filter = valor.toLowerCase();
    if (this.componentesEstructura.paginator) {
      this.componentesEstructura.paginator.firstPage();
    }
  }

  public newStructure() {
    if (this.formEstructura.valid) {
      if (this.componentesEstructura.data.length > 0) {
        this.validarDuplicados();
        this.validarVaciosComponentes();
        if (!this.codigoDuplicado && !this.invalido) {
          if (this.operacion == 'guardar') {
            this.saveStructure();
          } else if (this.operacion == 'actualizar') {
            this.updateStructure();
          }
        } else if (this.invalido == true) {
          this.sigesp.showToastError('Hay componentes con campos vacios');
        } else if (this.codigoDuplicado) {
          this.sigesp.showToastError(
            'Existen codigos de componentes duplicados'
          );
        }
      } else {
        if (this.operacion == 'guardar') {
          this.saveStructure();
        } else if (this.operacion == 'actualizar') {
          this.updateStructure();
        }
      }
    } else
      this.sigesp.showToastSuccess(
        'Hay campos vacios o su formato es invalido'
      );
  }

  public validarCodigo(event) {
    let valorInput = (<HTMLInputElement>event.target).value;
    let valido: boolean;
    if (valorInput.length > 0) {
      for (let j = 0; j < valorInput.length; j++) {
        if (valorInput[j] >= '0' && valorInput[j] <= '9') {
          valido = true;
        } else {
          valido = false;
          this.sigesp.showToastError('Formato invalido del código');
          break;
        }
      }
    }
    let i = this.allPredominantStructure.findIndex(e => {
      return e.codigoTipoEstructura == valorInput.trim();
    });
    if (i >= 0) {
      this.sigesp.showToastError('El código ya esta registrado');
      this.formEstructura.get('codigo').reset();
      this.codeExists = false;
    } else {
      this.codeExists = true;
    }
  }

  public saveStructure() {
    let denominacion = this.formEstructura.get('denominacion').value;
    this.estructuraPredominanteService
      .savePredominantStructure(this.formEstructura)
      .subscribe((resp: any) => {
        if (resp.data.length > 0) {
          this.estructuraPredominanteService
            .updatePredominantStructure(
              denominacion,
              resp.data[0].idTipoEstructura,
              this.componentesEstructura.data
            )
            .subscribe(res => {
              if (res.data) {
                this.sigesp.showToastSuccess(
                  'Tipo de Estructura guardada con éxito'
                );
              }
            });

          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public updateStructure() {
    if (this.idEstructura == 0) {
      this.sigesp.showToastError('La data por defecto no puede ser Modificada');
    } else if (this.idEstructura > 0) {
      let denominacion = this.formEstructura.get('denominacion').value;
      this.estructuraPredominanteService
        .updatePredominantStructure(
          denominacion,
          this.idEstructura,
          this.componentesEstructura.data
        )
        .subscribe((resp: any) => {
          if (resp.data) {
            this.sigesp.showToastSuccess(
              'Tipo de estructura actualizada con éxito'
            );
            this.inicializar();
          } else this.sigesp.showToastError(resp.message);
        });
    }
  }

  public deleteEstructure() {
    if (this.idEstructura == 0) {
      this.sigesp.showToastError('La data por defecto no puede ser Eliminada');
    } else if (this.idEstructura > 0) {
      this.sigesp
        .openDialogConfirm(
          'Eliminar La causa de movimiento',
          'Esta seguro de eliminar la Causa de Movimiento?'
        )
        .then(resp => {
          if (resp) {
            this.estructuraPredominanteService
              .deletePredominantStructure(this.idEstructura)
              .subscribe((resp: any) => {
                if (resp.data) {
                  this.sigesp.showToastSuccess(
                    'Tipo de estructura de movimiento eliminada con éxito'
                  );
                  this.inicializar();
                } else
                  this.sigesp.showToastError(
                    'La estructura no puede ser eliminada'
                  );
              });
          }
        });
    }
  }

  public deleteComponentes() {
    let seguir: boolean = false;
    this.delComponetes = [];
    if (this.selection.selected.length > 0) {
      this.sigesp
        .openDialogConfirm(
          'Eliminar Componentes',
          'Esta seguro de eliminar los componentes?'
        )
        .then(resp => {
          if (resp) {
            for (let i = 0; i < this.selection.selected.length; i++) {
              let j = this.componentes.findIndex(e => {
                return (
                  e.codigoComponenteEstructura.trim() ==
                  this.selection.selected[i].codigoComponenteEstructura.trim()
                );
              });
              if (j >= 0) {
                let comp = this.componentes[j];
                if (comp.idComponenteEstructura > 0) {
                  this.componentes.splice(j, 1);
                  this.delComponetes.push(comp);
                  seguir = true;
                } else if (comp.idComponenteEstructura < 0) {
                  this.componentes.splice(j, 1);
                  this.componentesEstructura.data = this.componentes;
                } else if (comp.idComponenteEstructura == 0) {
                  this.sigesp.showToastError(
                    'La data por defecto no puede ser Eliminada'
                  );
                }
              }
            }
          }
          if (this.delComponetes.length > 0 && seguir) {
            this.estructuraPredominanteService
              .deleteComponet(this.delComponetes)
              .subscribe(resp => {
                if (resp.data) {
                  this.sigesp.showToastSuccess(
                    'Componente eliminado con éxito'
                  );
                  this.componentesEstructura.data = this.componentes;
                } else {
                  this.sigesp.showToastError(resp.message);
                }
              });
          }
        });
    }
  }

  public modificarDetalle(event: any, indice: number, campo: string) {
    let valorInput = (<HTMLInputElement>event.target).value;
    if (this.componentesEstructura.data[indice].idTipoEstructura == -1) {
      if (campo == 'codigoComponenteEstructura') {
        let valor = this.validarCodigoComponentes(event);
        if (valor >= 0) {
          this.sigesp.showToastError('El código ya esta registrado');
        } else {
          this.componentes[indice][campo] = valorInput;
          this.componentesEstructura.data = this.componentes;
        }
      }
    }
    if (campo == 'denominacion') {
      this.componentes[indice][campo] = valorInput;
      this.componentesEstructura.data = this.componentes;
    }
  }

  validarDuplicados() {
    this.codigoDuplicado = false;
    for (let i = 0; i < this.componentesEstructura.data.length; i++) {
      let code = this.componentesEstructura.data[i].codigoComponenteEstructura;
      let codigoDoble = this.componentesEstructura.data.filter(
        e => e.codigoComponenteEstructura == code
      );
      if (codigoDoble.length >= 2) {
        this.codigoDuplicado = true;
        break;
      } else this.codigoDuplicado = false;
    }
  }

  public validarCodigoComponentes(event) {
    let valorInput = (<HTMLInputElement>event.target).value;
    let i = this.componentesEstructura.data.findIndex(e => {
      return e.codigoComponenteEstructura == valorInput.trim();
    });
    return i;
  }

  public validarVaciosComponentes() {
    let i = this.componentesEstructura.data.findIndex(e => {
      return (
        e.codigoComponenteEstructura == '' ||
        e.denominacionComponenteEstructura == ''
      );
    });
    if (i >= 1) {
      this.invalido = true;
    } else this.invalido = false;
  }

  public openCatalogo() {
    this.inicializar();
    let tittle = 'Catálogo Estructura Predominante';
    let nameColummnas = ['Código', 'Denominación'];
    let columnas = ['codigoTipoEstructura', 'denominacionTipoEstructura'];
    if (this.allPredominantStructure.length > 0) {
      this.sigesp
        .openCatalogoGenerico(
          columnas,
          tittle,
          this.allPredominantStructure,
          nameColummnas
        )
        .then((resp: MEstructuraPredominante) => {
          if (resp != null) {
            this.formEstructura
              .get('codigo')
              .setValue(resp.codigoTipoEstructura);
            this.formEstructura
              .get('denominacion')
              .setValue(resp.denominacionTipoEstructura);
            this.idEstructura = resp.idTipoEstructura;
            this.operacion = 'actualizar';
            this.getComponente();
            console.log('this.idEstructura', this.idEstructura);
          }
        });
    }
  }

  public getComponente() {
    this.estructuraPredominanteService
      .getStructureComponent(this.idEstructura)
      .subscribe(resp => {
        this.componentes = resp.data;
        this.componentesEstructura.data = this.componentes;
      });
  }

  public addComponent() {
    let codcomest = this.getNexCode();
    let componente = new MComponenteEstructura({
      id_empresa: this.sigesp.usuarioActivo.empresa.id.toString(),
      id_tipest: this.idEstructura.toString(),
      id_comest: '-1',
      codcomest,
      dencomest: '',
    });
    this.componentes.unshift(componente);
    this.componentesEstructura.data = this.componentes;
  }

  //Metodo para obtener el proximo codigo de fuente de financiamiento
  public getNexCode() {
    let ultimonum: number;
    let codigoSiguiente: string;
    let cerosDerecha = '0';
    let ultimo: MComponenteEstructura;
    if (this.componentesEstructura.data.length == 0) {
      codigoSiguiente = '0001';
    } else if (this.componentesEstructura.data.length > 0) {
      this.componentesEstructura.data = this.componentesEstructura.data.sort(
        (a, b) => {
          if (a.codigoComponenteEstructura > b.codigoComponenteEstructura) {
            return 1;
          }
          if (b.codigoComponenteEstructura > a.codigoComponenteEstructura) {
            return -1;
          }
          return 0;
        }
      );
      let orden = this.componentesEstructura.data.length - 1;
      ultimo = this.componentesEstructura.data[orden];
      ultimonum = parseInt(ultimo.codigoComponenteEstructura);
      ultimonum = ultimonum + 1;
      let valor = ultimonum.toString();
      let fin = 4 - valor.length;
      for (let i = 1; i < fin; i++) {
        cerosDerecha = cerosDerecha + '0';
      }
      codigoSiguiente = cerosDerecha + ultimonum;
    }
    return codigoSiguiente;
  }

  TodasSeleccionadas() {
    const NumeroFilasSeleccionadas = this.selection.selected.length;
    const NumeroFilasExistentes = this.componentesEstructura.data.length;
    return NumeroFilasSeleccionadas === NumeroFilasExistentes;
  }

  SeleccionTodo() {
    this.TodasSeleccionadas()
      ? this.selection.clear()
      : this.componentesEstructura.data.forEach(row =>
          this.selection.select(row)
        );
  }

  checkboxLabel(row?: MComponenteEstructura): string {
    if (!row) {
      return `${this.TodasSeleccionadas() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.codigoComponenteEstructura + 1
    }`;
  }
}
