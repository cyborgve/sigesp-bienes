import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginadorPersonalizadoIntl extends MatPaginatorIntl {
  constructor() {
    super();

    // Cambiar las etiquetas de paginación al español
    this.itemsPerPageLabel = 'Ítems por página:';
    this.firstPageLabel = 'Página Inicial';
    this.nextPageLabel = 'Siguiente página';
    this.previousPageLabel = 'Página Anterior';
    this.lastPageLabel = 'Página Final';
  }

  // Personaliza la etiqueta del rango de elementos mostrados
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
