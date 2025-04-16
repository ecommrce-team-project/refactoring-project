const express = require("express")
const Router = express.Router()
const {getAllcategory}=require("../controllers/Category.controller")

Router.get("/getall",getAllcategory)


module.exports = Router 