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
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const statusElement = document.getElementById('bot-status');

          // Update the bot status dynamically
          function updateBotStatus(status) {
            statusElement.textContent = status;
          }

          // Perform an asynchronous request to check the bot status
          async function checkBotStatus() {
            try {
              const response = await fetch('/bot/status'); // Assuming you have a separate route to fetch the bot status
              const data = await response.json();
              updateBotStatus(data.status);
            } catch (error) {
              console.error('Error fetching bot status:', error);
              updateBotStatus('Error');
            }
          }

          // Call the function initially and set an interval to periodically check the bot status
          checkBotStatus();
          setInterval(checkBotStatus, 5000); // Adjust the interval as needed
        });
      </script>
    </head>
    <body>
      <h1>Bot is online</h1>
      <div class="video-container">
        Bot status: <span id="bot-status"></span>
      </div>
    </body>
    </html>
  `;

  res.send(htmlResponse);
});

app.listen(3000, () => {
  console.log('✅ Web is up');
});
