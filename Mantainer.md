# Prompt: Plan de actualización “safe” (sin reconfig) para corregir sugerencias de Dependabot (proyecto legacy)

Actuá como un **Release Manager / Maintainer de un proyecto legacy (Vite + React)**.  
Objetivo: **reducir/cerrar las alertas de Dependabot** actualizando **solo dependencias con cambios compatibles (mismo major / minor/patch)**, evitando reconfigurar el proyecto y minimizando riesgo de romper funcionalidad.

## Contexto
Tengo alertas Dependabot relacionadas con:
- Vite (varios bypass de `server.fs.deny` y temas del dev server)
- Rollup bundle / DOM Clobbering (XSS en scripts bundleados)
- `form-data` (random inseguro para boundary) (CRITICAL)
- React Router (open redirects → XSS)
- Axios (posible SSRF/credential leak por URL absoluta) y DoS por tamaño
- `glob` CLI (command injection con `shell:true`)
- Babel (RegExp complexity en código generado)
- `js-yaml` (prototype pollution en merge)
- `esbuild` (dev server / requests)
- Vite middleware / `server.fs` aplicado a HTML y otros avisos menores dev-only

## Tarea
1) **Leé el `package.json` y el lockfile (`package-lock.json` o `yarn.lock`)** y decime **exactamente** qué dependencias debo actualizar para atacar esas alertas, **priorizadas**.
2) Para cada dependencia listada, proponé **la actualización más segura posible**:
   - **Mantener el mismo major** (p.ej. 4.x → 4.latest), salvo que sea imprescindible.
   - Preferir **patch/minor**.
   - Evitar cambios que requieran reconfig (por ejemplo cambios de Vite mayor si no es necesario).
3) Generá un bloque de comandos listo para ejecutar, idealmente en este orden:
   - update seguro
   - dedupe
   - audit fix (solo si no rompe semver)
4) Indicá cuáles alertas probablemente son **solo de desarrollo** (dev server) y pueden quedar como “won’t fix” si el deploy es `vite build` + servidor estático.

## Dependencias que deben considerarse (según alertas)
**Actualizá (o asegurá versión parche/minor segura) de estas, manteniendo major cuando sea posible:**

### Build / tooling (devDependencies)
- `vite`
- `rollup` (si aparece directo o transitivo fijable)
- `esbuild`
- `@babel/core` (y/o paquetes `@babel/*` presentes: `@babel/preset-env`, `@babel/runtime`, etc.)
- `glob` (si está como dependencia directa; si no, identificar el paquete que lo trae)

### Runtime (dependencies)
- `react-router` y/o `react-router-dom` (y `@remix-run/router` si aparece)
- `axios`
- `form-data`
- `js-yaml`

> Si alguna de estas no está directa, proponé estrategias seguras:
> - `npm dedupe`
> - `overrides` (npm) / `resolutions` (yarn) **solo si es necesario** y sin tocar configuración de build.

## Output esperado
Entregame:

### A) Lista priorizada de actualizaciones
- Paquete → versión actual → versión recomendada (misma major) → qué alerta cubre → riesgo (bajo/medio)

### B) Comandos recomendados (npm)
Incluí comandos que respeten semver y minimicen cambios:
- `npm update`
- `npm install <paquete>@^<major>.<minor>.<patch>` (si hace falta fijar)
- `npm dedupe`
- `npm audit fix` (solo si no sube major)

### C) Checklist de verificación (sin reconfig)
- `npm test` (si existe)
- `npm run build`
- `npm run lint` (si existe)
- Validación manual: rutas/redirects, llamadas axios, navegación

## Restricciones
- NO propongas migraciones de arquitectura ni cambios de configuración grandes.
- NO propongas upgrades de major salvo que la vulnerabilidad no tenga fix en el major actual.
- Preferí “cierre máximo de alertas con mínimo cambio”.

Ahora, en base a mi `package.json`, devolveme el plan: "planMantainer.md"
