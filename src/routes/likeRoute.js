const router = require('express').Router();
const likeController = require('../controllers/likeController');

router.post('/', likeController.create);

module.exports = router;
