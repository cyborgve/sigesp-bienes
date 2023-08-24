import { Injectable } from '@angular/core';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generarIncorporacion(incorporacion: Incorporacion) {
    let documentoPDF = new jsPDF('portrait', 'mm', 'letter');

    // Encabezado
    const titulo = incorporacion.comprobante.toString().split('-')[1];
    const creado = incorporacion.creado.toString();
    const modificado = incorporacion.modificado.toString();

    documentoPDF.setFontSize(20);
    documentoPDF.text(`Incorporación: ${titulo}`, 15, 15);
    documentoPDF.setFontSize(12);
    documentoPDF.text(`Creado: ${creado}`, 15, 35);
    documentoPDF.text(`Modificado: ${modificado}`, 15, 45);

    // Contenido
    const contenido = `
    Empresa: ${incorporacion.empresaId}
    Causa de movimiento: ${incorporacion.causaMovimiento}
    Unidad administrativa: ${incorporacion.unidadAdministrativa}
    ... y otros datos ...
  `;

    const splitText = documentoPDF.splitTextToSize(
      contenido,
      documentoPDF.internal.pageSize.width - 35
    );
    documentoPDF.setFontSize(10);
    documentoPDF.text(splitText, 15, 55);

    // Guardar o mostrar el PDF
    documentoPDF.save('reporte_incorporacion.pdf');
  }
}
