const conn = require('../config/database');
const { logger, customLogger } = require('../../middleware/logger');

async function createProfile(request) {
    try {
        console.log(request.body);
        const imageFile = request.file;

        const env = require('dotenv').config().parsed;
        const { CLOUD_NAME, API_KEY, API_SECRECT } = env;
        // const cloudinary =require('../config/cloudinary').config;
        const cloudinary = require('cloudinary').v2;
        cloudinary.config({ cloud_name: CLOUD_NAME, api_key: API_KEY, api_secret: API_SECRECT });

       
        const cloudinaryImgUrl=await cloudinary.uploader.upload(imageFile.path, (error, result) => {
            if (error) {
              console.log('Upload error:', error);
              res.status(500).json({ error: 'Failed to upload image'+JSON.stringify(error) });
            }
        });

        const profile_img = cloudinaryImgUrl.url;
        const user_id = request.body.user_id;

        const InsertSql = "INSERT INTO cl_user_profile(profile_img, user_id, added_on) VALUES (?, ?, CURRENT_TIMESTAMP)";
        const [result] = await conn.query(InsertSql, [profile_img, user_id]);
        if (result.affectedRows == 1) {
            const checkCatgSql = `SELECT *
            FROM cl_user_profile
            WHERE user_id = ? and added_on is not null
            ORDER BY added_on DESC
            LIMIT 1
            `;
            const [rows] = await conn.query(checkCatgSql, [user_id]);
            if (rows.length > 0) {
                const profile_img = rows[0].profile_img;
                return { status: "success", message: "User profile updated successfully", profile_img: profile_img };
            } else {
                return { status: "unsuccess", message: "Errr while getting profile img " };
            }

        } else {
            return { status: "unsuccess", message: "Could not created profile, something went wrong" };
        }

    } catch (error) {
        // Log the error stack trace
        customLogger.info('Error in createProfile:' + error.stack);
        return { status: "error", message: "An error occurred while creating createProfile" };
    }
}

async function updateProfile(request) {
    try {
        const date_of_birth = request.date_of_birth;
        const education = request.education;
        const about = request.about;
        const profile_img = request.about;

        const updateSql = "UPDATE cl_user_profile SET date_of_birth=?, education=?, about=?,profile_img=?";
        const [result] = await conn.query(updateSql, [date_of_birth, education, about, profile_img]);

        if (result.affectedRows == 1) {
            return { status: "success", message: "Profile updated successfully" };
        } else {
            return { status: "unsuccess", message: "Could not update profile, something went wrong" };
        }
    } catch (error) {
        // Log the error stack trace
        customLogger.info('Error in updateProfile: ' + error.stack);
        return { status: "error", message: "An error occurred while updating the profile" };
    }
}


async function readProfile(profileId) {
    try {
        const selectSql = "SELECT * FROM cl_user_profile WHERE profile_id = ?";
        const [rows] = await conn.query(selectSql, [profileId]);

        if (rows.length > 0) {
            const profile = rows[0];
            return { status: "success", message: "Profile retrieved successfully", data: profile };
        } else {
            return { status: "unsuccess", message: "Profile not found" };
        }
    } catch (error) {
        // Log the error stack trace
        customLogger.info('Error in readProfile: ' + error.stack);
        return { status: "error", message: "An error occurred while reading the profile" };
    }
}


module.exports = {
    create: createProfile,
    update: updateProfile,
    read: readProfile
};
