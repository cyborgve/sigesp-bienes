# Normas para mantener el código

## Objetivo

El presente manual establece las normas y convenciones que deben seguirse al escribir código en el proyecto. El objetivo es garantizar la coherencia, la calidad y la facilidad de mantenimiento del código a lo largo del desarrollo.

## Convenciones Generales

- Utiliza nombres de variables, funciones, clases, componentes y módulos descriptivos y en camelCase.
- Usa dos espacios para la indentación en lugar de tabulaciones.
- Se recomienda utilizar comillas simples para cadenas de texto ('') y comillas dobles para atributos HTML ("").
- Utiliza comentarios claros y concisos para explicar por qué se está realizando una acción, especialmente si no es obvio desde el código.

## Estructura de Archivos y Carpetas

- **src:** Contiene todo el código fuente del proyecto.
  - **app:** Contiene los componentes y módulos principales.
    - **shared:** Código compartido (servicios, directivas, etc.).
      - **components:** Componentes reutilizables.
  - **assets:** Recursos estáticos como imágenes y archivos de estilo.
  - **environments:** Configuraciones para distintos entornos (development, production, etc.).

## Convenciones de Nomenclatura

- **Clases y Componentes:** Nombres en PascalCase, ej. `AppComponent`.
- **Variables y Funciones:** Nombres en camelCase, ej. `usuarioActual`.
- **Archivos:** Nombres en kebab-case, ej. `mi-componente.component.ts`.

## Formato de Código

- Utiliza una línea en blanco para separar lógicamente bloques de código.
- Abre las llaves en la misma línea que la declaración, ej. `function ejemplo() {`.
- Utiliza el punto y coma al final de cada declaración.
- Limita la longitud de las líneas a 80-120 caracteres.

## Documentación de Código

- Documenta las funciones y métodos utilizando JSDoc.
- Proporciona descripciones claras y ejemplos cuando sea necesario.
- Incluye una breve descripción del propósito del archivo en la parte superior.

```typescript
/**
 * Este servicio maneja la autenticación de usuarios.
 * @example
 * authService.login(usuario, contraseña);
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ...
}
```
