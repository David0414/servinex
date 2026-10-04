# Servinex

Sitio corporativo en React y Vite para destape de drenajes, fumigación, jardinería y plomería en todo Querétaro. Servinex recibe las solicitudes y el pago del cliente, contrata proveedores y coordina las citas. Los textos explican ese proceso sin presentar a los proveedores como empleados de Servinex.

Incluye movimiento de profundidad al pasar el cursor, animaciones de entrada, diseño adaptable, preguntas frecuentes y formulario para preparar solicitudes por WhatsApp. El formulario no procesa pagos ni confirma citas. Respeta la preferencia de movimiento reducido.

## Desarrollo

```sh
npm install
npm run dev
```

## Configuración

Copia `.env.example` a `.env.local`. Configura `VITE_WHATSAPP_NUMBER` con el número real, código de país y solo dígitos. Configura `VITE_SERVICE_AREA` con la cobertura real. Reinicia el servidor tras cambiar variables. Sin número, el formulario solo prepara y copia el mensaje; no envía ni guarda solicitudes.

## Vercel

Importa este proyecto en Vercel, selecciona Vite, comando `npm run build` y directorio `dist`. Configura las dos variables de entorno antes de publicar. `vercel.json` incluye la resolución de rutas.

## Backend

Esta versión no necesita backend ni base de datos: el visitante envía su mensaje en WhatsApp. Si se requiere guardar solicitudes, gestionar clientes o tener un panel administrativo, se puede incorporar un backend en Railway con Prisma y PostgreSQL. No se implementó persistencia ficticia.

## Imágenes y marca

Las imágenes ilustrativas de los cuatro servicios se generaron con la herramienta integrada de generación de imágenes y se guardan en `public/images/`. No son fotografías de trabajos, empleados o proveedores reales de Servinex. Los prompts se documentan en `docs/imagenes.md`. Las fuentes se sirven desde Google Fonts. El logotipo SVG es una aproximación de la referencia; sustituye la marca por el archivo original en SVG o PNG cuando esté disponible. No se han inventado testimonios, cifras ni dirección.
