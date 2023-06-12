const { error } = require('winston');
const conn =require('../config/database');

const save =async (reqObj)=>{
    try {
        const { userId, postId, comment } = reqObj;
        const dataArray = Object.values({ userId, postId, comment });

        const insertSql='INSERT INTO cl_comments(user_id,post_id,comment) VALUES (?,?,?)';
        const [row]=await conn.query(insertSql,dataArray);
        if(row.affectedRows>0){
            const resp = await read(reqObj.postId);
            return {status:"success",message:"Comment published successfully.",data:resp.data};
        }else{
            return{status:"unsuccess",message:"Something went wrong,Please try again"};
        }
    } catch (e) {
       return {status:"unsuccess",message:"Something went wrong,Please try again",error:e}; 
    }
}
const read = async (postId)=>{
    try {
        const selectQuery="SELECT c.* , u.user_id,CONCAT(u.f_name,' ',u.l_name) as user_name FROM cl_comments c LEFT JOIN cl_user u ON  c.user_id=u.user_id WHERE c.post_id=? order by created_on desc";
        const [rows]=await conn.query(selectQuery,[postId]);
        if(rows.length>0){
            return {status:"success",message:"User comments found",data:rows};
        }else{
            return {status:"unsuccess",status:"Comment data not found"};
        }
    } catch (e) {
        return {satus:"unsucces",message:"Something went wrong,Please try again",error:e};
    }
}
const remove=async (reqObj)=>{
    try {
        const {userId,commentId} =reqObj;
        const cmtsArray=Object.values({userId,commentId});
        const delQuery ="delete from cl_comments where user_id=? and comment_id=?";
        const [rows]=await conn.query(delQuery,cmtsArray);
        if(rows.affectedRows>0){
            return {status:"success",message:"Comment deleted successfully."};
        }else{
            return {status:"unsuccess",message:"Something went wrong,Please try again"}
        }
    } catch (e) {
        return {status:"unsuccess",message:"Something went wrong,Please try again", error:e}
    }
}
module.exports={saveComments :save,readComments :read,deleteComments:remove}