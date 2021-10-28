var cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name:"inventorysep",
    api_key:"346587284581111",
    api_secret:"1354B6XJXPqKfCNVcvOq2eT6GxA"
})
module.exports = {cloudinary};