/*
*   This file is for deploying Slash/Application commands to Discord 
*   as they need to be registered with them, before usage.
*   These are guild specific commands and not global commands.
*   The process for global commands should be somewhat the same though.
*/

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const fs = require('fs')
require('dotenv').config() // Token located in .env file

// Get all our commands
const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

const clientId = '884733556994224148' // Bot Application ID
const guildId = '565959084990267393' // DevServer ID

// Loop through all commands and grab the data and JSONify the data for transfer to Discord API Application Gateway
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

// Create new REST connection to Discord with our bot token as authentication.
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

// Self initiating function
// Update all of the bots commands on Discords backend.
(async () => {
    try {
        console.log('Started refreshing application (/) commands.')

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        )

        console.log('Successfully reloaded application (/) commands.')
    } catch (err) {
        console.error(err)
    }
})()