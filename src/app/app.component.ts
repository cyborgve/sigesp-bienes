import { Component, AfterViewInit } from '@angular/core';
import { SigespService, MUsuario } from 'sigesp';
import { Router } from '@angular/router';
import packageJson from '../../package.json';
import { MENU } from '@core/constants/menu';
import { MenuItem } from '@core/models/auxiliares/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  version = ' v' + packageJson.version;
  items: MenuItem[] = MENU;
  public usuario: MUsuario;

  constructor(private sigesp: SigespService, private router: Router) {
    this.usuario = this.sigesp.usuarioActivo;
  }

  ngAfterViewInit(): void {
    this.sigesp.init();
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
