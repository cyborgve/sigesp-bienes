import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MCatalogoGeneral } from "@core/models/MCatalogoGeneral";
import { Router } from "@angular/router";
import { SigespService } from "sigesp";
import { CatalogoGeneralService } from "@core/services/catalogo-general.service";
import { ConfiguracionBienesService } from "@core/services/configuracion-bienes.service";
//import { MConfigSBN } from '@core/models/MconfigSBN';

@Component({
  selector: "app-catalogo-general",
  templateUrl: "./catalogo-general.component.html",
  styleUrls: ["./catalogo-general.component.scss"],
})
export class CatalogoGeneralComponent implements OnInit {
  public formCatalogoGeneral: FormGroup;
  public operacion: string = "guardar";
  public allCatalog: MCatalogoGeneral[] = [];
  public codeExists: boolean;
  public cuenta: string;
  public config: any[] = [];
  public logitudCuentaGeneral: number;
  public formatoCuenta: any;
  public cuentaRef: string;
  public denominacionREf: string;
  public validoCodigo: boolean;
  public patronPattern = "(^[0-9-])$";

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private catalogoGeneralService: CatalogoGeneralService,
    private configSBN: ConfiguracionBienesService
  ) {
    this.formCatalogoGeneral = new FormGroup({
      denominacion: new FormControl("", [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(3),
      ]),
      codigo: new FormControl("", [
        Validators.required,
        Validators.maxLength(this.logitudCuentaGeneral),
        Validators.minLength(this.logitudCuentaGeneral),
      ]),
      referencia: new FormControl(),
      estatus: new FormControl(),
    });
  }

  ngOnInit() {
    this.configSbn();
    this.getGeneralCatalog();
  }

  public getCurrency() {
    this.configSbn();
  }

  public getDenominacion() {
    let i = this.allCatalog.findIndex((e) => {
      return e.catalogoCuenta.trim() == this.cuentaRef.trim();
    });
    if (i >= 0) {
      this.denominacionREf = this.allCatalog[i].denominacionCuenta;
    }
  }

  public inicializar() {
    this.formCatalogoGeneral.reset();
    this.operacion = "guardar";
    this.getGeneralCatalog();
    this.configSbn();
    this.cuentaRef = "";
    this.cuenta = "";
    this.denominacionREf = "";
  }

  public exit() {
    this.router.navigate([""]);
  }

  public getGeneralCatalog() {
    this.catalogoGeneralService.getAllGeneralCatalog().subscribe((resp) => {
      this.allCatalog = resp.data;
    });
  }

  public configSbn() {
    this.configSBN.getConfigSbn().subscribe((resp) => {
      this.config = resp.data;
      if (this.config.length > 0) {
        if (this.config[0].estatusSeparadorMascara == 1) {
          this.formatoCuenta = this.config[0].formatoCuentaGeneral;
          this.logitudCuentaGeneral =
            this.config[0].formatoCuentaGeneral.length;
        } else {
          this.formatoCuenta = this.config[0].formatoCuentaGeneral.replace(
            /-/gi,
            ""
          );
          this.logitudCuentaGeneral =
            this.config[0].longMaxCaracterCuentaGeneral;
        }
      } else
        this.sigesp.showToastError(
          "No ha configurado el formato de las cuentas"
        );
    });
  }

  public newGeneralCatalog() {
    if (this.formCatalogoGeneral.valid) {
      if (this.operacion == "actualizar") {
        let valor = this.formCatalogoGeneral.get("codigo").value;
        if (this.cuenta.trim() == valor.trim()) {
          this.updateGeneralCatalog();
        } else if (this.cuenta.trim() != valor.trim()) {
          this.saveGeneralCatlog();
        }
      }
      if (this.operacion == "guardar") {
        this.saveGeneralCatlog();
      }
    } else
      this.sigesp.showToastError("Hay campos vacios o su formato es invalido");
  }

  public saveGeneralCatlog() {
    this.catalogoGeneralService
      .saveGeneralCatalog(this.formCatalogoGeneral, this.cuentaRef)
      .subscribe((resp: any) => {
        if (resp.data.length > 0) {
          this.sigesp.showToastSuccess("Registro guardada con éxito");
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public updateGeneralCatalog() {
    this.catalogoGeneralService
      .updateGeneralCatalog(this.formCatalogoGeneral, this.cuentaRef)
      .subscribe((resp: any) => {
        if (resp.data) {
          this.sigesp.showToastSuccess("Registro actualizada con éxito");
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public deleteGeneralCatalog() {
    this.sigesp
      .openDialogConfirm("Eliminar ", "Esta seguro de eliminar el registro?")
      .then((resp) => {
        if (resp) {
          this.catalogoGeneralService
            .deleteGeneralCatalog(this.cuenta)
            .subscribe((resp: any) => {
              if (resp.data) {
                this.sigesp.showToastSuccess("Cuenta eliminada con éxito");
                this.inicializar();
              } else this.sigesp.showToastError(resp.message);
            });
        }
      });
  }

  public openCatalogo() {
    this.inicializar();
    let tittle = "Catalogo de Catalogo General";
    let nameColummnas = ["Código", "Denominación"];
    let columnas = ["catalogoCuenta", "denominacionCuenta"];
    if (this.allCatalog.length > 0) {
      this.sigesp
        .openCatalogoGenerico(columnas, tittle, this.allCatalog, nameColummnas)
        .then((resp: MCatalogoGeneral) => {
          if (resp != null) {
            this.cuenta = resp.catalogoCuenta;
            this.formCatalogoGeneral
              .get("codigo")
              .setValue(resp.catalogoCuenta);
            this.formCatalogoGeneral
              .get("denominacion")
              .setValue(resp.denominacionCuenta);
            this.formCatalogoGeneral
              .get("referencia")
              .setValue(resp.cuentaReferencia);
            this.cuentaRef = resp.cuentaReferencia;
            this.getDenominacion();
            if (resp.estatusMovimiento == "C") {
              this.formCatalogoGeneral.get("estatus").setValue(true);
            } else if (resp.estatusMovimiento == "S") {
              this.formCatalogoGeneral.get("estatus").setValue(false);
            }
            this.cuenta = resp.catalogoCuenta;
            this.operacion = "actualizar";
          }
        });
    } else this.sigesp.showToastError("No hay catalogo registrado");
  }

  public openCatalogoReferencia() {
    let tittle = "Catalogo de Catalogo General";
    let nameColummnas = ["Código", "Denominación"];
    let columnas = ["catalogoCuenta", "denominacionCuenta"];
    if (this.allCatalog.length > 0) {
      this.sigesp
        .openCatalogoGenerico(columnas, tittle, this.allCatalog, nameColummnas)
        .then((resp: MCatalogoGeneral) => {
          if (resp != null) {
            this.formCatalogoGeneral
              .get("referencia")
              .setValue(resp.catalogoCuenta);
            this.cuentaRef = resp.catalogoCuenta;
            this.denominacionREf = resp.denominacionCuenta;
          }
        });
    } else this.sigesp.showToastError("No hay catalogo registrado");
  }

  public validarDigitosCuenta(event) {
    let valor = [];
    let valido: boolean;
    let validoLog: boolean;

    if (this.config.length > 0) {
      let valorInput = (<HTMLInputElement>event.target).value;
      if (this.config[0].estatusSeparadorMascara == 1) {
        for (let i = 0; i < this.formatoCuenta.length; i++) {
          if (this.formatoCuenta.charAt(i) == "-") {
            valor.push(i);
          }
        }
        if (valorInput.length == this.logitudCuentaGeneral) {
          if (valor.length > 0) {
            for (let i = 0; i < valor.length; i++) {
              if (valorInput.charAt(valor[i]) == "-") {
                valido = true;
              } else {
                valido = false;
                this.sigesp.showToastError("Formato invalido del código");
                break;
              }
              for (let j = 0; j < valor[i]; j++) {
                if (valorInput[j] >= "0" && valorInput[j] <= "9") {
                  valido = true;
                } else {
                  valido = false;
                  this.sigesp.showToastError("Formato invalido del código");
                  break;
                }
              }
            }
          }
        }
      }
      if (valorInput.length != this.logitudCuentaGeneral) {
        this.sigesp.showToastError("Faltan dígitos al código");
        validoLog = false;
      } else validoLog = true;

      let k = this.allCatalog.findIndex((e) => {
        return e.catalogoCuenta.trim() == valorInput.trim();
      });

      if (k >= 0) {
        this.sigesp.showToastError("El código ya esta registrado");
        this.formCatalogoGeneral.get("codigo").reset();
        this.codeExists = false;
      } else {
        this.codeExists = true;
      }

      if (valido == true && validoLog == true && this.codeExists == false) {
        this.validoCodigo = true;
      } else this.validoCodigo = false;
    }
  }
} //Fin de la clase
