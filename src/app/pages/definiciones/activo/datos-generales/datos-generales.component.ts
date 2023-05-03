import { MActivo } from '@core/models/MActivo';
import { TipoActivo } from '@core/models/MActivo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MCatalogoGeneral } from '@core/models/MCatalogoGeneral';
import {
  MMoneda,
  SigespService,
  MCuentaPresupuesto,
  MCuentaInstitucional,
} from 'sigesp';
import { MarcaModeloService } from '@core/services/marca-modelo.service';
import { MMarcas, MModelo } from '@core/models/MMarcaModelo';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { MSede } from '@core/models/MSede';
import { ConfiguracionBienesService } from '@core/services/configuracion-bienes.service';
import { CatalogoGeneralService } from '@core/services/catalogo-general.service';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';
import { SedesService } from '@core/services/sedes.service';
import { Router } from '@angular/router';
import { ActivosService } from '@core/services/activos.service';
//import { MConfigSBN } from '@core/models/MconfigSBN';
import * as moment from 'moment';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html',
  styleUrls: ['./datos-generales.component.scss'],
})
export class DatosGeneralesComponent implements OnInit {
  @Input() public configSBN: any[] = [];
  @Input() public catalogoGeneral: MCatalogoGeneral[] = [];
  @Input() public goodCategory: MDefinicionesBasicas[] = [];
  @Input() public money: MMoneda[] = [];
  @Input() public stateUse: MDefinicionesBasicas[] = [];
  @Input() public stateConservation: MDefinicionesBasicas[] = [];
  @Input() public brand: MMarcas[] = [];
  @Input() public goodColor: MDefinicionesBasicas[] = [];
  @Input() public typeComponent: MDefinicionesBasicas[] = [];
  @Input() public warranty: MDefinicionesBasicas[] = [];
  @Input() public goodClass: MDefinicionesBasicas[] = [];
  @Input() public typeSemoviente: MDefinicionesBasicas[] = [];
  @Input() public typeAnimal: MDefinicionesBasicas[] = [];
  @Input() public purposeSemoviente: MDefinicionesBasicas[] = [];
  @Input() public weightUnit: MDefinicionesBasicas[] = [];
  @Input() public terrainUnit: MDefinicionesBasicas[] = [];
  @Input() public constructionUnit: MDefinicionesBasicas[] = [];
  @Input() public sedes: MSede[] = [];
  @Input() public acquisitionForm: MDefinicionesBasicas[] = [];
  @Input() public buyCondition: MDefinicionesBasicas[] = [];
  @Input() public unitMeasurement: any[] = [];
  @Input() public accountAccounting: MCuentaInstitucional[] = [];
  @Input() public accountExpenses: MCuentaPresupuesto[] = [];
  @Input() public rotulation: MDefinicionesBasicas[] = [];
  @Input() public goodUser: MDefinicionesBasicas[] = [];
  @Input() public raceAnimal: MDefinicionesBasicas[] = [];
  @Input() public labelingMethod: MDefinicionesBasicas[] = [];
  @Input() public dataInicilizar: boolean = false;
  @Input() public dataGeneral: MActivo;

  @Output() activoDataGeneral = new EventEmitter<any>();
  @Output() fdataGenral = new EventEmitter<boolean>();

  public formDatosGenerales: FormGroup;
  public model: MModelo;
  public statusSede: boolean = false;
  public selection: string;
  public catlalog: MCatalogoGeneral;
  public lastActive: any;
  public codeActive: string;
  public tipoActivo = TipoActivo;
  public mostrar: boolean = true;

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private configuracionBienesService: ConfiguracionBienesService,
    private catalogoGeneralService: CatalogoGeneralService,
    private definicionesBasicasService: DefinicionesBasicasService,
    private marcaModeloService: MarcaModeloService,
    private sedesService: SedesService,
    private activoService: ActivosService
  ) {
    this.formDatosGenerales = new FormGroup({
      catalogoCuenta: new FormControl('', [Validators.required]),
      codigoInternoBien: new FormControl('', [Validators.required]),
      fechaIngresoBien: new FormControl('', [Validators.required]),
      descripcionBien: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      tipoActivo: new FormControl('', [Validators.required]),
      chapa: new FormControl(),
      idRotulacion: new FormControl(),
      categoria: new FormControl(),
      observacion: new FormControl('', [Validators.maxLength(250)]),
      estatusDepreciacion: new FormControl(),
      valorAdquisicionBien: new FormControl('', [Validators.required]),
      codigoMoneda: new FormControl(),
      fechaAdquisicionBien: new FormControl(),
      fechaRegistroBien: new FormControl(),
      cuentaPresupuestaria: new FormControl(),
      cuentaContable: new FormControl(),
      idEstadoUso: new FormControl(),
      idConservacion: new FormControl(),
      explicacionEstadoConservacionBien: new FormControl(),

      //Componentes

      numeroSerialBien: new FormControl('', [Validators.maxLength(50)]),
      idMarca: new FormControl(),
      idModelo: new FormControl(),
      annoFabricacionBien: new FormControl('', [Validators.maxLength(4)]),
      idColor: new FormControl(),
      especificacionColor: new FormControl('', [Validators.maxLength(200)]),
      idTipoComponente: new FormControl(),
      especificacionesTecnicaBien: new FormControl('', [
        Validators.maxLength(200),
      ]),
      garantia: new FormControl(),
      idUnidadMedidaGarantia: new FormControl(),
      fechaInicioGarantia: new FormControl(),
      fechaFinGarantia: new FormControl(),

      //VEHICULOS
      ClaseBien: new FormControl(),
      otraClaseBien: new FormControl(),
      serialCarroceria: new FormControl('', [Validators.maxLength(50)]),
      serialMotorBien: new FormControl('', [Validators.maxLength(50)]),
      numeroTituloPropietario: new FormControl('', [Validators.maxLength(30)]),
      capacidadBien: new FormControl('', [Validators.maxLength(50)]),
      usoBienVehiculo: new FormControl('', [Validators.maxLength(100)]),
      nombreBien: new FormControl('', [Validators.maxLength(100)]),
      estatusGPS: new FormControl(),
      especificacionSistemaGPS: new FormControl('', [
        Validators.maxLength(250),
      ]),
      placaSiglasBien: new FormControl('', [Validators.maxLength(20)]),
      descripcionComponenteBien: new FormControl('', [
        Validators.maxLength(250),
      ]),

      //SEMOVIENTES
      tipoSemoviente: new FormControl(),
      tipoAnimal: new FormControl(),
      generoSemoviente: new FormControl(),
      fechaNacimiento: new FormControl(),
      raza: new FormControl(),
      proposito: new FormControl(),
      unidadMedidaSe: new FormControl(),
      numeroHierro: new FormControl('', [Validators.maxLength(15)]),
      especificacionesAnimal: new FormControl('', [Validators.maxLength(250)]),
      peso: new FormControl(),

      //INMUEBLES
      usoInmueble: new FormControl(),
      dependenciaInmuebles: new FormControl('', [Validators.maxLength(250)]),
      areaConstruccion: new FormControl(),
      unidMedConstruccion: new FormControl(),
      areaTerreno: new FormControl(),
      unidMedTerreno: new FormControl(),
      propietarioAnterior: new FormControl('', [Validators.maxLength(150)]),
      estatusSede: new FormControl(),
      codigoSede: new FormControl(),
      oficinaRegistro: new FormControl('', [Validators.maxLength(250)]),
      fechaRegistro: new FormControl(),
      tomo: new FormControl('', [Validators.maxLength(4)]),
      folio: new FormControl('', [Validators.maxLength(5)]),
      protocolo: new FormControl('', [Validators.maxLength(20)]),
      referenciaRegistro: new FormControl('', [Validators.maxLength(250)]),
      numeroRegistro: new FormControl('', [Validators.maxLength(20)]),
      especificacionInmueble: new FormControl('', [Validators.maxLength(250)]),
    });
  }

  ngOnInit() {
    this.inicializar();
    this.showData();
  }

  // ngOnChanges() {
  //   this.dataGeneral;
  //   this.dataInicilizar;
  //   this.showData();
  //   if (this.dataInicilizar) {
  //     this.inicializar();
  //   }
  // }

  public inicializar() {
    this.formDatosGenerales.reset();
    this.mostrar = true;
  }

  public getModel(id: number) {
    this.marcaModeloService.getBrandModels(id).subscribe(resp => {
      this.model = resp.data;
    });
  }

  public getModelBrand(event: any, campo: string) {
    this.getModel(event.value);
    this.modifyValue(event.value, campo);
  }

  public selectionType(event, campo) {
    this.selection = event.value;
    this.modifyValue(event.value, campo);
  }

  public openExpensesCatalog() {
    let columns = ['cuenta', 'denominacion'];
    let columnsName = ['cuenta', 'denominación'];
    let tittle = 'Catálogo Bienes Nacionales';
    this.sigesp
      .openCatalogoGenerico(columns, tittle, this.accountExpenses, columnsName)
      .then(data => {
        if (data) {
          this.formDatosGenerales
            .get('cuentaPresupuestaria')
            .setValue(data.cuenta);
        }
      });
  }

  public openAccountingCatalog() {
    let columns = ['cuenta', 'denominacion'];
    let columnsName = ['cuenta', 'denominación'];
    let tittle = 'Catálogo Plan Institucional de Cuentas Contables';
    this.sigesp
      .openCatalogoGenerico(
        columns,
        tittle,
        this.accountAccounting,
        columnsName
      )
      .then(resp => {
        if (resp != null) {
          this.formDatosGenerales.get('cuentaContable').setValue(resp.cuenta);
        }
      });
  }

  public openGeralCatalog() {
    let tittle = 'Catalogo de Catalogo General';
    let nameColummnas = ['Código', 'Denominación'];
    let columnas = ['catalogoCuenta', 'denominacionCuenta'];
    if (this.catalogoGeneral.length > 1 && this.mostrar == true) {
      this.sigesp
        .openCatalogoGenerico(
          columnas,
          tittle,
          this.catalogoGeneral,
          nameColummnas
        )
        .then((resp: MCatalogoGeneral) => {
          if (resp) {
            this.formDatosGenerales
              .get('catalogoCuenta')
              .setValue(resp.catalogoCuenta);
            this.modifyValue(resp.catalogoCuenta, 'catalogoCuenta');
            this.catlalog = resp;
            this.activoService
              .getNetCode(this.catlalog.catalogoCuenta)
              .subscribe(resp => {
                this.formDatosGenerales
                  .get('codigoInternoBien')
                  .setValue(resp.data);
                this.modifyValue(resp.data, 'codigoInternoBien');
              });
          }
        });
    } else if (this.catalogoGeneral.length <= 1) {
      this.sigesp.showToastError('No hay Catálogo Registrado');
    }
  }

  public getStatusSlide(event: any, campo: string) {
    let valor: number;
    this.statusSede = event.checked;
    if (this.statusSede) {
      valor = 1;
    } else {
      valor = 0;
    }
    this.modifyValue(valor, campo);
  }

  public modifyValue(valor: any, campo: string) {
    let valorInput = valor;
    let datos = { valorInput, campo };
    this.activoDataGeneral.emit(datos);
    if (this.formDatosGenerales.valid) {
      this.fdataGenral.emit(true);
    } else {
      this.fdataGenral.emit(false);
    }
  }

  public modifyValueInput(event: any, campo: string) {
    let valorInput = (<HTMLInputElement>event.target).value;
    let datos = { valorInput, campo };
    this.activoDataGeneral.emit(datos);
    if (this.formDatosGenerales.valid) {
      this.fdataGenral.emit(true);
    } else {
      this.fdataGenral.emit(false);
    }
  }

  public modifyValueSelection(event: any, campo: string) {
    let valorInput: any;
    if (campo == 'estatusDepreciacion' || campo == 'estatusGPS') {
      if (event.value) {
        valorInput = 1;
      } else valorInput = 0;
    }
    valorInput = event.value;
    let datos = { valorInput, campo };
    this.activoDataGeneral.emit(datos);
    if (this.formDatosGenerales.valid) {
      this.fdataGenral.emit(true);
    } else {
      this.fdataGenral.emit(false);
    }
  }

  public modifyValueDatePicker(event: any, campo: string) {
    let valorInput = moment(event.value).format('YYYY-MM-DD');
    let datos = { valorInput, campo };
    this.activoDataGeneral.emit(datos);
    if (this.formDatosGenerales.valid) {
      this.fdataGenral.emit(true);
    } else {
      this.fdataGenral.emit(false);
    }
  }

  public showData() {
    if (this.dataGeneral != undefined) {
      this.mostrar = false;
      //datos generales (18)(68)
      this.formDatosGenerales
        .get('catalogoCuenta')
        .setValue(this.dataGeneral.catalogoCuenta);
      this.formDatosGenerales
        .get('codigoInternoBien')
        .setValue(this.dataGeneral.codigoInternoBien);
      this.formDatosGenerales
        .get('fechaRegistroBien')
        .setValue(this.dataGeneral.fechaRegistroBien);
      this.formDatosGenerales
        .get('fechaIngresoBien')
        .setValue(this.dataGeneral.fechaIngresoBien);
      this.formDatosGenerales
        .get('descripcionBien')
        .setValue(this.dataGeneral.descripcionBien);
      this.formDatosGenerales
        .get('tipoActivo')
        .setValue(this.dataGeneral.tipoActivo);
      this.formDatosGenerales.get('chapa').setValue(this.dataGeneral.chapa);
      this.formDatosGenerales
        .get('idRotulacion')
        .setValue(this.dataGeneral.idRotulacion);
      this.formDatosGenerales
        .get('categoria')
        .setValue(this.dataGeneral.idCategoria);
      this.formDatosGenerales
        .get('observacion')
        .setValue(this.dataGeneral.observacion);
      if (this.dataGeneral.estatusDepreciacion == 0) {
        this.formDatosGenerales.get('estatusDepreciacion').setValue(false);
      } else {
        this.formDatosGenerales.get('estatusDepreciacion').setValue(true);
      }
      this.formDatosGenerales
        .get('valorAdquisicionBien')
        .setValue(this.dataGeneral.valorAdquisicionBien);
      this.formDatosGenerales
        .get('codigoMoneda')
        .setValue(this.dataGeneral.codigoMoneda);
      this.formDatosGenerales
        .get('fechaAdquisicionBien')
        .setValue(this.dataGeneral.fechaAdquisicionBien);
      this.formDatosGenerales
        .get('cuentaPresupuestaria')
        .setValue(this.dataGeneral.cuentaPresupuestaria);
      this.formDatosGenerales
        .get('cuentaContable')
        .setValue(this.dataGeneral.cuentaContable);
      this.formDatosGenerales
        .get('idEstadoUso')
        .setValue(this.dataGeneral.idEstadoUso);
      this.formDatosGenerales
        .get('idConservacion')
        .setValue(this.dataGeneral.idConservacion);
      this.formDatosGenerales
        .get('explicacionEstadoConservacionBien')
        .setValue(this.dataGeneral.explicacionEstadoConservacionBien);
      this.formDatosGenerales
        .get('fechaAdquisicionBien')
        .setValue(this.dataGeneral.fechaAdquisicionBien);
      this.selection = this.dataGeneral.tipoActivo;

      //componentes (12)
      this.formDatosGenerales
        .get('numeroSerialBien')
        .setValue(this.dataGeneral.numeroSerialBien);
      this.formDatosGenerales.get('idMarca').setValue(this.dataGeneral.idMarca);
      this.getModel(this.dataGeneral.idMarca);
      this.formDatosGenerales
        .get('idModelo')
        .setValue(this.dataGeneral.idModelo);
      this.formDatosGenerales
        .get('annoFabricacionBien')
        .setValue(this.dataGeneral.annoFabricacionBien);
      this.formDatosGenerales.get('idColor').setValue(this.dataGeneral.idColor);
      this.formDatosGenerales
        .get('especificacionColor')
        .setValue(this.dataGeneral.especificacionColor);
      this.formDatosGenerales
        .get('idTipoComponente')
        .setValue(this.dataGeneral.idTipoComponente);
      this.formDatosGenerales
        .get('especificacionesTecnicaBien')
        .setValue(this.dataGeneral.especificacionesTecnicaBien);
      this.formDatosGenerales
        .get('garantia')
        .setValue(this.dataGeneral.garantia);
      this.formDatosGenerales
        .get('idUnidadMedidaGarantia')
        .setValue(this.dataGeneral.idUnidadMedidaGarantia);
      this.formDatosGenerales
        .get('fechaInicioGarantia')
        .setValue(this.dataGeneral.fechaInicioGarantia);
      this.formDatosGenerales
        .get('fechaFinGarantia')
        .setValue(this.dataGeneral.fecchaFinGarantia);

      //vehiculos (11)
      this.formDatosGenerales
        .get('ClaseBien')
        .setValue(this.dataGeneral.idClase);
      this.formDatosGenerales
        .get('otraClaseBien')
        .setValue(this.dataGeneral.descripcionOtraClase);
      this.formDatosGenerales
        .get('serialMotorBien')
        .setValue(this.dataGeneral.serialMotorBien);

      this.formDatosGenerales
        .get('nombreBien')
        .setValue(this.dataGeneral.nombreBien);
      this.formDatosGenerales
        .get('estatusGPS')
        .setValue(this.dataGeneral.estatusGPS);
      this.formDatosGenerales
        .get('especificacionSistemaGPS')
        .setValue(this.dataGeneral.especificacionSistemaGPS);
      this.formDatosGenerales
        .get('serialCarroceria')
        .setValue(this.dataGeneral.serialCarroceriaBien);
      this.formDatosGenerales
        .get('placaSiglasBien')
        .setValue(this.dataGeneral.placaSiglasBien);
      this.formDatosGenerales
        .get('numeroTituloPropietario')
        .setValue(this.dataGeneral.numeroTituloPropiedad);
      this.formDatosGenerales
        .get('capacidadBien')
        .setValue(this.dataGeneral.capacidadBien);
      this.formDatosGenerales
        .get('descripcionComponenteBien')
        .setValue(this.dataGeneral.descripcionComponenteBien);
      this.formDatosGenerales
        .get('usoBienVehiculo')
        .setValue(this.dataGeneral.usoBienVehiculo);

      //Semovientes (10)
      this.formDatosGenerales
        .get('tipoSemoviente')
        .setValue(this.dataGeneral.idTipoSemoviente);
      this.formDatosGenerales
        .get('generoSemoviente')
        .setValue(this.dataGeneral.genero);
      this.formDatosGenerales.get('raza').setValue(this.dataGeneral.idRaza);
      this.formDatosGenerales
        .get('proposito')
        .setValue(this.dataGeneral.idPropositoSemoviente);
      this.formDatosGenerales
        .get('unidadMedidaSe')
        .setValue(this.dataGeneral.idUnidadaMedidaPeso);
      this.formDatosGenerales
        .get('numeroHierro')
        .setValue(this.dataGeneral.numeroHierro);
      this.formDatosGenerales
        .get('especificacionesAnimal')
        .setValue(this.dataGeneral.especificacionAnimal);
      this.formDatosGenerales
        .get('tipoAnimal')
        .setValue(this.dataGeneral.idTipoAnimal);
      this.formDatosGenerales
        .get('fechaNacimiento')
        .setValue(this.dataGeneral.fechaNacimientoAnimal);
      this.formDatosGenerales.get('peso').setValue(this.dataGeneral.peso);

      //Inmuebles (17)
      this.formDatosGenerales
        .get('usoInmueble')
        .setValue(this.dataGeneral.idUso);
      this.formDatosGenerales
        .get('dependenciaInmuebles')
        .setValue(this.dataGeneral.dependencias);
      this.formDatosGenerales
        .get('areaConstruccion')
        .setValue(this.dataGeneral.areaConstruccion);
      this.formDatosGenerales
        .get('unidMedConstruccion')
        .setValue(this.dataGeneral.idUnidadMedidaConstruccion);
      this.formDatosGenerales
        .get('areaTerreno')
        .setValue(this.dataGeneral.areaDelTerreno);
      this.formDatosGenerales
        .get('unidMedTerreno')
        .setValue(this.dataGeneral.idUnidadMedidaTerreno);
      this.formDatosGenerales
        .get('propietarioAnterior')
        .setValue(this.dataGeneral.propietarioAnterior);
      this.formDatosGenerales
        .get('estatusSede')
        .setValue(this.dataGeneral.estatusSede);
      this.formDatosGenerales
        .get('codigoSede')
        .setValue(this.dataGeneral.idSedeUbicacion);
      this.formDatosGenerales
        .get('oficinaRegistro')
        .setValue(this.dataGeneral.oficinaRegistroNotaria);
      this.formDatosGenerales
        .get('fechaRegistro')
        .setValue(this.dataGeneral.fechaRegistro);
      this.formDatosGenerales.get('tomo').setValue(this.dataGeneral.tomo);
      this.formDatosGenerales.get('folio').setValue(this.dataGeneral.folio);
      this.formDatosGenerales
        .get('protocolo')
        .setValue(this.dataGeneral.protocolo);
      this.formDatosGenerales
        .get('referenciaRegistro')
        .setValue(this.dataGeneral.referenciaRegistro);
      this.formDatosGenerales
        .get('numeroRegistro')
        .setValue(this.dataGeneral.numeroRegistro);
      this.formDatosGenerales
        .get('especificacionInmueble')
        .setValue(this.dataGeneral.especificacionInmueble);
    }
    if (this.formDatosGenerales.valid) {
      this.fdataGenral.emit(true);
    } else {
      this.fdataGenral.emit(false);
    }
  }
}
