import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { SigespService, MCentroCosto, MCuentaInstitucional } from "sigesp";
import { MDefinicionesBasicas } from "@core/models/MDefinicionesBasicas";
//import { MConfigSBN } from '@core/models/MconfigSBN';
import { MActivo, MetodoDepreciacion } from "@core/models/MActivo";
import { ConfiguracionBienesService } from "@core/services/configuracion-bienes.service";

@Component({
  selector: "app-depreciacion",
  templateUrl: "./depreciacion.component.html",
  styleUrls: ["./depreciacion.component.scss"],
})
export class DepreciacionComponent implements OnInit {
  public formDepreciacion: FormGroup;
  public metodo = MetodoDepreciacion;
  @Input() public stateConservation: MDefinicionesBasicas[] = [];
  @Input() public costCenter: MCentroCosto;
  @Input() public dataGeneral: MActivo;
  @Input() public accountAccounting: MCuentaInstitucional[] = [];
  @Input() public dataInicilizar: boolean = false;

  @Output() activoDepreciacion = new EventEmitter<any>();
  public depeciacion: string;
  public configSBN: any;

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private configuracionBienesService: ConfiguracionBienesService
  ) {
    this.formDepreciacion = new FormGroup({
      metodoDepreciacion: new FormControl(),
      vidaUtil: new FormControl(),
      valorRescate: new FormControl(),
      cuentaDepreciacion: new FormControl(),
      cuentaDepreciacionAcumulada: new FormControl(),
      cuentaPresupuestaria: new FormControl(),
      estructuraPresupuestaria: new FormControl(),
      fuenteFinanciamiento: new FormControl(),
      codigoCentroCosto: new FormControl(),
    });
  }

  ngOnInit() {
    this.showData();
    this.inicializar();
  }

  ngOnChanges() {
    this.dataGeneral;
    this.dataInicilizar;
    this.showData();
    if (this.dataInicilizar) {
      this.inicializar();
    }
  }

  public inicializar() {
    this.formDepreciacion.reset();
  }

  public showData() {
    if (this.dataGeneral != undefined) {
      this.formDepreciacion
        .get("metodoDepreciacion")
        .setValue(this.dataGeneral.metodoDepreciacion);
      this.formDepreciacion.get("vidaUtil").setValue(this.dataGeneral.vidaUtil);
      this.formDepreciacion
        .get("valorRescate")
        .setValue(this.dataGeneral.valorRescate);
      this.formDepreciacion
        .get("cuentaDepreciacion")
        .setValue(this.dataGeneral.cuentaDepreciacion);
      this.formDepreciacion
        .get("cuentaDepreciacionAcumulada")
        .setValue(this.dataGeneral.cuentaDepreciacionAcumulada);
      this.formDepreciacion
        .get("cuentaPresupuestaria")
        .setValue(this.dataGeneral.cuentaPresupuestaria);
      this.formDepreciacion
        .get("estructuraPresupuestaria")
        .setValue(this.dataGeneral.estructuraPresupuestaria);
      this.formDepreciacion
        .get("fuenteFinanciamiento")
        .setValue(this.dataGeneral.codigoFuenteFinaciamiento);
      this.formDepreciacion
        .get("codigoCentroCosto")
        .setValue(this.dataGeneral.codigoCentroCosto);
    }
  }

  public getConfigurationSBN() {
    this.configuracionBienesService.getConfigSbn().subscribe((resp) => {
      if (resp.data.length > 0) {
        this.configSBN = resp.data;
        this.depeciacion = this.configSBN[0].afectacionDepreciacion;
      }
    });
  }

  public modifyValue(valor: any, campo: string) {
    let valorInput = valor;
    let datos = { valorInput, campo };
    this.activoDepreciacion.emit(datos);
  }

  public modifyValueInput(event: any, campo: string) {
    let valorInput = (<HTMLInputElement>event.target).value;
    let datos = { valorInput, campo };
    this.activoDepreciacion.emit(datos);
  }

  public modifyValueSelection(event: any, campo: string) {
    let valorInput = event.value;
    let datos = { valorInput, campo };
    this.activoDepreciacion.emit(datos);
  }

  public openCatalogDepreciationAccounts() {
    let columns = ["cuenta", "denominacion"];
    let columnsName = ["cuenta", "denominación"];
    let tittle = "Catálogo Plan Institucional de Cuentas Contables";
    this.sigesp
      .openCatalogoGenerico(
        columns,
        tittle,
        this.accountAccounting,
        columnsName
      )
      .then((resp) => {
        if (resp != null) {
          this.formDepreciacion.get("cuentaDepreciacion").setValue(resp.cuenta);
          this.modifyValue(resp.cuenta, "cuentaDepreciacion");
        }
      });
  }

  public openCatalogAccumulatedDepreciationAccounts() {
    let columns = ["cuenta", "denominacion"];
    let columnsName = ["cuenta", "denominación"];
    let tittle = "Catálogo Plan Institucional de Cuentas Contables";
    this.sigesp
      .openCatalogoGenerico(
        columns,
        tittle,
        this.accountAccounting,
        columnsName
      )
      .then((resp) => {
        if (resp != null) {
          this.formDepreciacion
            .get("cuentaDepreciacionAcumulada")
            .setValue(resp.cuenta);
          this.modifyValue(resp.cuenta, "cuentaDepreciacionAcumulada");
        }
      });
  }

  public openAccount() {
    // this.modifyValue(resp.cuenta, 'cuentaPresupuestaria')
    // this.modifyValue(resp.cuenta, 'estructuraPresupuestaria')
    // this.modifyValue(resp.cuenta, 'fuenteFinanciamiento')
  }
}
