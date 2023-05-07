import { Basica } from '@core/models/basica';

export interface Responsable extends Basica {
  tipo: string;
  numeroCedula: string;
  nombreCompleto: string;
  cargo: string;
  telefonos: string;
  direccion: string;
  correoElectronico: string;
}
