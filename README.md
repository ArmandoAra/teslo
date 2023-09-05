# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

\*- El -d, signiifica **detached**

\*Mongo DB URL_LOCAL

```
mongodb://localhost:27017/entriesdb

```

\*Reconstruir los modulos de node y levantar next

```
npm install
npm run dev
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a: **.env**

##Llenar la base de datos con informacion de pruebas

Llamar a:

```
http://localjost:3000/api/seed
```
