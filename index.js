const express = require("express");
const app = express();

// Serve static files from the "public" folder
app.use(express.static("public"));

// Define a route for "/bot"
app.get("/bot", (req, res) => {
const bedrock = require('bedrock-protocol') 
const client = bedrock.createClient({ 
host: 'MoonLightSMPG2.aternos.me', 
port: 64319, 
version: '1.20.0', 
username: 'Bot3', 
offline: false
})
res.send('<h1>Bot is online</h1> <iframe width="560" height="315" src="https://www.youtube.com/embed/XvQxIsz30rE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> <br> <iframe width="560" height="315" src="https://www.youtube.com/embed/9tLglpFAyIg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')

});

app.listen(3000, () => {
  console.log('✅ Web is up');
});
