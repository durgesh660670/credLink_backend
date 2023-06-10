const router = require('express').Router();
const profileController = require('../controllers/profileController');

const multer = require('multer')
// const upload      = multer();
const upload = multer({ dest: 'uploads/' });
router.post('/', upload.single('image'), profileController.create);
router.put('/', profileController.update);
router.get('/:id', profileController.read);
module.exports = router;
