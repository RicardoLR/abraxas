# React - Abraxas

## Pre requisitos
- Tener Docker instalado
- Tener libre el puerto 8080

## Ejecutar con Docker
- `git clone`
- `docker build -t richi/abraxas .`
- `docker run -e APP=Abraxas -e PORT=8080 -e BACKEND_SERVER=http://localhost:8080 -e NODE_ENV=production -it -p 8080:8080 -d richi/abraxas`


## Ejecutar sin Docker
- `npm install`
- `npm run dev`
- ir a http://localhost:8080


## Arquitectura de la APP

## Stack

1. React
2. Redux con inmutable
3. React Router
4. Node JS
5. Webpack con Sass y PostCSS
6. react-bootstrap
7. Para utileria underscore, uuid, moment
8. recharts para graficas mejora de D3

## Mejoras

1. por escalabidadad en Cliete uso de Realm para este ejemplo todo se persiste en localstorage
2. Mantener como servicios el tiempo mayor a 1 hora
3. uso de SSR con node, compartiendo Rutas con React, por el momento solo se usa node como servidor aplicativo
4. Todas las peticiones HTTP o Sockert deben pasar por NodeJS
5. Persistencia en BackEnd de tareas y/o proteccion de base de datos local para evitar inconsistencias