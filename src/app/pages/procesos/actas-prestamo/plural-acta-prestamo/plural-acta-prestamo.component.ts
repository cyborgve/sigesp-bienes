import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-acta-prestamo',
  templateUrl: './plural-acta-prestamo.component.html',
  styleUrls: ['./plural-acta-prestamo.component.scss'],
})
export class PluralActaPrestamoComponent {
  constructor(private _router: Router, private _location: Location) {}
  titulo = 'Actas de Préstamo';

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
