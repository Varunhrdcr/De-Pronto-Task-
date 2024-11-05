const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT= 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.get('/users',(req,res)=>{
    fs.readFile('users.json','utf-8',(err,data)=>{
        if(err) return res.status(500).send('Error  reading the file');
    });
});

app.post('/update-users',(req,res)=>{
    const {name,age}=req.body;
    fs.writeFile('users.json',JSON.stringify({users},null,2),(err)=>{
        if(err) return res.status(500).send('Error updating the file');
        res.send('User data updated successfully');
    });
});
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});