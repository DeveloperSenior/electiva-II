const express = require('express')
const routeGreet = require('./routes/greet.js');
const post = require('./routes/post.js');
const router = express.Router();
var app = express()

app.use(express.json())
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

router.use(function timeLog(req, res, next) {
    /** Filtro  de routes Middleware*/
    console.log('Time: ', Date.now());
    next();
  });

router.get('/ping', (req, res) => {
    res.json({ message: 'pong!' });
});
const v1Routes = [router, routeGreet, post ]
app.use('/api/v1', ...v1Routes );