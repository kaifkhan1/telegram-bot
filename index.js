const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')
require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.post('/newMessage',async(req,res)=>{
    const {message} = req.body

    if(!message || message.text.toLowerCase().indexOf('salaam')<0){
        await axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`,{
        chat_id : message.chat.id,
        text : "Assalmu Alaikum!!, To communicate with me Say Salaam or salaam"
        }).then(res=>{
            console.log("Message posted");
        }).catch(err=>{
            console.log("Error : ",err);
            res.end('Error :',err)
        })
        return res.end()
    }
    

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
})

app.listen(3000,()=>{
    console.log("Server is running");
})