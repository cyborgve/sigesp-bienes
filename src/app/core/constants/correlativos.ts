export const CORRELATIVOS: { nombre: string; id: number; tabla: string }[] = [
  { nombre: 'activo', id: 1, tabla: 'sbn_activos' },
  { nombre: 'aseguradora', id: 2, tabla: 'sbn_aseguradoras' },
  { nombre: 'categoría', id: 3, tabla: 'sbn_categorias' },
  {
    nombre: 'categoria de unidad administrativa',
    id: 4,
    tabla: 'sbn_categorias_unidad_administr',
  },
  { nombre: 'causa de movimiento', id: 5, tabla: 'sbn_causas_movimiento' },
  { nombre: 'clase', id: 6, tabla: 'sbn_clases' },
  { nombre: 'color', id: 7, tabla: 'sbn_colores' },
  { nombre: 'componente activo', id: 8, tabla: 'sbn_activo_componentes' },
  {
    nombre: 'componente estructura',
    id: 9,
    tabla: 'sbn_componentes_estructura',
  }, // FIXME: la tabla se deberia renombrar a sbn_activo_estructuras
  { nombre: 'condición de compra', id: 10, tabla: 'sbn_condiciones_compra' },
  //{ nombre: 'configuracion', id: 11, tabla: 'sbn_configuraciones' },
  //{ nombre: 'correlativo', id: 12, tabla: 'sbn_correlativos' },
  {
    nombre: 'Estado de Conservación',
    id: 11,
    tabla: 'sbn_estados_conservacion',
  },
  { nombre: 'estado de uso', id: 12, tabla: 'sbn_estados_uso' },
  { nombre: 'marca', id: 13, tabla: 'sbn_marcas' },
  { nombre: 'modelo', id: 14, tabla: 'sbn_modelos' },
  { nombre: 'Origen', id: 15, tabla: 'sbn_origenes' },
  {
    nombre: 'plantilla de depreciación',
    id: 16,
    tabla: 'sbn_plantillas_depreciacion',
  },
  {
    nombre: 'proposito de semoviente',
    id: 17,
    tabla: 'sbn_propositos_semoviente',
  },
  { nombre: 'raza', id: 18, tabla: 'sbn_razas' },
  { nombre: 'resposable', id: 19, tabla: 'sbn_responsables' },
  { nombre: 'rotulacion', id: 20, tabla: 'sbn_rotulaciones' },
  { nombre: 'sede', id: 21, tabla: 'sedes' },
  { nombre: 'seguro', id: 22, tabla: 'seguros' },
  { nombre: 'tipo de cobertura', id: 23, tabla: 'sbn_tipos_cobertura' },
  { nombre: 'tipo de componente', id: 24, tabla: 'sbn_tipos_componente' },
  { nombre: 'tipo de estructura', id: 25, tabla: 'sbn_tipos_estructura' },
  { nombre: 'tipo de marca', id: 26, tabla: 'sbn_tipos_marca' },
  { nombre: 'tipo de poliza', id: 27, tabla: 'sbn_tipos_poliza' },
  { nombre: 'tipo de sede', id: 28, tabla: 'sbn_tipos_sede' },
  { nombre: 'tipo de semoviente', id: 29, tabla: 'sbn_tipos_semoviente' },
  {
    nombre: 'unidad administrativa',
    id: 30,
    tabla: 'sbn_unidades_administrativas',
  },
  { nombre: 'uso', id: 31, tabla: 'sbn_usos' },
];
