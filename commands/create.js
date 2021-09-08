const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    // Build new slash command with name and description
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Creates primary channel for Voice channels'),

    // Code to execute upon initialization.
    async execute(interaction) {
        // The interaction element is basically a context(ctx) element. It grants us the access from the point of the context initialization.
        let guild = interaction.guild
        const default_name = "New Session"

        // Create new voice channel with the specified permissions for the bot.
        await guild.channels.create(default_name, {
            type: 'GUILD_VOICE',
            permissionOverwrites: [
                {
                    id: interaction.applicationId, // Bot Application ID
                    allow: ["CONNECT", "MANAGE_CHANNELS", "MOVE_MEMBERS"]
                }
            ]
        })

        await interaction.reply('New Channel Created!')
    }
}