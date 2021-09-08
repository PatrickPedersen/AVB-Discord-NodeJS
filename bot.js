const fs = require('fs')
const { Client, Collection, Intents } = require("discord.js")
require("dotenv").config()

// Create new Client with the new Intents system
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES]
})

// Collection with all our commands.
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Command handler.
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// Grab all our event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// Event handler
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        // Pass event name and required arguments to the event file along with the client.
        client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
        // Same as above
        client.on(event.name, (...args) => event.execute(client, ...args));
    }
}

client.login(process.env.TOKEN)
    .catch(err => console.error(err.stack))