const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    console.log("==========================");
    app.use(
        proxy("/oauthplayground/refreshAccessToken", {
            target: "https://developers.google.com",
            secure: false,
            changeOrigin: true
        })
    );

};