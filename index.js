const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/newMessage',async(req,res)=>{
    const {message} = req.body

    if(!message){
        res.end();
    }

    if(message.text.toLowerCase().includes('start'||'hi'||'hello'||'hey')){
        await axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,{
            chat_id : message.chat.id,
            text : "Asslamu Alaikum!!, To communicate with me please type Salaam"
    }).then(res=>{
        console.log("Message posted");
        res.end('ok')
    }).catch(err=>{
        console.log("Error : ",err);
        res.end('Error :',err)
    })
    }
    else if(message.text.toLowerCase().includes('salaam')){

    await axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,{
        chat_id : message.chat.id,
                text : "Salaam!!"
        }).then(res=>{
            console.log("Message posted");
            res.end('ok')
        }).catch(err=>{
            console.log("Error : ",err);
            res.end('Error :',err)
        })
}})

app.listen(3000,()=>{
    console.log("Server is running");
})