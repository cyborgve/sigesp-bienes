import { MenuItem } from '@core/new.models/menu-item';

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
        label: 'Configuracion Bienes',
        routerLink: 'configuracion-bienes',
        icon: 'settings',
        image: './assets/images/svg/settings.svg',
      },
      {
        label: 'Catalogo General',
        routerLink: 'catalogo-general',
        icon: 'format_list_bulleted',
        image: './assets/images/svg/format_list_bulleted.svg',
      },
      {
        label: 'Causa de Movimiento',
        routerLink: 'causa-movimiento',
        icon: 'change_circle',
        image: './assets/images/svg/change_circle.svg',
      },
      {
        label: 'Definiciones Basicas',
        routerLink: 'definiciones-basicas',
        icon: 'checklist',
        image: './assets/images/svg/checklist.svg',
      },
      {
        label: 'Estructura Predominante',
        routerLink: 'estructura-predominante',
        icon: 'house_siding',
        image: './assets/images/svg/house_siding.svg',
      },
      {
        label: 'Marcas y Modelos',
        routerLink: 'marcas-modelos',
        icon: 'model_training',
        image: './assets/images/svg/model_training.svg',
      },
      {
        label: 'Sede',
        routerLink: 'sede',
        icon: 'apartment',
        image: './assets/images/svg/apartment.svg',
      },
      {
        label: 'Origen',
        routerLink: 'origen',
        icon: 'location_on',
        image: './assets/images/svg/location_on.svg',
      },
      {
        label: 'Seguro',
        routerLink: 'seguro',
        icon: 'safety_check',
        image: './assets/images/svg/shield.svg',
      },
      {
        label: 'Unidad Administrativa',
        routerLink: 'unidad-administrativa',
        icon: 'local_library',
        image: './assets/images/svg/local_library.svg',
      },
      {
        label: 'Bien / Activo',
        routerLink: 'bien-activo',
        icon: 'home_work',
        image: './assets/images/svg/home_work.svg',
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
