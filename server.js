const express = require('express');
const { Telegraf } = require('telegraf');
// const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Create a new instance of Telegraf using your bot token
const bot = new Telegraf('6599940394:AAHOtxhT7U5XTN51_yBCZf12kyE2HxzTBh8');

// Set up a middleware to handle incoming updates
bot.on('text',  (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text;

  // Process the message and generate a response
  let responseText = `You said: ${text}`;
  console.log(ctx);

  // Send the response back using Telegraf
   ctx.reply(responseText);
});

// Set up a webhook route for Telegram to send updates
app.post(`/webhook`, (req, res) => {
  bot.handleUpdate(req.body);
  res.status(200).send('OK');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

bot.launch();
