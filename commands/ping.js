const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    // Build new slash command with name and description
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    
    // Code to execute upon initialization.
    async execute(interaction) {
        await interaction.reply('Pong!')
    }
}