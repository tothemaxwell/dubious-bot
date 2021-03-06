import { Command, PermissionLevel } from ".."

export default <Command>{
    name: 'genreadme',
    alias: [],
    level: PermissionLevel.developer,
    description: 'helper script for updating the readme',
    syntax: '',
    execute: async (message, _args, _config, client) => {

        const text = "## Commands\n" +
            client.commands.map(command => `### ${command.name}\n${command.description.replace('\n', '  \n')}`
                + `\n> Usage \`${command.name} ${command.syntax}\`\n\n`).join('\n')
        console.log(text)
        message.channel.send(`template written to console`)
    }
}
