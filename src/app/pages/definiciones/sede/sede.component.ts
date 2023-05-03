import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SigespService } from 'sigesp';
import { SedesService } from '@core/services/sedes.service';
import { MSede } from '@core/models/MSede';
import { MDefinicionesBasicas } from '@core/models/MDefinicionesBasicas';
import { DefinicionesBasicasService } from '@core/services/definiciones-basicas.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss'],
})
export class SedeComponent implements OnInit {
  public formSede: FormGroup;
  public allSeat: MSede[] = [];
  public allSeatTypes: MDefinicionesBasicas[] = [];
  public operacion: string = 'guardar';
  public idSeat: number = 0;
  public countries: any;
  public codeExists: boolean;
  public comunidades: any;
  public pariches: any;
  public states: any;
  public municipality: any;
  public municipalities: any;
  public cities: any;
  public codPais: any;

  constructor(
    private router: Router,
    private sigesp: SigespService,
    private sedesService: SedesService,
    private definicionesBasicasService: DefinicionesBasicasService
  ) {
    this.formSede = new FormGroup({
      codigo: new FormControl('', [
        Validators.required,
        Validators.maxLength(2),
        Validators.minLength(1),
      ]),
      denominacion: new FormControl('', [
        Validators.required,
        Validators.maxLength(180),
        Validators.minLength(3),
      ]),
      tipoSede: new FormControl('', [Validators.required]),
      localizacion: new FormControl('N'),
      pais: new FormControl(''),
      estado: new FormControl(''),
      municipio: new FormControl(''),
      parroquia: new FormControl(''),
      ciudad: new FormControl(''),
      urbanizacion: new FormControl('', [
        Validators.maxLength(60),
        Validators.minLength(3),
      ]),
      calle: new FormControl('', [
        Validators.maxLength(60),
        Validators.minLength(3),
      ]),
      casa: new FormControl('', [
        Validators.maxLength(60),
        Validators.minLength(1),
      ]),
      piso: new FormControl('', [
        Validators.maxLength(6),
        Validators.minLength(1),
      ]),
    });
  }

  ngOnInit() {
    this.getAllSeat();
    this.getAllSeatTypes();
    this.getCountries();
    this.sigesp.getMunicipalities().subscribe(resp => {
      this.municipality = resp;
    });
    this.sigesp.getStates().subscribe(resp => {
      this.states = resp;
    });
    this.sigesp.getParishes().subscribe(resp => {
      this.pariches = resp;
    });
    this.sedesService.getCiudad().subscribe(resp => {
      this.cities = resp;
    });
  }

  public inicializar() {
    this.formSede.reset();
    this.idSeat = 0;
    this.operacion = 'guardar';
    this.getAllSeat();
  }

  public exit() {
    this.router.navigate(['']);
  }

  public getAllSeat() {
    this.sedesService.getAllSeat().subscribe(resp => {
      this.allSeat = resp.data;
    });
  }

  public getAllSeatTypes() {
    let tipo = '12';
    this.definicionesBasicasService.getDefinition(tipo).subscribe(resp => {
      this.allSeatTypes = resp.data;
    });
  }

  public newSeat() {
    if (this.formSede.valid) {
      if (this.operacion == 'guardar') {
        this.saveSeat();
      } else if (this.operacion == 'actualizar') this.updateSeat();
    } else {
      this.sigesp.showToastSuccess(
        'Hay campos vacios o su formato es invalido'
      );
    }
  }

  public valideCode(event, campo) {
    let valorInput = (<HTMLInputElement>event.target).value;
    let i = this.allSeat.findIndex(e => {
      return e.codigoSede.trim() == valorInput.trim();
    });
    if (i >= 0) {
      this.sigesp.showToastError('El código ya esta registrado');
      this.formSede.get('codigo').reset();
      this.codeExists = false;
    } else {
      this.codeExists = true;
    }
  }

  public getCountries() {
    this.sigesp.getCountries().subscribe(resp => {
      this.countries = resp;
    });
  }

  public getStates(event: any) {
    this.codPais = event.value;
    this.sigesp.getStates().subscribe(resp => {
      this.states = resp.filter(e => e.countryCode == event.value);
    });
    this.formSede.get('estado').setValue('---');
    this.formSede.get('ciudad').setValue('---');
    this.formSede.get('municipio').setValue('---');
    this.formSede.get('parroquia').setValue('---');
    this.cities = this.cities.filter(
      e => e.codest == event.value && e.codpai == this.codPais
    );
    this.municipality = this.municipality.filter(
      e => e.countryCode == event.value
    );
    this.pariches = this.pariches.filter(e => e.countryCode == event.value);
    this.cities = this.cities.filter(e => e.codpai == event.value);
  }

  public getCities(event: any) {
    this.sedesService.getCiudad().subscribe(resp => {
      this.cities = resp.filter(e => e.codest == event.value);
    });
  }

  public getMunicipalitys(event: any) {
    let code = event.value;
    this.sigesp.getMunicipalities().subscribe(resp => {
      this.municipality = resp.filter(e => e.stateCode == event.value);
    });
    this.getCities(event);
    this.pariches = this.pariches.filter(e => e.stateCode == event.value);
  }

  public getParishes(event: any) {
    this.sigesp.getParishes().subscribe(resp => {
      this.pariches = resp.filter(e => e.municipalityCode == event.value);
    });
  }

  public saveSeat() {
    this.sedesService.saveSeat(this.formSede).subscribe((resp: any) => {
      if (resp.data.length > 0) {
        this.sigesp.showToastSuccess('Sede guardada con éxito');
        this.inicializar();
      } else this.sigesp.showToastError(resp.message);
    });
  }

  public updateSeat() {
    this.sedesService
      .updateSeat(this.formSede, this.idSeat)
      .subscribe((resp: any) => {
        if (resp.data) {
          this.sigesp.showToastSuccess('Sede actualizada con éxito');
          this.inicializar();
        } else this.sigesp.showToastError(resp.message);
      });
  }

  public deleteSeat() {
    this.sigesp
      .openDialogConfirm('Eliminar Sede', 'Esta seguro de eliminar la Sede?')
      .then(resp => {
        if (resp) {
          this.sedesService.deleteSeat(this.idSeat).subscribe((resp: any) => {
            if (resp.data) {
              this.sigesp.showToastSuccess('Sede eliminada con éxito');
              this.inicializar();
            } else this.sigesp.showToastSuccess(resp.message);
          });
        }
      });
  }

  public openCatalogo() {
    this.inicializar();
    let tittle = 'Catálogo de Sedes';
    let nameColummnas = ['Código', 'Sede'];
    let columnas = ['codigoSede', 'denominacionSede'];
    if (this.allSeat.length > 0) {
      this.sigesp
        .openCatalogoGenerico(columnas, tittle, this.allSeat, nameColummnas)
        .then((resp: MSede) => {
          if (resp != null) {
            this.idSeat = resp.idSede;
            this.formSede.get('tipoSede').setValue(resp.idTipoSede);
            this.formSede.get('codigo').setValue(resp.codigoSede);
            this.formSede.get('denominacion').setValue(resp.denominacionSede);
            this.formSede.get('localizacion').setValue(resp.localizacion);
            this.formSede.get('pais').setValue(resp.codigoPais.trim());
            this.formSede.get('estado').setValue(resp.codigoEstado);
            this.formSede.get('municipio').setValue(resp.codigoMunicipio);
            this.formSede.get('parroquia').setValue(resp.codigoParroquia);
            this.formSede.get('ciudad').setValue(resp.codigoCiudad);
            this.formSede.get('urbanizacion').setValue(resp.urbanizacion);
            this.formSede.get('calle').setValue(resp.calleAvenida);
            this.formSede.get('casa').setValue(resp.casaEdificio);
            this.formSede.get('piso').setValue(resp.piso);
            this.operacion = 'actualizar';
          }
        });
    }
  }
}
