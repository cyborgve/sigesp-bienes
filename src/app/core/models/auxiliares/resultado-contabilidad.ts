export interface ResultadoContabilidad {
  data: ResultadoComprobante[];
  message: string;
  status: number;
  success: boolean;
  title: string;
}

interface ResultadoComprobante {
  documento: string;
  mensaje: string;
  estatus: boolean;
}
