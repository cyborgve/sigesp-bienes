import { MenuItem } from '@core/models/menu-item';

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
        label: 'Bien / Activo',
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
        label: 'Componentes de Activo',
        routerLink: 'componentes-activo',
        icon: 'crop_square',
        image: './assets/images/svg/crop_square.svg',
      },
      {
        label: 'Componentes de Estructura',
        routerLink: 'componentes-estructura',
        icon: 'house_siding',
        image: './assets/images/svg/house_siding.svg',
      },
      {
        label: 'Condiciones de Compra',
        routerLink: 'condiciones-compra',
        icon: 'shopping_bag',
        image: './assets/images/svg/shopping_bag.svg',
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
        label: 'Responsables',
        routerLink: 'responsables',
        icon: 'assignment_ind',
        image: './assets/images/svg/assignment_ind.svg',
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
        label: 'Tipos de Estructura',
        routerLink: 'tipos-estructura',
        icon: 'foundation',
        image: './assets/images/svg/foundation.svg',
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
        icon: 'pets',
        image: './assets/images/svg/pets.svg',
      },
      {
        label: 'Unidades Administrativas',
        routerLink: 'unidades-administrativas',
        icon: 'ac_unit',
        image: './assets/images/svg/ac_unit.svg',
      },
      {
        label: 'Usos',
        routerLink: 'usos',
        icon: 'precision_manufacturing',
        image: './assets/images/svg/precision_manufacturing.svg',
      },
    ],
  },
  {
    label: 'Procesos',
    routerLink: 'procesos',
    icon: 'developer_board',
    image: './assets/images/svg/developer_board.svg',
  },
  {
    label: 'Reportes',
    routerLink: 'reportes',
    icon: 'print',
    image: './assets/images/svg/print.svg',
  },
  {
    label: 'Ayuda',
    routerLink: 'ayuda',
    icon: 'help',
    image: './assets/images/svg/help.svg',
  },
];
