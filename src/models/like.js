const conn = require('../config/database');
const { customLogger } = require('../../middleware/logger');

async function createLike(postId, userId, userReaction, req) {
    try {
        const createdOn = req.created_on || new Date().toISOString();
        const insertSql = "INSERT INTO cl_likes (post_id, user_id, user_reaction, created_on) VALUES (?, ?, ?, ?)";
        const [result] = await conn.query(insertSql, [postId, userId, userReaction, createdOn]);

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

async function updateLike(likeId, userReaction, req) {
    try {
        const modifiedOn = req.modified_on || new Date().toISOString();

        const updateSql = "UPDATE cl_likes SET user_reaction = ?, modified_on = ? WHERE like_id = ?";
        const [result] = await conn.promise().query(updateSql, [userReaction, modifiedOn, likeId]);

        if (result.affectedRows == 1) {
            return { status: "success", message: "Like updated successfully" };
        } else {
            return { status: "unsuccess", message: "Could not update like, something went wrong" };
        }
    } catch (error) {
        // Log the error stack trace
        customLogger.info('Error in updateLike: ' + error.stack);
        return { status: "error", message: "An error occurred while updating the like" };
    }
}

async function readLike(likeId) {
  try {
    const selectSql = "SELECT * FROM cl_likes WHERE like_id = ?";
    const [rows] = await conn.promise().query(selectSql, [likeId]);

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
    update: updateLike,
    userReaction: createLike,
    read:readLike
};
