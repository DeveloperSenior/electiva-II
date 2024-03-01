
# Electiva-II
# Integrantes del Equipo
- [Andres Escobar](https://github.com/DeveloperSenior)
# Tecnología en que se Desarrolló
- NodeJS v18.19.1
# Nombre del Proyecto
Repositorio para el espacio de aprendizaje sobre NodeJs enfocado a Back-end, buenas practicas de desarrollo y patrones de diseño
# Estructura del proyecto
El proyecto se desarrollo con NodeJS v18.19.1, utilizando las siguientes librerias de apoyo:

1. `express` para la creacion del contenedor del 
servidor y uso de API Rest
2. `nodemon` herramienta que ayuda a desarrollar aplicaciones basadas en Node.js reiniciando automáticamente la aplicación del nodo cuando se detectan cambios en los archivos en el directorio.
3. `rxjs` Libreria de extensiones reactivas para JavaScript
4. `fluent-json-schema` Generador de esquemas JSON
5. `ajv` Validador de estructuras JSON basado en esquemas de objetos javascript (JSON).
6. `swagger-jsdoc`, `swagger-model-validator`, `swagger-ui-express` Este módulo le permite ofrecer documentos API generados automáticamente por swagger-ui desde Express, en función de un swagger spec con `swagger-jsdoc`. El resultado es documentación viva para el API alojada desde el servidor API a través de una rutas.

```

task-manager-api
    L controllers
        L CtrlTasks.js
    L db
        L TaskFB.js
    L routes
        L SwaggerRoute.js
        L TasksRoute.js
    L services
        L TaskService.js
    L utilities
        L Constants.js
    L validator
        L taskValidator.js
    L task-manager-api.postman_collection
    L package.json
    L .env
    L app.js
L .gitignore
L README.md
``` 

# Como ejecutar el proyecto
1. **Clonar el Repositorio:**
```bash
git clone
https://github.com/DeveloperSenior/electiva-II.git
```
2. **Instalar modulos de node:**
```bash
cd task-manager-api
npm install
```
3. **Ejecutar la aplicacion local:**
```bash
npm run runDev
```
4. Abrir en el navegador http://localhost:3000/api/v1/version si responde un `JSON` asi:
```json
{"version": "1.0"}
```
significa que está arriba nuestro servidor.

5. **Visualizar Documentación :**
La documentacion del API está en la url http://localhost:3000/api/v1/api-docs/

6. **Coleccion postman :**
En la herramienta Postman importar el archivo `task-manager-api.postman_collection` el cual se encuentra en la raiz del proyecto.