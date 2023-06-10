const router =require('express').Router();
const commentsCtr =require('../controllers/commentsController');

router.post('/create',commentsCtr.add);
router.get('/:postId',commentsCtr.getComments);
router.post('/delete',commentsCtr.remove);

module.exports=router;