const express = require('express')
const auth = require('../security/auth');
const router = express.Router();

router.get('/hello/:name',auth.isAuthorized, (req, res) => {
    var name = req.params.name;
    res.json({ message: `Hello !${name}` });
});

module.exports = router