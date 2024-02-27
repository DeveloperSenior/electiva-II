const express = require('express')
const auth = require('../security/auth');
const controller = require('../controllers/ctrlpost');
const router = express.Router();

router.get('/post',auth.isAuthorized, (req, res) => {
    controller.posts(req,res)
});
router.get('/post/:id',auth.isAuthorized, (req, res) => {
    controller.posts(req,res)
});

router.post('/post',auth.isAuthorized, (req, res) => {
    controller.save(req,res)
});

module.exports = router