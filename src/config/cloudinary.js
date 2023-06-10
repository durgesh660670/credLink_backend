const cloudinary = require('cloudinary').v2;
const config=cloudinary.config({
    cloud_name: 'dlnqufdik',
    api_key: '983642431444971',
    api_secret: 'DfgsJCugq8jJXLU857xRnmP9pu4'
});

module.exports ={
    config:config
}