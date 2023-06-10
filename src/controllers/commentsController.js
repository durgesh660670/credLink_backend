const comments=require('../models/comments');

const publishComments =async (req,res)=>{
    const reqObj =req.body;
    const resp=await comments.saveComments(reqObj);
    res.send(resp);
}
const getComments = async (req,res)=> {
    const postId=req.params.postId;
    // console.log(postId)
    const resp=await comments.readComments(postId);
    res.send(resp);
}
const removeComments = async (req,res)=>{
    const resp=await comments.deleteComments(req.body)
    res.send(resp);
}
module.exports ={
    add:publishComments,
    getComments:getComments,
    remove:removeComments
}