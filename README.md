# Challenge Froneus - Monorepo

Este monorepo contiene una aplicación modular construida con arquitectura de micro-frontends utilizando Single-SPA.

## Estructura del Proyecto

```
challenge-froneus/
├── root-app/           # Aplicación root que orquesta los micro-frontends
├── campaign-manager/   # Micro-frontend para gestión de campañas
├── campaign-dashboard/ # Micro-frontend para el dashboard de campañas
└── json-server/        # Servidor mock DB para desarrollo
```

## Requisitos Previos

- Node.js (versión 20)
- npm o yarn
- Git

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd challenge-froneus
```

2. Instalar dependencias de cada proyecto:

```bash
# Root App
cd root-app
npm install

# Campaign Manager
cd ../campaign-manager
npm install

# Campaign Dashboard
cd ../campaign-dashboard
npm install

# JSON Server
cd ../json-server
npm install
```

## Ejecución del Proyecto

Para ejecutar el proyecto completo, necesitas iniciar cada servicio en una terminal diferente:

### 1. JSON Server (Mock API)
```bash
cd json-server
npx json-server db.json
# El servidor se iniciará en http://localhost:3000
```

### 2. Root App
```bash
cd root-app
npm start
# La aplicación root se iniciará en http://localhost:9000
```

### 3. Campaign Dashboard
```bash
cd campaign-dashboard
npm start
# El micro-frontend se iniciará en http://localhost:8000
```

### 4. Campaign Manager
```bash
cd campaign-manager
npm start
# El micro-frontend se iniciará en http://localhost:8001
```

## Acceso a la Aplicación

Una vez que todos los servicios estén corriendo, puedes acceder a la aplicación en:
http://localhost:9000

## Desarrollo

Cada micro-frontend puede ser desarrollado de manera independiente. Los cambios se reflejarán automáticamente en la aplicación principal gracias a la configuración de hot-reload.

## Tecnologías Principales

- Single-SPA
- React
- TypeScript
- Zustand
- PrimeReact
- Webpack
- JSON Server

## Estructura de Datos

La aplicación utiliza JSON Server como backend mock. Los datos se encuentran en `json-server/db.json`.
