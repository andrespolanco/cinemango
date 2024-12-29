<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar desarrollo
1. Clonar repositorio
2. Ejecutar

```
npm install
```

3. Tener nest cli instalado
```
npm i -g @nestjs/cli
```
4. Levantar la bd
```
docker compose up -d
```
5. Levantar el proyecto en local
```
npm run start:dev
yarn start:dev
```
6. Reconstruir la BD con la semilla
```
GET localhost:3000/api/seed
```
## Stack usado
* MongoDB
* NestJS
