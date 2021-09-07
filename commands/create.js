const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Creates primary channel for Voice channels'),
    async execute(interaction) {
        let guild = interaction.guild
        const default_name = "New Session"

        await guild.channels.create(default_name, {
            type: 'GUILD_VOICE',
            permissionOverwrites: [
                {
                    id: interaction.applicationId,
                    allow: ["READ_MESSAGE_HISTORY", "CONNECT", "MANAGE_CHANNELS", "MOVE_MEMBERS"]
                }
            ]
        })

        await interaction.reply('New Channel Created!')
    }
}