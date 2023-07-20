import { MenuItem } from '@core/models/auxiliares/menu-item';

export const MENU: MenuItem[] = [
  {
    label: 'Inicio',
    routerLink: '/',
    icon: 'home',
    image: './assets/images/svg/home.svg',
  },
  {
    label: 'Definiciones',
    routerLink: 'definiciones',
    icon: 'description',
    image: './assets/images/svg/description.svg',
    items: [
      {
        label: 'Activos - Bienes',
        routerLink: 'activos',
        icon: 'home_work',
        image: './assets/images/svg/home_work.svg',
      },
      {
        label: 'Aseguradoras',
        routerLink: 'aseguradoras',
        icon: 'assured_workload',
        image: './assets/images/svg/assured_workload.svg',
      },
      {
        label: 'Categorías',
        routerLink: 'categorias',
        icon: 'category',
        image: './assets/images/svg/category.svg',
      },
      {
        label: 'Categorías de Unidad Adm.',
        routerLink: 'categorias-unidad-administrativa',
        icon: 'folder_copy',
        image: './assets/images/svg/folder_copy.svg',
      },
      {
        label: 'Causas de Movimiento',
        routerLink: 'causas-movimiento',
        icon: 'change_circle',
        image: './assets/images/svg/change_circle.svg',
      },
      {
        label: 'Clases',
        routerLink: 'clases',
        icon: 'flight_class',
        image: './assets/images/svg/flight_class.svg',
      },
      {
        label: 'Colores',
        routerLink: 'colores',
        icon: 'palette',
        image: './assets/images/svg/palette.svg',
      },
      {
        label: 'Activos - Componente',
        routerLink: 'activos-componentes',
        icon: 'crop_square',
        image: './assets/images/svg/crop_square.svg',
      },
      {
        label: 'Configuraciones',
        routerLink: 'configuraciones/1',
        icon: 'settings',
        image: './assets/images/svg/settings.svg',
      },
      {
        label: 'Correlativos',
        routerLink: 'correlativos',
        icon: 'pin',
        image: './assets/images/svg/pin.svg',
      },
      {
        label: 'Estados de Conservación',
        routerLink: 'estados-conservacion',
        icon: 'hardware',
        image: './assets/images/svg/hardware.svg',
      },
      {
        label: 'Estados de Uso',
        routerLink: 'estados-uso',
        icon: 'body_fat',
        image: './assets/images/svg/body_fat.svg',
      },
      {
        label: 'Marcas',
        routerLink: 'marcas',
        icon: 'format_list_bulleted',
        image: './assets/images/svg/format_list_bulleted.svg',
      },
      {
        label: 'Modelos',
        routerLink: 'modelos',
        icon: 'checklist',
        image: './assets/images/svg/checklist.svg',
      },
      {
        label: 'Orígenes',
        routerLink: 'origenes',
        icon: 'trip_origin',
        image: './assets/images/svg/trip_origin.svg',
      },
      {
        label: 'Plantillas de depreciacion',
        routerLink: 'plantillas-depreciacion',
        icon: 'web',
        image: './assets/images/svg/web.svg',
      },
      {
        label: 'Propósitos de Semoviente',
        routerLink: 'propositos-semoviente',
        icon: 'model_training',
        image: './assets/images/svg/model_training.svg',
      },
      {
        label: 'Razas',
        routerLink: 'razas',
        icon: 'sound_detection_dog_barking',
        image: './assets/images/svg/sound_detection_dog_barking.svg',
      },
      {
        label: 'Rotulaciones',
        routerLink: 'rotulaciones',
        icon: 'auto_label',
        image: './assets/images/svg/auto_label.svg',
      },
      {
        label: 'Sedes',
        routerLink: 'sedes',
        icon: 'apartment',
        image: './assets/images/svg/apartment.svg',
      },
      {
        label: 'Seguros',
        routerLink: 'seguros',
        icon: 'safety_check',
        image: './assets/images/svg/shield.svg',
      },
      {
        label: 'Tipos de Animal',
        routerLink: 'tipos-animal',
        icon: 'pets',
        image: './assets/images/svg/pets.svg',
      },
      {
        label: 'Tipos de Cobertura',
        routerLink: 'tipos-cobertura',
        icon: 'local_library',
        image: './assets/images/svg/local_library.svg',
      },
      {
        label: 'Tipos de Componente',
        routerLink: 'tipos-componente',
        icon: 'extension',
        image: './assets/images/svg/extension.svg',
      },
      {
        label: 'Tipos de Marca',
        routerLink: 'tipos-marca',
        icon: 'format_list_numbered',
        image: './assets/images/svg/format_list_numbered.svg',
      },
      {
        label: 'Tipos de Póliza',
        routerLink: 'tipos-poliza',
        icon: 'security',
        image: './assets/images/svg/security.svg',
      },
      {
        label: 'Tipos de Sede',
        routerLink: 'tipos-sede',
        icon: 'domain',
        image: './assets/images/svg/domain.svg',
      },
      {
        label: 'Tipos de Semoviente',
        routerLink: 'tipos-semoviente',
        icon: 'pet_supplies',
        image: './assets/images/svg/pet_supplies.svg',
      },
      {
        label: 'Tipos de Uso',
        routerLink: 'tipos-uso',
        icon: 'precision_manufacturing',
        image: './assets/images/svg/precision_manufacturing.svg',
      },
      {
        label: 'Unidades Administrativas',
        routerLink: 'unidades-administrativas',
        icon: 'ac_unit',
        image: './assets/images/svg/ac_unit.svg',
      },
    ],
  },
  {
    label: 'Procesos',
    routerLink: 'procesos',
    icon: 'developer_board',
    image: './assets/images/svg/developer_board.svg',
    items: [
      {
        label: 'Incorporaciones',
        routerLink: 'incorporaciones/incorporarion',
        icon: 'contract',
        image: './assets/images/svg/contract.svg',
      },
      {
        label: 'Desincorporaciones',
        routerLink: 'desincorporaciones/desincorporacion',
        icon: 'contract_delete',
        image: './assets/images/svg/contract_delete.svg',
      },
      {
        label: 'Reasignaciones',
        routerLink: 'reasignaciones/reasignacion',
        icon: 'assignment',
        image: './assets/images/svg/assignment.svg',
      },
      {
        label: 'Modificaciones',
        routerLink: 'modificaciones/modificacion',
        icon: 'contract_edit',
        image: './assets/images/svg/contract_edit.svg',
      },
      {
        label: 'Cambios de responsable',
        routerLink: 'cambios-responsable/cambio-responsable',
        icon: 'assignment_ind',
        image: './assets/images/svg/assignment_ind.svg',
      },
      {
        label: 'Entregas de unidad',
        routerLink: 'entregas-unidad/entrega-unidad',
        icon: 'forum',
        image: './assets/images/svg/forum.svg',
      },
      {
        label: 'Actas de préstamo',
        routerLink: 'actas-prestamo/acta-prestamo',
        icon: 'signature',
        image: './assets/images/svg/signature.svg',
      },
      {
        label: 'Autorizaciones de salida',
        routerLink: 'autorizaciones-salida/autorizacion-salida',
        icon: 'real_estate_agent',
        image: './assets/images/svg/real_estate_agent.svg',
      },
      {
        label: 'Retornos',
        routerLink: 'retornos/rotulacion',
        icon: 'assignment_returned',
        image: './assets/images/svg/assignment_returned.svg',
      },
      {
        label: 'Depreciaciones',
        routerLink: 'depreciaciones/depreciacion',
        icon: 'network_intelligence_update',
        image: './assets/images/svg/network_intelligence_update.svg',
      },
    ],
  },
  {
    label: 'Reportes',
    routerLink: 'reportes',
    icon: 'print',
    image: './assets/images/svg/print.svg',
    items: [
      {
        label: 'Listado de activos',
        routerLink: 'listado-activos',
        icon: 'tv_options_edit_channels',
        image: './assets/images/svg/tv_options_edit_channels.svg',
      },
      {
        label: 'Actas',
        routerLink: 'actas',
        icon: 'import_contacts',
        image: './assets/images/svg/import_contacts.svg',
      },
      {
        label: 'Depreciación',
        routerLink: 'depreciacion',
        icon: 'stat_minus_2',
        image: './assets/images/svg/stat_minus_2.svg',
      },
      {
        label: 'Depreciación mensual',
        routerLink: 'depreciacion-mensual',
        icon: 'stat_minus_3',
        image: './assets/images/svg/stat_minus_3.svg',
      },
      {
        label: 'Inventario de Activos - Bienes',
        routerLink: 'inventario-activos',
        icon: 'inventory',
        image: './assets/images/svg/inventory.svg',
      },
    ],
  },
  // {
  //   label: 'Ayuda',
  //   routerLink: 'ayuda',
  //   icon: 'help',
  //   image: './assets/images/svg/help.svg',
  // },
];
