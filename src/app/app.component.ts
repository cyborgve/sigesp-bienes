import { Component } from '@angular/core';
import { ISideNav } from '@core/interfaces/sidenav';
import { SigespService, MUsuario } from 'sigesp';
import { Router } from '@angular/router';
import packageJson from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  version = ' v' + packageJson.version;
  public rutas: ISideNav[];
  public usuario: MUsuario;

  constructor(private sigesp: SigespService, private router: Router) {
    this.buildMenu();
    this.sigesp.init();
    this.usuario = this.sigesp.usuarioActivo;
  }

  private buildMenu() {
    this.rutas = [
      {
        name: 'Inicio',
        icon: 'home',
        url: '/home',
        children: [],
      },
      {
        url: '/definiciones',
        icon: 'library_books',
        name: 'Definiciones',
        children: [
          {
            url: 'definiciones/configuracion-bienes',
            icon: 'settings_applications',
            name: 'Configuración',
            children: [],
          },
          {
            url: 'definiciones/catalogo-general',
            icon: 'settings_applications',
            name: 'Catalogo General',
            children: [],
          },

          {
            url: 'definiciones/causa-movimiento',
            icon: 'settings_applications',
            name: 'Causa de Movimiento',
            children: [],
          },
          {
            url: 'definiciones/definiciones-basicas',
            icon: 'settings_applications',
            name: 'Definiciones Básicas',
            children: [],
          },

          {
            url: 'definiciones/estructura-predominante',
            icon: 'settings_applications',
            name: 'Estructura Predominante de los Inmuebles',
            children: [],
          },

          {
            url: 'definiciones/marcas-modelos',
            icon: 'settings_applications',
            name: 'Marcas y Modelos',
            children: [],
          },

          {
            url: 'definiciones/sede',
            icon: 'settings_applications',
            name: 'Sede',
            children: [],
          },
          {
            url: 'definiciones/origen',
            icon: 'settings_applications',
            name: 'Origen',
            children: [],
          },

          {
            url: 'definiciones/seguros',
            icon: 'settings_applications',
            name: 'Seguros',
            children: [],
          },

          {
            url: 'definiciones/unidad-administrativa',
            icon: 'settings_applications',
            name: 'Unidad Administrativa',
            children: [],
          },
          {
            url: 'definiciones/activo',
            icon: 'settings_applications',
            name: 'Bienes Nacionales/ Activos',
            children: [],
          },
        ],
      },
      {
        url: '/procesos',
        icon: 'book',
        name: 'Procesos',
        children: [
          {
            url: '#',
            icon: 'ballot',
            name: 'Proceso 1',
            children: [],
          },
          {
            url: '#',
            icon: 'find_in_page',
            name: 'Proceso 2',
            children: [],
          },
        ],
      },
    ];
  }

  public close(): void {
    this.sigesp
      .openDialogConfirm('¿Está seguro que quiere cerrrar este módulo?')
      .then(resp => {
        if (resp) {
          this.router.navigate(['auth', 'close']);
        }
      });
  }
}
