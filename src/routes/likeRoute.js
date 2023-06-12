const router = require('express').Router();
const likeController = require('../controllers/likeController');

router.post('/user_reaction', likeController.create);
router.get('/get_reaction', likeController.read);

module.exports = router;
