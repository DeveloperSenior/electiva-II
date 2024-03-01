/**
 * Crear API expres con enrutadores propios
 */
const express = require('express');
const routerVersion = express.Router();
const routerTask = require('./routes/TasksRoute');
const routerSwagger = require('./routes/SwaggerRoute');

var app = express();

/**
 * Se parsean los payload (Request y Response) a tipos JSON
 */
app.use(express.json());
/**
 * Lee las varibales de entorno del archivo .env solo ambiente local
 */
const port = process.env.PORT || 3000;
const apiPath = process.env.API_PATH || '/api/v1';
const apiVersion = process.env.VERSION || '1.0';

/**
 * Se levante el contenedor express
 */
app.listen(port, () => {
    console.log(`El Servidor esta corriendo en el puerto ${port} y el API ${apiPath}`);
});

/**
 * Se define recurso GET para verificar la version disponible del API path /version
 */
routerVersion.get('/version', (req, res) => {
    res.json({ version: apiVersion });
});

/**
 * Lista de routers que se van a exponer en el API
 */
const apiRoutesList = [routerVersion, routerTask, routerSwagger ];
app.use(apiPath, ...apiRoutesList );
  