import { Id } from '@core/types/id';
import { Basica } from './auxiliares/basica';

export interface ActivoDetalle extends Basica {
  garantia: number;
  unidadGarantia: string;
  iniciogarantia: Date;
  finGarantia: Date;
  asegurado: number;
  claseId: Id;
  origenId: Id;
  descripcionOtraClase: string;
  fuenteFinanciamiento: Id;
  codigoCentroCostos: Id;
  especificacionesTecnicas: string;
  oficinaRegistro: string;
  referenciaRegistro: string;
  tomo: string;
  folio: string;
  protocolo: string;
  numeroRegistro: string;
  fechaRegistrado: Date;
  propietarioAnterior: string;
  dependencias: string;
  areaConstruccion: number;
  unidadAreaConstruccion: string;
  areaTerreno: number;
  unidadAreaTerreno: string;
  especificacionesInmueble: string;
  perteneceASede: number;
  especificacionesColor: string;
  serialCarroceria: string;
  serialMotor: string;
  placas: string;
  numeroTituloPropiedad: string;
  capacidad: string;
  nombre: string;
  usoId: Id;
  tieneGps: number;
  especificacionesGps: string;
  tipoSemovienteId: Id;
  genero: string;
  propositoSemovienteId: Id;
  peso: number;
  unidadMedidaPeso: string;
  numeroHierro: string;
  especificacionesAnimal: string;
  fechaNacimientoAnimal: Date;
  razaId: Id;
}
