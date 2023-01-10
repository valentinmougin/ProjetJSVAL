
const express = require('express');

const app = express();

app.get('/hello', (request, response) => {
    response.json("Méthode GET");
});

app.post('/hello', (req,res)=>{
    res.json("Méthode POST");
});

app.put('/hello/:id', (req,res) =>{
    const id = req.params.id;
    res.json("Méthode PUT" + id, destinataire id,);
});

app.delete('/hello/:id', (req,res) =>{
    const id = req.params.id;
    res.json("Méthode delete" + id, destinataire id,);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is listening on port " + PORT));
