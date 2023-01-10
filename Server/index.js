
const express = require('express');

const app = express();

app.get('/hello', (request, response) => {
    response.json("Méthode GET");
});

app.post('/hello', (req,res)=>{
    res.json("Méthode POST");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is listening on port " + PORT));
