// const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
// const app = express();

// app.use(
//     "/api",
//     createProxyMiddleware({
//         target: "http://3.39.182.90:8080",
//         changeOrigin: true,
//     })
// );
// app.listen(3000);

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://3.39.182.90:8080",
            changeOrigin: true,
        })
    );
};
