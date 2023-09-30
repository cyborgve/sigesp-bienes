export const prepararNombreArchivo = (nombre: string) => {
  const caracteresConAcento = 'áéíóúÁÉÍÓÚüÜñÑ';
  const caracteresSinAcento = 'aeiouAEIOUuUnN';
  let nombreSinEspacios = nombre.replace(/\s+/g, '-').toLowerCase();
  let nombreSinAcentos = nombreSinEspacios
    .split('')
    .map(caracter => {
      let indiceAcento = caracteresConAcento.indexOf(caracter);
      return indiceAcento !== -1 ? caracteresSinAcento[indiceAcento] : caracter;
    })
    .join('');
  return nombreSinAcentos;
};
