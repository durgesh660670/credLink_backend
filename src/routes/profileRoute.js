const router = require('express').Router();
const profileController = require('../controllers/profileController');


router.post('/', profileController.create);
router.put('/', profileController.update);
router.get('/:id', profileController.read);
module.exports = router;
