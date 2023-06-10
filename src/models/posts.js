const conn = require('../config/database');
const create = async (reqObj)=>{
    try {
        console.log(reqObj)
        const { userId, postTitle,userPost,postCaption } = reqObj;
        const postArray = Object.values({ userId, postTitle,userPost,postCaption });
        const insertSql="insert into cl_post(user_id,post_title,user_post,post_caption) values (?,?,?,?)";
        const [result]=await conn.query(insertSql,postArray);
        if(result.affectedRows==1){
            return {status:`success`,message:`Post published successfully`};
        }else{
            return {status:`success`,message:`Something went wrong,Please try again`};
        }
    } catch (e) {
        console.log(e);
        return {status:"success",message:`Something went wrong,Please try again`,error:e};
    }
}
const remove=async(postId)=>{
    try {
      await conn.query('START TRANSACTION');
      const delPostQuery = "DELETE FROM cl_post WHERE post_id=?";
      const delCommentsQuery = "DELETE FROM cl_comments WHERE post_id=?";
      const delLikesQuery = "DELETE FROM cl_likes WHERE post_id=?";
    
      await conn.query(delPostQuery, [postId]);
      await conn.query(delCommentsQuery, [postId]);
      await conn.query(delLikesQuery, [postId]);
    
      await conn.query('COMMIT');
      return { status: "success", message: "Post and associated records removed successfully" };
    } catch (e) {
      await conn.query('ROLLBACK');
      return { status: "error", message: "An error occurred. Please try again."+e };
    }
}
const getPost =async ()=>{
    try {
        const postQuery="SELECT p.* , CONCAT(u.f_name,' ',u.l_name) as user_name FROM cl_post p INNER JOIN cl_user u ON P.user_id=u.user_id ORDER BY upload_time DESC";
        const [rows] = await conn.query(postQuery);

        const likeQuery ="SELECT L.* , CONCAT(u.f_name,' ',u.l_name) as user_name FROM cl_likes L INNER JOIN cl_user U ON L.user_id=U.user_id ORDER BY L.created_on DESC";
        const [likeResult] = await conn.query(likeQuery);

        const groupedData = {};
        for (const item of likeResult) {
            const { post_id, ...rest } = item;
            if (groupedData[post_id]) {
                groupedData[post_id].push(rest);
            } else {
                groupedData[post_id] = [rest];
            }
        }
    
        const finalPostArray=rows.map((postItems)=>{
            if(groupedData[postItems.post_id] !==undefined){
                postItems['child']=groupedData[postItems.post_id];
                postItems;
            }else{
                postItems['child']=[];
            }
           return postItems;
        })
        if(rows.length>0){
            return {status:"success",data:finalPostArray}
        }else{
            return {status:"success",message:"Post data not found."}
        }    
    } catch (e) {
        return { status: "error", message: "An error occurred. Please try again."+e };
    }
}
module.exports ={
    savePost:create,
    removePost:remove,
    getPost:getPost
}