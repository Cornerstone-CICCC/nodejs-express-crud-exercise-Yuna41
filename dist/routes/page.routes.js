"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pageRouter = (0, express_1.Router)();
pageRouter.get("/", (req, res) => {
    res.status(200).send("Welcome to my homepage.");
});
exports.default = pageRouter;
