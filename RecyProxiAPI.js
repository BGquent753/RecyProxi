const express = require("express");
const mysql = require('mysql2');
const bp = require('body-parser')

const app = express();
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//users & admins
app.get("/", (req, res) => {
    //recupère les centres les plus proches qui contiennent les filtres spécifiés
    res.send("methode get");
})

//admins
app.post("/", (req, res)=>{
    //ajouter un centre
    res.send("methode post");
})

app.delete("/", (req, res) =>{
    //supprimer un centre
    res.send("methode delete");
})

app.patch("/", (req, res) => {
    //modifier un centre
    res.send("methode patch");
})

app.listen(port, () => {
    console.log('Server is running at port 3000');
});