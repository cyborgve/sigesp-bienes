import {
  IDeficionesBasicas,
  ISelect,
} from '@core/interfaces/BienesDefinicionesBasicas';

export class MDefinicionesBasicas {
  public id: number = null;
  public codigo: string = null;
  public denominacion: string = null;

  constructor(c: IDeficionesBasicas) {
    this.id = parseInt(c.id);
    this.codigo = c.codigo;
    this.denominacion = c.denominacion;
  }
}

export const DefinicionesSelect: ISelect[] = [
  { value: '1', denominacion: 'Categoría del Bien' },
  { value: '2', denominacion: 'Categorías de Unidades Administrativas' },
  { value: '3', denominacion: 'Clases de Bien (Vehículos)' },
  { value: '4', denominacion: 'Color' },
  { value: '5', denominacion: 'Compañías Aseguradoras' },
  { value: '19', denominacion: 'Condición de Compra' },
  { value: '6', denominacion: 'Estado del Bien (Condiciones Físicas)' },
  { value: '7', denominacion: 'Estatus de Uso del Bien' },
  { value: '8', denominacion: 'Formas de Adquisición del Bien' },
  { value: '9', denominacion: 'Método de rotulación' },
  { value: '10', denominacion: 'Propósitos (Semovientes)' },
  { value: '23', denominacion: 'Raza' },
  { value: '21', denominacion: 'Tipo de Animal' },
  { value: '20', denominacion: 'Tipo de Marca' },
  { value: '22', denominacion: 'Tipo de Poliza' },
  { value: '11', denominacion: 'Tipo de Responsable' },
  { value: '12', denominacion: 'Tipo Sede' },
  { value: '13', denominacion: 'Tipo Semoviente' },
  { value: '14', denominacion: 'Tipos de Coberturas' },
  { value: '15', denominacion: 'Tipos de los Componentes' },
  { value: '16', denominacion: 'Tipos de Lugares de Ubicación' },
  { value: '17', denominacion: 'Unidad de Medida de la Garantía' },
  { value: '18', denominacion: 'Usos (Terrenos y Edificaciones)' },
];
