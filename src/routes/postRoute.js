const router=require('express').Router();
const clPosts=require('../controllers/postsController');
const multer      = require('multer')
// const upload      = multer();
const upload = multer({ dest: 'uploads/' });
router.post('/createPost',upload.single('image'),clPosts.create);
router.post('/deletePost',clPosts.delete);
router.get('/getPostList',clPosts.postList);
// router.get('/read',clPosts.listCategory);

module.exports=router;