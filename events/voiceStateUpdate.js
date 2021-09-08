/*  
*   VOICE_STATE_UPDATE runs everytime someone acts in a voice channel, besides keying their mic.
*   If you move channel, leave/join channel, mut your mic or headset. This event will react on said changes.
*   Therefore the majority of the code is locked behind an if statement, otherwise I could imagine it hogging the Gateway.
*/  
module.exports = {
    name: "voiceStateUpdate", // Event name to react on
    async execute(client, oldState, newState) { // Client and event specific arguments

        // The "New Session" channel id
        const primary_channel = client.channels.cache.get('884906262775611412')

        // Check if the member joined the primary channel
        if (primary_channel.members.size > 0) {
            // Get the parent channel object in this case it's the category "Voice Bot Development"
            let parent_channel = client.channels.cache.get(primary_channel.parentId)

            let user_presence = primary_channel.members.first().presence // Get the first and hopefully only users presence
            let user_activities = user_presence.activities // Get an array of all of the users presence activities, a user can have multiple.
            let user_activity // Holds the user activity we want to act on.
            let channel_name // Holds the channel name.

            for (let activity in user_activities) { // Loop through the activities
                if (['LISTENING'].includes(user_activities[activity].type)) { // Check if the users activity matches anything we want to act on
                    user_activity = user_activities[activity].type // If so, set the user activity to the first instance of true.
                    // Note: If a user has a custom status, is listening to music, and is playing a game, then we will be getting 3 activities.
                    // Two of which we might want to react on, this way we will be taking the first instance of whichever comes first and then break.
                    // This way we get the first instance of a match and not the last instance of a match. Choose as you will really.
                    // I don't know if there is any order to how they show, I guess it's whichever happens to be the first thing the user does.
                    break;
                }
            }

            // Switch statement that sets the channel_name to the respective user presence action. If none is found then default to "General"
            switch(user_activity) {
                case "LISTENING":
                    channel_name = 'Music'
                    break
                case "PLAYING":
                    channel_name = 'Gaming'
                    break
                default:
                    channel_name = 'General'
            }

            // Create the new voice channel, with the channel name and with the parent of the primary channel. 
            await newState.guild.channels.create(`${channel_name}`, {
                type: 'GUILD_VOICE',
                parent: parent_channel
            })
                .then(data => {
                    // Upon creation, move the user to the channel.
                    newState.setChannel(data)
                })
        }

    }
}