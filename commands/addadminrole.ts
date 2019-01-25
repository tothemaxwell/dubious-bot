import { Command, logger } from "..";

export default {
	name: 'addadminrole',
	alias: ['aadr'],
	level: 'admin',
	desc: 'TODO',
	usage: '@role [...@role]',
	execute: async (message, _args, serverConfig, client) => {
		return new Promise<void>((resolve, reject) => {
			if (message.mentions.roles.size <= 0) 
				return reject('No roles mentioned')
			
			let reply: string = ''
			message.mentions.roles.forEach(((role, id) => {
				if(serverConfig.assignableRoles.has(id)) { 
					reply += (`<@&${id}> is an assignable role and cannot be made admin`)
				} else if(serverConfig.adminRoles.has(id)) {
					reply += (`<@&${id}> is already an admin role`)
					logger.debug(`@${id} is already an admin role in server ${role.guild.name}`)
				} else {
					serverConfig.adminRoles.set(id, role)
					reply += (`Added <@&${id}> as admin role`)
					logger.verbose(`Added @${role.name} as admin role in server '${role.guild.name}'`)		
				}
				logger.debug(`id:${id} guildid:${role.guild.id}`)
			}))
			message.channel.send(reply)
			client.saveConfig(message.guild.id)
			return resolve()
		})
	}
} as Command