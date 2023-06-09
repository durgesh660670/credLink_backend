const conn = require('../config/database');
const { logger, customLogger } = require('../../middleware/logger');

async function createAuth(request) {
    try {
        const f_name = request.f_name;
        const l_name = request.l_name;
        const email = request.email;


        const checkCatgSql = "SELECT * FROM cl_user WHERE email=?";
        const [rows] = await conn.promise().query(checkCatgSql, [email]);

        if (rows.length > 0) {
            const user_id = rows[0].user_id;
            return { status: "success", message: "User registered successfully", user_id: user_id };
        }

        const InsertSql = "INSERT INTO cl_user(f_name, l_name, email) VALUES (?, ?, ?)";
        const [result] = await conn.promise().query(InsertSql, [f_name, l_name, email]);

        if (result.affectedRows === 1) {
            const checkCatgSql = "SELECT * FROM cl_user WHERE email=?";
            const [rows] = await conn.promise().query(checkCatgSql, [email]);

            if (rows.length > 0) {
                const user_id = rows[0].user_id;
                return { status: "success", message: "User registered successfully", user_id: user_id };
            } else {
                return { status: "unsuccess", message: "Could not find user after registration" };
            }
        } else {
            return { status: "unsuccess", message: "Could not create user, something went wrong" };
        }
    } catch (error) {
        // Log the error stack trace
        customLogger.info('Error in createAuth: ' + error.stack);
        return { status: "error", message: "An error occurred while creating user" };
    }
}

async function readAuth(user_id) {
    try {
        const checkCatgSql = `SELECT u.f_name, u.l_name, u.email, p.profile_img FROM cl_user u
        LEFT OUTER JOIN cl_user_profile p ON u.user_id = p.user_id
        WHERE u.user_id = 20`;

        const [rows] = await conn.promise().query(checkCatgSql, [user_id]);

        if (rows.length > 0) {
            const user_id = rows[0].user_id;
            const f_name = rows[0].f_name;
            const l_name = rows[0].l_name;
            const email = rows[0].email;
            const profile_img = rows[0].profile_img;
            const resData = {
                user_id,
                f_name,
                l_name,
                profile_img,
                email
            }
            return { status: "success", message: "User retrieved successfully", resData: resData };
        } else {
            return { status: "unsuccess", message: "User not found" };
        }
    } catch (error) {
        // Log the error stack trace
        customLogger.info('Error in readAuth: ' + error.stack);
        return { status: "error", message: "An error occurred while reading user" };
    }
}
module.exports = {
    create: createAuth,
    read: readAuth
};
