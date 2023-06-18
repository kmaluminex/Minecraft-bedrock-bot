app.get("/bot", (req, res) => {
  const bedrock = require('bedrock-protocol') 
  const client = bedrock.createClient({ 
    host: 'MoonLightSMPG2.aternos.me', 
    port: 64319, 
    version: '1.20.0', 
    username: 'Bot3', 
    offline: true
  });

  const htmlResponse = `
    <html>
    <head>
      <style>
        body {
          background-color: #f1f1f1;
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
        }

        h1 {
          color: #333;
          margin-top: 50px;
        }

        .video-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 30px;
        }

        .video-container iframe {
          margin: 10px;
        }
      </style>
    </head>
    <body>
      <h1>Bot is online</h1>
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/XvQxIsz30rE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/9tLglpFAyIg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </body>
    </html>
  `;

  res.send(htmlResponse);
});
