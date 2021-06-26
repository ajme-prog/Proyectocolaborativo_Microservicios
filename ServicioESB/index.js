const cors = require("cors");
const express = require("express");
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(cors());
const url_autenticacion = "http://localhost:3001"

app.post('/auth/login', async(req, res) => {
    console.log(req.body);
    const query = await fetch(`${url_autenticacion}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
        body:JSON.stringify(req.body)
    });
    const result= await query.json();
    console.log(result); 
    res.status(query.status).json(result);
});

app.put('/auth/registro', async(req, res) => {
    console.log(req.body);
    const query = await fetch(`${url_autenticacion}/auth/registro`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
        body:JSON.stringify(req.body)
    });
    const result= await query.json();
    console.log(result); 
    res.status(query.status).json(result);
});

app.listen(process.env.PORT || 4091);