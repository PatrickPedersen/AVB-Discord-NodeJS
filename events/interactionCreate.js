module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // If command is not there, return.
        if (!interaction.isCommand()) return

        // Grab the command that has been requested.
        const command = client.commands.get(interaction.commandName);

        // If command doesn't exist in the bot, but does on Discords backend, fail silently.
        if (!command) return;

        // If command is there, try and execute command, otherwise catch error and reply to the user.
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error.stack);
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
}