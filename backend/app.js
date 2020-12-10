const express = require('express');

const app= express();

app.use((req, res) => {
    res.json({ message : "Bien reçue ! "});
})

module.exports=app;