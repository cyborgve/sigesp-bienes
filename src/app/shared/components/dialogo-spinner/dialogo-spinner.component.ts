import { Component } from '@angular/core';
import { MensajeDialogoSpinnerService } from '@core/services/auxiliares/mensaje-dialogo-spinner.service';

@Component({
  selector: 'app-dialogo-spinner',
  templateUrl: './dialogo-spinner.component.html',
  styleUrls: ['./dialogo-spinner.component.scss'],
})
export class DialogoSpinnerComponent {
  mensaje = this._mensajeDialogoSpinner.obtener();

  constructor(private _mensajeDialogoSpinner: MensajeDialogoSpinnerService) {}
}
