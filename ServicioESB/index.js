const cors = require("cors");
const express = require("express");
const fetch = require('node-fetch');
const app = express();
app.use(express.json());
app.use(cors());
const url_autenticacion = "http://localhost:3001"
const url_compras = "http://localhost:9000";
const url_books = "http://localhost:4040";

app.post('/auth/login', async(req, res) => {
    const query = await fetch(`${url_autenticacion}/auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
        body:JSON.stringify(req.body)
    });
    const result= await query.json();
    res.status(query.status).json(result);
});

app.put('/auth/registro', async(req, res) => {
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
    // console.log(result); 
    res.status(query.status).json(result);
});

app.post('/orders/buy', async(req, res) => {
    // console.log(req.body);
    const query = await fetch(`${url_compras}/orders/buy`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
        body:JSON.stringify(req.body)
    });
    const result= await query.json();
    // console.log(result); 
    res.status(query.status).json(result);
});


app.get('/orders/read', async(req, res) => {
    const query = await fetch(`${url_compras}/orders/read`);
    const result= await query.json();
    // console.log(result);  
    res.status(query.status).json(result);
});


app.post('/book/create', async(req, res) => {
    // console.log(req.body);
    const query = await fetch(`${url_books}/book/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        },
        body:JSON.stringify(req.body)
    });
    const result= await query.json();
    // console.log(result); 
    res.status(query.status).json(result);
});


app.get('/book/read', async(req, res) => {
    const query = await fetch(`${url_books}/book/read`);
    const result= await query.json();
    // console.log(result);  
    res.status(query.status).json(result);
});

app.listen(process.env.PORT || 4091);