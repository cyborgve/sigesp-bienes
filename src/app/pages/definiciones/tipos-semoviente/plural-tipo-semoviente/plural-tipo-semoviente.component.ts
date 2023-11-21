import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-semoviente',
  templateUrl: './plural-tipo-semoviente.component.html',
  styleUrls: ['./plural-tipo-semoviente.component.scss'],
})
export class PluralTipoSemovienteComponent {
  titulo = 'tipos de semoviente';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
