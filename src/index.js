const express = require("express");
const axios = require("axios");
const responseTime = require("response-time");
const redis = require("redis");
const { promisify } = require('util');

const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379
});
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);
const app = express();

app.use(responseTime());

app.get("/character", async (req, res) => {
    try {
        //response from cache
        const reply = await GET_ASYNC('characters')
        if (reply) {
            return res.json(JSON.parse(reply));
        }
        const response = await axios.get("https://rickandmortyapi.com/api/character");

        const reply2 = await SET_ASYNC('characters', JSON.stringify(response.data))
        console.log(reply2);
        return res.json(response.data);
    } catch (error) {
        console.log(error);
    }
});

app.get("/character/:id", async (req, res)=>{
    try{
        const reply = await GET_ASYNC(req.params.id);
        if(reply){
            return res.json(JSON.parse(reply));
        }
        const response = await axios.get("https://rickandmortyapi.com/api/character/" + req.params.id);
        await SET_ASYNC (req.params.id, JSON.stringify(response.data));
        return res.json(response.data)
    } catch (error){
        console.log(error.code);
        console.log(error.menssage)
    }
})

app.listen(3000);
console.log("server on port 3000");
