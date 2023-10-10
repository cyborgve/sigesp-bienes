import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-propiedades-activo',
  templateUrl: './propiedades-activo.component.html',
  styleUrls: ['./propiedades-activo.component.scss'],
})
export class PropiedadesActivoComponent implements OnInit {
  propiedadesDisponibles: string[] = []; // Almacena las propiedades disponibles
  propiedadesSeleccionadas: string[] = []; // Almacena las propiedades seleccionadas

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _activo: ActivoService
  ) {}

  ngOnInit() {
    // Inicializar propiedades disponibles con las propiedades del activo
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
          this.propiedadesDisponibles = Object.keys(activoAPI);
          Object.keys(activoAPI.detalle)
            .filter(palabra => !palabrasIgnoradas.includes(palabra))
            .forEach(propiedad => this.propiedadesDisponibles.push(propiedad));
          Object.keys(activoAPI.depreciacion)
            .filter(palabra => !palabrasIgnoradas.includes(palabra))
            .forEach(propiedad => this.propiedadesDisponibles.push(propiedad));
          Object.keys(activoAPI.ubicacion)
            .filter(palabra => !palabrasIgnoradas.includes(palabra))
            .forEach(propiedad => this.propiedadesDisponibles.push(propiedad));
        }),
        take(1)
      )
      .subscribe();
  }

  agregarPropiedad(propiedad: string): void {
    if (!this.propiedadesSeleccionadas.includes(propiedad)) {
      this.propiedadesSeleccionadas.push(propiedad);
    }
  }

  removerPropiedad(propiedad: string): void {
    const index = this.propiedadesSeleccionadas.indexOf(propiedad);
    if (index !== -1) {
      this.propiedadesSeleccionadas.splice(index, 1);
    }
  }

  alSoltarPropiedad(evento: CdkDragDrop<string[]>): void {
    if (evento.previousContainer === evento.container) {
      // Mover dentro de la misma lista
      moveItemInArray(
        this.propiedadesSeleccionadas,
        evento.previousIndex,
        evento.currentIndex
      );
    } else {
      // Mover entre listas
      const propiedad = evento.item.data;
      if (!this.propiedadesSeleccionadas.includes(propiedad)) {
        this.propiedadesSeleccionadas.push(propiedad);
      }
    }
  }

  exportarPropiedades(): void {
    if (this.propiedadesSeleccionadas.length === 0) {
      this._snackBar.open(
        'No hay propiedades seleccionadas para exportar',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    } else {
      // Implementa la lógica de exportación aquí
      this._snackBar.open('Propiedades exportadas con éxito', 'Cerrar', {
        duration: 3000,
      });
    }
  }
}

// // import { Activo } from '@core/models/definiciones/activo';
// // import { Component, OnInit } from '@angular/core';
// // import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// // import { MatDialog } from '@angular/material/dialog';
// // import { MatSnackBar } from '@angular/material/snack-bar';
// // import { ActivoService } from '@core/services/definiciones/activo.service';
// // import { take, tap } from 'rxjs/operators';

// // @Component({
// //   selector: 'app-propiedades-activo',
// //   templateUrl: './propiedades-activo.component.html',
// //   styleUrls: ['./propiedades-activo.component.scss'],
// // })
// // export class PropiedadesActivoComponent implements OnInit {
// //   propiedadesDisponibles: string[] = []; // Almacena las propiedades disponibles
// //   propiedadesSeleccionadas: string[] = []; // Almacena las propiedades seleccionadas

// //   constructor(
// //     private _dialog: MatDialog,
// //     private _snackBar: MatSnackBar,
// //     private _activo: ActivoService
// //   ) {}

// //   ngOnInit() {
// //     // Inicializar propiedades disponibles con las propiedades del activo
// //     this._activo
// //       .buscarPorId(0)
// //       .pipe(
// //         tap(
// //           activoAPI => (this.propiedadesDisponibles = Object.keys(activoAPI))
// //         ),
// //         take(1)
// //       )
// //       .subscribe();
// //   }

// //   // Función para agregar una propiedad a las seleccionadas con doble clic
// //   agregarPropiedad(propiedad: string): void {
// //     if (!this.propiedadesSeleccionadas.includes(propiedad)) {
// //       this.propiedadesSeleccionadas.push(propiedad);
// //     }
// //   }

// //   // Función para remover una propiedad de las seleccionadas con doble clic
// //   removerPropiedad(propiedad: string): void {
// //     const index = this.propiedadesSeleccionadas.indexOf(propiedad);
// //     if (index !== -1) {
// //       this.propiedadesSeleccionadas.splice(index, 1);
// //     }
// //   }

// //   // Función para manejar el evento de soltar propiedad
// //   alSoltarPropiedad(evento: CdkDragDrop<string[]>): void {
// //     if (evento.previousContainer === evento.container) {
// //       // Mover dentro de la misma lista
// //       moveItemInArray(
// //         this.propiedadesSeleccionadas,
// //         evento.previousIndex,
// //         evento.currentIndex
// //       );
// //     } else {
// //       // Mover entre listas
// //       const propiedad = evento.item.data;
// //       if (!this.propiedadesSeleccionadas.includes(propiedad)) {
// //         this.propiedadesSeleccionadas.push(propiedad);
// //       }
// //     }
// //   }

// //   // Función para exportar las propiedades seleccionadas (puedes implementar la lógica de exportación aquí)
// //   exportarPropiedades(): void {
// //     // Implementa la lógica de exportación aquí
// //     if (this.propiedadesSeleccionadas.length === 0) {
// //       this._snackBar.open(
// //         'No hay propiedades seleccionadas para exportar',
// //         'Cerrar',
// //         {
// //           duration: 3000,
// //         }
// //       );
// //     } else {
// //       // Puedes usar un servicio o lógica para exportar las propiedades seleccionadas
// //       // Ejemplo: this.miServicio.exportarPropiedades(this.propiedadesSeleccionadas);
// //       this._snackBar.open('Propiedades exportadas con éxito', 'Cerrar', {
// //         duration: 3000,
// //       });
// //     }
// //   }
// // }
