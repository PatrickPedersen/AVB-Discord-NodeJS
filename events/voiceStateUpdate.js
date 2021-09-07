module.exports = {
    name: "voiceStateUpdate",
    async execute(client, oldState, newState) {

        const primary_channel = client.channels.cache.get('884906262775611412')

        if (primary_channel.members.size > 0) {
            let created_channel_amount = client.channels.cache.filter(c => c.parentId === primary_channel.parentId && c.type === "GUILD_VOICE").size-1

            let parent_channel = client.channels.cache.get(primary_channel.parentId)

            await newState.guild.channels.create(`New Channel #${created_channel_amount}`, {
                type: 'GUILD_VOICE',
                parent: parent_channel
            })
                .then(data => {
                    newState.setChannel(data)
                })


        }

    }
}