const express = require("express");
const app = express();

// Serve static files from the "public" folder
app.use(express.static("public"));

let botStatus = "Offline"; // Initialize the bot status as "Offline"
let botName = "Local PC BOT"; // Set the bot name
let client = null; // Initialize the client as null

// Define a route for "/bot"
app.get("/bot", (req, res) => {
	if (!client) { // Only create a new client if it doesn't exist
		const bedrock = require('bedrock-protocol')
		client = bedrock.createClient({
			host: 'MoonLightSMPG2.aternos.me',
			port: 64319,
			version: '1.20.0',
			username: botName,
			offline: true
		});

		// Set the bot status when it is online
		client.on('spawn', () => {
			botStatus = "Online";
			// Emit an event to notify connected clients about the updated status
			io.emit('botStatusUpdate', botStatus);
		});

		// Set the bot status when it goes offline
		client.on('end', () => {
			botStatus = "Offline";
			client = null; // Reset the client

			// Emit an event to notify connected clients about the updated status
			io.emit('botStatusUpdate', botStatus);
		});
	}

	const htmlResponse = `
    <html>
    <head>
      <style>
        body {
          background-color: #333; /* Change the background color to a cool gray */
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
          color: #fff; /* Set the text color to white */
        }

        h1 {
          color: #fff; /* Set the heading color to white */
          margin-top: 50px;
        }

        .bot-status {
          font-size: 24px;
          margin-top: 20px;
        }
      </style>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.3.2/socket.io.js"></script>
      <script>
        const socket = io();

        // Update bot status value when receiving an update event
        socket.on('botStatusUpdate', (status) => {
          document.getElementById('bot-status').innerText = status;
        });

        // Initial update of bot status value when the page loads
        document.addEventListener('DOMContentLoaded', () => {
          socket.emit('pageLoad');
        });
      </script>
    </head>
    <body>
      <h1>Bot Status</h1>
      <div class="bot-status">
        Bot: ${botName}<br>
        Status: <span id="bot-status">${botStatus}</span>
      </div>
    </body>
    </html>
  `;

	res.send(htmlResponse);
});

const server = app.listen(3000, () => {
	console.log('✅ Web is up');
});

const io = require('socket.io')(server);

// Listen for connection events from clients
io.on('connection', (socket) => {
	// Send the initial status value when a client connects
	socket.emit('botStatusUpdate', botStatus);

	// Handle page load event from clients
	socket.on('pageLoad', () => {
		// Send the initial status value when the page loads
		socket.emit('botStatusUpdate', botStatus);
	});
});
