export const COLUMNAS_VISIBLES = {
  COMPONENTES: [
    'codigo',
    'denominacion',
    'tipoComponenteId',
    'creado',
    'modificado',
    'acciones',
  ],
  ASEGURADORAS: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  CATEGORIAS: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  CATALOGO_GENERAL: [
    'catalogoCuentas',
    'denominacion',
    'estadoMovimiento',
    'creado',
    'modificado',
    'acciones',
  ],
  CATEGORIAS_UNIDAD_ADMINISTRATIVA: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  CAUSAS_MOVIMIENTO: [
    'codigo',
    'denominacion',
    'tipo',
    'creado',
    'modificado',
    'acciones',
  ],
  CLASES: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  COLORES: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  COMPONENTES_ESTRUCTURA: [
    'codigo',
    'denominacion',
    'tipo',
    'creado',
    'modificado',
    'acciones',
  ],
  CONDICIONES_COMPRA: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  CONSERVACION: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  CORRELATIVOS: [
    'id',
    'denominacion',
    'serie',
    'correlativo',
    'creado',
    'modificado',
    'acciones',
  ],
  CUENTAS_CONTABLES: ['codigo', 'denominacion', 'creado', 'modificado'],
  CUENTAS_CONTABLES_PROCESO: [
    'cuentaProceso',
    'denominacion',
    'debe',
    'haber',
    'monto',
  ],
  ESTADOS_CONSERVACION: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  ESTADOS_USO: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  MARCAS: [
    'codigo',
    'denominacion',
    'tipo',
    'creado',
    'modificado',
    'acciones',
  ],
  MODELOS: [
    'codigo',
    'denominacion',
    'marcaId',
    'creado',
    'modificado',
    'acciones',
  ],
  ORIGENES: [
    'codigo',
    'denominacion',
    'modoAdquisicion',
    'creado',
    'modificado',
    'acciones',
  ],
  PLANTILLAS_DEPRECIACION: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  PROPOSITOS_SEMOVIENTE: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  RAZAS: [
    'codigo',
    'denominacion',
    'tipoAnimalId',
    'creado',
    'modificado',
    'acciones',
  ],
  RESPONSABLES: ['codigo', 'nombre', 'apellido', 'creado', 'modificado'],
  ROTULACIONES: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  SEDES: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  SEGUROS: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  TIPOS_ANIMAL: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  TIPOS_COBERTURA: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  TIPOS_COMPONENTE: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  TIPOS_ESTRUCTURA: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  TIPOS_MARCA: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  TIPOS_POLIZA: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  TIPOS_SEDE: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  TIPOS_SEMOVIENTE: [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ],
  TIPOS_USO: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  UNIDADES_ADMINISTRATIVAS: [
    'codigo',
    'denominacion',
    'categoria',
    'creado',
    'modificado',
    'acciones',
  ],
  USOS: ['codigo', 'denominacion', 'creado', 'modificado', 'acciones'],
  ACTIVOS: [
    'codigo',
    'denominacion',
    'tipoActivo',
    'creado',
    'modificado',
    'acciones',
  ],
  MONEDAS: ['codigo', 'denominacion', 'creado', 'modificado'],
  PAISES: ['codigo', 'denominacion', 'creado', 'modificado'],
  ESTADOS: [
    'codigo',
    'denominacion',
    'capital',
    'paisId',
    'creado',
    'modificado',
  ],
  MUNICIPIOS: ['codigo', 'denominacion', 'estadoId', 'creado', 'modificado'],
  CIUDADES: ['codigo', 'denominacion', 'estadoId', 'creado', 'modificado'],
  FUENTES_FINANCIEMIENTO: ['codigo', 'denominacion', 'creado', 'modificado'],
  CENTROS_COSTO: ['codigo', 'denominacion', 'creado', 'modificado'],
  PROVEEDORES: ['rif', 'denominacion', 'creado', 'modificado'],
  BENEFICIARIOS: ['cedula', 'nombre', 'creado', 'modificado'],
  PARROQUIAS: ['codigo', 'denominacion', 'municipioId', 'creado', 'modificado'],

  /** PROCESOS */
  ACTAS_PRESTAMO: [
    'comprobante',
    'unidadAdministrativaCedente',
    'unidadAdministrativaReceptora',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  AUTORIZACIONES_SALIDA: [
    'comprobante',
    'unidadAdministrativa',
    'empresaAutorizada',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  CAMBIOS_RESPONSABLE: [
    'comprobante',
    'activo',
    'nuevoResponsable',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  DEPRECIACIONES: [
    'comprobante',
    'activo',
    'identificador',
    'metodoDepreciacion',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  DEPRECIACIONES_DETALLE: [
    'fecha',
    'meses',
    'dias',
    'depreciacionMensual',
    'depreciacionAnual',
    'depreciacionAcumulada',
    'valorContable',
  ],
  DESINCORPORACIONES: [
    'comprobante',
    'causaMovimiento',
    'unidadAdministrativa',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  ENTREGA_UNIDAD: [
    'comprobante',
    'unidadAdministrativa',
    'sede',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  INCORPORACIONES: [
    'comprobante',
    'causaMovimiento',
    'unidadAdministrativa',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  MODIFICACIONES: [
    'comprobante',
    'activo',
    'causaMovimiento',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  REASIGNACIONES: [
    'comprobante',
    'sede',
    'causaMovimiento',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  RETORNOS: [
    'comprobante',
    'beneficiario',
    'creado',
    'modificado',
    'acciones-proceso',
  ],
  LISTA_DEPRECIACIONES_ANUALES_MENSUALES: [
    'fechaDepreciacion',
    'codigo',
    'denominacion',
    'identificador',
    'metodoDepreciacion',
    'valorInicial',
    'valorRescate',
    'montoDepreciar',
    'depreciacionMensual',
    'depreciacionAnual',
    //'depreciacionAcumulada',
    'valorContable',
  ],
};
