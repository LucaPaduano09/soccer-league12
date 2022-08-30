require("dotenv").config({ path: "../.env" });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dhadbk8ko",
    api_key: "561241622233423",
    api_secret: "OP5AOt6QllBWLbRuqVbZ626YPes",
});

module.exports = { cloudinary }