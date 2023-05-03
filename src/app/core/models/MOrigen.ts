import {
  ISelect,
  ISelect2,
  ISelect3,
} from '@core/interfaces/BienesDefinicionesBasicas';
import { IOrigen } from '@core/interfaces/BienesDefiniciones';

export class MOrigen {
  idOrigen: number = null;
  codigoOrigen: string = null;
  fechaOrigen: string = null;
  fechaAdquisicion: string = null;
  modoAquisicion: number = null;
  fechaFormaAdquisicion: string = null;
  numeroFormaAdquisicion: string = null;
  nombreFormaAdquisicion: string = null;
  fechaFactura: string = null;
  numeroFactura: string = null;
  idProveedor: number = null;
  tomo: string = null;
  folio: string = null;
  nomprePropietarioAnterior: string = null;
  nombreBeneficiarioCedente: string = null;
  nombreBeneficiarioReceptor: string = null;
  observacion: string = null;
  formaAdquisicion: number = null;
  nombreProveedor: string = null;
  rifProveedor: string = null;

  constructor(o: IOrigen) {
    this.idOrigen = parseInt(o.id_origen);
    this.codigoOrigen = o.codori;
    this.fechaOrigen = o.fecori;
    this.fechaAdquisicion = o.fecadq;
    this.modoAquisicion = parseInt(o.modadq);
    this.fechaFormaAdquisicion = o.fecforadq;
    this.numeroFormaAdquisicion = o.numforadq;
    this.nombreFormaAdquisicion = o.nomformadq;
    this.fechaFactura = o.fecfac;
    this.numeroFactura = o.numfac;
    this.idProveedor = parseInt(o.id_proveedor);
    this.tomo = o.tomo;
    this.folio = o.folio;
    this.nomprePropietarioAnterior = o.nompropant;
    this.nombreBeneficiarioCedente = o.nombenced;
    this.nombreBeneficiarioReceptor = o.nombenrec;
    this.observacion = o.observacion;
    this.formaAdquisicion = parseInt(o.formadqui);
    this.nombreProveedor = o.nompro;
    this.rifProveedor = o.rifpro;
  }
}

export const ModoOrigen: ISelect3[] = [
  { value: 0, denominacion: 'Por Derecho Público' },
  { value: 1, denominacion: 'Por Derecho Privado' },
];

export const FormaAquisicion: ISelect2[] = [
  { value: 1, denominacion: 'Autorización', tipo: 1 },
  { value: 2, denominacion: 'Comodato ', tipo: 1 },
  { value: 3, denominacion: 'Compra/Orden de Compra', tipo: 1 },
  { value: 4, denominacion: 'Concurso', tipo: 1 },
  { value: 5, denominacion: 'Confiscación', tipo: 0 },
  { value: 6, denominacion: 'Contrato', tipo: 1 },
  { value: 7, denominacion: 'Decomiso', tipo: 0 },
  { value: 8, denominacion: 'Donación', tipo: 1 },
  { value: 9, denominacion: 'Expropiación', tipo: 0 },
  { value: 10, denominacion: 'Expropiación', tipo: 0 },
  { value: 11, denominacion: 'Fideicomiso', tipo: 1 },
  { value: 12, denominacion: 'Finiquito ', tipo: 1 },
  { value: 13, denominacion: 'Herencia', tipo: 1 },
  { value: 14, denominacion: 'Licitación', tipo: 1 },
  { value: 15, denominacion: 'Nacionalización', tipo: 0 },
  { value: 16, denominacion: 'Registro', tipo: 1 },
  { value: 17, denominacion: 'Requisición', tipo: 0 },
  { value: 18, denominacion: 'Sentencia ', tipo: 1 },
];
