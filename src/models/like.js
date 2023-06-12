const conn = require('../config/database');
const { customLogger } = require('../../middleware/logger');

async function createLike(reqObj) {
    try {

        const selectSql = "SELECT * FROM cl_likes WHERE post_id = ?";
        const [likerows] = await conn.query(selectSql, [reqObj.postId,reqObj.userId]);
        if(likerows.length>0){
            const delQuery="delete from cl_likes where user_id=? and post_id=?";
            await conn.query(delQuery,[reqObj.userId,reqObj.postId]);
        }
        const {postId, userId, userReaction } = reqObj;
        const likeArray=Object.values({postId, userId, userReaction })
        const insertSql = "INSERT INTO cl_likes (post_id, user_id, user_reaction) VALUES (?, ?, ?)";
        const [result] = await conn.query(insertSql,likeArray);
        if (result.affectedRows == 1) {
            return { status: "success", message: "Like created successfully" };
        } else {
            return { status: "unsuccess", message: "Could not create like, something went wrong" };
        }
    } catch (error) {
        // Log the error stack trace
        customLogger.info('Error in createLike: ' + error.stack);
        return { status: "error", message: "An error occurred while creating the like" };
    }
}


async function getUserReaction(likeId) {
  try {
    const selectSql = "SELECT * FROM cl_likes WHERE like_id = ?";
    const [rows] = await conn.query(selectSql, [likeId]);

    if (rows.length > 0) {
      const like = rows[0];
      return { status: "success", message: "Like retrieved successfully", data: like };
    } else {
      return { status: "unsuccess", message: "Like not found" };
    }
  } catch (error) {
    // Log the error stack trace
    customLogger.info('Error in readLike: ' + error.stack);
    return { status: "error", message: "An error occurred while reading the like" };
  }
}


module.exports = {
    userReaction: createLike,
    getUserReaction:getUserReaction
};
