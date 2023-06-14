import { Basica } from '@core/models/basica';
import { Id } from '@core/types/id';
import { ComponenteActivo } from './componente-activo';

export interface Activo extends Basica {
  codigo: string;
  denominacion: string;
  catalogoCuentas: string;
  fechaRegistro: string;
  tipoActivo: string;
  depreciable: boolean;
  fechaAdquisicion: Date;
  fechaIngreso: Date;
  observaciones: string;
  origenId: Id;
  unidadAdministrativaId: Id;
  sedeId: Id;
  peso: number;
  responsableUsoId: Id;
  estadoUsoId: Id;
  valorAdquisicion: number;
  monedaId: Id;
  conservacion: string;
  descripcionEstadoConservacion: Id;
  serialRotulacion: string;
  serialFabrica: string;
  marcaId: Id;
  modeloId: Id;
  anioFabricacion: string;
  colorId: Id;
  componentes: ComponenteActivo[];
  especificacionesTecnicas: string;
  diasGarantia: number;
  fechaInicioGarantia: Date;
  fechaFinGarantia: Date;
  claseId: Id;
  descripcionOtraClase: string;
  serialCarroceria: string;
  serialMotor: string;
  placas: string;
  numeroTituloPropiedad: string;
  capacidad: string;
  nombre: string;
  usoId: Id;
  tieneGPS: boolean;
  especificacionesGPS: string;
  tipoSemovienteId: Id;
  genero: string;
  raza: string;
  propositoSemovienteId: Id;
  unidadMedidaId: Id;
  numeroHierro: string;
  especificacionesAnimal: string;
  tipoAnimalId: Id;
  responsableId: Id;
  fechaNacimientoAnimal: Date;
  oficinaRegistro: string;
  referenciaRegistro: string;
  tomo: string;
  folio: string;
  protocolo: string;
  numeroRegistro: string;
  fechaRegistrado: Date;
  propietarioAnterior: string;
  dependencias: string;
  areaConstruccionM2: string;
  areaTerrenoM2: string;
  especificacionesInmueble: string;
  perteneceASede: boolean;
  sedeUbicacionId: Id;
  especificacionesColor: string;
  rotulacionId: Id;
  categoriaId: Id;
  asegurado: boolean;
  seguroId: Id;
  razaId: Id;
  plantillaDepreciacion: Id;
  metodoDepreciacion: string;
  vidaUtil: string;
  valorRescate: number;
  cuentaContableGasto: string;
  cuentaContableDepreciacion: string;
  fuenteFinanciamientoId: string;
  codigoCentroCostos: string;
}
