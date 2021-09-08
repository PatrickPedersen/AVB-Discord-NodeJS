module.exports = {
    name: 'ready',
    once: true, // Means that this event will only be acted upon once.
    execute(client) {
        console.log('Ready!')
    }
}