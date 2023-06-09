const router=require('express').Router();
const category=require('../controllers/categoryController');

router.post('/create',category.createCategory);
router.get('/list',category.listCategory);

module.exports=router;