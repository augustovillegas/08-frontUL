# Democratik - Herramienta de gestion politica

<div align="center">
  <p style="color:#828282;">
    Frontend web para la gestion de afiliaciones, consultas y panel administrativo.
  </p>
  <p>
    <span style="color:#27AE60;font-weight:600;">React</span> |
    <span style="color:#172554;font-weight:600;">Vite</span> |
    <span style="color:#9932CC;font-weight:600;">Tailwind</span>
  </p>
</div>

---

## Resumen

Proyecto de frontend enfocado en la experiencia de afiliacion y administracion, con formularios, carga de archivos, panel de mensajes y metricas. La aplicacion consume una API externa y contempla escenarios de "cold start" del servidor mediante un loader informativo para el usuario.

---

## Caracteristicas clave

- Formulario de afiliacion con validaciones, firma y carga de DNI.
- Formulario de contacto para consultas.
- Panel administrativo con metricas, listado de afiliados y mensajes.
- Descarga de listados en formato Excel.
- Loader visual cuando la API tarda en responder (servidor en reposo).
- Interacciones UI con modales, menus, iconografia y notificaciones.

---

## Tecnologias

<table>
  <tr>
    <td><strong>UI</strong></td>
    <td>React, Tailwind CSS</td>
  </tr>
  <tr>
    <td><strong>UX/UI</strong></td>
    <td>react-icons, react-toastify, reactjs-popup, @szhsin/react-menu</td>
  </tr>
  <tr>
    <td><strong>Build</strong></td>
    <td>Vite</td>
  </tr>
  <tr>
    <td><strong>HTTP</strong></td>
    <td>Axios</td>
  </tr>
  <tr>
    <td><strong>Routing</strong></td>
    <td>React Router</td>
  </tr>
</table>

---

## Estructura del proyecto

```
src/
  admin/            Vistas del panel admin
  auth/             Pantallas de autenticacion
  components/       Componentes UI y loaders
  config/           Configuracion de API
  layout/           Layouts principales
  routers/          Ruteo de la aplicacion
  utils/            Utilidades (descargas, dropdowns)
  App.jsx           Landing principal
  main.jsx          Entrada de la app
```

---

## Variables de entorno

Este proyecto usa variables de entorno de Vite. No incluyas credenciales reales en el repo.

```
VITE_API_BASE_URL=https://api.example.com
```

Archivo recomendado para desarrollo local:

```
.env.local
```

---

## Instalacion y ejecucion

Requisitos:

- Node.js LTS
- Yarn

Pasos:

```
yarn install
yarn dev
```

Build y preview:

```
yarn build
yarn preview
```

---

## Notas sobre el servidor

El backend puede entrar en reposo cuando no se usa (planes gratuitos). En ese caso, la primera peticion puede demorar mientras el servidor se reactiva. La UI muestra un loader con un mensaje de espera para que el usuario entienda la demora.

---

## Scripts disponibles

```
yarn dev       # entorno local
yarn build     # build de produccion
yarn preview   # preview del build
yarn lint      # lint del codigo
```

---

## Despliegue (GitHub Pages)

El proyecto incluye scripts para deploy en GitHub Pages.

```
yarn predeploy
yarn deploy
```

Si se publica en GitHub Pages, configurar `base` en `vite.config.js` con el nombre del repositorio:

```
base: "/nombre-del-repo/"
```

---

## Estilo visual

La interfaz usa la paleta del proyecto:

- Verde principal: `#27AE60`
- Azul oscuro: `#172554`
- Violeta acento: `#9932CC`
- Gris de texto: `#828282`
- Fondo: `#171717`

---

## UI Kit

Componentes reutilizables destacados:

- Cards de metricas con iconos y crecimiento.
- Loader con spinner para respuestas lentas de API.
- Formularios con validacion en tiempo real.
- Modal de firma digital.
- Sidebar y menu superior con acciones de usuario.
- Dropdowns y menus contextuales en panel admin.

---

## Roadmap

- Integrar autenticacion real con tokens y refresh.
- Agregar filtros avanzados en panel de afiliados y mensajes.
- Mejorar accesibilidad (labels, focus y contrastes).
- Reportes y exportaciones adicionales.
- Suite de tests (unitarios y E2E).

---

## Preguntas frecuentes

**Por que a veces tarda la primera carga?**  
El backend puede estar en reposo. La primera solicitud despierta el servidor y toma algunos segundos.

**Donde configuro la URL de la API?**  
En `.env.local` con `VITE_API_BASE_URL`. Usa un valor generico como ejemplo en documentos.

**Necesito instalar algo extra para correrlo?**  
Solo Node.js LTS y Yarn. El resto se instala con `yarn install`.

**Como hago el build para produccion?**  
Ejecuta `yarn build` y luego `yarn preview` para validarlo localmente.

---

## Contribucion

1. Crear una rama nueva.
2. Hacer cambios con mensajes claros.
3. Probar localmente antes de abrir PR.

---

## Licencia

Uso interno del proyecto. Consultar al propietario para distribucion o reutilizacion.
