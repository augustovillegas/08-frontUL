# Democratik - Herramienta de gestion politica

<div align="center">
  <p style="color:#828282;">
    Frontend web para la gestion de afiliaciones, consultas y panel administrativo.
  </p>
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=000" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=fff" />
    <img alt="Tailwind" src="https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=fff" />
  </p>
  <p>
    <a href="https://democratik.netlify.app/">Demo</a> ·
    <a href="#-deployment">Deployment</a> ·
    <a href="https://www.linkedin.com/in/augustovillegas/">LinkedIn</a>
  </p>
  <p>
    <a href="#-tabla-de-contenidos">Indice rapido</a> ·
    <a href="#-caracteristicas">Caracteristicas</a> ·
    <a href="#-inicio-rapido">Inicio rapido</a>
  </p>
</div>

---

## Tabla de Contenidos

- [Descripcion](#-descripcion)
- [Caracteristicas](#-caracteristicas)
- [Stack Tecnologico](#-stack-tecnologico)
- [Inicio Rapido](#-inicio-rapido)
- [Arquitectura](#-arquitectura)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes / Modulos Principales](#-componentes--modulos-principales)
- [Validaciones](#-validaciones)
- [API Integration / Endpoints](#-api-integration--endpoints)
- [Scripts Disponibles](#-scripts-disponibles)
- [Variables de Entorno](#-variables-de-entorno)
- [Deployment](#-deployment)
- [Guias de Uso](#-guias-de-uso)
- [Personalizacion / Extension](#-personalizacion--extension)
- [Contribuciones](#-contribuciones)
- [Licencia](#-licencia)

---

## Descripcion

Democratik es un frontend SPA pensado para gestionar afiliaciones y consultas politicas, con un panel administrativo para seguimiento y metricas. El objetivo es centralizar el alta de afiliados, la atencion de mensajes y la visualizacion de indicadores en una UI clara y operativa.

- Problema que resuelve: flujo de afiliacion y consulta en un solo canal, con administracion centralizada.
- Para quien es: equipos politicos y administrativos que necesitan capturar y gestionar datos de afiliados.
- Tipo de aplicacion: frontend web (SPA) consumiendo una API externa.

---

## Caracteristicas

- [x] Formulario de afiliacion con validaciones, firma y carga de DNI.
- [x] Formulario de contacto para consultas.
- [x] Panel administrativo con metricas, listado de afiliados y mensajes.
- [x] Descarga de listados en formato Excel.
- [x] Loader informativo para escenarios de cold start del backend.
- [x] UI con modales, menus, iconografia y notificaciones.

---

## Stack Tecnologico

<table>
  <tr>
    <th>Tecnologia</th>
    <th>Proposito</th>
  </tr>
  <tr>
    <td>React</td>
    <td>UI basada en componentes y estado</td>
  </tr>
  <tr>
    <td>Vite</td>
    <td>Build rapido y servidor de desarrollo</td>
  </tr>
  <tr>
    <td>Tailwind CSS</td>
    <td>Estilos utilitarios y consistencia visual</td>
  </tr>
  <tr>
    <td>Axios</td>
    <td>Cliente HTTP para la API externa</td>
  </tr>
  <tr>
    <td>React Router</td>
    <td>Navegacion y ruteo del SPA</td>
  </tr>
  <tr>
    <td>react-toastify</td>
    <td>Notificaciones y feedback de acciones</td>
  </tr>
</table>

---

## Inicio Rapido

### Prerrequisitos

- Node.js LTS
- Yarn

### Instalacion

```bash
yarn install
```

### Desarrollo

```bash
yarn dev
```

### Build y preview

```bash
yarn build
yarn preview
```

---

## Arquitectura

- SPA orientada a rutas con componentes desacoplados.
- Separacion por dominios: admin, auth, components, layout, utils.
- Integracion con API externa mediante un cliente HTTP centralizado.

Flujo de datos (alto nivel):

```text
[Usuario]
   |
   v
[UI React] -> [Axios Client] -> [API Externa]
   ^                |              |
   |                v              v
[React Router]  [Validaciones]  [Respuestas/Errores]
```

---

## Estructura del Proyecto

```text
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

## Componentes / Modulos Principales

- `components/`:
  - Loader de espera para cold start.
  - Modales y notificaciones.
- `admin/`:
  - Vista de metricas y listados.
  - Gestion de mensajes.
- `auth/`:
  - Pantallas de acceso (si aplica en el despliegue).
- `config/`:
  - Cliente de API y configuracion base.

---

## Validaciones

- Formularios con validacion de campos obligatorios y formato.
- Feedback inmediato en UI con mensajes de error y notificaciones.
- Control de estados de carga para prevenir duplicados.

---

## API Integration / Endpoints

> Nota: completar rutas reales segun el backend publicado.

| Metodo | Endpoint | Proposito |
| --- | --- | --- |
| POST | /afiliaciones | Alta de afiliados |
| POST | /contacto | Envio de consultas |
| GET | /admin/afiliados | Listado de afiliados |
| GET | /admin/mensajes | Listado de mensajes |

Modelo de datos (referencial):

```ts
type ContactoPayload = {
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
};
```

---

## Scripts Disponibles

```bash
yarn dev       # entorno local
yarn build     # build de produccion
yarn preview   # preview del build
yarn lint      # lint del codigo
```

---

## Variables de Entorno

| Variable | Descripcion | Ejemplo |
| --- | --- | --- |
| VITE_API_BASE_URL | URL base de la API | https://api.example.com |

Ejemplo `.env.local`:

```env
VITE_API_BASE_URL=https://api.example.com
```

---

## Deployment

Servicio recomendado: Netlify.

Pasos sugeridos:

```bash
# build de produccion
yarn build
```

- Publicar la carpeta `dist/`.
- Configurar variables de entorno en el dashboard.
- URL de despliegue del frontend: https://democratik.netlify.app/.

Si se usa GitHub Pages, definir `base` en `vite.config.js`:

```js
export default {
  base: "/nombre-del-repo/",
};
```

---

## Guias de Uso

Flujos comunes:

1. Completar formulario de afiliacion y adjuntar DNI.
2. Enviar consulta desde el formulario de contacto.
3. Revisar metricas y mensajes desde el panel admin.
4. Exportar listados en Excel desde la seccion correspondiente.

<details>
  <summary>Guia opcional para administradores</summary>

  - Validar datos antes de exportar.
  - Revisar mensajes pendientes y aplicar filtros.
  - Actualizar estados desde el panel de control.
</details>

---

## Personalizacion / Extension

- Ajustar paleta y estilos en los componentes base.
- Extender rutas agregando nuevos modulos en `routers/`.
- Reemplazar el cliente HTTP en `config/` si se cambia el backend.

---

## Contribuciones

1. Crear una rama nueva desde `main`.
2. Realizar cambios con mensajes claros.
3. Ejecutar `yarn lint` antes de abrir un PR.

---

## Licencia

Uso interno del proyecto. Consultar al propietario para distribucion o reutilizacion.

---

<div align="center">
  <p>Hecho con foco en experiencia y operatividad.</p>
  <p>
    <a href="#democratik---herramienta-de-gestion-politica">Volver arriba</a> ·
    <a href="https://www.linkedin.com/in/augustovillegas/">LinkedIn</a>
  </p>
</div>
