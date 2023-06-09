const router = require('express').Router();
const authController = require('../controllers/authController');
const validaion = require('../../middleware/InputValidator')

router.post('/signup', validaion.registerInputValidation, authController.signUp);
router.get('/:id', authController.read);

module.exports = router;
