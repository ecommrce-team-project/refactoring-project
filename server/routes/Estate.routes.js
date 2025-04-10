const express = require("express")
const Router = express.Router()
const { getAllEstate, 
    getEstateById
    , updateEstate
    , createEstate
    , deleteEstate
    , getEstatesByCategory } = require("../controllers/Estate.controller")

Router.get("/getall", getAllEstate)
Router.get("/get/:id", getEstateById)
Router.post("/create", createEstate)
Router.put("/update/:id", updateEstate)
Router.delete("/delete/:id", deleteEstate)
Router.get("/getByCategory/:categoryId", getEstatesByCategory)


module.exports = Router 