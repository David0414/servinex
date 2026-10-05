# Servinex

Sitio corporativo en React y Vite para destape de drenajes, fumigación, jardinería y plomería en todo Querétaro. Servinex recibe las solicitudes y el pago del cliente, contrata proveedores y coordina las citas. Los textos explican ese proceso sin presentar a los proveedores como empleados de Servinex.

Incluye movimiento de profundidad al pasar el cursor, animaciones de entrada, diseño adaptable, preguntas frecuentes y formulario para preparar solicitudes por WhatsApp. El formulario no procesa pagos ni confirma citas. Respeta la preferencia de movimiento reducido.

Incluye enlaces para llamar al 442 121 3600 (`tel:+524421213600`), contacto directo por WhatsApp y un botón fijo de WhatsApp en la esquina inferior derecha. El teléfono del negocio se usa como valor predeterminado cuando no hay una variable configurada. El cliente confirma el envío de los mensajes en WhatsApp.

## Desarrollo

```sh
npm install
npm run dev
```

## Configuración

Copia `.env.example` a `.env.local`. Configura `VITE_WHATSAPP_NUMBER` con el número real, código de país y solo dígitos. Configura `VITE_SERVICE_AREA` con la cobertura real. Reinicia el servidor tras cambiar variables. Sin número, el formulario solo prepara y copia el mensaje; no envía ni guarda solicitudes.

## Vercel

Importa este proyecto en Vercel, selecciona Vite, comando `npm run build` y directorio `dist`. Configura las dos variables de entorno antes de publicar. `vercel.json` incluye la resolución de rutas.

## Netlify con GitHub

Importa el repositorio en Netlify y selecciona la rama `main`. El archivo `netlify.toml` en la raíz configura la compilación con `npm run build` y la publicación de la carpeta `dist`. Esta carpeta se genera durante la compilación; no se sube a GitHub.

Configura `VITE_WHATSAPP_NUMBER=524421213600` y `VITE_SERVICE_AREA=Todo Querétaro` en las variables de entorno de Netlify antes de publicar. Si cambias las variables después, vuelve a desplegar.

Si aparece un 404 en la página de inicio, revisa el último despliegue de producción: debe compilar este repositorio y contener `index.html` directamente en la raíz de los archivos publicados. La carpeta que debe publicar Netlify es `dist`, generada por la compilación. Una configuración incorrecta de carpeta puede producir ese 404 aunque los archivos originales estén en GitHub. Tras subir `netlify.toml` al repositorio, inicia un nuevo despliegue.

## Backend

Esta versión no necesita backend ni base de datos: el visitante envía su mensaje en WhatsApp. Si se requiere guardar solicitudes, gestionar clientes o tener un panel administrativo, se puede incorporar un backend en Railway con Prisma y PostgreSQL. No se implementó persistencia ficticia.

## Imágenes y marca

Las imágenes ilustrativas de los cuatro servicios se generaron con la herramienta integrada de generación de imágenes y se guardan en `public/images/`. No son fotografías de trabajos, empleados o proveedores reales de Servinex. Los prompts se documentan en `docs/imagenes.md`. Las fuentes se sirven desde Google Fonts. El encabezado y el pie de página utilizan el logotipo original proporcionado por el usuario en `public/images/logo-servinex.png`; CSS encuadra la marca para ocultar el margen blanco amplio de la imagen. El icono de la pestaña es `public/favicon-servinex.svg`, con el símbolo del logo original expresado como trazos SVG y su nombre de archivo propio para evitar reutilizar el icono anterior de la caché. Se puede regenerar con `scripts/create-favicon.ps1`. No se han inventado testimonios, cifras ni dirección.
