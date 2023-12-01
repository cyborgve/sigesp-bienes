export interface DepreciacionLista {
  empresa: string;
  id: number;
  comprobante: string;
  activo: string;
  serial: string;
  identificador: string;
  fechaCompra: Date;
  fechaIncorporacion: Date;
  metodo: string;
  costo: string;
  valorRescate: string;
  montoDepreciar: string;
  vidaUtil: string;
  depreciacionMensual: string;
  depreciacionAnual: string;
  observaciones: string;
  creado: Date;
  modificado: Date;
}
