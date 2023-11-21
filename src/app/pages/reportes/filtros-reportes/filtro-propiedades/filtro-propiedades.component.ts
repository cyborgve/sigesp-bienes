import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { convertirCamelCaseATitulo } from '@core/utils/funciones/convertir-camel-case-a-titulo';
import { take, tap } from 'rxjs/operators';

type Chip = { indice: number; nombre: string; valor: string; color: string };

@Component({
  selector: 'app-filtro-propiedades',
  templateUrl: './filtro-propiedades.component.html',
  styleUrls: ['./filtro-propiedades.component.scss'],
})
export class FiltroPropiedadesComponent implements OnInit {
  @Input() sinDecorar: boolean = false;
  private propiedadTodos: Chip = {
    indice: -1,
    nombre: 'Todos',
    valor: 'TODOS',
    color: 'none',
  };
  propiedadesDisponibles: Chip[] = [];
  propiedadesSeleccionadas: Chip[] = [this.propiedadTodos];
  constructor(private _activo: ActivoService) {}

  ngOnInit() {
    const palabrasIgnoradasActivoAPI = [
      'detalle',
      'componentes',
      'depreciacion',
      'ubicacion',
    ];
    const palabrasIgnoradas = [
      'empresaId',
      'id',
      'creado',
      'modificado',
      'activoId',
    ];
    this._activo
      .buscarPorId(0)
      .pipe(
        tap(activoAPI => {
          let indice = 0;
          Object.keys(activoAPI)
            .filter(palabra => !palabrasIgnoradasActivoAPI.includes(palabra))
            .forEach(propiedad =>
              this.propiedadesDisponibles.push({
                indice: indice++,
                nombre: `${convertirCamelCaseATitulo(propiedad)}`,
                valor: propiedad,
                color: 'none',
              })
            );
          Object.keys(activoAPI.detalle)
            .filter(palabra => !palabrasIgnoradas.includes(palabra))
            .forEach(propiedad =>
              this.propiedadesDisponibles.push({
                indice: indice++,
                nombre: `${convertirCamelCaseATitulo(propiedad)}`,
                valor: propiedad,
                color: 'primary',
              })
            );
          Object.keys(activoAPI.depreciacion)
            .filter(palabra => !palabrasIgnoradas.includes(palabra))
            .forEach(propiedad =>
              this.propiedadesDisponibles.push({
                indice: indice++,
                nombre: `${convertirCamelCaseATitulo(propiedad)}`,
                valor: propiedad,
                color: 'accent',
              })
            );
          Object.keys(activoAPI.ubicacion)
            .filter(palabra => !palabrasIgnoradas.includes(palabra))
            .forEach(propiedad =>
              this.propiedadesDisponibles.push({
                indice: indice++,
                nombre: `${convertirCamelCaseATitulo(propiedad)}`,
                valor: propiedad,
                color: 'warn',
              })
            );
        }),
        take(1)
      )
      .subscribe();
  }

  soltar(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.propiedadesDisponibles = this.propiedadesDisponibles
        .filter(prop => prop.indice !== -1)
        .sort((a, b) => (a.indice < b.indice ? -1 : 1));
      this.propiedadesSeleccionadas = this.propiedadesSeleccionadas.sort(
        (a, b) => (a.indice < b.indice ? -1 : 1)
      );
      this.propiedadesSeleccionadas =
        this.propiedadesSeleccionadas.length > 1
          ? this.propiedadesSeleccionadas.filter(prop => prop.indice !== -1)
          : [this.propiedadTodos];
    }
  }
}
