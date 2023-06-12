const conn =require('../config/database');

const publishNotification =async (reqObj)=>{
    insertQuery="INSERT INTO cl_notification(user_id,notification_type,content) VALUES (?,?,?,?)";
    const [rows]=await conn.query(insertQuery);
    if(rows.affectedRows>0){
        return {status:"success",message:"Notification created successfully."};
    }else{
        return {status:"unsuccess",message:"Something went wrong,Please try again."};
    }
}