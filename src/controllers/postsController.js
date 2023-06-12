const clPosts =require('../models/posts');
const env=require('dotenv').config().parsed;
const {CLOUD_NAME, API_KEY, API_SECRECT } = env;
// const cloudinary =require('../config/cloudinary').config;
const cloudinary = require('cloudinary').v2;
cloudinary.config({cloud_name:CLOUD_NAME,api_key:API_KEY,api_secret:API_SECRECT});
const publishPost = async (req,res,next)=>{
    if(!req.body || req.body.post_title=="" || req.file=="")
        res.send({status:"unsuccess",message:"Insufficient parameters in request."});

    postsObj={};
    const {user_id,post_title,post_caption}=req.body;
    const imageFile = req.file;

    const cloudinaryImgUrl=await cloudinary.uploader.upload(imageFile.path, (error, result) => {
        if (error) {
          console.log('Upload error:', error);
          res.status(500).json({ error: 'Failed to upload image'+JSON.stringify(error) });
        }
    });
    postsObj['userPost']  =cloudinaryImgUrl.url;
    postsObj['userId']    =user_id;
    postsObj['postTitle'] =post_title;
    postsObj['postCaption']=post_caption;
    const resp = await clPosts.savePost(postsObj);
    res.send(resp);
    
}
const deletePost = async (req,res)=>{
    const postid=req.body.postId;
    const resp=await clPosts.removePost(postid);
    res.send(resp);
}
const getPostData =async (req,res)=>{
    const resp=await clPosts.getPost()
    res.send(resp);
}
module.exports ={
    create:publishPost,
    delete:deletePost,
    postList:getPostData
}